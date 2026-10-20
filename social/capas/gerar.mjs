// Gera capas "foto + faixa roxa" (regra de pins de 20/10): pin 1000x1500 e capa de feed 1080x1350.
// Uso: CHROMIUM_PATH=/opt/pw-browsers/chromium node social/capas/gerar.mjs <itens.json> <pasta-de-saida>
// itens.json: [{ "id":"outono", "foto":"social/banco-imagens/novas/004_....jpg", "pos":"50% 20%", "kicker":"IDEIAS PARA CASAIS", "titulo":"Outono a dois: 10 ideias <em>simples</em>", "tipos":["pin","feed"] }]
import fs from "node:fs"; import path from "node:path";
const [spec, out] = process.argv.slice(2); fs.mkdirSync(out, { recursive: true });
const items = JSON.parse(fs.readFileSync(spec, "utf8"));
let chromium;
for (const n of ["playwright", "playwright-core", "/home/claude/.npm-global/lib/node_modules/@playwright/mcp/node_modules/playwright/index.mjs"]) { try { ({ chromium } = await import(n)); break; } catch {} }
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c])).replace(/&lt;em&gt;/g, "<em>").replace(/&lt;\/em&gt;/g, "</em>");
const html = (it, W, H, ph, fs1, pill) => {
  const b64 = fs.readFileSync(it.foto).toString("base64");
  return `<!doctype html><meta charset=utf-8><style>*{margin:0;box-sizing:border-box}body{width:${W}px;height:${H}px;background:#3d2340;position:relative;font-family:DejaVu Serif,Georgia,serif;overflow:hidden}
.ph{height:${ph}px;background:url(data:image/jpeg;base64,${b64}) ${it.pos ?? "50% 25%"}/cover;border-bottom:8px solid #ed3f78}
.pill{position:absolute;left:${W * 0.06}px;top:${ph + H * 0.045}px;background:#ed3f78;color:#fff;border-radius:99px;padding:${pill * 0.3}px ${pill * 0.75}px;font:800 ${pill}px DejaVu Sans,Helvetica,sans-serif;letter-spacing:2px}
h1{position:absolute;left:${W * 0.06}px;right:${W * 0.06}px;top:${ph + H * 0.045 + pill * 2.2}px;color:#fff;font:700 ${fs1}px/1.14 DejaVu Serif,Georgia,serif}h1 em{color:#ff9ec1;font-style:italic}
.b{position:absolute;left:${W * 0.06}px;bottom:${H * 0.03}px;color:#f3c6d6;font:700 ${pill * 0.8}px DejaVu Sans,Helvetica,sans-serif;letter-spacing:3px}</style>
<body><div class=ph></div><div class=pill>${esc(it.kicker)}</div><h1>${esc(it.titulo)}</h1><div class=b>SIMPLE &amp; ROMANTIC</div></body>`;
};
for (const it of items) for (const t of it.tipos ?? ["pin", "feed"]) {
  const [W, H, ph, f, pill] = t === "pin" ? [1000, 1500, 860, 68, 28] : [1080, 1350, 760, 70, 28];
  const p = await browser.newPage({ viewport: { width: W, height: H } });
  await p.setContent(html(it, W, H, ph, f, pill)); await p.screenshot({ path: path.join(out, `${it.id}-${t}.png`) }); await p.close();
}
await browser.close();
