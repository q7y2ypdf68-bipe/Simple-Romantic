// Gera carrosséis (1080x1350) e pins (1000x1500) da série "Chama acesa".
// Uso: node social/chama/gerar.mjs pasta-de-saida   (requer Playwright + Chromium)
import fs from "node:fs"; import path from "node:path"; import { fileURLToPath } from "node:url";
const dir = path.dirname(fileURLToPath(import.meta.url));
const out = process.argv[2] ?? path.join(dir, "saida"); fs.mkdirSync(out, { recursive: true });
const C = JSON.parse(fs.readFileSync(path.join(dir, "conteudo.json"), "utf8"));
const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
const css = (w, h) => `*{box-sizing:border-box;margin:0}body{width:${w}px;height:${h}px;font-family:Helvetica,Arial,sans-serif;color:#49243d;position:relative;overflow:hidden;background:linear-gradient(160deg,#ffe3ec 0%,#fff3d9 55%,#dff3f8 100%)}
.heart{position:absolute;color:#ffc9da;font-size:300px;right:-50px;top:-40px;transform:rotate(14deg)}
.brand{position:absolute;top:64px;left:72px;font:700 44px Georgia,serif}.brand i{color:#ed3f78;font-weight:400}
.k{display:inline-block;background:#ed3f78;color:#fff;border-radius:99px;padding:12px 28px;font-size:28px;font-weight:800;letter-spacing:3px}
h1{font:500 96px/1.04 Georgia,serif;letter-spacing:-2px}h1 em{color:#ed3f78}
h2{font:500 84px/1.08 Georgia,serif;letter-spacing:-1px}
p{font-size:44px;line-height:1.38;color:#6b3f59}
.foot{position:absolute;bottom:56px;left:72px;right:72px;display:flex;justify-content:space-between;font-size:28px;color:#6b3f59}.btn{background:#ed3f78;color:#fff;border-radius:99px;padding:20px 38px;font-weight:700}`;
const slide = (w, h, inner, foot) => `<!doctype html><meta charset="utf-8"><style>${css(w, h)}</style><body><div class="heart">♥</div><div class="brand">simple <i>&amp; romantic</i></div>${inner}${foot ?? ""}</body>`;
let chromium;
for (const n of ["playwright", "playwright-core", "/home/claude/.npm-global/lib/node_modules/@playwright/mcp/node_modules/playwright/index.mjs"]) { try { ({ chromium } = await import(n)); break; } catch {} }
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
async function shot(html, w, h, file) { const p = await browser.newPage({ viewport: { width: w, height: h } }); await p.setContent(html); await p.screenshot({ path: path.join(out, file) }); await p.close(); }
const W = 1080, H = 1350, box = "position:absolute;left:72px;right:72px;";
for (const [id, c] of Object.entries(C.carrosseis)) {
  const n = c.slides.length + 2;
  await shot(slide(W, H, `<div style="${box}top:300px"><span class="k">CHAMA ACESA</span><h1 style="margin-top:44px">${c.titulo}</h1><p style="margin-top:44px">Deslize →</p></div>`, `<div class="foot"><span>simpleandromantic.com</span><span>1/${n}</span></div>`), W, H, `carrossel-${id}-01.png`);
  for (let i = 0; i < c.slides.length; i++) { const s = c.slides[i];
    await shot(slide(W, H, `<div style="${box}top:290px"><span class="k">${esc(s.k)}</span><h2 style="margin-top:50px">${esc(s.t)}</h2><p style="margin-top:50px">${esc(s.s)}</p></div>`, `<div class="foot"><span>simpleandromantic.com</span><span>${i + 2}/${n}</span></div>`), W, H, `carrossel-${id}-${String(i + 2).padStart(2, "0")}.png`); }
  await shot(slide(W, H, `<div style="${box}top:320px"><span class="k">PARA GUARDAR</span><h2 style="margin-top:50px">${esc(c.cta.t)}</h2><p style="margin-top:50px">${esc(c.cta.s)}</p><div class="btn" style="display:inline-block;margin-top:70px;font-size:36px;padding:28px 50px">Artigo completo: link na bio →</div></div>`, `<div class="foot"><span>@simpleandromantic</span><span>${n}/${n}</span></div>`), W, H, `carrossel-${id}-${String(n).padStart(2, "0")}.png`);
}
for (const [lang, set] of Object.entries(C.pins)) for (const [id, [t, sub]] of Object.entries(set)) {
  await shot(slide(1000, 1500, `<div style="${box}top:330px"><span class="k">${lang === "en" ? "LIT UP" : lang === "es" ? "LLAMA ENCENDIDA" : "CHAMA ACESA"}</span><h1 style="margin-top:50px;font-size:92px">${esc(t)}</h1><p style="margin-top:50px">${esc(sub)}</p></div>`, `<div class="foot"><span>simpleandromantic.com</span><span class="btn">${C.cta[lang].replace("Link na bio", "Leia no site").replace("Enlace en la bio", "Léelo en la web").replace("Link in bio", "Read on the site")}</span></div>`), 1000, 1500, `pin-${lang}-${id}.png`);
}
await browser.close();
