import type { Metadata } from "next";
import Link from "next/link";
import { desc } from "drizzle-orm";
import { AdminNavigation } from "../AdminNavigation";
import { requireAdminUser } from "../admin-auth";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Contatos recebidos", robots: { index: false, follow: false, noarchive: true } };

export default async function AdminContactsPage() {
  const user = await requireAdminUser("/admin/contatos");
  if (!user) return <Denied />;

  const [{ getDb }, { contactRequests }] = await Promise.all([import("../../../db"), import("../../../db/schema")]);
  const contacts = await getDb().select().from(contactRequests).orderBy(desc(contactRequests.createdAt));

  return <main className="admin-shell">
    <header className="admin-header"><Link className="brand" href="/"><span className="brand-heart">♥</span><span className="brand-name"><strong>simple</strong><i>& romantic</i><small>PAINEL ADMINISTRATIVO</small></span></Link><AdminNavigation active="contacts" /></header>
    <section className="admin-main">
      <div className="admin-title"><div><p className="eyebrow">CAIXA DE ENTRADA</p><h1>Mensagens de contato</h1><p>Olá, {user.displayName}. Aqui estão as mensagens enviadas pelo formulário do site.</p></div><div className="admin-total"><strong>{contacts.length}</strong><span>mensagens recebidas</span></div></div>
      <div className="admin-list">
        {contacts.length === 0 && <div className="admin-empty"><span>♡</span><h2>Nenhuma mensagem ainda.</h2><p>Os novos contatos aparecerão nesta área.</p></div>}
        {contacts.map((contact) => <article className="submission-card" key={contact.id}><div className="submission-card-top"><div className="submission-tags"><span className="status pending">{contact.status === "new" ? "Nova" : contact.status}</span><span>{contact.language === "es-ES" ? "Espanhol (Espanha)" : "Português"}</span></div><time>{formatDate(contact.createdAt)}</time></div><h2>{contact.subject}</h2><p className="submission-content">{contact.message}</p><dl><div><dt>Nome</dt><dd>{contact.name || "Não informado"}</dd></div><div><dt>E-mail para resposta</dt><dd><a href={`mailto:${contact.email}`}>{contact.email}</a></dd></div><div><dt>Ação</dt><dd><a className="published-link" href={`mailto:${contact.email}?subject=${encodeURIComponent(`Re: ${contact.subject}`)}`}>Responder por e-mail →</a></dd></div></dl></article>)}
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
