import Link from "next/link";

export function AdminNavigation({ active }: { active: "overview" | "blog" | "community" | "listening" | "contacts" | "subscribers" | "analytics" }) {
  return <nav aria-label="Navegação administrativa">
    <Link className={active === "overview" ? "active" : ""} href="/admin/painel">Visão geral</Link>
    <Link className={active === "blog" ? "active" : ""} href="/admin/blog">Blog</Link>
    <Link className={active === "community" ? "active" : ""} href="/admin">Comunidade</Link>
    <Link className={active === "listening" ? "active" : ""} href="/admin/escuta">Entre nós</Link>
    <Link className={active === "contacts" ? "active" : ""} href="/admin/contatos">Contatos</Link>
    <Link className={active === "subscribers" ? "active" : ""} href="/admin/inscritos">Guia</Link>
    <Link className={active === "analytics" ? "active" : ""} href="/admin/estatisticas">Estatísticas</Link>
    <form method="post" action="/api/admin/logout" style={{ display: "inline" }}><button type="submit" className="admin-logout">Sair</button></form>
  </nav>;
}
