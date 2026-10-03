import { eq } from "drizzle-orm";
import { getDb } from "../../../db";
import { blogImages } from "../../../db/schema";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/.test(id)) return new Response("Não encontrado", { status: 404 });
  const [row] = await getDb().select().from(blogImages).where(eq(blogImages.id, id)).limit(1);
  if (!row) return new Response("Não encontrado", { status: 404 });
  const binary = atob(row.data);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
  return new Response(bytes, {
    headers: { "content-type": row.contentType, "cache-control": "public, max-age=31536000, immutable", "content-security-policy": "default-src 'none'" },
  });
}
