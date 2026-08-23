import { NextResponse } from "next/server";
import { and, eq, gt } from "drizzle-orm";

type Payload = { name?: unknown; email?: unknown; subject?: unknown; message?: unknown; website?: unknown; language?: unknown };
const clean = (value: unknown, max: number) => typeof value === "string" ? value.trim().slice(0, max) : "";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Payload;
    if (clean(payload.website, 100)) return NextResponse.json({ ok: true }, { status: 201 });
    const name = clean(payload.name, 80);
    const email = clean(payload.email, 160).toLowerCase();
    const subject = clean(payload.subject, 120);
    const message = clean(payload.message, 2000);
    const language = clean(payload.language, 10) === "es-ES" ? "es-ES" : "pt-BR";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || subject.length < 4 || message.length < 20) {
      return NextResponse.json({ error: "Confira os campos antes de enviar." }, { status: 400 });
    }
    const [{ getDb }, { contactRequests }] = await Promise.all([import("../../../db"), import("../../../db/schema")]);
    const db = getDb();
    const hourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const recent = await db.select({ id: contactRequests.id }).from(contactRequests)
      .where(and(eq(contactRequests.email, email), gt(contactRequests.createdAt, hourAgo))).limit(4);
    if (recent.length >= 4) return NextResponse.json({ error: "Muitos envios recentes. Tente mais tarde." }, { status: 429 });
    await db.insert(contactRequests).values({ name: name || null, email, subject, message, language, createdAt: new Date().toISOString() });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Unable to save contact request", error);
    return NextResponse.json({ error: "Não foi possível enviar agora." }, { status: 500 });
  }
}
