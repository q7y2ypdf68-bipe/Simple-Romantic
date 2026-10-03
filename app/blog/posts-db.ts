import { asc, desc, eq } from "drizzle-orm";
import { blogPosts as staticPosts, type BlogPost, type BlogSection } from "./posts";
import { lisbonToday } from "./post-format";

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
