import { eq } from "drizzle-orm";
import { getAdminUser } from "../../../admin/admin-auth";
import { formatPortugueseDate, parseBody, slugify } from "../../../blog/post-format";
import { getDb } from "../../../../db";
import { blogImages, blogPosts } from "../../../../db/schema";

const MAX_IMAGE_BYTES = 1_400_000;
const IMAGE_TYPES = new Set(["image/webp", "image/jpeg", "image/png"]);
const SERIES = new Set(["CONSELHO DA SEMANA", "IDEIAS E GUIAS", "CONTOS"]);
const NOTICE_LABELS = new Set(["CONTO FICTÍCIO", "INSPIRADO EM FATOS", "HISTÓRIA REAL"]);

function redirect(request: Request, path: string) {
  return new Response(null, { status: 303, headers: { location: new URL(path, request.url).toString() } });
}

function text(form: FormData, name: string) {
  return String(form.get(name) ?? "").trim();
}

function toBase64(bytes: Uint8Array) {
  let binary = "";
  for (let index = 0; index < bytes.length; index += 0x8000) binary += String.fromCharCode(...bytes.subarray(index, index + 0x8000));
  return btoa(binary);
}

export async function POST(request: Request) {
  if (!(await getAdminUser())) return new Response("Não autorizado", { status: 401 });
  const form = await request.formData();
  const db = getDb();
  const id = Number(text(form, "id")) || null;
  const now = new Date().toISOString();

  if (text(form, "acao") === "excluir" && id) {
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
    return redirect(request, "/admin/blog?aviso=excluido");
  }

  const title = text(form, "titulo");
  const excerpt = text(form, "resumo");
  const category = text(form, "categoria");
  const publishedIso = text(form, "data");
  const slug = slugify(text(form, "slug") || title);
  const fail = (code: string) => redirect(request, `/admin/blog?${id ? `editar=${id}&` : "novo=1&"}erro=${code}`);
  if (!title || !excerpt || !category || !slug) return fail("campos");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(publishedIso)) return fail("data");

  const [clash] = await db.select({ id: blogPosts.id }).from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
  if (clash && clash.id !== id) return fail("slug");

  let [existing] = id ? await db.select().from(blogPosts).where(eq(blogPosts.id, id)).limit(1) : [];
  let image = existing?.image || "";
  const file = form.get("imagem");
  if (file instanceof File && file.size > 0) {
    const byExtension: Record<string, string> = { webp: "image/webp", jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png" };
    const contentType = IMAGE_TYPES.has(file.type) ? file.type : byExtension[file.name.split(".").pop()?.toLowerCase() || ""];
    if (!contentType) return fail("tipo");
    if (file.size > MAX_IMAGE_BYTES) return fail("tamanho");
    const imageId = crypto.randomUUID();
    await db.insert(blogImages).values({
      id: imageId,
      contentType,
      data: toBase64(new Uint8Array(await file.arrayBuffer())),
      filename: file.name.slice(0, 120),
      createdAt: now,
    });
    image = `/media/${imageId}`;
  }

  const { intro, sections } = parseBody(String(form.get("texto") ?? ""));
  if (!intro.length && !sections.length) return fail("texto");
  const series = text(form, "serie");
  const noticeLabel = text(form, "aviso_rotulo");
  const status = text(form, "status") === "rascunho" ? "draft" : "published";

  const values = {
    slug,
    language: "pt-BR",
    title,
    seoTitle: text(form, "seo") || null,
    excerpt,
    category,
    series: SERIES.has(series) ? series : null,
    image,
    imageAlt: text(form, "imagem_alt"),
    published: formatPortugueseDate(publishedIso),
    publishedIso,
    readTime: text(form, "leitura"),
    intro: JSON.stringify(intro),
    sections: JSON.stringify(sections),
    contentNoticeLabel: NOTICE_LABELS.has(noticeLabel) ? noticeLabel : null,
    contentNoticeText: NOTICE_LABELS.has(noticeLabel) ? text(form, "aviso_texto") || null : null,
    status,
    updatedAt: now,
  };

  if (existing) {
    await db.update(blogPosts).set(values).where(eq(blogPosts.id, existing.id));
    return redirect(request, `/admin/blog?editar=${existing.id}&aviso=salvo`);
  }
  const [created] = await db.insert(blogPosts).values({ ...values, createdAt: now }).returning({ id: blogPosts.id });
  return redirect(request, `/admin/blog?editar=${created.id}&aviso=salvo`);
}
