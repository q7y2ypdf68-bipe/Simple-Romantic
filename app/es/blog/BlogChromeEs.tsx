import Link from "next/link";
import { MobileMenu } from "../../components/MobileMenu";
import { ThemeToggle } from "../../components/ThemeToggle";

export function BlogHeaderEs() {
  const links = [
    { href: "/es", label: "Inicio" },
    { href: "/es/#encontrar", label: "Encontrar una idea" },
    { href: "/es/#lugares", label: "Lugares" },
    { href: "/es/#como", label: "Cómo funciona" },
    { href: "/guia", label: "Guía gratuita" },
    { href: "/es/blog", label: "Blog" },
    { href: "/#comunidade", label: "Comunidad" },
    { href: "/entre-nos", label: "Entre nosotros" },
  ];
  return <header className="site-header blog-site-header"><Link className="brand" href="/es"><span className="brand-heart">♥</span><span className="brand-name"><strong>simple</strong><i>& romantic</i><small>MOMENTOS SENCILLOS · RECUERDOS BONITOS</small></span></Link><nav aria-label="Navegación principal"><Link href="/es/#encontrar">Encontrar una idea</Link><Link href="/es/#lugares">Lugares</Link><Link href="/es/#como">Cómo funciona</Link><Link href="/guia">Guía gratuita</Link><Link href="/es/blog">Blog</Link><Link href="/#comunidade">Comunidad</Link><Link href="/entre-nos">Entre nosotros</Link></nav><div className="header-actions"><ThemeToggle locale="es" /><Link className="language-shortcut" href="/" hrefLang="pt-BR" aria-label="Ver el sitio en portugués">PT</Link><Link className="back-home" href="/es">Inicio</Link><MobileMenu links={links} openLabel="Abrir menú" closeLabel="Cerrar menú" /></div></header>;
}

export function BlogFooterEs() {
  return <footer><Link className="brand footer-brand" href="/es"><span className="brand-heart">♥</span><span className="brand-name"><strong>simple</strong><i>& romantic</i></span></Link><p>Momentos sencillos. Recuerdos bonitos.</p><small>Contenido gratuito para parejas reales, con presupuestos reales.</small><div><Link href="/es">Inicio</Link><Link href="/es/blog">Blog</Link><Link href="/entre-nos">Entre nosotros</Link><Link href="/privacidade">Privacidad</Link><Link href="/termos">Condiciones</Link><Link href="/contato">Contacto</Link></div></footer>;
}
