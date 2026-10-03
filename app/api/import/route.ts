import { and, eq, gt, sql } from "drizzle-orm";
import { env } from "cloudflare:workers";
import { formatPortugueseDate, lisbonToday, parseBody, slugify } from "../../blog/post-format";
import { getDb } from "../../../db";
import { adminLoginAttempts, blogImages, blogPosts } from "../../../db/schema";

/**
 * Cadastro automático de textos da semana.
 * Só CRIA ou ALTERA textos que ainda não estão no ar (rascunho ou com data futura).
 * Não lê, não apaga e não mexe em nada publicado. Exige IMPORT_TOKEN.
 */
const MAX_IMAGE_BYTES = 1_400_000;
const IMAGE_TYPES = new Set(["image/webp", "image/jpeg", "image/png"]);
const SERIES = new Set(["CONSELHO DA SEMANA", "IDEIAS E GUIAS", "CONTOS"]);
const NOTICE_LABELS = new Set(["CONTO FICTÍCIO", "INSPIRADO EM FATOS", "HISTÓRIA REAL"]);
const encoder = new TextEncoder();

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" } });
}

async function hmac(value: string) {
  const key = await crypto.subtle.importKey("raw", encoder.encode("import-check"), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(value)));
}

async function tokenMatches(candidate: string) {
  const expected = (env as unknown as Record<string, unknown>)?.IMPORT_TOKEN;
  if (typeof expected !== "string" || expected.length < 24) return false;
  const [a, b] = await Promise.all([hmac(candidate), hmac(expected)]);
  let diff = 0;
  for (let index = 0; index < a.length; index += 1) diff |= a[index] ^ b[index];
  return diff === 0;
}

function str(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  const db = getDb();
  const ip = request.headers.get("cf-connecting-ip") || "desconhecido";
  const since = new Date(Date.now() - 15 * 60_000).toISOString();
  const [{ count }] = await db.select({ count: sql<number>`count(*)` }).from(adminLoginAttempts)
    .where(and(eq(adminLoginAttempts.ip, `import:${ip}`), gt(adminLoginAttempts.createdAt, since)));
  if (count >= 10) return json({ erro: "muitas tentativas" }, 429);

  const bearer = (request.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  if (!bearer || !(await tokenMatches(bearer))) {
    await db.insert(adminLoginAttempts).values({ ip: `import:${ip}`, createdAt: new Date().toISOString() });
    return json({ erro: "não autorizado" }, 401);
  }

  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return json({ erro: "JSON inválido" }, 400);
  }

  const title = str(data.titulo);
  const excerpt = str(data.resumo);
  const category = str(data.categoria);
  const date = str(data.data);
  const slug = slugify(str(data.slug) || title);
  const status = str(data.status) === "rascunho" ? "draft" : "published";
  if (!title || !excerpt || !category || !slug) return json({ erro: "faltam campos: titulo, resumo, categoria" }, 400);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return json({ erro: "data inválida (AAAA-MM-DD)" }, 400);
  if (date < lisbonToday()) return json({ erro: "a data não pode estar no passado" }, 400);

  const { intro, sections } = parseBody(String(data.texto ?? ""));
  if (!intro.length && !sections.length) return json({ erro: "texto vazio" }, 400);

  const [existing] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
  if (existing && existing.status === "published" && existing.publishedIso && existing.publishedIso <= lisbonToday()) {
    return json({ erro: "este texto já está no ar; altere pelo painel" }, 409);
  }

  const now = new Date().toISOString();
  let image = existing?.image || "";
  const imageBase64 = str(data.imagem_base64);
  if (imageBase64) {
    const contentType = str(data.imagem_tipo);
    if (!IMAGE_TYPES.has(contentType)) return json({ erro: "imagem precisa ser webp, jpeg ou png" }, 400);
    if (imageBase64.length > MAX_IMAGE_BYTES * 1.37) return json({ erro: "imagem acima de 1,4 MB" }, 413);
    const imageId = crypto.randomUUID();
    await db.insert(blogImages).values({ id: imageId, contentType, data: imageBase64, filename: str(data.imagem_nome).slice(0, 120) || null, createdAt: now });
    image = `/media/${imageId}`;
  }
  if (status === "published" && !image) return json({ erro: "para programar é preciso enviar a imagem (ou use status rascunho)" }, 400);

  const series = str(data.serie);
  const label = str(data.aviso_rotulo);
  const values = {
    slug,
    language: "pt-BR",
    title,
    seoTitle: str(data.seo) || null,
    excerpt,
    category,
    series: SERIES.has(series) ? series : null,
    image,
    imageAlt: str(data.imagem_alt),
    published: formatPortugueseDate(date),
    publishedIso: date,
    readTime: str(data.leitura),
    intro: JSON.stringify(intro),
    sections: JSON.stringify(sections),
    contentNoticeLabel: NOTICE_LABELS.has(label) ? label : null,
    contentNoticeText: NOTICE_LABELS.has(label) ? str(data.aviso_texto) || null : null,
    status,
    updatedAt: now,
  };

  if (existing) {
    await db.update(blogPosts).set(values).where(eq(blogPosts.id, existing.id));
    return json({ ok: true, acao: "atualizado", slug, id: existing.id, status, data: date });
  }
  const [created] = await db.insert(blogPosts).values({ ...values, createdAt: now }).returning({ id: blogPosts.id });
  return json({ ok: true, acao: "criado", slug, id: created.id, status, data: date });
}
