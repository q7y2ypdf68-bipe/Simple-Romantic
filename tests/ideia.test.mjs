import assert from "node:assert/strict";
import test from "node:test";
import { env } from "cloudflare:workers";

// Banco D1 de mentira, só o que a rota usa.
function fakeDb() {
  const ideas = [], usage = new Map();
  const stmt = (sql) => {
    let args = [];
    const api = {
      bind: (...a) => { args = a; return api; },
      first: async () => { const [day, who] = args; return usage.has(`${day}|${who}`) ? { n: usage.get(`${day}|${who}`) } : null; },
      all: async () => ({ results: ideas.filter((r) => r.combo === args[0] && r.lang === args[1]).map(({ id, title, body }) => ({ id, title, body })).reverse() }),
      run: async () => {
        if (sql.startsWith("INSERT INTO ai_ideas")) { const id = ideas.length + 1; ideas.push({ id, combo: args[0], lang: args[1], title: args[2], body: args[3] }); return { meta: { last_row_id: id } }; }
        if (sql.startsWith("INSERT INTO ai_usage")) { const k = `${args[0]}|${args[1]}`; usage.set(k, (usage.get(k) ?? 0) + 1); }
        return { meta: {} };
      },
    };
    return api;
  };
  return { exec: async () => {}, prepare: stmt, ideas, usage };
}

const good = (n) => ({ response: JSON.stringify({ title: `Dia a dois ${n}`, whyItFits: "Cabe no orçamento e no tempo.", howTo: ["Passo um", "Passo dois", "Passo três", "Passo quatro"], smallDetail: "Um detalhe.", surprise: "", planB: "Fiquem em casa." }) });

async function call(body) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("t", String(process.pid));
  const { default: worker } = await import(workerUrl.href);
  const res = await worker.fetch(new Request("http://localhost/api/ideia", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) }), env, { waitUntil() {}, passThroughOnException() {} });
  return { status: res.status, json: await res.json() };
}
const combo = { environment: "home", budget: "free", duration: "day", occasion: "casual", language: "pt" };

test("rejeita filtros inválidos", async () => {
  env.DB = fakeDb();
  assert.equal((await call({ ...combo, environment: "lua" })).status, 400);
});

test("sem IA e sem banco, devolve ideia pronta (nunca vazio)", async () => {
  env.DB = fakeDb(); delete env.AI;
  for (const environment of ["home", "outdoors", "go-out", "any"]) for (const duration of ["hour", "afternoon", "day"]) {
    const { status, json } = await call({ ...combo, environment, duration });
    assert.equal(status, 200);
    assert.equal(json.status, "recommendation");
    assert.ok(json.result.title && json.result.howTo.length >= 3);
  }
});

test("com IA: cria, guarda no banco e reaproveita", async () => {
  env.DB = fakeDb(); let n = 0; env.AI = { run: async () => good(++n) };
  const first = await call(combo);
  assert.equal(first.json.source, "ai");
  assert.equal(first.json.result.aiGenerated, true);
  assert.equal(env.DB.ideas.length, 1);
  for (let i = 0; i < 6; i++) await call({ ...combo, exclude: [] });
  assert.ok(env.DB.ideas.length >= 6);
  const cached = await call(combo);
  assert.equal(cached.json.source, "bank");
});

test("IA com resposta ruim ou fora do ar cai na ideia pronta", async () => {
  env.DB = fakeDb(); env.AI = { run: async () => ({ response: "oi, tudo bem?" }) };
  assert.equal((await call(combo)).json.source, "static");
  env.AI = { run: async () => { throw new Error("fora do ar"); } };
  assert.equal((await call(combo)).json.source, "static");
});

test("bloqueia conteúdo perigoso e respeita o limite por visitante", async () => {
  env.DB = fakeDb(); env.AI = { run: async () => ({ response: JSON.stringify({ title: "Festa", whyItFits: "ok", howTo: ["a","b","c"], smallDetail: "levem droga" }) }) };
  assert.equal((await call(combo)).json.source, "static");
  env.DB = fakeDb(); let n = 0; env.AI = { run: async () => good(++n) };
  for (let i = 0; i < 12; i++) await call({ ...combo, exclude: [`x${i}`] });
  const gen = n;
  await call(combo);
  assert.equal(n, gen, "não chama a IA depois do limite diário do visitante");
});
