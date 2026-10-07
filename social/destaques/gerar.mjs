// Gera a arte dos DESTAQUES de sábado (carrossel 1080x1350 + imagem do Facebook + pin 1000x1500).
// Uso: node social/destaques/gerar.mjs <id> [pasta-de-saida]      ex.: node social/destaques/gerar.mjs horoscopo-1 saida
// Os textos ficam em social/destaques/conteudo.json (chave = id). Requer Playwright + Chromium (CHROMIUM_PATH se preciso).
// Saídas: <id>-01.png ... <id>-NN.png (Instagram), <id>-facebook.png (= capa), <id>-pin.png (1000x1500).
import fs from "node:fs"; import path from "node:path"; import { fileURLToPath } from "node:url";
const dir = path.dirname(fileURLToPath(import.meta.url));
const [id, outArg] = process.argv.slice(2);
if (!id) throw new Error("Informe o id do destaque (veja conteudo.json)");
const out = outArg ?? path.join(dir, "saida"); fs.mkdirSync(out, { recursive: true });
const C = JSON.parse(fs.readFileSync(path.join(dir, "conteudo.json"), "utf8"))[id];
if (!C) throw new Error(`Destaque "${id}" não existe em conteudo.json`);
const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
const rich = (s) => esc(s).replace(/&lt;em&gt;/g, "<em>").replace(/&lt;\/em&gt;/g, "</em>");
const css = (w, h) => `*{box-sizing:border-box;margin:0}body{width:${w}px;height:${h}px;font-family:Helvetica,Arial,sans-serif;color:#49243d;position:relative;overflow:hidden;background:linear-gradient(160deg,#ffe3ec 0%,#fff3d9 55%,#dff3f8 100%)}
.heart{position:absolute;color:#ffc9da;font-size:300px;right:-50px;top:-40px;transform:rotate(14deg)}
.brand{position:absolute;top:64px;left:72px;font:700 44px Georgia,serif}.brand i{color:#ed3f78;font-weight:400}
.k{display:inline-block;background:#ed3f78;color:#fff;border-radius:99px;padding:12px 28px;font-size:28px;font-weight:800;letter-spacing:3px}
h1{font:500 96px/1.08 Georgia,serif;letter-spacing:-2px}h1 em{color:#ed3f78}
h2{font:500 94px/1.1 Georgia,serif;letter-spacing:-1px}h2 em{color:#ed3f78}
p{font-size:50px;line-height:1.36;color:#6b3f59}
ol{padding-left:52px;font-size:46px;line-height:1.4;color:#6b3f59}ol li{margin-top:18px}
.chips{display:flex;gap:14px;flex-wrap:wrap;margin-top:40px}.chip{border:3px solid #f3c6d6;border-radius:99px;padding:14px 30px;font-size:30px;font-weight:700;background:#fff}
.foot{position:absolute;bottom:56px;left:72px;right:72px;display:flex;justify-content:space-between;align-items:center;font-size:28px;color:#6b3f59}.btn{background:#ed3f78;color:#fff;border-radius:99px;padding:20px 38px;font-weight:700}`;
const slide = (w, h, inner, foot) => `<!doctype html><meta charset="utf-8"><style>${css(w, h)}</style><body><div class="heart">♥</div><div class="brand">simple <i>&amp; romantic</i></div>${inner}${foot ?? ""}</body>`;
let chromium;
for (const n of ["playwright", "playwright-core", "/home/claude/.npm-global/lib/node_modules/@playwright/mcp/node_modules/playwright/index.mjs"]) { try { ({ chromium } = await import(n)); break; } catch { /* tenta o próximo */ } }
if (!chromium) throw new Error("Playwright não encontrado");
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
async function shot(html, w, h, file) { const p = await browser.newPage({ viewport: { width: w, height: h } }); await p.setContent(html); await p.screenshot({ path: path.join(out, file) }); await p.close(); }
const W = 1080, H = 1350, box = "position:absolute;left:72px;right:72px;top:190px;bottom:170px;display:flex;flex-direction:column;justify-content:center;align-items:flex-start;";
const n = C.slides.length + 2, pad = (i) => String(i).padStart(2, "0");
const cover = (w, h, foot) => slide(w, h, `<div style="${box}"><span class="k">${esc(C.kicker)}</span><h1 style="margin-top:44px">${rich(C.titulo)}</h1>${C.chips ? `<div class="chips">${C.chips.map((c) => `<span class="chip">${esc(c)}</span>`).join("")}</div>` : ""}<p style="margin-top:44px">${esc(C.sub)}</p></div>`, foot);
await shot(cover(W, H, `<div class="foot"><span>simpleandromantic.com</span><span>1/${n}</span></div>`), W, H, `${id}-01.png`);
await shot(cover(W, H, `<div class="foot"><span>${esc(C.rodapeFacebook ?? "simpleandromantic.com")}</span><span class="btn">${esc(C.botaoFacebook ?? "Veja no site →")}</span></div>`), W, H, `${id}-facebook.png`);
for (let i = 0; i < C.slides.length; i++) {
  const s = C.slides[i];
  const body = s.lista ? `<ol>${s.lista.map((x) => `<li>${esc(x)}</li>`).join("")}</ol>` : "";
  await shot(slide(W, H, `<div style="${box}"><span class="k">${esc(s.k)}</span><h2 style="margin-top:46px">${rich(s.t)}</h2>${s.s ? `<p style="margin-top:40px">${esc(s.s)}</p>` : ""}${body}</div>`, `<div class="foot"><span>simpleandromantic.com</span><span>${i + 2}/${n}</span></div>`), W, H, `${id}-${pad(i + 2)}.png`);
}
await shot(slide(W, H, `<div style="${box}"><span class="k">${esc(C.cta.k)}</span><h2 style="margin-top:50px">${rich(C.cta.t)}</h2><p style="margin-top:50px">${esc(C.cta.s)}</p><div class="btn" style="display:inline-block;margin-top:70px;font-size:36px;padding:28px 50px">${esc(C.cta.botao)}</div></div>`, `<div class="foot"><span>@simpleandromantic</span><span>${n}/${n}</span></div>`), W, H, `${id}-${pad(n)}.png`);
await shot(cover(1000, 1500, `<div class="foot"><span>simpleandromantic.com</span><span class="btn">${esc(C.botaoPin ?? "Veja no site")}</span></div>`), 1000, 1500, `${id}-pin.png`);
await browser.close();
console.log(`Arte gerada em ${out}: ${n} telas + facebook + pin`);
