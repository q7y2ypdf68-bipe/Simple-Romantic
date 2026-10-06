import { NextResponse } from "next/server";
import { and, eq, gt } from "drizzle-orm";
import { adminLinks, escapeEmailHtml, sendBrevoNotification } from "../../brevo";

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
    const language = (() => { const value = clean(payload.language, 10); return value === "es-ES" ? "es-ES" : value === "en" || value === "en-US" ? "en" : "pt-BR"; })();
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
    try {
      await sendBrevoNotification({
        subject: `Novo contacto: ${subject}`,
        text: `Novo contacto recebido.\n\nNome: ${name || "Não informado"}\nE-mail: ${email}\nAssunto: ${subject}\n\nMensagem:\n${message}\n\nAbrir painel: ${adminLinks.contacts}`,
        html: `<p>Novo contacto recebido.</p><p><strong>Nome:</strong> ${escapeEmailHtml(name || "Não informado")}<br><strong>E-mail:</strong> ${escapeEmailHtml(email)}<br><strong>Assunto:</strong> ${escapeEmailHtml(subject)}</p><p>${escapeEmailHtml(message).replace(/\n/g, "<br>")}</p><p><a href="${adminLinks.contacts}">Abrir painel de contactos</a></p>`,
      });
    } catch (error) {
      console.error("Unable to send contact notification", error);
    }
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Unable to save contact request", error);
    return NextResponse.json({ error: "Não foi possível enviar agora." }, { status: 500 });
  }
}
