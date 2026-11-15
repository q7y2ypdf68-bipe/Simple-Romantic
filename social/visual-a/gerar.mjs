// Visual A "Editorial" (aprovado pelo Bruno em 15/11/2026): foto de cima a baixo + título por cima.
// Uso: node social/visual-a/gerar.mjs <itens.json> <pasta-de-saida>
// itens.json: [{ id, foto, pos?, kicker, titulo (use <em> e <b>30</b> para número), formatos?: ["feed","pin","reel"],
//   slides?: [{k,t,s,lista?}], cta?: {k,t,s,botao} }]
// Saída: <id>-01.png (capa feed 1080x1350), <id>-02.. (slides), <id>-pin.png (1000x1500), <id>-reel.png (1080x1920).
import fs from "node:fs"; import path from "node:path"; import { fileURLToPath } from "node:url"; import { createRequire } from "node:module";
const dir = path.dirname(fileURLToPath(import.meta.url));
let chromium; for (const n of ["playwright", "/opt/npm-tools/node_modules/playwright"]) { try { ({ chromium } = createRequire(import.meta.url)(n)); break; } catch {} }
const b64 = (f) => fs.readFileSync(f).toString("base64");
const face = (fam, w, st, f, fmt) => `@font-face{font-family:'${fam}';font-weight:${w};font-style:${st};src:url(data:font/${fmt};base64,${b64(path.join(dir, "fonts", f))}) format('${fmt === "otf" ? "opentype" : fmt}')}`;
const fonts = [face("Fr", 400, "italic", "fraunces-latin-400-italic.woff2", "woff2"), face("Fr", 600, "normal", "fraunces-latin-600-normal.woff2", "woff2"), face("Fr", 600, "italic", "fraunces-latin-600-italic.woff2", "woff2"), face("Fr", 700, "normal", "fraunces-latin-700-normal.woff2", "woff2"), face("Fr", 700, "italic", "fraunces-latin-700-italic.woff2", "woff2"), face("In", 500, "normal", "Inter-Medium.otf", "otf"), face("In", 600, "normal", "Inter-SemiBold.otf", "otf")].join("");
const css = (W, H) => `${fonts}*{margin:0;box-sizing:border-box}body{width:${W}px;height:${H}px;position:relative;overflow:hidden;background:#1c1020;color:#fff}
.ph{position:absolute;inset:0;background-size:cover}
.k{font:600 ${W * .027}px In,sans-serif;letter-spacing:.2em;text-transform:uppercase;margin-bottom:${W * .028}px}
.k:before{content:"";display:inline-block;width:${W * .05}px;height:3px;background:#ff8fb3;vertical-align:middle;margin-right:${W * .02}px}
h1 em,h2 em{font-style:italic;font-weight:600;color:#ffb3cb}h1 b,h2 b{font-weight:700;color:#ffb3cb;font-size:1.45em;line-height:.8;letter-spacing:-.03em}
.b{position:absolute;left:${W * .07}px;right:${W * .07}px;bottom:${H * .038}px;display:flex;justify-content:space-between;opacity:.85;font:500 ${W * .023}px In,sans-serif;letter-spacing:.08em}`;
const foot = (r) => `<div class=b><span>Simple &amp; Romantic</span><span>${r}</span></div>`;
const capa = (it, W, H, r = "simpleandromantic.com", safe = 0) => `<!doctype html><meta charset=utf-8><style>${css(W, H)}
.ph{background-image:url(data:image/jpeg;base64,${b64(it.foto)});background-position:${it.pos ?? "50% 25%"}}
.g{position:absolute;inset:0;background:linear-gradient(180deg,rgba(28,16,32,.18) 0%,rgba(28,16,32,0) 22%,rgba(28,16,32,0) 40%,rgba(28,16,32,.62) 63%,rgba(28,16,32,.95) 100%)}
.t{position:absolute;left:${W * .07}px;right:${W * .07}px;bottom:${H * (.1 + safe)}px}
h1{font:700 ${W * (it.fs ?? .098)}px/1.03 Fr,serif;letter-spacing:-.02em;text-shadow:0 2px 24px rgba(0,0,0,.35)}
</style><body><div class=ph></div><div class=g></div><div class=t><div class=k>${it.kicker}</div><h1>${it.titulo}</h1></div>${safe ? "" : foot(r)}</body>`;
const slide = (it, s, W, H, n, N) => `<!doctype html><meta charset=utf-8><style>${css(W, H)}
.ph{background-image:url(data:image/jpeg;base64,${b64(it.foto)});background-position:${it.pos ?? "50% 25%"};filter:blur(${W * .012}px) saturate(1.05);transform:scale(1.08)}
.g{position:absolute;inset:0;background:linear-gradient(180deg,rgba(28,16,32,.58),rgba(28,16,32,.74))}
.t{position:absolute;left:${W * .08}px;right:${W * .08}px;top:50%;transform:translateY(-52%)}
h2{text-shadow:0 2px 20px rgba(0,0,0,.4);font:700 ${W * .088}px/1.06 Fr,serif;letter-spacing:-.02em}
p{margin-top:${W * .045}px;font:500 ${W * .046}px/1.42 In,sans-serif;color:#fff;text-shadow:0 1px 12px rgba(0,0,0,.45)}
ol{margin-top:${W * .04}px;padding:0;list-style:none;counter-reset:i}ol li{counter-increment:i;position:relative;padding-left:${W * .075}px;margin-top:${W * .028}px;font:500 ${W * .042}px/1.38 In,sans-serif;color:#fff;text-shadow:0 1px 12px rgba(0,0,0,.45)}
ol li:before{content:counter(i);position:absolute;left:0;top:-.08em;font:700 italic ${W * .05}px Fr,serif;color:#ffb3cb}
.bt{display:inline-block;margin-top:${W * .06}px;background:#fff;color:#2b1630;border-radius:99px;padding:${W * .022}px ${W * .05}px;font:600 ${W * .034}px In,sans-serif;letter-spacing:.04em}
</style><body><div class=ph></div><div class=g></div><div class=t><div class=k>${s.k}</div><h2>${s.t}</h2>${s.s ? `<p>${s.s}</p>` : ""}${s.lista ? `<ol>${s.lista.map((x) => `<li>${x}</li>`).join("")}</ol>` : ""}${s.botao ? `<div class=bt>${s.botao} →</div>` : ""}</div>${foot(`${n}/${N}`)}</body>`;
const [spec, out] = process.argv.slice(2); fs.mkdirSync(out, { recursive: true });
const br = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const shot = async (html, W, H, f) => { const p = await br.newPage({ viewport: { width: W, height: H } }); await p.setContent(html); await p.waitForTimeout(120); await p.screenshot({ path: path.join(out, f) }); await p.close(); };
for (const it of JSON.parse(fs.readFileSync(spec, "utf8"))) {
  const fm = it.formatos ?? ["feed"]; const sl = [...(it.slides ?? []), ...(it.cta ? [it.cta] : [])]; const N = sl.length + 1;
  if (fm.includes("feed")) { await shot(capa(it, 1080, 1350, N > 1 ? `1/${N}` : undefined), 1080, 1350, `${it.id}-01.png`); for (const [i, s] of sl.entries()) await shot(slide(it, s, 1080, 1350, i + 2, N), 1080, 1350, `${it.id}-${String(i + 2).padStart(2, "0")}.png`); }
  if (fm.includes("feed") && N > 1) await shot(capa(it, 1080, 1350), 1080, 1350, `${it.id}-fb.png`);
  if (fm.includes("pin")) await shot(capa({ ...it, titulo: it.tituloPin ?? it.titulo }, 1000, 1500), 1000, 1500, `${it.id}-pin.png`);
  if (fm.includes("reel")) await shot(capa(it, 1080, 1920, undefined, .14), 1080, 1920, `${it.id}-reel.png`);
}
await br.close();
