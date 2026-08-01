import type { Metadata } from "next";
import { LanguageSetter } from "../../components/LanguageSetter";
import { BlogExplorer, type BlogListItem } from "../../blog/BlogExplorer";
import { serializeStructuredData } from "../../structured-data";
import { BlogFooterEs, BlogHeaderEs } from "./BlogChromeEs";
import { getVisibleBlogPostsEs } from "./posts-es";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog en español",
  description: "Ideas de citas románticas, pequeños gestos y cuentos para parejas reales, en español de España.",
  alternates: { canonical: "/es/blog", languages: { "pt-BR": "/blog", "es-ES": "/es/blog" } },
  openGraph: { type: "website", locale: "es_ES", url: "/es/blog", title: "Blog Simple & Romantic", description: "Ideas sencillas para crear recuerdos bonitos en pareja.", images: [{ url: "/images/blog/13-o-olhar-que-ficou.webp", alt: "Pareja adulta mirándose junto al mar" }] },
};

export default function BlogPageEs() {
  const posts = getVisibleBlogPostsEs();
  const siteUrl = "https://simple-and-romantic.brunolivercard2.chatgpt.site";
  const items: BlogListItem[] = posts.map((post) => ({ id: post.slug, href: `/es/blog/${post.slug}`, title: post.title, excerpt: post.excerpt, category: post.category, meta: post.readTime, image: post.image, imageAlt: post.imageAlt }));
  const structuredData = { "@context": "https://schema.org", "@type": "Blog", url: `${siteUrl}/es/blog`, name: "Blog Simple & Romantic en español", description: metadata.description, inLanguage: "es-ES" };

  return <main className="blog-page spanish-page"><LanguageSetter lang="es-ES" /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeStructuredData(structuredData) }} /><BlogHeaderEs />
    <section className="blog-hero section"><p className="eyebrow">ROMANCE PARA LA VIDA REAL</p><h1>Ideas sencillas para crear<br />recuerdos bonitos.</h1><p>Contenido gratuito y práctico para parejas que quieren salir de la rutina, preparar pequeños gestos y vivir momentos especiales sin gastar mucho.</p></section>
    <section className="editorial-schedule section" aria-labelledby="ritmo-editorial-es"><div className="editorial-schedule-heading"><p className="eyebrow">NUESTRO RITMO SEMANAL</p><h2 id="ritmo-editorial-es">Siempre hay algo nuevo que vivir y leer en pareja.</h2><p>Tres encuentros a la semana con orientación, ideas e historias. Los cuentos siempre indican si son ficción, inspiración en hechos o relatos reales.</p></div><div className="editorial-schedule-grid"><article><span>MAR</span><div><p>Consejo de la semana</p><small>Una orientación breve, práctica y cercana.</small></div></article><article><span>JUE</span><div><p>Ideas y guías</p><small>Planes posibles para llevar a la práctica.</small></div></article><article><span>DOM</span><div><p>Cuentos de parejas</p><small>Ficción, hechos inspiradores e historias de la comunidad.</small></div></article></div></section>
    <section className="blog-list section" aria-label="Artículos del blog"><BlogExplorer items={items} locale="es" /></section><BlogFooterEs />
  </main>;
}
