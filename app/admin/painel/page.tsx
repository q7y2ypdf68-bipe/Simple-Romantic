import type { Metadata } from "next";
import Link from "next/link";
import { gte } from "drizzle-orm";
import { AdminNavigation } from "../AdminNavigation";
import { requireAdminUser } from "../admin-auth";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Visão geral — Administração", robots: { index: false, follow: false, noarchive: true } };

export default async function AdminOverviewPage() {
  const user = await requireAdminUser("/admin/painel");
  if (!user) return <Denied />;
  const [{ getDb }, schema] = await Promise.all([import("../../../db"), import("../../../db/schema")]);
  const db = getDb();
  const thirtyDaysAgo = dayOffset(-29);
  const [community, listening, contacts, subscribers, analytics] = await Promise.all([
    db.select().from(schema.communitySubmissions),
    db.select().from(schema.listeningSubmissions),
    db.select().from(schema.contactRequests),
    db.select().from(schema.guideSubscribers),
    db.select().from(schema.analyticsDaily).where(gte(schema.analyticsDaily.day, thirtyDaysAgo)),
  ]);
  const views = analytics.reduce((sum, row) => sum + row.views, 0);
  const pendingCommunity = community.filter((item) => item.status === "pending").length;
  const newListening = listening.filter((item) => item.status === "new").length;
  const newContacts = contacts.filter((item) => item.status === "new").length;

  return <main className="admin-shell"><header className="admin-header"><Link className="brand" href="/"><span className="brand-heart">♥</span><span className="brand-name"><strong>simple</strong><i>& romantic</i><small>PAINEL ADMINISTRATIVO</small></span></Link><AdminNavigation active="overview" /></header>
    <section className="admin-main"><div className="admin-title"><div><p className="eyebrow">CENTRAL DE CONTROLO</p><h1>Tudo o que acontece no site, num só lugar.</h1><p>Olá, {user.displayName}. Esta área é privada e só abre para a conta autorizada do projeto.</p></div><div className="admin-total"><strong>{pendingCommunity + newListening + newContacts}</strong><span>itens que pedem atenção</span></div></div>
      <div className="admin-overview-grid">
        <Link href="/admin/estatisticas"><span>↗</span><strong>{views}</strong><h2>Visualizações</h2><p>Páginas abertas nos últimos 30 dias, origens dos acessos e conteúdos mais vistos.</p><small>Abrir estatísticas →</small></Link>
        <Link href="/admin/escuta"><span>♡</span><strong>{newListening}</strong><h2>Desabafos novos</h2><p>Relatos privados recebidos no “Entre nós”, com espaço para ler e responder.</p><small>Abrir escuta privada →</small></Link>
        <Link href="/admin"><span>✦</span><strong>{pendingCommunity}</strong><h2>Contos e ideias</h2><p>Contribuições da comunidade aguardando revisão, aprovação ou publicação.</p><small>Abrir moderação →</small></Link>
        <Link href="/admin/contatos"><span>✉</span><strong>{newContacts}</strong><h2>Mensagens</h2><p>Pedidos e mensagens enviados pelo formulário de contacto do site.</p><small>Abrir mensagens →</small></Link>
        <Link href="/admin/inscritos"><span>↓</span><strong>{subscribers.length}</strong><h2>Inscritos no guia</h2><p>Pessoas que aceitaram receber o guia, com idioma e data de inscrição.</p><small>Ver inscritos →</small></Link>
        <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer"><span>G</span><strong>Google</strong><h2>Pesquisa Google</h2><p>Impressões, cliques e consultas que fizeram o site aparecer no Google.</p><small>Abrir Search Console ↗</small></a>
      </div>
      <aside className="admin-access-note"><div><p className="eyebrow">O SEU ACESSO</p><h2>Guarde este endereço nos favoritos</h2><p><strong>Central privada:</strong> <Link href="/admin/painel">/admin/painel</Link></p><p>Se não estiver autenticado, o site pedirá o início de sessão da conta autorizada. Visitantes comuns não conseguem ver este painel nem os relatos recebidos.</p></div><Link className="button primary" href="/">Ver o site público <span>→</span></Link></aside>
    </section>
  </main>;
}

function dayOffset(offset: number) { const date = new Date(); date.setUTCDate(date.getUTCDate() + offset); return new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Lisbon", year: "numeric", month: "2-digit", day: "2-digit" }).format(date); }
function Denied() { return <main className="admin-denied"><div><span>♥</span><p>ÁREA PRIVADA</p><h1>Acesso restrito.</h1><p>Esta área é reservada à administração do Simple & Romantic.</p><Link className="button primary" href="/">Voltar ao site</Link></div></main>; }

