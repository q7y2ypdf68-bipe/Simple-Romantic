import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { env } from "cloudflare:workers";

export const ADMIN_COOKIE = "sr_admin";
const SESSION_SECONDS = 60 * 60 * 12;
const encoder = new TextEncoder();

export type AdminUser = { displayName: string; email: string; fullName: string };

function adminPassword(): string | null {
  const fromBinding = (env as unknown as Record<string, unknown>)?.ADMIN_PASSWORD;
  const value = typeof fromBinding === "string" && fromBinding ? fromBinding : process.env.ADMIN_PASSWORD;
  return value && value.length >= 8 ? value : null;
}

function toHex(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function sign(message: string, secret: string) {
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return toHex(await crypto.subtle.sign("HMAC", key, encoder.encode(message)));
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let index = 0; index < a.length; index += 1) diff |= a.charCodeAt(index) ^ b.charCodeAt(index);
  return diff === 0;
}

export function adminConfigured() {
  return adminPassword() !== null;
}

export async function checkAdminPassword(candidate: string) {
  const password = adminPassword();
  if (!password) return false;
  // Compare HMACs so the comparison time does not depend on the password length.
  const [a, b] = await Promise.all([sign(candidate, "check"), sign(password, "check")]);
  return safeEqual(a, b);
}

export async function createSessionToken() {
  const password = adminPassword();
  if (!password) throw new Error("ADMIN_PASSWORD não configurada.");
  const expires = Math.floor(Date.now() / 1000) + SESSION_SECONDS;
  return `${expires}.${await sign(`session:${expires}`, password)}`;
}

export const sessionCookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "strict" as const,
  path: "/",
  maxAge: SESSION_SECONDS,
};

async function hasValidSession() {
  const password = adminPassword();
  if (!password) return false;
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!token) return false;
  const [expires, signature] = token.split(".");
  if (!expires || !signature || Number(expires) < Date.now() / 1000) return false;
  return safeEqual(signature, await sign(`session:${expires}`, password));
}

const adminUser: AdminUser = { displayName: "Bruno", email: "admin", fullName: "Administração Simple & Romantic" };

export async function getAdminUser(): Promise<AdminUser | null> {
  return (await hasValidSession()) ? adminUser : null;
}

export async function requireAdminUser(returnTo = "/admin"): Promise<AdminUser> {
  const user = await getAdminUser();
  if (!user) redirect(`/admin/entrar?voltar=${encodeURIComponent(returnTo)}`);
  return user;
}
