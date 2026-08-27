import assert from "node:assert/strict";
import test from "node:test";
import { budgets, compatibleIdeas, durations, environments, ideas, occasions, recommend } from "../app/recommendations.mjs";

const rank = { free: 0, low: 1, more: 2 };
const matrix = [];
for (const environment of environments) for (const budget of budgets) for (const duration of durations) for (const occasion of occasions) matrix.push({ environment, budget, duration, occasion });

test("covers the full 108-combination recommendation matrix with hard-compatible badges", () => {
  assert.equal(matrix.length, 108);
  for (const answers of matrix) {
    const result = recommend(answers);
    assert.ok(rank[result.idea.budget] <= rank[answers.budget], result.idea.id);
    assert.equal(result.idea.duration, answers.duration, result.idea.id);
    if (answers.environment !== "any") assert.equal(result.idea.environment, answers.environment, result.idea.id);
    assert.equal(result.badges[0], { free: "Grátis", low: "Baixo custo", more: "Um pouco mais" }[result.idea.budget]);
    assert.equal(result.badges[1], { hour: "1 hora", afternoon: "Uma tarde", day: "Um dia" }[result.idea.duration]);
  }
});

test("is deterministic and does not rely on a hidden invalid fallback", () => {
  for (const answers of matrix) {
    assert.deepEqual(recommend(answers), recommend(answers));
    assert.ok(compatibleIdeas(answers).length > 0);
  }
});

test("varies recommendations across distinct human profiles", () => {
  const profiles = [
    { environment: "home", budget: "free", duration: "hour", occasion: "reconnect" },
    { environment: "outdoors", budget: "low", duration: "afternoon", occasion: "surprise" },
    { environment: "go-out", budget: "more", duration: "day", occasion: "surprise" },
  ];
  assert.equal(new Set(profiles.map((profile) => recommend(profile).idea.id)).size, profiles.length);
});

test("keeps distribution varied across the whole matrix", () => {
  const distribution = Object.fromEntries(ideas.map((idea) => [idea.id, 0]));
  for (const answers of matrix) distribution[recommend(answers).idea.id] += 1;
  const mostSelected = Math.max(...Object.values(distribution));
  assert.ok(mostSelected <= 24, `one idea dominates ${mostSelected}/108 combinations`);
  assert.ok(Object.values(distribution).filter(Boolean).length >= 9);
});
