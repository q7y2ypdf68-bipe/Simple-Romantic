import type { Metadata } from "next";
import Link from "next/link";
import { desc, lt } from "drizzle-orm";
import { requireAdminUser } from "../admin-auth";
import ListeningDashboard from "./ListeningDashboard";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Entre nós — Administração",
  robots: { index: false, follow: false, noarchive: true },
};

export default async function ListeningAdminPage() {
  const user = await requireAdminUser("/admin/escuta");

  if (!user) {
    return <main className="admin-denied"><div><span>♥</span><p>ÁREA PRIVADA</p><h1>Acesso restrito.</h1><p>Esta área é reservada à administração do Simple & Romantic.</p><Link className="button primary" href="/">Voltar ao site</Link></div></main>;
  }

  const [{ getDb }, { listeningSubmissions }] = await Promise.all([
    import("../../../db"),
    import("../../../db/schema"),
  ]);
  const db = getDb();
  await db.delete(listeningSubmissions).where(lt(listeningSubmissions.expiresAt, new Date().toISOString()));
  const entries = await db.select().from(listeningSubmissions).orderBy(desc(listeningSubmissions.createdAt));

  return <ListeningDashboard initialEntries={entries} userName={user.displayName} />;
}
