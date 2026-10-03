import type { BlogSection } from "./posts.ts";

const months = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];

export function lisbonToday(now = new Date()) {
  return new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Lisbon", year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
}

export function formatPortugueseDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day) return "";
  return `${day} de ${months[month - 1]} de ${year}`;
}

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/**
 * Texto simples do editor:
 *   parágrafos separados por linha em branco (abertura)
 *   "## Título" começa uma seção
 *   linhas com "- " viram lista
 */
export function parseBody(text: string): { intro: string[]; sections: BlogSection[] } {
  const lines = text.replace(/\r\n?/g, "\n").split("\n");
  const intro: string[] = [];
  const sections: BlogSection[] = [];
  let current: BlogSection | null = null;
  let buffer: string[] = [];
  let listOpen = false;

  const flush = () => {
    if (!buffer.length) return;
    const joined = buffer.join(" ").trim();
    buffer = [];
    if (!joined) return;
    if (!current) intro.push(joined);
    else if (current.items) (current.afterParagraphs ||= []).push(joined);
    else (current.paragraphs ||= []).push(joined);
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (line.startsWith("## ")) {
      flush();
      listOpen = false;
      current = { heading: line.slice(3).trim() };
      sections.push(current);
    } else if (line.startsWith("- ") && current) {
      flush();
      (current.items ||= []).push(line.slice(2).trim());
      listOpen = true;
    } else if (!line) {
      flush();
      listOpen = false;
    } else {
      if (listOpen) {
        // linha solta logo após uma lista continua o último item
        const items = current?.items;
        if (items?.length) {
          items[items.length - 1] += ` ${line}`;
          continue;
        }
      }
      buffer.push(line);
    }
  }
  flush();
  return { intro, sections };
}

export function serializeBody(intro: string[], sections: BlogSection[]) {
  const parts: string[] = [...intro];
  for (const section of sections) {
    const block = [`## ${section.heading}`];
    for (const paragraph of section.paragraphs || []) block.push("", paragraph);
    if (section.items?.length) block.push("", ...section.items.map((item) => `- ${item}`));
    for (const paragraph of section.afterParagraphs || []) block.push("", paragraph);
    parts.push(block.join("\n"));
  }
  return parts.join("\n\n");
}
