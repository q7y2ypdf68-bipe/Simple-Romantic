import Link from "next/link";
import { desc } from "drizzle-orm";
import { requireAdminUser } from "./admin-auth";
import AdminDashboard from "./AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const user = await requireAdminUser("/admin");

  if (!user) {
    return <main className="admin-denied"><div><span>♥</span><p>ÁREA PRIVADA</p><h1>Acesso restrito.</h1><p>Esta área é reservada à administração do Simple & Romantic.</p><Link className="button primary" href="/">Voltar ao site</Link></div></main>;
  }

  const [{ getDb }, { communitySubmissions }] = await Promise.all([
    import("../../db"),
    import("../../db/schema"),
  ]);
  const submissions = await getDb().select().from(communitySubmissions).orderBy(desc(communitySubmissions.createdAt));

  return <AdminDashboard initialSubmissions={submissions} userName={user.displayName} />;
}
