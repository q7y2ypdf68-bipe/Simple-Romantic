import type { Metadata } from "next";
import Link from "next/link";
import { LanguageSetter } from "../../components/LanguageSetter";
import { BlogFooterEs, BlogHeaderEs } from "../blog/BlogChromeEs";
import { CoupleWheel, WHEEL_ITEMS } from "../../components/CoupleWheel";

export const metadata: Metadata = {
  title: "Ruleta de pareja | Retos divertidos para dos",
  description: "Gira la ruleta y descubre un reto de cariño para hacer hoy con tu pareja: masaje, desayuno en la cama, baile en el salón y más.",
  alternates: { canonical: "/es/ruleta", languages: { "pt-BR": "/roleta", "es-ES": "/es/ruleta", en: "/en/wheel", "x-default": "/roleta" } },
  openGraph: { type: "website", locale: "es_ES", url: "/es/ruleta", title: "Ruleta de pareja", description: "Gira y descubre el reto de cariño de hoy.", images: [{ url: "/images/hero-park.webp", alt: "Pareja riendo en un pícnic" }] },
};

export default function WheelPageEs() {
  return <main className="online-guide wheel-page"><LanguageSetter lang="es-ES" /><BlogHeaderEs />
    <header className="guide-hero section"><p className="eyebrow">JUEGO PARA DOS · GRATIS</p><h1>Ruleta de pareja</h1><p>Gira, descubre el reto de hoy y cuidaos con ligereza. Son 12 gestos sencillos, para cualquier pareja.</p></header>
    <section className="section wheel-section"><CoupleWheel lang="es" /></section>
    <section className="guide-principles section"><article><span>01</span><h2>Alternad las rondas</h2><p>Quien gira es quien cumple el reto, para su pareja. En la siguiente ronda, cambiáis.</p></article><article><span>02</span><h2>Pasar vale 1 vez</h2><p>Cada uno puede pasar una vez por ronda, sin explicar. Quien pasa gira de nuevo.</p></article><article><span>03</span><h2>Hablad antes</h2><p>Si algo no le apetece a uno de los dos, basta con decir «paso». La idea es reír y cuidaros.</p></article></section>
    <section className="section wheel-list"><div className="section-heading centered"><p className="eyebrow">LOS 12 RETOS</p><h2>Lo que puede salir en la ruleta</h2></div><ol>{WHEEL_ITEMS.es.map((item) => <li key={item.s}><strong>{item.e} {item.s}</strong><span>{item.t}</span></li>)}</ol></section>
    <section className="guide-final section"><p className="eyebrow">¿QUERÉIS MÁS IDEAS?</p><h2>Después del reto, ¿qué tal una cita?</h2><p>El generador crea 3 ideas sencillas para vuestro fin de semana, y la guía gratuita reúne 30 citas que caben en el bolsillo.</p><div className="guide-hero-actions"><Link className="button primary" href="/es#encontrar">Generar 3 ideas <span>→</span></Link><Link className="quiet-link" href="/es/guia">Ver la guía gratuita</Link></div></section>
    <BlogFooterEs />
  </main>;
}
