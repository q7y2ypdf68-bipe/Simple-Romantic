import test from "node:test";
import assert from "node:assert/strict";
import { coupleReading, SIGN_IDS } from "../app/horoscopo-casal.mjs";
import { skyForDay } from "../app/ceu.mjs";

const dayOf = (k) => { const d = new Date(Date.UTC(2026, 9, 7) + k * 86400000); return [d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate()]; };
const label = ([y, m, d]) => `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

test("o mesmo casal não repete leitura em um ano e é estável no mesmo dia", () => {
  for (const lang of ["pt", "es", "en"]) {
    let memory = []; const seen = new Set(); let lastGesture = "";
    for (let k = 0; k < 365; k += 1) {
      const date = dayOf(k), sky = skyForDay(...date);
      const r = coupleReading("virgo", "gemini", label(date), lang, 0, sky, memory);
      const again = coupleReading("virgo", "gemini", label(date), lang, 0, sky, memory);
      assert.deepEqual(again, r);
      const signature = [r.title, ...r.paragraphs, r.gesture, r.closing, r.idea.title].join("|");
      assert.ok(!seen.has(signature)); seen.add(signature);
      assert.notEqual(r.used.g, lastGesture); lastGesture = r.used.g;
      memory = [...memory, r.used].slice(-40);
    }
  }
});

test("todos os pares em PT/ES/EN geram texto completo", () => {
  const sky = skyForDay(2026, 10, 7);
  for (const lang of ["pt", "es", "en"]) for (const a of SIGN_IDS) for (const b of SIGN_IDS) {
    const r = coupleReading(a, b, "2026-10-07", lang, 0, sky, []);
    assert.ok(r.paragraphs.length >= 4 && r.paragraphs.every((p) => p && !p.includes("{")) && r.gesture && r.closing && r.idea.title);
  }
});

test("céu calculado: Lua cheia de 26/10/2026 e Mercúrio retrógrado até 13/11", () => {
  assert.equal(skyForDay(2026, 10, 26).event?.kind, "full");
  assert.equal(skyForDay(2026, 10, 30).mercury.retro, true);
  assert.equal(skyForDay(2026, 11, 20).mercury.retro, false);
});
