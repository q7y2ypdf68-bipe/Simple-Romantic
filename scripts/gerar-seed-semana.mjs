// Gera scripts/seed-semana-out-2026.sql com os 3 textos da semana (como RASCUNHO, sem imagem).
// Uso: node scripts/gerar-seed-semana.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));

function parseBody(text) {
  const intro = [], sections = [];
  let current = null, buffer = [];
  const flush = () => {
    if (!buffer.length) return;
    const joined = buffer.join(" ").trim(); buffer = [];
    if (!current) intro.push(joined);
    else if (current.items) (current.afterParagraphs ||= []).push(joined);
    else (current.paragraphs ||= []).push(joined);
  };
  for (const raw of text.replace(/\r\n?/g, "\n").split("\n")) {
    const line = raw.trim();
    if (line.startsWith("## ")) { flush(); current = { heading: line.slice(3).trim() }; sections.push(current); }
    else if (line.startsWith("- ") && current) { flush(); (current.items ||= []).push(line.slice(2).trim()); }
    else if (!line) flush();
    else buffer.push(line);
  }
  flush();
  return { intro, sections };
}

const posts = [
  { file: "conto.txt", slug: "conto-o-bilhete-na-lista-de-compras", title: "O bilhete na lista de compras", seo: null, excerpt: "Um conto sobre um casal de longa data, uma lista de compras e o bilhete que lembrou os dois de que ainda sabem se surpreender.", category: "CONTOS", series: "CONTOS", read: "4 min de leitura", iso: "2026-10-04", published: "4 de outubro de 2026", alt: "Lista de compras presa na porta da geladeira com um ímã de abacaxi e um bilhete escrito à mão", label: "CONTO FICTÍCIO", notice: "Esta história é uma obra de ficção. Personagens e acontecimentos foram criados para esta publicação." },
  { file: "conselho.txt", slug: "conselho-da-semana-peca-o-que-voce-precisa", title: "Conselho da semana: peça o que você precisa antes de esperar que adivinhem", seo: "Como pedir o que você precisa ao seu par", excerpt: "Uma prática curta para trocar a expectativa silenciosa por um pedido claro e gentil, sem cobrança nem drama.", category: "CONSELHO DA SEMANA", series: "CONSELHO DA SEMANA", read: "4 min de leitura", iso: "2026-10-06", published: "6 de outubro de 2026", alt: "Casal adulto conversando com calma à mesa da cozinha", label: null, notice: null },
  { file: "ideias.txt", slug: "tarde-de-domingo-a-dois-10-ideias", title: "Tarde de domingo a dois: 10 ideias simples para fechar a semana juntos", seo: "10 ideias de tarde de domingo para casais", excerpt: "Dez ideias simples e baratas para transformar a tarde de domingo num encontro de verdade, sem pressão e sem estourar o orçamento.", category: "IDEIAS PARA CASAIS", series: "IDEIAS E GUIAS", read: "6 min de leitura", iso: "2026-10-08", published: "8 de outubro de 2026", alt: "Casal adulto compartilhando um lanche no sofá numa tarde de domingo", label: null, notice: null },
];

const q = (v) => (v === null ? "NULL" : `'${String(v).replace(/'/g, "''")}'`);
const now = new Date().toISOString();
const out = ["-- Gerado por scripts/gerar-seed-semana.mjs. Entram como RASCUNHO e sem imagem."];
for (const p of posts) {
  const { intro, sections } = parseBody(readFileSync(join(dir, "seed", p.file), "utf8"));
  out.push(`INSERT OR IGNORE INTO blog_posts (slug, language, title, seo_title, excerpt, category, series, image, image_alt, published, published_iso, read_time, intro, sections, content_notice_label, content_notice_text, status, created_at) VALUES (${[
    q(p.slug), q("pt-BR"), q(p.title), q(p.seo), q(p.excerpt), q(p.category), q(p.series), q(""), q(p.alt), q(p.published), q(p.iso), q(p.read),
    q(JSON.stringify(intro)), q(JSON.stringify(sections)), q(p.label), q(p.notice), q("draft"), q(now),
  ].join(", ")});`);
}
writeFileSync(join(dir, "seed-semana-out-2026.sql"), out.join("\n") + "\n");
console.log("ok");
