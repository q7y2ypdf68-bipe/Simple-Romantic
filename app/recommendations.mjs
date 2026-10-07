import familyAuthority from "../../../SR_MOTOR_IDEIAS_V2_AUTHORITY/families.json" with { type: "json" };
import gestureAuthority from "../../../SR_MOTOR_IDEIAS_V2_AUTHORITY/gestures.json" with { type: "json" };
import variantAuthority from "../../../SR_MOTOR_IDEIAS_V2_AUTHORITY/execution-variants.json" with { type: "json" };

import { editorialText } from "./ideias-textos.mjs";
import { NIGHT_BASES } from "./ideias-noite.mjs";
import { FLAME_BASES } from "./ideias-chama.mjs";

export const environments = ["home", "outdoors", "go-out", "any"];
export const budgets = ["free", "low", "more"];
export const durations = ["hour", "afternoon", "day"];
export const occasions = ["casual", "surprise", "reconnect"];
export const periods = ["any", "day", "night"];

// Momento do dia de cada ideia: "night" só faz sentido à noite; "day" só de dia; o resto serve para os dois.
const NIGHT_FAMILIES = new Set(["TEM-01", "GAS-13", "CUL-07"]);
const DAY_FAMILIES = new Set(["NAT-01", "NAT-05", "NAT-08", "NAT-09", "NAT-10", "NAT-12", "VIA-01", "VIA-02", "VIA-05", "CID-10", "CUL-01", "CUL-03", "CUL-08", "GAS-11", "COM-01", "COM-06", "CEL-08", "VIN-05"]);
const DAY_IDS = new Set(["V2-075", "V2-078"]);
export const periodOf = (variant) => variant.period ?? (NIGHT_FAMILIES.has(variant.familyId) ? "night" : DAY_FAMILIES.has(variant.familyId) || DAY_IDS.has(variant.id) ? "day" : "both");

const durationRanges = { hour: [45, 90], afternoon: [180, 300], day: [360, 600] };
const budgetCeilings = { free: 0, low: 2, more: 4 };
const strengthRank = { F3: 3, F2: 2, F1: 1 };
const tierRank = { A: 0, B: 1, C: 2 };
const ordinal = { ALTA: 3, MÉDIA: 2, BAIXA: 1, ALTO: 3, MÉDIO: 2, BAIXO: 1, BAIXA_A_MÉDIA: 1 };

export const v2Authority = Object.freeze({
  source: "SR_MOTOR_IDEIAS_V2_AUTHORITY v2.0.0",
  families: familyAuthority.records,
  gestures: gestureAuthority.gestures,
  variants: variantAuthority.variants,
  variantDataGap: variantAuthority.VARIANT_DATA_GAP,
  variantCount: variantAuthority.variantCount,
});

function assertAnswers(answers) {
  for (const [key, allowed] of Object.entries({ environment: environments, budget: budgets, duration: durations, occasion: occasions })) {
    if (!allowed.includes(answers[key])) throw new Error(`Invalid recommendation ${key}`);
  }
  if (answers.period !== undefined && !periods.includes(answers.period)) throw new Error("Invalid recommendation period");
  if (answers.flame !== undefined && typeof answers.flame !== "boolean") throw new Error("Invalid recommendation flame");
  if (answers.places !== undefined && !Array.isArray(answers.places)) throw new Error("Invalid recommendation places");
}

function durationFits(variant, band) {
  const [minimum, maximum] = durationRanges[band];
  if (Number.isFinite(variant.durationMinutes)) return variant.durationMinutes >= minimum && variant.durationMinutes <= maximum;
  return Number.isFinite(variant.minDurationMinutes) && Number.isFinite(variant.maxDurationMinutes)
    && variant.minDurationMinutes <= maximum && variant.maxDurationMinutes >= minimum;
}

// Lugares reais: se o visitante informou a cidade, ideias que dependem de um tipo de lugar só aparecem quando ele existe por perto.
// Sem cidade (answers.places ausente), nada é filtrado.
export const PLACE_NEEDS = {
  "NAT-05": ["beach"], "NAT-09": ["nature"], "NAT-12": ["nature"], "NAT-10": ["nature", "park"],
  "CUL-04": ["cinema"], "CUL-01": ["museum"], "CUL-03": ["gallery"], "CUL-08": ["bookshop"], "CUL-07": ["theatre"],
  "MOV-06": ["bowling"], "VIA-05": ["ferry"], "VIA-02": ["train"], "GAS-11": ["market"],
};

function hardGateReasons(variant, family, answers, variantById, relax = false) {
  const reasons = [];
  if (!family || family.structuralVetoes.length) reasons.push("structural-veto");
  // Modo Chama: só as ideias marcadas; fora dele, as ideias do modo Chama nunca aparecem.
  if (Boolean(variant.flame) !== Boolean(answers.flame)) reasons.push("flame");
  const need = PLACE_NEEDS[variant.familyId];
  if (need && Array.isArray(answers.places) && !need.some((place) => answers.places.includes(place))) reasons.push("place-missing");
  if (!relax && answers.environment !== "any" && variant.environment !== answers.environment) reasons.push("environment");
  if (!relax && !durationFits(variant, answers.duration)) reasons.push("duration");
  const moment = periodOf(variant), wanted = answers.period ?? "any";
  if (!relax && ((wanted === "day" && moment === "night") || (wanted === "night" && moment === "day") || (wanted === "any" && moment === "night" && answers.duration !== "hour"))) reasons.push("period");
  if (!Number.isInteger(variant.costBand) || variant.costBand < 0 || variant.costBand > 4 || variant.costBand > budgetCeilings[answers.budget]) reasons.push("cost");
  if (variant.consent === "unsatisfied" || variant.safety === "unsafe" || variant.accessibility === "incompatible") reasons.push("safety-or-consent");
  if (variant.requirements?.structuralImpossible) reasons.push("structural-requirement");
  if ((variant.availability === "required-unverified" || variant.climate === "required-unverified") && (!variant.planBEligible || !variantById.has(variant.planBVariantId))) reasons.push("unresolved-availability-or-climate");
  if (answers.occasion === "surprise" && (!["S1", "S2", "S3", "S4"].includes(variant.surpriseLevel) || variant.surpriseSafety !== "safe")) reasons.push("unsafe-surprise");
  return reasons;
}

function sessionIndex(session = {}) {
  const displayed = session.displayed ?? [];
  return {
    candidateIds: new Set(displayed.map((item) => item.candidateId)),
    familyIds: new Set(displayed.slice(-8).map((item) => item.familyId)),
    mechanics: new Set(displayed.slice(-4).map((item) => item.mechanic)),
    categories: new Set(displayed.slice(-8).map((item) => item.category)),
    modifierIds: new Set(displayed.slice(-8).flatMap((item) => item.modifierIds ?? [])),
    gestureIds: new Set(displayed.slice(-8).map((item) => item.gestureId).filter(Boolean)),
  };
}

function compareCandidates(left, right, answers, history) {
  const l = left.variant, r = right.variant;
  const target = (durationRanges[answers.duration][0] + durationRanges[answers.duration][1]) / 2;
  const nightFirst = answers.period === "night";
  const compare = [
    nightFirst ? Number(periodOf(l) !== "night") - Number(periodOf(r) !== "night") : 0,
    tierRank[l.tier] - tierRank[r.tier],
    Number(!(l.occasions ?? []).includes(answers.occasion)) - Number(!(r.occasions ?? []).includes(answers.occasion)),
    Number(l.environment !== answers.environment) - Number(r.environment !== answers.environment),
    Math.abs((l.durationMinutes ?? l.maxDurationMinutes) - target) - Math.abs((r.durationMinutes ?? r.maxDurationMinutes) - target),
    strengthRank[right.family.strengthClass] - strengthRank[left.family.strengthClass],
    (ordinal[right.family.sharedInteractionPotential] ?? 0) - (ordinal[left.family.sharedInteractionPotential] ?? 0),
    (ordinal[left.family.naturalCommitmentLoad] ?? 0) - (ordinal[right.family.naturalCommitmentLoad] ?? 0),
    (ordinal[left.family.naturalPreparationRange] ?? 0) - (ordinal[right.family.naturalPreparationRange] ?? 0),
    (ordinal[right.family.personalizationPotential] ?? 0) - (ordinal[left.family.personalizationPotential] ?? 0),
    Number(history.familyIds.has(left.family.id)) - Number(history.familyIds.has(right.family.id)),
    Number(history.mechanics.has(left.family.centralMechanic)) - Number(history.mechanics.has(right.family.centralMechanic)),
    Number(history.categories.has(left.family.parentCategory)) - Number(history.categories.has(right.family.parentCategory)),
    Number((l.modifierIds ?? []).some((id) => history.modifierIds.has(id))) - Number((r.modifierIds ?? []).some((id) => history.modifierIds.has(id))),
    Number(history.gestureIds.has(l.gestureId)) - Number(history.gestureIds.has(r.gestureId)),
    l.costBand - r.costBand,
    (ordinal[left.family.naturalPreparationRange] ?? 0) - (ordinal[right.family.naturalPreparationRange] ?? 0),
    (ordinal[right.family.naturalExitEase] ?? 0) - (ordinal[left.family.naturalExitEase] ?? 0),
    String(l.id).localeCompare(String(r.id), "pt"),
  ];
  return compare.find(Boolean) ?? 0;
}

function render(candidate, variantById, lang = "pt") {
  const { variant, family } = candidate;
  const planBVariant = variant.planBEligible ? variantById.get(variant.planBVariantId) : undefined;
  const text = editorialText(variant, lang);
  return {
    id: variant.id,
    familyId: family.id,
    title: text?.title ?? variant.title,
    whyItFits: text?.whyItFits ?? variant.whyItFits,
    howTo: text?.howTo ?? variant.howTo,
    smallDetail: text?.smallDetail ?? variant.smallDetail,
    cost: `C${variant.costBand}`,
    duration: variant.durationLabel,
    surprise: text?.surprise ?? variant.surprise,
    planB: planBVariant ? { id: planBVariant.id, title: text?.planB ?? planBVariant.title } : undefined,
    confirmBefore: variant.availability === "required-unverified" || variant.climate === "required-unverified",
    requirements: variant.requirements,
    badges: [`C${variant.costBand}`, variant.durationLabel, variant.environment],
    period: periodOf(variant),
    flame: Boolean(variant.flame),
  };
}

// Variedade: entre as ideias "empatadas" nos critérios principais (período, nível, clima, lugar, força),
// escolhe uma ao acaso, preferindo as que a pessoa ainda não viu (memória do navegador em session.recentIds)
// e evitando repetir família/mecânica dentro da mesma rodada. Sem session.seed (testes), o resultado é fixo.
function chooseVaried(candidates, answers, session, history) {
  const first = candidates[0];
  if (!Number.isFinite(session?.seed)) return first;
  // Os filtros duros já garantem que TODAS as candidatas servem; então sorteamos entre as melhores (metade de cima, mínimo 6).
  const band = candidates.slice(0, Math.max(6, Math.ceil(candidates.length * 0.6)));
  const recent = [...(session.recentIds ?? []), ...(session.displayed ?? []).map((item) => item.candidateId)];
  const seenAt = new Map(recent.map((id, index) => [id, index]));
  let pool = band.filter((c) => !seenAt.has(c.variant.id));
  if (!pool.length) {
    // tudo da faixa já foi visto: abre para todas as candidatas e prefere as vistas há mais tempo
    const unseen = candidates.filter((c) => !seenAt.has(c.variant.id));
    if (unseen.length) pool = unseen;
    else {
      const oldest = candidates.slice().sort((a, b) => seenAt.get(a.variant.id) - seenAt.get(b.variant.id));
      pool = oldest.slice(0, Math.max(1, Math.ceil(oldest.length / 2)));
    }
  }
  const fresh = pool.filter((c) => !history.familyIds.has(c.family.id) && !history.mechanics.has(c.family.centralMechanic));
  if (fresh.length) pool = fresh;
  const mix = Math.abs(Math.floor(session.seed) + (session.displayed?.length ?? 0) * 7919);
  return pool[mix % pool.length];
}

export function createV2Engine({ families = v2Authority.families, variants = [], gestures = v2Authority.gestures } = {}) {
  const familyById = new Map(families.map((family) => [family.id, family]));
  const variantById = new Map(variants.map((variant) => [variant.id, variant]));
  const gestureIds = new Set(gestures.map((gesture) => gesture.id));

  function eligibleCandidates(answers, session, relax = false) {
    assertAnswers(answers);
    const history = sessionIndex(session);
    return variants.map((variant) => {
      const family = familyById.get(variant.familyId);
      return { variant, family, reasons: hardGateReasons(variant, family, answers, variantById, relax) };
    }).filter((candidate) => !candidate.reasons.length && !history.candidateIds.has(candidate.variant.id) && (!candidate.variant.gestureId || gestureIds.has(candidate.variant.gestureId)));
  }

  function recommend(answers, session = {}, lang = "pt") {
    const history = sessionIndex(session);
    let candidates = eligibleCandidates(answers, session).sort((left, right) => compareCandidates(left, right, answers, history));
    // Modo Chama nunca fica vazio: se os filtros de lugar/tempo/momento não têm ideia, relaxa só esses (custo e segurança continuam).
    let relaxed = false;
    if (!candidates.length && answers.flame) {
      candidates = eligibleCandidates(answers, session, true).sort((left, right) => compareCandidates(left, right, answers, history));
      relaxed = candidates.length > 0;
      // Última rede: se só faltam ideias de "surpresa", mostra uma ideia de outro clima em vez de ficar vazio.
      if (!candidates.length && answers.occasion === "surprise") {
        candidates = eligibleCandidates({ ...answers, occasion: "casual" }, session, true).sort((left, right) => compareCandidates(left, right, { ...answers, occasion: "casual" }, history));
        relaxed = candidates.length > 0;
      }
    }
    if (!candidates.length) return { status: "exhausted", message: "Você explorou as melhores ideias para estes filtros. Tente mudar o tempo, orçamento ou tipo de programa para descobrir outras possibilidades.", session };
    const selected = chooseVaried(candidates, answers, session, history);
    const result = { ...render(selected, variantById, lang), relaxed };
    return {
      status: "recommendation",
      result,
      session: { ...session, displayed: [...(session.displayed ?? []), { candidateId: result.id, familyId: result.familyId, mechanic: selected.family.centralMechanic, category: selected.family.parentCategory, modifierIds: selected.variant.modifierIds ?? [], gestureId: selected.variant.gestureId, timestamp: Date.now() }] },
    };
  }

  return { eligibleCandidates, recommend };
}

// Variantes noturnas extras: copiam as regras (família, custo, segurança) de uma variante já validada.
const nightVariants = NIGHT_BASES.map(({ id, from, title }) => {
  const origin = v2Authority.variants.find((variant) => variant.id === from);
  return { ...origin, id, title, period: "night", durationLabel: origin.durationLabel };
});
// Ideias do modo Chama (+18): copiam as regras de uma variante em casa já validada e ficam marcadas com flame.
const flameVariants = FLAME_BASES.map(({ id, from, title, period }) => {
  const origin = v2Authority.variants.find((variant) => variant.id === from);
  return { ...origin, id, title, flame: true, ...(period ? { period } : {}) };
});
const productionEngine = createV2Engine({ variants: [...v2Authority.variants, ...nightVariants, ...flameVariants] });
export const compatibleIdeas = (answers) => productionEngine.eligibleCandidates(answers).map((candidate) => candidate.variant);
export const recommend = (answers, session, lang) => productionEngine.recommend(answers, session, lang);
