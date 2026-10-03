import { and, eq, gt, sql } from "drizzle-orm";
import { ADMIN_COOKIE, adminConfigured, checkAdminPassword, createSessionToken, sessionCookieOptions } from "../../../admin/admin-auth";
import { getDb } from "../../../../db";
import { adminLoginAttempts } from "../../../../db/schema";

const MAX_ATTEMPTS = 5;
const WINDOW_MINUTES = 15;

function back(request: Request, params: string) {
  return new Response(null, { status: 303, headers: { location: new URL(`/admin/entrar${params}`, request.url).toString() } });
}

function safeReturn(value: string | null) {
  return value && value.startsWith("/admin") && !value.startsWith("//") ? value : "/admin/blog";
}

export async function POST(request: Request) {
  const form = await request.formData();
  const returnTo = safeReturn(String(form.get("voltar") || ""));
  const extra = `&voltar=${encodeURIComponent(returnTo)}`;
  if (!adminConfigured()) return back(request, `?erro=config${extra}`);

  const ip = request.headers.get("cf-connecting-ip") || "desconhecido";
  let db: ReturnType<typeof getDb> | null = null;
  try {
    db = getDb();
    const since = new Date(Date.now() - WINDOW_MINUTES * 60_000).toISOString();
    const [{ count }] = await db.select({ count: sql<number>`count(*)` }).from(adminLoginAttempts)
      .where(and(eq(adminLoginAttempts.ip, ip), gt(adminLoginAttempts.createdAt, since)));
    if (count >= MAX_ATTEMPTS) return back(request, `?erro=bloqueado${extra}`);
  } catch {
    db = null;
  }

  const password = String(form.get("senha") || "");
  if (!(await checkAdminPassword(password))) {
    try {
      await db?.insert(adminLoginAttempts).values({ ip, createdAt: new Date().toISOString() });
    } catch {}
    return back(request, `?erro=senha${extra}`);
  }

  const headers = new Headers({ location: new URL(returnTo, request.url).toString() });
  const token = await createSessionToken();
  headers.append("set-cookie", `${ADMIN_COOKIE}=${token}; Max-Age=${sessionCookieOptions.maxAge}; Path=/; HttpOnly; Secure; SameSite=Strict`);
  return new Response(null, { status: 303, headers });
}
