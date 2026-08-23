import { NextResponse } from "next/server";
import { desc, eq, gt, lt } from "drizzle-orm";
import { LISTENING_CONSENT_VERSION, listeningExpiryForStatus } from "../../listening-retention";

type ListeningPayload = {
  alias?: unknown;
  need?: unknown;
  message?: unknown;
  publicationConsent?: unknown;
  adult?: unknown;
  consent?: unknown;
  website?: unknown;
};

const needs = new Set(["listen", "comfort", "reflection"]);

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function makeAccessCode() {
  const raw = crypto.randomUUID().replace(/-/g, "").slice(0, 20).toUpperCase();
  return `SR-${raw.match(/.{1,4}/g)?.join("-")}`;
}

export async function POST(request: Request) {
  try {
    const payload = await request.json() as ListeningPayload;
    if (clean(payload.website, 100)) return NextResponse.json({ ok: true, accessCode: "SR-RECEBIDO" }, { status: 201 });

    const alias = clean(payload.alias, 60);
    const need = clean(payload.need, 20);
    const message = clean(payload.message, 5000);
    const publicationConsent = payload.publicationConsent === true;
    const adult = payload.adult === true;
    const consent = payload.consent === true;

    if (!needs.has(need) || message.length < 80 || !adult || !consent) {
      return NextResponse.json({ error: "Confira os campos obrigatórios antes de enviar." }, { status: 400 });
    }

    if (/\b[^\s@]+@[^\s@]+\.[^\s@]+\b/i.test(message) || /(?:\+?\d[\d\s().-]{8,}\d)/.test(message)) {
      return NextResponse.json({ error: "Para sua proteção, remova e-mails e números de telefone do relato." }, { status: 400 });
    }

    const linkCount = (message.match(/https?:\/\//gi) || []).length;
    if (linkCount > 1) return NextResponse.json({ error: "Remova os links antes de enviar seu relato." }, { status: 400 });

    const [{ getDb }, { listeningSubmissions }] = await Promise.all([import("../../../db"), import("../../../db/schema")]);
    const db = getDb();
    await db.delete(listeningSubmissions).where(lt(listeningSubmissions.expiresAt, new Date().toISOString()));
    const oneMinuteAgo = new Date(Date.now() - 60 * 1000).toISOString();
    const recent = await db.select({ id: listeningSubmissions.id }).from(listeningSubmissions).where(gt(listeningSubmissions.createdAt, oneMinuteAgo)).orderBy(desc(listeningSubmissions.createdAt)).limit(61);
    if (recent.length >= 60) return NextResponse.json({ error: "Recebemos muitas mensagens agora. Tente novamente em alguns minutos." }, { status: 429 });

    const accessCode = makeAccessCode();
    const now = new Date();
    await db.insert(listeningSubmissions).values({
      accessCode,
      alias: alias || null,
      need,
      message,
      publicationConsent,
      consentVersion: LISTENING_CONSENT_VERSION,
      consentAt: now.toISOString(),
      status: "new",
      createdAt: now.toISOString(),
      expiresAt: listeningExpiryForStatus("new", now),
    });
    return NextResponse.json({ accessCode }, { status: 201 });
  } catch (error) {
    console.error("Unable to save listening submission", error);
    return NextResponse.json({ error: "Não foi possível enviar agora. Tente novamente em instantes." }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const code = new URL(request.url).searchParams.get("code")?.trim().toUpperCase().slice(0, 40) || "";
  if (!/^SR-(?:[A-F0-9]{4}-){4}[A-F0-9]{4}$/.test(code)) return NextResponse.json({ error: "Confira o código e tente novamente." }, { status: 400 });

  try {
    const [{ getDb }, { listeningSubmissions }] = await Promise.all([import("../../../db"), import("../../../db/schema")]);
    const db = getDb();
    const [entry] = await db.select({ status: listeningSubmissions.status, response: listeningSubmissions.response, respondedAt: listeningSubmissions.respondedAt, alias: listeningSubmissions.alias, expiresAt: listeningSubmissions.expiresAt }).from(listeningSubmissions).where(eq(listeningSubmissions.accessCode, code)).limit(1);
    if (!entry) return NextResponse.json({ error: "Não encontramos um relato com esse código." }, { status: 404 });
    if (entry.expiresAt && entry.expiresAt <= new Date().toISOString()) {
      await db.delete(listeningSubmissions).where(eq(listeningSubmissions.accessCode, code));
      return NextResponse.json({ error: "Este relato chegou ao fim do prazo de conservação e foi eliminado." }, { status: 410 });
    }
    return NextResponse.json({
      status: entry.status,
      respondedAt: entry.respondedAt,
      alias: entry.alias,
      expiresAt: entry.expiresAt,
      response: entry.status === "responded" ? entry.response : null,
    }, { headers: { "cache-control": "no-store" } });
  } catch (error) {
    console.error("Unable to retrieve listening response", error);
    return NextResponse.json({ error: "Não foi possível consultar agora. Tente novamente em instantes." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const code = new URL(request.url).searchParams.get("code")?.trim().toUpperCase().slice(0, 40) || "";
  if (!/^SR-(?:[A-F0-9]{4}-){4}[A-F0-9]{4}$/.test(code)) return NextResponse.json({ error: "Confira o código e tente novamente." }, { status: 400 });

  try {
    const [{ getDb }, { listeningSubmissions }] = await Promise.all([import("../../../db"), import("../../../db/schema")]);
    const deleted = await getDb().delete(listeningSubmissions).where(eq(listeningSubmissions.accessCode, code)).returning({ id: listeningSubmissions.id });
    if (!deleted.length) return NextResponse.json({ error: "Não encontramos um relato com esse código." }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Unable to delete listening submission", error);
    return NextResponse.json({ error: "Não foi possível eliminar agora. Tente novamente em instantes." }, { status: 500 });
  }
}
