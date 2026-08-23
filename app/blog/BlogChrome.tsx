import Link from "next/link";
import { MobileMenu } from "../components/MobileMenu";
import { ThemeToggle } from "../components/ThemeToggle";

export function BlogHeader() {
  const links = [
    { href: "/", label: "Início" },
    { href: "/#encontrar", label: "Encontrar uma ideia" },
    { href: "/#lugares", label: "Lugares" },
    { href: "/#como", label: "Como funciona" },
    { href: "/guia", label: "Guia gratuito" },
    { href: "/blog", label: "Blog" },
    { href: "/loja", label: "Loja" },
    { href: "/#comunidade", label: "Comunidade" },
    { href: "/entre-nos", label: "Entre nós" },
  ];

  return <header className="site-header blog-site-header"><Link className="brand" href="/"><span className="brand-heart">♥</span><span className="brand-name"><strong>simple</strong><i>& romantic</i><small>SIMPLE MOMENTS · BEAUTIFUL MEMORIES</small></span></Link><nav aria-label="Navegação principal"><Link href="/#encontrar">Encontrar uma ideia</Link><Link href="/#lugares">Lugares</Link><Link href="/#como">Como funciona</Link><Link href="/guia">Guia gratuito</Link><Link href="/blog">Blog</Link><Link href="/loja">Loja</Link><Link href="/#comunidade">Comunidade</Link><Link href="/entre-nos">Entre nós</Link></nav><div className="header-actions"><ThemeToggle /><Link className="language-shortcut" href="/es" hrefLang="es-ES" aria-label="Ver site em espanhol">ES</Link><Link className="back-home" href="/">Início</Link><MobileMenu links={links} /></div></header>;
}

export function BlogFooter() {
  return <footer><Link className="brand footer-brand" href="/"><span className="brand-heart">♥</span><span className="brand-name"><strong>simple</strong><i>& romantic</i></span></Link><p>Momentos simples. Memórias bonitas.</p><small>Conteúdo gratuito para casais reais, com orçamentos reais.</small><div><Link href="/">Início</Link><Link href="/guia">Guia gratuito</Link><Link href="/blog">Blog</Link><Link href="/loja">Loja</Link><Link href="/entre-nos">Entre nós</Link><Link href="/privacidade">Privacidade</Link><Link href="/termos">Termos</Link><Link href="/regras-da-comunidade">Regras</Link><Link href="/contato">Contato</Link></div></footer>;
}
