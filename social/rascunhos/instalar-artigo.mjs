// Instala um artigo de social/rascunhos nos 3 idiomas. Só roda se a foto já existir em public/images/blog.
// Uso (na raiz do repo): node social/rascunhos/instalar-artigo.mjs <chave> [--sem-foto]
import fs from "node:fs";
import { artigos as a1 } from "./artigos-novembro.mjs";
import { artigos as a2 } from "./artigos-novembro-2.mjs";

const todos = { ...a1, ...a2 };
const key = process.argv[2];
if (!key || !todos[key]) { console.error("Chaves:", Object.keys(todos).join(", ")); process.exit(1); }
const art = todos[key];
if (!process.argv.includes("--sem-foto") && !fs.existsSync("public" + art.image)) {
  console.error("Foto ausente: public" + art.image + " (não instalado)"); process.exit(2);
}

const [y, m, d] = art.iso.split("-").map(Number);
const meses = {
  pt: ["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"],
  es: ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],
  en: ["January","February","March","April","May","June","July","August","September","October","November","December"],
};
const data = {
  pt: `${d} de ${meses.pt[m - 1]} de ${y}`,
  es: `${d} de ${meses.es[m - 1]} de ${y}`,
  en: `${meses.en[m - 1]} ${d}, ${y}`,
};
const cats = {
  conto: { pt: "CONTOS", es: "CUENTOS", en: "STORIES" },
  conselho: { pt: "CONSELHO DA SEMANA", es: "CONSEJO SEMANAL", en: "TIP OF THE WEEK" },
};
const notice = {
  pt: { label: "CONTO FICTÍCIO", text: "Esta história é uma obra de ficção. Personagens e acontecimentos foram criados para esta publicação." },
  es: { label: "CUENTO FICTICIO", text: "Esta historia es una obra de ficción. Los personajes y los hechos han sido creados para esta publicación." },
  en: { label: "FICTIONAL STORY", text: "This story is a work of fiction. Characters and events were created for this publication." },
};

function entry(lang) {
  const t = art[lang];
  const o = { slug: art.slugs[lang], title: t.title };
  if (t.seoTitle) o.seoTitle = t.seoTitle;
  o.excerpt = t.excerpt;
  o.category = t.category ?? cats[art.kind][lang];
  o.series = art.series;
  if (art.kind === "conto") o.contentNotice = notice[lang];
  o.image = art.image;
  o.imageAlt = t.imageAlt;
  o.published = data[lang];
  o.publishedIso = art.iso;
  o.readTime = t.readTime;
  if (lang !== "pt") o.translationOf = art.slugs.pt;
  o.intro = t.intro;
  o.sections = t.sections;
  const j = (v) => JSON.stringify(v);
  const scal = Object.entries(o).filter(([k]) => k !== "intro" && k !== "sections").map(([k, v]) => `    ${k}: ${j(v)},`).join("\n");
  const secs = o.sections.map((s) => "      " + j(s)).join(",\n");
  return `  {\n${scal}\n    intro: ${j(o.intro)},\n    sections: [\n${secs},\n    ],\n  },\n`;
}

function insertBefore(file, marker, text, last = false) {
  let s = fs.readFileSync(file, "utf8");
  if (s.includes(`slug: ${JSON.stringify(text.match(/slug: "([^"]+)"/)[1])}`)) { console.log("já existe em", file); return; }
  const i = last ? s.lastIndexOf(marker) : s.indexOf(marker);
  if (i < 0) throw new Error("marcador não achado em " + file);
  s = s.slice(0, i) + text + s.slice(i);
  fs.writeFileSync(file, s);
  console.log("ok", file);
}

insertBefore("app/blog/posts.ts", "];\n\nexport function getPost", entry("pt"));
insertBefore("app/es/blog/parts/part-B.ts", "];", entry("es"), true);
insertBefore("app/en/blog/parts/part-F.ts", "];", entry("en"), true);

const tFile = "app/blog/translations.ts";
let ts = fs.readFileSync(tFile, "utf8");
if (!ts.includes(JSON.stringify(art.slugs.pt))) {
  const row = `  { pt: ${JSON.stringify(art.slugs.pt)}, es: ${JSON.stringify(art.slugs.es)}, en: ${JSON.stringify(art.slugs.en)} },\n`;
  ts = ts.replace("] as const;", row + "] as const;");
  fs.writeFileSync(tFile, ts);
  console.log("ok", tFile);
}
