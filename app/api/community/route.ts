import { NextResponse } from "next/server";
import { and, eq, gt } from "drizzle-orm";

type SubmissionPayload = {
  kind?: unknown;
  authorName?: unknown;
  email?: unknown;
  title?: unknown;
  content?: unknown;
  location?: unknown;
  anonymous?: unknown;
  consent?: unknown;
  website?: unknown;
  language?: unknown;
};

const kinds = new Set(["story", "idea", "surprise"]);

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as SubmissionPayload;

    // Invisible honeypot: real visitors never fill this field.
    if (clean(payload.website, 100)) {
      return NextResponse.json({ ok: true }, { status: 201 });
    }

    const kind = clean(payload.kind, 20);
    const authorName = clean(payload.authorName, 80);
    const email = clean(payload.email, 160).toLowerCase();
    const title = clean(payload.title, 120);
    const content = clean(payload.content, 3000);
    const location = clean(payload.location, 120);
    const anonymous = payload.anonymous === true;
    const language = clean(payload.language, 10) === "es-ES" ? "es-ES" : "pt-BR";
    const consent = payload.consent === true;

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const linkCount = (content.match(/https?:\/\//gi) || []).length;

    if (!kinds.has(kind) || !validEmail || title.length < 4 || content.length < 40 || !consent || linkCount > 3) {
      return NextResponse.json({ error: "Confira os campos obrigatórios antes de enviar." }, { status: 400 });
    }

    const [{ getDb }, { communitySubmissions }] = await Promise.all([
      import("../../../db"),
      import("../../../db/schema"),
    ]);

    const db = getDb();
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const recent = await db.select({ id: communitySubmissions.id })
      .from(communitySubmissions)
      .where(and(eq(communitySubmissions.email, email), gt(communitySubmissions.createdAt, oneHourAgo)))
      .limit(3);

    if (recent.length >= 3) {
      return NextResponse.json({ error: "Muitos envios recentes. Tente novamente mais tarde." }, { status: 429 });
    }

    const duplicate = await db.select({ id: communitySubmissions.id })
      .from(communitySubmissions)
      .where(and(eq(communitySubmissions.email, email), eq(communitySubmissions.title, title), eq(communitySubmissions.content, content)))
      .limit(1);

    if (duplicate.length) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    await db.insert(communitySubmissions).values({
      kind,
      authorName: authorName || null,
      email,
      title,
      content,
      location: location || null,
      language,
      anonymous,
      status: "pending",
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Unable to save community submission", error);
    return NextResponse.json({ error: "Não foi possível enviar agora. Tente novamente em instantes." }, { status: 500 });
  }
}
