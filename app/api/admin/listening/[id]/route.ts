import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getAdminUser } from "../../../../admin/admin-auth";

const statuses = new Set(["new", "read", "responded", "archived"]);
function clean(value: unknown, maxLength: number) { return typeof value === "string" ? value.trim().slice(0, maxLength) : undefined; }

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await getAdminUser())) return NextResponse.json({ error: "Acesso não autorizado." }, { status: 403 });
  const id = Number((await params).id);
  if (!Number.isInteger(id) || id < 1) return NextResponse.json({ error: "Relato inválido." }, { status: 400 });

  const payload = await request.json() as Record<string, unknown>;
  const changes: Record<string, unknown> = { updatedAt: new Date().toISOString() };
  const response = clean(payload.response, 5000);
  const status = clean(payload.status, 20);
  if (response !== undefined) changes.response = response || null;
  if (status !== undefined) {
    if (!statuses.has(status)) return NextResponse.json({ error: "Status inválido." }, { status: 400 });
    changes.status = status;
    if (status === "responded") {
      if (!response || response.length < 20) return NextResponse.json({ error: "Escreva uma resposta antes de concluir o acolhimento." }, { status: 400 });
      changes.respondedAt = new Date().toISOString();
    }
  }

  const [{ getDb }, { listeningSubmissions }] = await Promise.all([import("../../../../../db"), import("../../../../../db/schema")]);
  const [entry] = await getDb().update(listeningSubmissions).set(changes).where(eq(listeningSubmissions.id, id)).returning();
  if (!entry) return NextResponse.json({ error: "Relato não encontrado." }, { status: 404 });
  return NextResponse.json({ entry });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await getAdminUser())) return NextResponse.json({ error: "Acesso não autorizado." }, { status: 403 });
  const id = Number((await params).id);
  if (!Number.isInteger(id) || id < 1) return NextResponse.json({ error: "Relato inválido." }, { status: 400 });
  const [{ getDb }, { listeningSubmissions }] = await Promise.all([import("../../../../../db"), import("../../../../../db/schema")]);
  const deleted = await getDb().delete(listeningSubmissions).where(eq(listeningSubmissions.id, id)).returning({ id: listeningSubmissions.id });
  if (!deleted.length) return NextResponse.json({ error: "Relato não encontrado." }, { status: 404 });
  return NextResponse.json({ ok: true });
}
