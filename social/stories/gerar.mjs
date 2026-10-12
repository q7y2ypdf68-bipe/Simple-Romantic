// Gera a arte de um STORY (1080x1920) do dia. Uso: node social/stories/gerar.mjs <id> [pasta-de-saida]
// Os textos ficam em social/stories/conteudo.json (chave = id). Requer Playwright + Chromium (CHROMIUM_PATH se preciso).
// Regras: um Story por dia, específico do dia ("hoje"), publicado ao meio-dia de Lisboa (11h a partir de 25/10).
// Nada com cara de botão: o link de verdade é a figurinha do Instagram/Facebook, nunca um desenho na imagem.
// Zonas seguras: os ~250 px de cima e os ~340 px de baixo ficam cobertos pela interface do Story.
import fs from "node:fs"; import path from "node:path"; import { fileURLToPath } from "node:url";
const dir = path.dirname(fileURLToPath(import.meta.url));
const [id, outArg] = process.argv.slice(2);
if (!id) throw new Error("Informe o id do story (veja conteudo.json)");
const out = outArg ?? path.join(dir, "saida"); fs.mkdirSync(out, { recursive: true });
const C = JSON.parse(fs.readFileSync(path.join(dir, "conteudo.json"), "utf8"))[id];
if (!C) throw new Error(`Story "${id}" não existe em conteudo.json`);
const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
const rich = (s) => esc(s).replace(/&lt;em&gt;/g, "<em>").replace(/&lt;\/em&gt;/g, "</em>");
const W = 1080, H = 1920;
const html = `<!doctype html><meta charset="utf-8"><style>*{box-sizing:border-box;margin:0}body{width:${W}px;height:${H}px;font-family:Helvetica,Arial,sans-serif;color:#49243d;position:relative;overflow:hidden;background:linear-gradient(160deg,#ffe3ec 0%,#fff3d9 55%,#dff3f8 100%)}
.heart{position:absolute;color:#ffc9da;font-size:380px;right:-60px;top:130px;transform:rotate(14deg)}
.brand{position:absolute;top:270px;left:80px;font:700 48px Georgia,serif}.brand i{color:#ed3f78;font-weight:400}
.box{position:absolute;left:80px;right:80px;top:420px;bottom:420px;display:flex;flex-direction:column;justify-content:center;align-items:flex-start}
.k{display:inline-block;background:#ed3f78;color:#fff;border-radius:99px;padding:14px 32px;font-size:30px;font-weight:800;letter-spacing:3px}
h1{font:500 108px/1.1 Georgia,serif;letter-spacing:-2px;margin-top:56px}h1 em{color:#ed3f78}
p{font-size:52px;line-height:1.38;color:#6b3f59;margin-top:56px}
.foot{position:absolute;bottom:360px;left:80px;right:80px;font-size:32px;line-height:1.5;color:#6b3f59;white-space:pre-line}</style><body><div class="heart">♥</div><div class="brand">simple <i>&amp; romantic</i></div><div class="box"><span class="k">${esc(C.kicker)}</span><h1>${rich(C.titulo)}</h1><p>${esc(C.sub)}</p></div><div class="foot">${esc(C.rodape)}</div></body>`;
let chromium;
for (const n of ["playwright", "playwright-core", "/home/claude/.npm-global/lib/node_modules/@playwright/mcp/node_modules/playwright/index.mjs"]) { try { ({ chromium } = await import(n)); break; } catch { /* tenta o próximo */ } }
if (!chromium) throw new Error("Playwright não encontrado");
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const p = await browser.newPage({ viewport: { width: W, height: H } }); await p.setContent(html); await p.screenshot({ path: path.join(out, `${id}.png`) }); await p.close(); await browser.close();
console.log(`Story gerado em ${out}/${id}.png`);
