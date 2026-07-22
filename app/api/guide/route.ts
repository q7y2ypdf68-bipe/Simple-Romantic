import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

type Payload = { email?: unknown; language?: unknown; consent?: unknown; website?: unknown };
const clean = (value: unknown, max: number) => typeof value === "string" ? value.trim().slice(0, max) : "";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Payload;
    if (clean(payload.website, 100)) return NextResponse.json({ ok: true }, { status: 201 });
    const email = clean(payload.email, 160).toLowerCase();
    const language = clean(payload.language, 10) === "en" ? "en" : "pt-BR";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || payload.consent !== true) {
      return NextResponse.json({ error: "Confirme o e-mail e o consentimento." }, { status: 400 });
    }
    const [{ getDb }, { guideSubscribers }] = await Promise.all([import("../../../db"), import("../../../db/schema")]);
    const db = getDb();
    const existing = await db.select({ id: guideSubscribers.id }).from(guideSubscribers).where(eq(guideSubscribers.email, email)).limit(1);
    if (!existing.length) {
      const now = new Date().toISOString();
      await db.insert(guideSubscribers).values({ email, language, consentAt: now, createdAt: now });
    }
    return NextResponse.json({ ok: true, downloadUrl: "/downloads/30-encontros-simples-gastando-pouco.pdf" }, { status: 201 });
  } catch (error) {
    console.error("Unable to save guide subscriber", error);
    return NextResponse.json({ error: "Não foi possível cadastrar agora." }, { status: 500 });
  }
}
