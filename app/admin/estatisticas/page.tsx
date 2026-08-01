import type { Metadata } from "next";
import Link from "next/link";
import { desc, gte } from "drizzle-orm";
import { AdminNavigation } from "../AdminNavigation";
import { requireAdminUser } from "../admin-auth";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Estatísticas", robots: { index: false, follow: false, noarchive: true } };

type Metric = { label: string; views: number };

export default async function AdminAnalyticsPage() {
  const user = await requireAdminUser("/admin/estatisticas");
  if (!user) return <Denied />;

  const [{ getDb }, { analyticsDaily }] = await Promise.all([import("../../../db"), import("../../../db/schema")]);
  const today = dayOffset(0);
  const sevenDaysAgo = dayOffset(-6);
  const thirtyDaysAgo = dayOffset(-29);
  const rows = await getDb().select().from(analyticsDaily).where(gte(analyticsDaily.day, thirtyDaysAgo)).orderBy(desc(analyticsDaily.day));

  const totalViews = rows.reduce((sum, row) => sum + row.views, 0);
  const todayViews = rows.filter((row) => row.day === today).reduce((sum, row) => sum + row.views, 0);
  const sevenDayViews = rows.filter((row) => row.day >= sevenDaysAgo).reduce((sum, row) => sum + row.views, 0);
  const topPages = aggregate(rows.map((row) => ({ label: friendlyPath(row.path), views: row.views }))).slice(0, 8);
  const topSources = aggregate(rows.filter((row) => row.source !== "Interno").map((row) => ({ label: friendlySource(row.source), views: row.views }))).slice(0, 8);
  const daily = Array.from({ length: 14 }, (_, index) => dayOffset(index - 13)).map((day) => ({
    label: day,
    views: rows.filter((row) => row.day === day).reduce((sum, row) => sum + row.views, 0),
  }));

  return <main className="admin-shell">
    <header className="admin-header"><Link className="brand" href="/"><span className="brand-heart">♥</span><span className="brand-name"><strong>simple</strong><i>& romantic</i><small>PAINEL ADMINISTRATIVO</small></span></Link><AdminNavigation active="analytics" /></header>
    <section className="admin-main">
      <div className="admin-title"><div><p className="eyebrow">MEDIÇÃO ANÔNIMA · SEM COOKIES</p><h1>Estatísticas do site</h1><p>Olá, {user.displayName}. As visualizações são somadas sem guardar identidade, endereço IP ou histórico individual.</p></div><div className="admin-total"><strong>{totalViews}</strong><span>visualizações em 30 dias</span></div></div>
      <div className="analytics-cards"><article><span>Hoje</span><strong>{todayViews}</strong><small>visualizações</small></article><article><span>Últimos 7 dias</span><strong>{sevenDayViews}</strong><small>visualizações</small></article><article><span>Últimos 30 dias</span><strong>{totalViews}</strong><small>visualizações</small></article></div>
      <section className="analytics-panel"><div className="analytics-heading"><div><p className="eyebrow">RITMO DE ACESSOS</p><h2>Últimos 14 dias</h2></div><small>Contagem de páginas abertas; não representa visitantes únicos.</small></div><BarList items={daily.map((item) => ({ ...item, label: formatShortDay(item.label) }))} empty="As primeiras visualizações aparecerão aqui." /></section>
      <div className="analytics-grid"><section className="analytics-panel"><div className="analytics-heading"><div><p className="eyebrow">CONTEÚDOS</p><h2>Páginas mais vistas</h2></div></div><BarList items={topPages} empty="Ainda não há páginas registradas." /></section><section className="analytics-panel"><div className="analytics-heading"><div><p className="eyebrow">DESCOBERTA</p><h2>Principais origens</h2></div></div><BarList items={topSources} empty="As origens aparecerão quando houver visitas." /></section></div>
    </section>
  </main>;
}

function BarList({ items, empty }: { items: Metric[]; empty: string }) {
  const max = Math.max(...items.map((item) => item.views), 1);
  if (!items.length || items.every((item) => item.views === 0)) return <div className="analytics-empty">{empty}</div>;
  return <div className="analytics-bars">{items.map((item) => <div key={item.label}><div><span>{item.label}</span><strong>{item.views}</strong></div><i style={{ width: `${Math.max(3, (item.views / max) * 100)}%` }} /></div>)}</div>;
}

function aggregate(items: Metric[]) {
  const totals = new Map<string, number>();
  for (const item of items) totals.set(item.label, (totals.get(item.label) || 0) + item.views);
  return Array.from(totals, ([label, views]) => ({ label, views })).sort((a, b) => b.views - a.views);
}

function friendlyPath(path: string) {
  if (path === "/") return "Página inicial";
  if (path === "/blog") return "Blog";
  if (path === "/guia") return "Guia gratuito";
  if (path === "/es") return "Página inicial (espanhol)";
  if (path === "/es/blog") return "Blog (espanhol)";
  if (path.startsWith("/es/blog/")) return `${path.replace(/^\/es\/blog\//, "").replaceAll("-", " ")} (espanhol)`;
  if (path === "/entre-nos") return "Entre nós";
  return path.replace(/^\/blog\//, "").replaceAll("-", " ");
}

function friendlySource(source: string) {
  if (source === "Direto") return "Acesso direto";
  return source.replace(/^www\./, "");
}

function dayOffset(offset: number) {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() + offset);
  return new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Lisbon", year: "numeric", month: "2-digit", day: "2-digit" }).format(date);
}

function formatShortDay(day: string) {
  return new Intl.DateTimeFormat("pt-PT", { day: "2-digit", month: "short", timeZone: "UTC" }).format(new Date(`${day}T12:00:00Z`));
}

function Denied() {
  return <main className="admin-denied"><div><span>♥</span><p>ÁREA PRIVADA</p><h1>Acesso restrito.</h1><p>Esta área é reservada à administração do Simple & Romantic.</p><Link className="button primary" href="/">Voltar ao site</Link></div></main>;
}
