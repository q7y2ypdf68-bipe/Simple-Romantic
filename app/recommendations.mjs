import familyAuthority from "../../../SR_MOTOR_IDEIAS_V2_AUTHORITY/families.json" with { type: "json" };
import gestureAuthority from "../../../SR_MOTOR_IDEIAS_V2_AUTHORITY/gestures.json" with { type: "json" };
import variantAuthority from "../../../SR_MOTOR_IDEIAS_V2_AUTHORITY/execution-variants.json" with { type: "json" };

export const environments = ["home", "outdoors", "go-out", "any"];
export const budgets = ["free", "low", "more"];
export const durations = ["hour", "afternoon", "day"];
export const occasions = ["casual", "surprise", "reconnect"];

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
}

function durationFits(variant, band) {
  const [minimum, maximum] = durationRanges[band];
  if (Number.isFinite(variant.durationMinutes)) return variant.durationMinutes >= minimum && variant.durationMinutes <= maximum;
  return Number.isFinite(variant.minDurationMinutes) && Number.isFinite(variant.maxDurationMinutes)
    && variant.minDurationMinutes <= maximum && variant.maxDurationMinutes >= minimum;
}

function hardGateReasons(variant, family, answers, variantById) {
  const reasons = [];
  if (!family || family.structuralVetoes.length) reasons.push("structural-veto");
  if (answers.environment !== "any" && variant.environment !== answers.environment) reasons.push("environment");
  if (!durationFits(variant, answers.duration)) reasons.push("duration");
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
  const compare = [
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

function render(candidate, variantById) {
  const { variant, family } = candidate;
  const planBVariant = variant.planBEligible ? variantById.get(variant.planBVariantId) : undefined;
  return {
    id: variant.id,
    familyId: family.id,
    title: variant.title,
    whyItFits: variant.whyItFits,
    howTo: variant.howTo,
    smallDetail: variant.smallDetail,
    cost: `C${variant.costBand}`,
    duration: variant.durationLabel,
    surprise: variant.surprise,
    planB: planBVariant ? { id: planBVariant.id, title: planBVariant.title } : undefined,
    confirmBefore: variant.availability === "required-unverified" || variant.climate === "required-unverified",
    requirements: variant.requirements,
    badges: [`C${variant.costBand}`, variant.durationLabel, variant.environment],
  };
}

export function createV2Engine({ families = v2Authority.families, variants = [], gestures = v2Authority.gestures } = {}) {
  const familyById = new Map(families.map((family) => [family.id, family]));
  const variantById = new Map(variants.map((variant) => [variant.id, variant]));
  const gestureIds = new Set(gestures.map((gesture) => gesture.id));

  function eligibleCandidates(answers, session) {
    assertAnswers(answers);
    const history = sessionIndex(session);
    return variants.map((variant) => {
      const family = familyById.get(variant.familyId);
      return { variant, family, reasons: hardGateReasons(variant, family, answers, variantById) };
    }).filter((candidate) => !candidate.reasons.length && !history.candidateIds.has(candidate.variant.id) && (!candidate.variant.gestureId || gestureIds.has(candidate.variant.gestureId)));
  }

  function recommend(answers, session = {}) {
    const history = sessionIndex(session);
    const candidates = eligibleCandidates(answers, session).sort((left, right) => compareCandidates(left, right, answers, history));
    if (!candidates.length) return { status: "exhausted", message: "Você explorou as melhores ideias para estes filtros. Tente mudar o tempo, orçamento ou tipo de programa para descobrir outras possibilidades.", session };
    const selected = candidates[0];
    const result = render(selected, variantById);
    return {
      status: "recommendation",
      result,
      session: { ...session, displayed: [...(session.displayed ?? []), { candidateId: result.id, familyId: result.familyId, mechanic: selected.family.centralMechanic, category: selected.family.parentCategory, modifierIds: selected.variant.modifierIds ?? [], gestureId: selected.variant.gestureId, timestamp: Date.now() }] },
    };
  }

  return { eligibleCandidates, recommend };
}

const productionEngine = createV2Engine({ variants: v2Authority.variants });
export const compatibleIdeas = (answers) => productionEngine.eligibleCandidates(answers).map((candidate) => candidate.variant);
export const recommend = (answers, session) => productionEngine.recommend(answers, session);
