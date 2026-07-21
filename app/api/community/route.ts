import { NextResponse } from "next/server";

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
    const consent = payload.consent === true;

    if (!kinds.has(kind) || !email.includes("@") || title.length < 4 || content.length < 40 || !consent) {
      return NextResponse.json({ error: "Confira os campos obrigatórios antes de enviar." }, { status: 400 });
    }

    const [{ getDb }, { communitySubmissions }] = await Promise.all([
      import("../../../db"),
      import("../../../db/schema"),
    ]);

    await getDb().insert(communitySubmissions).values({
      kind,
      authorName: authorName || null,
      email,
      title,
      content,
      location: location || null,
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
