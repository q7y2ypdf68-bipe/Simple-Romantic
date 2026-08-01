import Link from "next/link";

export function AdminNavigation({ active }: { active: "community" | "listening" | "contacts" | "subscribers" | "analytics" }) {
  return <nav aria-label="Navegação administrativa">
    <Link className={active === "community" ? "active" : ""} href="/admin">Comunidade</Link>
    <Link className={active === "listening" ? "active" : ""} href="/admin/escuta">Entre nós</Link>
    <Link className={active === "contacts" ? "active" : ""} href="/admin/contatos">Contatos</Link>
    <Link className={active === "subscribers" ? "active" : ""} href="/admin/inscritos">Guia</Link>
    <Link className={active === "analytics" ? "active" : ""} href="/admin/estatisticas">Estatísticas</Link>
    <a href="/signout-with-chatgpt?return_to=/">Sair</a>
  </nav>;
}
