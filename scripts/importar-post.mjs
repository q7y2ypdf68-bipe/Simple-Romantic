// Cadastra/atualiza um texto ainda não publicado no site, via /api/import.
// Uso: IMPORT_TOKEN=... node scripts/importar-post.mjs texto.json [--url https://...]
// texto.json: { titulo, resumo, categoria, serie, leitura, data, status, texto_arquivo, imagem_arquivo, imagem_alt, ... }
import { readFileSync } from "node:fs";
import { basename, dirname, resolve } from "node:path";

const [, , file, flag, urlArg] = process.argv;
const base = flag === "--url" ? urlArg : "https://simpleandromantic.com";
const token = process.env.IMPORT_TOKEN;
if (!file || !token) { console.error("Uso: IMPORT_TOKEN=... node scripts/importar-post.mjs texto.json [--url URL]"); process.exit(2); }

const spec = JSON.parse(readFileSync(file, "utf8"));
const dir = dirname(resolve(file));
const body = { ...spec };
if (spec.texto_arquivo) { body.texto = readFileSync(resolve(dir, spec.texto_arquivo), "utf8"); delete body.texto_arquivo; }
if (spec.imagem_arquivo) {
  const path = resolve(dir, spec.imagem_arquivo);
  body.imagem_base64 = readFileSync(path).toString("base64");
  body.imagem_nome = basename(path);
  body.imagem_tipo = { webp: "image/webp", jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png" }[path.split(".").pop().toLowerCase()];
  delete body.imagem_arquivo;
}
const res = await fetch(`${base}/api/import`, { method: "POST", headers: { authorization: `Bearer ${token}`, "content-type": "application/json" }, body: JSON.stringify(body) });
console.log(res.status, await res.text());
process.exit(res.ok ? 0 : 1);
