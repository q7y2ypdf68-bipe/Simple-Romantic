import assert from "node:assert/strict";
import test from "node:test";
import { formatPortugueseDate, lisbonToday, parseBody, serializeBody, slugify } from "../app/blog/post-format.ts";

test("converte o texto do editor em abertura, subtítulos, listas e fecho", () => {
  const { intro, sections } = parseBody("Abertura um.\n\nAbertura dois.\n\n## Passos\n\nAntes.\n\n- Um\n- Dois\n\nDepois.");
  assert.deepEqual(intro, ["Abertura um.", "Abertura dois."]);
  assert.equal(sections.length, 1);
  assert.deepEqual(sections[0], { heading: "Passos", paragraphs: ["Antes."], items: ["Um", "Dois"], afterParagraphs: ["Depois."] });
  assert.deepEqual(parseBody(serializeBody(intro, sections)), { intro, sections });
});

test("formata datas e endereços em português", () => {
  assert.equal(formatPortugueseDate("2026-10-04"), "4 de outubro de 2026");
  assert.equal(slugify("Tarde de domingo: 10 ideias!"), "tarde-de-domingo-10-ideias");
});

test("a data de liberação usa o dia de Lisboa", () => {
  assert.equal(lisbonToday(new Date("2026-10-03T23:30:00Z")), "2026-10-04");
  assert.equal(lisbonToday(new Date("2026-10-04T22:59:00Z")), "2026-10-04");
});
