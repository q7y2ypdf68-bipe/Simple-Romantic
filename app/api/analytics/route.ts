import { NextResponse } from "next/server";

type Payload = { path?: unknown; source?: unknown };
const TRACKABLE_PATH = /^\/(?:$|blog(?:\/(?:historias\/\d+|[a-z0-9-]+))?|guia|loja|entre-nos|contato|privacidade|termos|regras-da-comunidade|es(?:\/(?:blog(?:\/[a-z0-9-]+)?|guia|tienda|comunidad|entre-nos|contacto|privacidad|terminos|normas-de-la-comunidad))?)$/;
const HOSTNAME = /^(?:[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?\.)*[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?$/i;

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function analyticsDay() {
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Europe/Lisbon",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Payload;
    const path = clean(payload.path, 200).split(/[?#]/, 1)[0];
    const requestedSource = clean(payload.source, 120);
    const source = requestedSource === "Direto" || requestedSource === "Interno"
      ? requestedSource
      : HOSTNAME.test(requestedSource)
        ? requestedSource.toLowerCase()
        : "Outro";

    if (!TRACKABLE_PATH.test(path)) {
      return NextResponse.json({ ok: true }, { status: 202 });
    }

    const { env } = await import("cloudflare:workers");
    await env.DB.prepare(`
      INSERT INTO analytics_daily (day, path, source, views)
      VALUES (?, ?, ?, 1)
      ON CONFLICT(day, path, source)
      DO UPDATE SET views = views + 1
    `).bind(analyticsDay(), path, source).run();

    return NextResponse.json({ ok: true }, { status: 202 });
  } catch (error) {
    console.error("Unable to record anonymous analytics", error);
    return NextResponse.json({ ok: false }, { status: 202 });
  }
}
