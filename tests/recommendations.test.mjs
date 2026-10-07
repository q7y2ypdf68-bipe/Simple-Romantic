import assert from "node:assert/strict";
import test from "node:test";
import { compatibleIdeas, createV2Engine, recommend, v2Authority } from "../app/recommendations.mjs";

const answers = { environment: "home", budget: "low", duration: "afternoon", occasion: "casual" };
const family = (strength) => v2Authority.families.find((item) => item.strengthClass === strength);
const base = (id, familyId, overrides = {}) => ({
  id, familyId, environment: "home", costBand: 1, durationMinutes: 240, durationLabel: "Uma tarde", tier: "A",
  occasions: ["casual", "reconnect"], consent: "satisfied", safety: "safe", accessibility: "compatible",
  availability: "independent", climate: "independent", surpriseSafety: "safe", title: "TEST FIXTURE", whyItFits: "TEST FIXTURE", howTo: ["TEST FIXTURE"], smallDetail: "TEST FIXTURE",
  ...overrides,
});

test("validates the canonical authority invariants and the 82 literal variants", () => {
  assert.equal(v2Authority.families.length, 89);
  assert.equal(new Set(v2Authority.families.map((item) => item.id)).size, 89);
  assert.deepEqual(Object.fromEntries(["F3", "F2", "F1"].map((strength) => [strength, v2Authority.families.filter((item) => item.strengthClass === strength).length])), { F3: 48, F2: 36, F1: 5 });
  assert.equal(v2Authority.gestures.length, 72);
  assert.equal(v2Authority.variantDataGap, false);
  assert.equal(v2Authority.variantCount, 82);
  assert.equal(new Set(v2Authority.variants.map((item) => item.id)).size, 82);
  assert.equal(v2Authority.variants.every((item) => v2Authority.families.some((family) => family.id === item.familyId)), true);
  assert.equal(v2Authority.variants.every((item) => item.modifierIds.every((id) => /^MOD-\d+$/.test(id))), true);
  assert.equal(v2Authority.variants.every((item) => !item.gestureId || v2Authority.gestures.some((gesture) => gesture.id === item.gestureId)), true);
});

test("applies hard gates before ranking", () => {
  const engine = createV2Engine({ variants: [
    base("free-restaurant", family("F3").id, { costBand: 1 }),
    base("too-short", family("F3").id, { durationMinutes: 90 }),
    base("unsafe-surprise", family("F3").id, { occasions: ["surprise"], surpriseLevel: "R0" }),
    base("inaccessible", family("F3").id, { accessibility: "incompatible" }),
    base("unknown-weather", family("F3").id, { climate: "required-unverified" }),
  ] });
  assert.equal(engine.eligibleCandidates({ ...answers, budget: "free" }).length, 0);
  assert.equal(engine.eligibleCandidates({ ...answers, duration: "day" }).length, 0);
  assert.equal(engine.eligibleCandidates({ ...answers, occasion: "surprise" }).length, 0);
});

test("ranks F2 Tier A above F3 Tier B and retains deterministic ties", () => {
  const f2 = family("F2"), f3 = family("F3");
  const engine = createV2Engine({ variants: [base("f3-b", f3.id, { tier: "B" }), base("f2-a", f2.id, { tier: "A" })] });
  assert.equal(engine.recommend(answers).result.id, "f2-a");
  assert.equal(engine.recommend(answers).result.id, "f2-a");
});

test("rotates without repeating a literal candidate or family when possible, then exhausts honestly", () => {
  const f2 = family("F2"), f3 = family("F3");
  const engine = createV2Engine({ variants: [base("first", f3.id), base("second", f2.id)] });
  const first = engine.recommend(answers);
  const second = engine.recommend(answers, first.session);
  const exhausted = engine.recommend(answers, second.session);
  assert.equal(first.status, "recommendation");
  assert.equal(second.status, "recommendation");
  assert.notEqual(first.result.id, second.result.id);
  assert.notEqual(first.result.familyId, second.result.familyId);
  assert.equal(exhausted.status, "exhausted");
});

test("allows confirmed fallback only for uncertain required availability or climate", () => {
  const f3 = family("F3");
  const engine = createV2Engine({ variants: [
    base("with-plan-b", f3.id, { climate: "required-unverified", planBEligible: true, planBVariantId: "fallback" }),
    base("fallback", f3.id, { tier: "B" }),
    base("without-plan-b", f3.id, { availability: "required-unverified" }),
  ] });
  const result = engine.recommend(answers);
  assert.equal(result.status, "recommendation");
  assert.equal(result.result.id, "with-plan-b");
  assert.equal(result.result.confirmBefore, true);
});

test("matches the editorial 108-filter baseline and preserves the 18 structural exhaustions", () => {
  const counts = [];
  for (const environment of ["home", "outdoors", "go-out", "any"]) for (const budget of ["free", "low", "more"]) for (const duration of ["hour", "afternoon", "day"]) for (const occasion of ["casual", "surprise", "reconnect"]) counts.push({ environment, budget, duration, occasion, count: compatibleIdeas({ environment, budget, duration, occasion }).length });
  const buckets = Object.fromEntries([">=6", "3-5", "2", "1", "0"].map((key) => [key, 0]));
  for (const { count } of counts) buckets[count >= 6 ? ">=6" : count >= 3 ? "3-5" : String(count)] += 1;
  assert.deepEqual(buckets, { ">=6": 66, "3-5": 18, "2": 6, "1": 0, "0": 18 }); // ideias só de noite (estrelas, jantar temático, performance) não aparecem em "uma tarde"/"um dia" sem o filtro "à noite"
  assert.deepEqual(buckets, { ">=6": 66, "3-5": 18, "2": 6, "1": 0, "0": 18 });
  assert.equal(counts.filter((item) => item.environment === "home" && item.duration === "day").every((item) => item.count === 0), true);
  assert.equal(counts.filter((item) => item.environment !== "home" && item.budget === "free" && item.duration === "day").every((item) => item.count === 0), true);
});

test("uses only real variants for the two original cases and rotates without literal repeats", () => {
  const caseA = { environment: "home", budget: "low", duration: "afternoon", occasion: "surprise" };
  const caseB = { environment: "outdoors", budget: "free", duration: "afternoon", occasion: "casual" };
  assert.ok(compatibleIdeas(caseA).length >= 3);
  assert.ok(compatibleIdeas(caseB).length >= 8); // 9 menos "Observação das estrelas", que é só de noite
  for (const variant of [...compatibleIdeas(caseA), ...compatibleIdeas(caseB)]) {
    assert.ok(v2Authority.variants.includes(variant));
    assert.equal(variant.howTo.length >= 3 && variant.howTo.length <= 5, true);
  }
  let session = { displayed: [] }, seen = new Set();
  for (let index = 0; index < 6; index += 1) {
    const next = recommend(caseB, session);
    if (next.status === "exhausted") break;
    assert.equal(seen.has(next.result.id), false);
    seen.add(next.result.id); session = next.session;
  }
});

test("renders surprise, confirmation and an eligible canonical Plan B without fixtures", () => {
  const result = recommend({ environment: "go-out", budget: "free", duration: "afternoon", occasion: "surprise" });
  assert.equal(result.status, "recommendation");
  assert.match(result.result.surprise, /surpresa/i);
  assert.equal(["S1", "S2"].includes(v2Authority.variants.find((item) => item.id === result.result.id).surpriseLevel), true);
  if (result.result.confirmBefore) {
    assert.ok(result.result.planB);
    assert.ok(v2Authority.variants.some((item) => item.id === result.result.planB.id));
  }
});

test("filtro de momento do dia: noite e dia nunca se misturam", () => {
  const base = { environment: "outdoors", budget: "free", duration: "afternoon", occasion: "casual" };
  const day = compatibleIdeas({ ...base, period: "day" });
  const night = compatibleIdeas({ ...base, period: "night" });
  assert.equal(day.some((item) => item.familyId === "TEM-01"), false);
  assert.equal(night.some((item) => item.familyId === "TEM-01"), true);
  assert.equal(night.some((item) => ["NAT-05", "NAT-09", "NAT-12", "CID-10"].includes(item.familyId)), false);
  assert.equal(compatibleIdeas({ ...base, duration: "day", budget: "more" }).some((item) => item.familyId === "TEM-01"), false);
  const next = recommend({ ...base, period: "night" }, { displayed: [] }, "en");
  assert.equal(next.status, "recommendation");
  assert.equal(next.result.period, "night");
});

// ---- Modo Chama (+18) e horóscopo do casal ----
import { recommend as recommendNow } from "../app/recommendations.mjs";
import { coupleReading, SIGN_IDS } from "../app/horoscopo-casal.mjs";

test("modo Chama nunca aparece fora do modo e nunca fica vazio", () => {
  for (const environment of ["home", "outdoors", "go-out", "any"]) for (const budget of ["free", "low", "more"]) for (const duration of ["hour", "afternoon", "day"]) for (const occasion of ["casual", "surprise", "reconnect"]) {
    for (const flame of [true, false]) {
      let session = { displayed: [] };
      for (let i = 0; i < 3; i++) {
        const next = recommendNow({ environment, budget, duration, occasion, period: "any", flame }, session, "pt");
        if (!flame && next.status !== "recommendation") break;
        assert.equal(next.status, "recommendation");
        assert.equal(next.result.flame, flame);
        session = next.session;
      }
    }
  }
});

test("horóscopo do casal é estável no dia, igual nos dois sentidos e sempre devolve ideia", () => {
  for (const a of SIGN_IDS) for (const b of SIGN_IDS) for (const lang of ["pt", "es", "en"]) {
    const one = coupleReading(a, b, "2026-10-07", lang), two = coupleReading(b, a, "2026-10-07", lang);
    assert.equal(one.idea.id, two.idea.id);
    assert.ok(one.idea.title && one.vibe && one.gesture);
    assert.equal(one.idea.flame, false);
  }
});

test("com semente e memória, percorre as ideias sem repetir até esgotar; sem semente continua fixo", () => {
  const f2 = family("F2");
  const variants = Array.from({ length: 8 }, (_, i) => base(`v${i}`, f2.id, { tier: i % 2 ? "A" : "B" }));
  const engine = createV2Engine({ variants });
  assert.equal(engine.recommend(answers).result.id, engine.recommend(answers).result.id);
  let recentIds = [];
  const seen = [];
  for (let round = 0; round < 4; round += 1) {
    const out = engine.recommend(answers, { displayed: [], seed: 1000 + round * 37, recentIds });
    assert.equal(out.result ? true : false, true);
    seen.push(out.result.id);
    recentIds = [...recentIds, out.result.id];
  }
  assert.equal(new Set(seen).size, 4);
});

test("Modo Chama real nunca fica vazio e varia entre rodadas", () => {
  const a = { environment: "home", budget: "free", duration: "hour", occasion: "casual", period: "night", flame: true };
  let recent = [];
  const rounds = [];
  for (let r = 0; r < 3; r += 1) {
    let s = { displayed: [], seed: 5 + r * 977, recentIds: recent };
    const trio = [];
    for (let i = 0; i < 3; i += 1) { const out = recommend(a, s, "pt"); assert.ok(out.result); trio.push(out.result.id); s = out.session; }
    recent = [...recent, ...trio];
    rounds.push(trio.join());
  }
  assert.notEqual(rounds[0], rounds[1]);
});
