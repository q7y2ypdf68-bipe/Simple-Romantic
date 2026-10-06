import { asc, desc, eq } from "drizzle-orm";
import { blogPosts as staticPosts, type BlogPost, type BlogSection } from "./posts";
import { lisbonToday } from "./post-format";
import { articleTranslations, articleAlternates } from "./translations";
import { blogPostsEs } from "../es/blog/posts-es";
import { blogPostsEn } from "../en/blog/posts-en";

type Row = typeof import("../../db/schema").blogPosts.$inferSelect;

function parseJson<T>(value: string | null, fallback: T): T {
  try {
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function rowToPost(row: Row): BlogPost {
  return {
    slug: row.slug,
    title: row.title,
    seoTitle: row.seoTitle || undefined,
    excerpt: row.excerpt,
    category: row.category,
    series: (row.series as BlogPost["series"]) || undefined,
    image: row.image,
    imageAlt: row.imageAlt,
    published: row.published,
    publishedIso: row.publishedIso || undefined,
    translationOf: row.translationOf || undefined,
    readTime: row.readTime,
    intro: parseJson<string[]>(row.intro, []),
    sections: parseJson<BlogSection[]>(row.sections, []),
    contentNotice: row.contentNoticeLabel
      ? { label: row.contentNoticeLabel as NonNullable<BlogPost["contentNotice"]>["label"], text: row.contentNoticeText || "" }
      : undefined,
  };
}

export async function listAllDbRows(): Promise<Row[]> {
  const [{ getDb }, { blogPosts }] = await Promise.all([import("../../db"), import("../../db/schema")]);
  return getDb().select().from(blogPosts).orderBy(desc(blogPosts.publishedIso), asc(blogPosts.id));
}

/** Posts criados no painel e já liberados (status publicado + data de hoje ou anterior, hora de Lisboa). */
async function loadLiveDbPosts(today: string): Promise<BlogPost[]> {
  try {
    const rows = await listAllDbRows();
    const staticSlugs = new Set(staticPosts.map((post) => post.slug));
    return rows
      .filter((row) => row.language === "pt-BR" && row.status === "published" && !staticSlugs.has(row.slug))
      .filter((row) => !!row.publishedIso && row.publishedIso <= today)
      .map(rowToPost);
  } catch {
    // Sem banco (ex.: pré-visualização local): o site segue só com os posts fixos.
    return [];
  }
}

function sortNewestFirst(posts: BlogPost[]) {
  return [...posts].sort((a, b) => (b.publishedIso || "").localeCompare(a.publishedIso || ""));
}

/** Lista pública: posts fixos já liberados + posts do painel já liberados. */
export async function getVisiblePosts(now = new Date()): Promise<BlogPost[]> {
  const today = lisbonToday(now);
  const fixed = staticPosts.filter((post) => !post.publishedIso || post.publishedIso <= today);
  return sortNewestFirst([...fixed, ...(await loadLiveDbPosts(today))]);
}

/** Um post pelo endereço. Posts do painel só aparecem depois da data marcada. */
export async function getPostBySlug(slug: string, now = new Date()): Promise<BlogPost | undefined> {
  const fixed = staticPosts.find((post) => post.slug === slug);
  if (fixed) return fixed;
  const live = await loadLiveDbPosts(lisbonToday(now));
  return live.find((post) => post.slug === slug);
}

export async function getDbRowById(id: number): Promise<Row | undefined> {
  const [{ getDb }, { blogPosts }] = await Promise.all([import("../../db"), import("../../db/schema")]);
  const [row] = await getDb().select().from(blogPosts).where(eq(blogPosts.id, id)).limit(1);
  return row;
}

// ---------- Traduções (espanhol e inglês) ----------
export type TranslationLang = "es" | "en";
const staticByLang = { es: blogPostsEs, en: blogPostsEn } as const;

/** Artigos traduzidos: os fixos no código + os salvos no banco (language "es" ou "en"). */
export async function getVisiblePostsLang(lang: TranslationLang, now = new Date()): Promise<BlogPost[]> {
  const today = lisbonToday(now);
  const fixed = staticByLang[lang].filter((post) => !post.publishedIso || post.publishedIso <= today);
  let live: BlogPost[] = [];
  try {
    const rows = await listAllDbRows();
    const staticSlugs = new Set(staticByLang[lang].map((post) => post.slug));
    live = rows
      .filter((row) => row.language === lang && row.status === "published" && !staticSlugs.has(row.slug))
      .filter((row) => !!row.publishedIso && row.publishedIso <= today)
      .map(rowToPost);
  } catch {
    live = [];
  }
  return sortNewestFirst([...fixed, ...live]);
}

export async function getPostLang(lang: TranslationLang, slug: string, now = new Date()): Promise<BlogPost | undefined> {
  return (await getVisiblePostsLang(lang, now)).find((post) => post.slug === slug);
}

/** hreflang de um artigo nos 3 idiomas, olhando os mapas fixos e o banco. */
export async function articleAlternatesDb(lang: "pt" | TranslationLang, slug: string): Promise<Record<string, string>> {
  let ptSlug: string | undefined = lang === "pt" ? slug : articleTranslations.find((row) => row[lang] === slug)?.pt;
  let rows: Row[] = [];
  try { rows = await listAllDbRows(); } catch { rows = []; }
  if (!ptSlug) ptSlug = rows.find((row) => row.slug === slug)?.translationOf || undefined;
  if (!ptSlug) return articleAlternates(lang, slug);
  const fixed = articleTranslations.find((row) => row.pt === ptSlug);
  const find = (l: TranslationLang) => fixed?.[l] ?? rows.find((row) => row.language === l && row.translationOf === ptSlug && row.status === "published")?.slug;
  const out: Record<string, string> = { "pt-BR": `/blog/${ptSlug}` };
  const es = find("es"), en = find("en");
  if (es) out["es-ES"] = `/es/blog/${es}`;
  if (en) out["en"] = `/en/blog/${en}`;
  out["x-default"] = `/blog/${ptSlug}`;
  return out;
}
