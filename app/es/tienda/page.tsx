import type { Metadata } from "next";
import Link from "next/link";
import { LanguageSetter } from "../../components/LanguageSetter";
import { serializeStructuredData } from "../../structured-data";
import { BlogFooterEs, BlogHeaderEs } from "../blog/BlogChromeEs";

export const metadata: Metadata = {
  title: "Tienda en preparación — Simple & Romantic",
  description: "La futura selección de Simple & Romantic reunirá artículos para pícnics, experiencias en pareja, regalos e intimidad adulta, con transparencia.",
  alternates: { canonical: "/es/tienda", languages: { "pt-BR": "/loja", "es-ES": "/es/tienda", "x-default": "/loja" } },
  openGraph: { locale: "es_ES", url: "/es/tienda", title: "Tienda en preparación — Simple & Romantic", description: "Una selección cuidada para crear momentos en pareja. Todavía no hay ventas ni pedidos abiertos.", images: [{ url: "/images/hero-park.webp", alt: "Pareja durante un pícnic en un parque" }] },
};

const categories = [
  ["01", "Pícnic en pareja", "Pareo, mantas impermeables, cestas y accesorios pensados para una cita sencilla al aire libre."],
  ["02", "Bebidas y temperatura", "Botellas, vasos y recipientes térmicos para cuidar cada detalle durante el paseo."],
  ["03", "Regalos y gestos", "Pequeños objetos y experiencias que ayuden a convertir la atención en un recuerdo."],
  ["04", "Intimidad y bienestar 18+", "Productos para adultos seleccionados con elegancia, consentimiento, discreción e información clara."],
];

export default function StorePageEs() {
  const structuredData = { "@context": "https://schema.org", "@type": "CollectionPage", name: "Tienda en preparación — Simple & Romantic", description: "Selección futura para momentos en pareja.", inLanguage: "es-ES" };
  return <main className="shop-page spanish-page"><LanguageSetter lang="es-ES" /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeStructuredData(structuredData) }} /><BlogHeaderEs />
    <section className="shop-hero section"><p className="eyebrow">UNA SELECCIÓN PARA MOMENTOS EN PAREJA</p><h1>Estamos preparando la tienda<br /><em>con calma y transparencia.</em></h1><p>Queremos reunir productos útiles, bonitos y coherentes con la vida real, sin convertir el romanticismo en una obligación de consumo.</p><span className="shop-status">En preparación · todavía no hay ventas ni pedidos</span></section>
    <section className="shop-categories section"><div className="section-heading split"><div><p className="eyebrow">QUÉ QUEREMOS SELECCIONAR</p><h2>Cuatro formas de cuidar el momento.</h2></div><p>Estas categorías presentan la intención editorial del proyecto. Solo publicaremos productos, precios, disponibilidad y colaboradores después de validarlos.</p></div><div className="shop-category-grid">{categories.map(([number,title,text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="shop-process section"><div><p className="eyebrow">CÓMO FUNCIONARÁ</p><h2>Recomendaciones sin ocultar la relación comercial.</h2></div><div className="shop-process-grid"><article><strong>1</strong><h3>Selección</h3><p>Primero evaluaremos utilidad, calidad, presentación, seguridad y adecuación al público.</p></article><article><strong>2</strong><h3>Transparencia</h3><p>Cada página indicará claramente si existe colaboración, comisión o enlace de afiliado.</p></article><article><strong>3</strong><h3>Elección libre</h3><p>El contenido gratuito seguirá disponible. Comprar nunca será necesario para vivir una buena experiencia en pareja.</p></article></div></section>
    <section className="shop-readiness section"><div><p className="eyebrow">ANTES DE ABRIR</p><h2>Lo que aún debemos definir.</h2><ul><li>colaboradores y proveedores verificados;</li><li>precios, disponibilidad, entrega y devoluciones;</li><li>forma de pago y atención al cliente;</li><li>normas específicas para contenido y productos destinados a mayores de 18 años.</li></ul></div><aside><span>♡</span><h3>Mientras tanto</h3><p>Las mejores ideas de Simple & Romantic siguen siendo gratuitas en el blog.</p><Link className="button primary" href="/es/blog">Explorar el blog <span>→</span></Link></aside></section>
    <BlogFooterEs />
  </main>;
}
