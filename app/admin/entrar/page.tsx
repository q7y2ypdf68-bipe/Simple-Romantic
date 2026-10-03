import type { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Entrar", robots: { index: false, follow: false, noarchive: true } };

const errors: Record<string, string> = {
  senha: "Senha incorreta. Tente de novo.",
  bloqueado: "Muitas tentativas. Aguarde 15 minutos e tente novamente.",
  config: "A senha de administração ainda não foi configurada no Cloudflare (ADMIN_PASSWORD).",
};

export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<{ erro?: string; voltar?: string }> }) {
  const { erro, voltar } = await searchParams;
  return <main className="admin-denied"><div>
    <span>♥</span><p>ÁREA PRIVADA</p><h1>Entrar no painel.</h1>
    <form method="post" action="/api/admin/login" className="admin-login-form">
      <input type="hidden" name="voltar" value={voltar && voltar.startsWith("/admin") ? voltar : "/admin/blog"} />
      <label>Senha<input name="senha" type="password" autoComplete="current-password" required autoFocus /></label>
      {erro && errors[erro] && <p role="alert" className="admin-form-error">{errors[erro]}</p>}
      <button className="button primary" type="submit">Entrar</button>
    </form>
    <Link href="/">Voltar ao site</Link>
  </div></main>;
}
