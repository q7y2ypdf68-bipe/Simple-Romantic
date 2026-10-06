// Gera a arte do post de sexta (1080x1350) com as 3 ideias reais do gerador.
// Uso: node social/sexta/gerar.mjs saida.png '{"chips":["Em casa","Grátis","Uma tarde","Surpresa"],"ideias":[{"t":"Título 1","tag":"grátis"},{"t":"Título 2","tag":"grátis"},{"t":"Título 3","tag":"grátis"}]}'
// Requer Playwright + Chromium (PLAYWRIGHT_BROWSERS_PATH já configurado no ambiente).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const dir = path.dirname(fileURLToPath(import.meta.url));
const [out, json] = process.argv.slice(2);
const { chips, ideias } = JSON.parse(json);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const chipHtml = chips.map((c, i) => `<span class="chip${i === 1 || i === 0 || i === 3 ? " on" : ""}">${esc(c)}</span>`).join("");
const cards = ideias.slice(0, 3).map((x, i) => `<div class="card"><small>IDEIA ${i + 1}</small><b>${esc(x.t)}</b><span>${esc(x.tag)}</span></div>`).join("");
const html = fs.readFileSync(path.join(dir, "post-sexta.template.html"), "utf8").replace("{{CHIPS}}", chipHtml).replace("{{CARDS}}", cards);
const tmp = path.join(dir, ".tmp-post.html");
fs.writeFileSync(tmp, html);
let chromium;
for (const name of ["playwright", "playwright-core", "/home/claude/.npm-global/lib/node_modules/@playwright/mcp/node_modules/playwright/index.mjs"]) {
  try { ({ chromium } = await import(name)); break; } catch { /* tenta o próximo */ }
}
if (!chromium) throw new Error("Playwright não encontrado");
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const page = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
await page.goto("file://" + tmp);
await page.screenshot({ path: out });
await browser.close();
fs.unlinkSync(tmp);
