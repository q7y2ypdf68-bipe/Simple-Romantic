import { coupleMetadata } from "../horoscopo-og";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LanguageSetter } from "../components/LanguageSetter";
import { IdeaFinder } from "../components/IdeaFinder";
import { CoupleHoroscope } from "../components/CoupleHoroscope";
import { MobileMenu } from "../components/MobileMenu";
import { ThemeToggle } from "../components/ThemeToggle";
import { getVisiblePostsLang } from "../blog/posts-db";

export const dynamic = "force-dynamic";

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ casal?: string | string[] }> }): Promise<Metadata> {
  return coupleMetadata("es", (await searchParams).casal);
}

export const metadata: Metadata = {
  title: "Simple & Romantic en español — Momentos sencillos, recuerdos bonitos",
  description: "Ideas asequibles, citas sencillas y pequeños gestos para parejas reales, en español de España.",
  alternates: { canonical: "/es", languages: { "pt-BR": "/", "es-ES": "/es", en: "/en", "x-default": "/" } },
  openGraph: { locale: "es_ES", url: "/es", title: "Simple & Romantic en español", description: "Ideas sencillas para cuidar la conexión y crear recuerdos bonitos en pareja.", images: [{ url: "/images/hero-park.webp", alt: "Pareja disfrutando de un pícnic en un parque" }] },
};

export default async function SpanishHome() {
  const posts = (await getVisiblePostsLang("es")).slice(0, 3);
  const links = [{ href: "/es/#encontrar", label: "Encontrar una idea" }, { href: "/es/#lugares", label: "Lugares" }, { href: "/es/#como", label: "Cómo funciona" }, { href: "/es/guia", label: "Guía gratuita" }, { href: "/es/blog", label: "Blog" }, { href: "/es/tienda", label: "Tienda" }, { href: "/es/comunidad", label: "Comunidad" }, { href: "/es/entre-nos", label: "Entre nosotros" }];
  return <main className="spanish-page"><LanguageSetter lang="es-ES" />
    <header className="site-header"><Link className="brand" href="/es" aria-label="Simple & Romantic — inicio"><span className="brand-heart" aria-hidden="true">♥</span><span className="brand-name"><strong>simple</strong><i>& romantic</i><small>MOMENTOS SENCILLOS · RECUERDOS BONITOS</small></span></Link><nav aria-label="Navegación principal"><a href="#encontrar">Encontrar una idea</a><a href="#lugares">Lugares</a><a href="#como">Cómo funciona</a><Link href="/es/guia">Guía gratuita</Link><Link href="/es/blog">Blog</Link><Link href="/es/tienda">Tienda</Link><Link href="/es/comunidad">Comunidad</Link><Link href="/es/entre-nos">Entre nosotros</Link></nav><div className="header-actions"><ThemeToggle locale="es" /><div className="language" aria-label="Idioma"><Link className="language-mobile-switch" href="/" hrefLang="pt-BR">PT-BR</Link><span>/</span><Link className="language-mobile-switch" href="/en" hrefLang="en">EN</Link><span>/</span><strong>ES</strong></div><MobileMenu links={links} openLabel="Abrir menú" closeLabel="Cerrar menú" /></div></header>

    <section className="hero" id="inicio"><div className="hero-copy"><p className="eyebrow">ROMANCE ASEQUIBLE · MOMENTOS REALES</p><h1>El romanticismo no tiene<br /><em>por qué ser caro.</em></h1><p className="hero-text">Descubrid lugares bonitos, citas sencillas y pequeños gestos para vivir en pareja — cerca de vosotros y dentro de vuestro presupuesto.</p><div className="hero-actions"><a className="button primary" href="#encontrar">Encontrar una idea <span>→</span></a><Link className="quiet-link" href="/es/blog">Leer el blog</Link></div><div className="proof"><span>✓ Contenido gratuito</span><span>✓ Sin complicaciones</span><span>✓ Para parejas reales</span></div></div><div className="hero-scene"><Image unoptimized src="/images/hero-park.webp" alt="Pareja sonriendo durante un pícnic en un parque" fill priority sizes="(max-width: 1000px) 100vw, 49vw" /><div className="photo-wash" /><div className="picnic-card"><small>ESTE FIN DE SEMANA</small><strong>Un atardecer,<br />una manta y calma.</strong><span>GRATIS O ASEQUIBLE</span></div></div></section>

    <IdeaFinder lang="es" />
    <CoupleHoroscope lang="es" />

    <section className="section" id="empezar"><div className="section-heading centered"><p className="eyebrow">PARA EMPEZAR</p><h2>Tres caminos para esta semana</h2></div><div className="spanish-idea-grid"><article><span>01</span><h3>Salir sin gastar</h3><p>Un paseo, una manta, algo de casa y una pregunta que merezca una respuesta tranquila.</p><Link className="quiet-link" href="/es/blog/citas-romanticas-gratis-salir-de-la-rutina">Ver ideas gratuitas →</Link></article><article><span>02</span><h3>Preparar algo hoy</h3><p>Planes espontáneos que no requieren reserva ni semanas de organización.</p><Link className="quiet-link" href="/es/blog/cita-romantica-de-ultima-hora">Elegir un plan →</Link></article><article><span>03</span><h3>Volver a conectar</h3><p>Gestos y preguntas para dejar el piloto automático y volver a miraros.</p><Link className="quiet-link" href="/es/blog/como-reconectar-con-tu-pareja">Cuidar la conexión →</Link></article></div></section>

    <section className="places section" id="lugares"><div className="section-heading split"><div><p className="eyebrow">CERCA DE VOSOTROS</p><h2>Lugares sencillos. Recuerdos bonitos.</h2></div><p>Empezamos por espacios públicos: bonitos, accesibles y perfectos para bajar el ritmo juntos.</p></div><div className="place-grid">{[["Parques y jardines", "/images/hero-park.webp", "Una manta, fruta y tiempo sin notificaciones."], ["Playas y paseos marítimos", "/images/beach-walk.webp", "Un paseo, una lista de canciones y el cielo cambiando."], ["Miradores y plazas", "/images/viewpoint-surprise.webp", "Una pequeña sorpresa con unas vistas que hacen el resto."]].map((card, index) => <article className="place-card" key={card[0]}><div className="place-art"><Image unoptimized src={card[1]} alt={card[0]} fill sizes="(max-width: 700px) 100vw, 34vw" /><small>{index === 1 ? "BAJO COSTE" : "GRATIS"}</small></div><div className="place-copy"><small>0{index + 1}</small><h3>{card[0]}</h3><p>{card[2]}</p><Link href="/es/blog">Ver ideas →</Link></div></article>)}</div></section>

    <section className="home-blog section" id="como"><div className="blog-welcome"><p className="eyebrow">ROMANCE PARA LA VIDA REAL</p><h2>El amor no tiene que esperar una ocasión especial.</h2><div className="blog-welcome-copy"><p><strong>Simple & Romantic</strong> nace para parejas que desean compartir más momentos sin depender de restaurantes caros ni grandes producciones.</p><p>Aquí encontraréis ideas, cuentos, pequeños gestos y guías para convertir un día corriente en un recuerdo.</p><p>Porque el romanticismo no es cuánto se gasta. Es percibir, cuidar y estar presente.</p></div><Link className="button primary" href="/es/blog">Conocer el blog <span>→</span></Link></div><div className="section-heading split blog-heading"><div><p className="eyebrow">NUEVAS LECTURAS</p><h2>Empezad por una idea sencilla.</h2></div><p>Consejos, guías y cuentos publicados cada martes, jueves y domingo.</p></div><div className="blog-grid">{posts.map((post) => <article className="blog-card" key={post.slug}><Link className="blog-card-image" href={`/es/blog/${post.slug}`}><Image unoptimized src={post.image} alt={post.imageAlt} fill sizes="(max-width: 700px) 100vw, 33vw" /></Link><div className="blog-card-copy"><p className="eyebrow">{post.category}</p><h3><Link href={`/es/blog/${post.slug}`}>{post.title}</Link></h3><p>{post.excerpt}</p><div className="blog-card-meta"><span>{post.readTime}</span><Link href={`/es/blog/${post.slug}`}>Leer →</Link></div></div></article>)}</div></section>

    <section className="home-listening section"><div className="home-listening-symbol" aria-hidden="true">♡</div><div><p className="eyebrow">ENTRE NOSOTROS · UN ESPACIO DE ESCUCHA</p><h2>¿Hay algo que te pesa en el corazón?</h2><p>Puedes escribir de forma privada, sin indicar tu nombre ni correo. Te leeremos con respeto y, si lo deseas, dejaremos una palabra de apoyo.</p><div><Link className="button primary" href="/es/entre-nos">Quiero ser escuchado <span>→</span></Link><Link className="quiet-link" href="/es/entre-nos/respuesta">Ya tengo un código</Link></div></div></section>

    <footer><Link className="brand footer-brand" href="/es"><span className="brand-heart">♥</span><span className="brand-name"><strong>simple</strong><i>& romantic</i></span></Link><p>Momentos sencillos. Recuerdos bonitos.</p><small>Contenido gratuito para parejas reales, con presupuestos reales.</small><div><Link href="/es/guia">Guía gratuita</Link><Link href="/es/blog">Blog</Link><Link href="/es/tienda">Tienda</Link><Link href="/es/comunidad">Comunidad</Link><Link href="/es/entre-nos">Entre nosotros</Link><Link href="/es/privacidad">Privacidad</Link><Link href="/es/terminos">Condiciones</Link><Link href="/es/normas-de-la-comunidad">Normas</Link><Link href="/es/contacto">Contacto</Link></div></footer>
  </main>;
}
