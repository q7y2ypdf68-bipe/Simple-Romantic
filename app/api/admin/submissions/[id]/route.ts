import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getAdminUser } from "../../../../admin/admin-auth";

const statuses = new Set(["pending", "approved", "published", "rejected"]);

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : undefined;
}

async function authorize() {
  return Boolean(await getAdminUser());
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await authorize())) return NextResponse.json({ error: "Acesso não autorizado." }, { status: 403 });
  const { id: rawId } = await params;
  const id = Number(rawId);
  if (!Number.isInteger(id) || id < 1) return NextResponse.json({ error: "Contribuição inválida." }, { status: 400 });

  const payload = await request.json() as Record<string, unknown>;
  const changes: Record<string, unknown> = { updatedAt: new Date().toISOString() };
  const title = clean(payload.title, 120);
  const content = clean(payload.content, 3000);
  const authorName = clean(payload.authorName, 80);
  const location = clean(payload.location, 120);
  const status = clean(payload.status, 20);

  if (title !== undefined) {
    if (title.length < 4) return NextResponse.json({ error: "O título está muito curto." }, { status: 400 });
    changes.title = title;
  }
  if (content !== undefined) {
    if (content.length < 40) return NextResponse.json({ error: "O texto está muito curto." }, { status: 400 });
    changes.content = content;
  }
  if (authorName !== undefined) changes.authorName = authorName || null;
  if (location !== undefined) changes.location = location || null;
  if (typeof payload.anonymous === "boolean") changes.anonymous = payload.anonymous;
  if (status !== undefined) {
    if (!statuses.has(status)) return NextResponse.json({ error: "Status inválido." }, { status: 400 });
    changes.status = status;
    changes.publishedAt = status === "published" ? new Date().toISOString() : null;
  }

  const [{ getDb }, { communitySubmissions }] = await Promise.all([
    import("../../../../../db"),
    import("../../../../../db/schema"),
  ]);
  const [submission] = await getDb().update(communitySubmissions).set(changes).where(eq(communitySubmissions.id, id)).returning();
  if (!submission) return NextResponse.json({ error: "Contribuição não encontrada." }, { status: 404 });
  return NextResponse.json({ submission });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await authorize())) return NextResponse.json({ error: "Acesso não autorizado." }, { status: 403 });
  const { id: rawId } = await params;
  const id = Number(rawId);
  if (!Number.isInteger(id) || id < 1) return NextResponse.json({ error: "Contribuição inválida." }, { status: 400 });

  const [{ getDb }, { communitySubmissions }] = await Promise.all([
    import("../../../../../db"),
    import("../../../../../db/schema"),
  ]);
  const deleted = await getDb().delete(communitySubmissions).where(and(eq(communitySubmissions.id, id))).returning({ id: communitySubmissions.id });
  if (!deleted.length) return NextResponse.json({ error: "Contribuição não encontrada." }, { status: 404 });
  return NextResponse.json({ ok: true });
}
