import { AdultGate } from "../../../components/AdultGate";
import type { Metadata } from "next";
import { articleAlternatesDb, getPostLang, getVisiblePostsLang } from "../../../blog/posts-db";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LanguageSetter } from "../../../components/LanguageSetter";
import { ShareButtons } from "../../../blog/ShareButtons";
import { serializeStructuredData } from "../../../structured-data";
import { BlogFooterEs, BlogHeaderEs } from "../BlogChromeEs";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = await getPostLang("es", (await params).slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt, alternates: { canonical: `/es/blog/${post.slug}`, languages: await articleAlternatesDb("es", post.slug) }, openGraph: { type: "article", locale: "es_ES", url: `/es/blog/${post.slug}`, siteName: "Simple & Romantic", title: post.title, description: post.excerpt, images: [{ url: post.image, alt: post.imageAlt }] } };
}

export default async function ArticlePageEs({ params }: { params: Promise<{ slug: string }> }) {
  const post = await getPostLang("es", (await params).slug);
  if (!post) notFound();
  const siteUrl = "https://simpleandromantic.com";
  const allPosts = await getVisiblePostsLang("es");
  const currentIndex = allPosts.findIndex((item) => item.slug === post.slug);
  const related = allPosts.filter((item) => item.slug !== post.slug).sort((a, b) => (a.category === post.category ? 0 : 1) - (b.category === post.category ? 0 : 1) || Math.abs(allPosts.indexOf(a) - currentIndex) - Math.abs(allPosts.indexOf(b) - currentIndex)).slice(0, 3);
  const structuredData = { "@context": "https://schema.org", "@type": "BlogPosting", headline: post.title, description: post.excerpt, image: `${siteUrl}${post.image}`, mainEntityOfPage: `${siteUrl}/es/blog/${post.slug}`, author: { "@type": "Organization", name: "Simple & Romantic" }, publisher: { "@type": "Organization", name: "Simple & Romantic" }, inLanguage: "es-ES", datePublished: post.publishedIso, dateModified: post.publishedIso };

  return <main className="article-page spanish-page"><LanguageSetter lang="es-ES" /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeStructuredData(structuredData) }} /><BlogHeaderEs />{post.contentNotice?.label === "+18" && <AdultGate lang="es" />}
    <article>
    <header className="article-header section"><nav className="article-breadcrumbs" aria-label="Ruta de la página"><Link href="/es">Inicio</Link><span>›</span><Link href="/es/blog">Blog</Link><span>›</span><span aria-current="page">{post.category}</span></nav><Link className="article-back" href="/es/blog">← Volver al blog</Link><p className="eyebrow">{post.category}</p><h1>{post.title}</h1><p className="article-deck">{post.excerpt}</p><div className="article-meta"><span>{post.published}</span><span>{post.readTime}</span></div></header>
    <div className="article-hero-image"><Image unoptimized src={post.image} alt={post.imageAlt} fill priority sizes="100vw" /></div>
    <div className="article-body"><ShareButtons title={post.title} path={`/es/blog/${post.slug}`} locale="es" />{post.contentNotice && <aside className="article-content-notice" aria-label="Identificación del contenido"><strong>{post.contentNotice.label}</strong><p>{post.contentNotice.text}</p></aside>}{post.intro.map((paragraph) => <p className="article-intro" key={paragraph}>{paragraph}</p>)}{post.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.items && <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul>}</section>)}
      <aside className="article-cta"><p className="eyebrow">CONVERTID LA IDEA EN UNA CITA</p><h2>¿Queréis un plan sencillo para vivir en pareja?</h2><p>Volved al inicio y cread una idea que encaje con vuestro tiempo y presupuesto.</p><div className="article-cta-actions"><Link className="button primary" href="/es/#encontrar">Crear nuestra cita <span>→</span></Link><Link className="article-guide-link" href="/es/blog">Ver más ideas <span>→</span></Link></div></aside>
    </div>
    <aside className="related-posts section" aria-label="Artículos relacionados"><div className="section-heading split"><div><p className="eyebrow">SEGUID INSPIRÁNDOOS</p><h2>Otras ideas para vosotros.</h2></div><p>Elegid la próxima lectura y convertid una idea sencilla en tiempo de calidad.</p></div><div className="related-grid">{related.map((item) => <article key={item.slug}><Link className="related-image" href={`/es/blog/${item.slug}`}><Image unoptimized src={item.image} alt={item.imageAlt} fill sizes="(max-width: 700px) 100vw, 33vw" /></Link><div><p className="eyebrow">{item.category}</p><h3><Link href={`/es/blog/${item.slug}`}>{item.title}</Link></h3><Link className="related-link" href={`/es/blog/${item.slug}`}>Leer artículo →</Link></div></article>)}</div></aside>
  </article><BlogFooterEs /></main>;
}
