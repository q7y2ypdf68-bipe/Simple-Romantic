import type { Metadata } from "next";
import Link from "next/link";
import { desc } from "drizzle-orm";
import { AdminNavigation } from "../AdminNavigation";
import { requireAdminUser } from "../admin-auth";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Inscritos no guia", robots: { index: false, follow: false, noarchive: true } };

export default async function AdminSubscribersPage() {
  const user = await requireAdminUser("/admin/inscritos");
  if (!user) return <Denied />;

  const [{ getDb }, { guideSubscribers }] = await Promise.all([import("../../../db"), import("../../../db/schema")]);
  const subscribers = await getDb().select().from(guideSubscribers).orderBy(desc(guideSubscribers.createdAt));

  return <main className="admin-shell">
    <header className="admin-header"><Link className="brand" href="/"><span className="brand-heart">♥</span><span className="brand-name"><strong>simple</strong><i>& romantic</i><small>PAINEL ADMINISTRATIVO</small></span></Link><AdminNavigation active="subscribers" /></header>
    <section className="admin-main">
      <div className="admin-title"><div><p className="eyebrow">GUIA GRATUITO</p><h1>Pessoas inscritas</h1><p>Olá, {user.displayName}. Esta lista reúne quem pediu o guia e autorizou o cadastro.</p></div><div className="admin-total"><strong>{subscribers.length}</strong><span>inscrições confirmadas</span></div></div>
      <div className="admin-table-wrap">
        <table className="admin-table"><thead><tr><th>E-mail</th><th>Idioma</th><th>Status</th><th>Inscrição</th></tr></thead><tbody>{subscribers.map((subscriber) => <tr key={subscriber.id}><td><a href={`mailto:${subscriber.email}`}>{subscriber.email}</a></td><td>{subscriber.language}</td><td>{subscriber.status === "subscribed" ? "Inscrito" : subscriber.status}</td><td>{formatDate(subscriber.createdAt)}</td></tr>)}</tbody></table>
        {subscribers.length === 0 && <div className="admin-empty"><span>♡</span><h2>Nenhuma inscrição ainda.</h2><p>As novas inscrições no guia aparecerão aqui.</p></div>}
      </div>
    </section>
  </main>;
}

function Denied() {
  return <main className="admin-denied"><div><span>♥</span><p>ÁREA PRIVADA</p><h1>Acesso restrito.</h1><p>Esta área é reservada à administração do Simple & Romantic.</p><Link className="button primary" href="/">Voltar ao site</Link></div></main>;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium", timeStyle: "short", timeZone: "Europe/Lisbon" }).format(new Date(value));
}
