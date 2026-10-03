import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogFooter, BlogHeader } from "../BlogChrome";
import { getPostBySlug, getVisiblePosts } from "../posts-db";
import { blogPostsEs } from "../../es/blog/posts-es";
import { ShareButtons } from "../ShareButtons";
import { serializeStructuredData } from "../../structured-data";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  const blogPosts = await getVisiblePosts();
  const index = blogPosts.findIndex((item) => item.slug === post.slug);
  const spanishPost = blogPostsEs[index];
  return {
    title: post.seoTitle || post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}`, languages: { "pt-BR": `/blog/${post.slug}`, ...(spanishPost ? { "es-ES": `/es/blog/${spanishPost.slug}` } : {}), "x-default": `/blog/${post.slug}` } },
    openGraph: {
      type: "article",
      locale: "pt_BR",
      url: `/blog/${post.slug}`,
      siteName: "Simple & Romantic",
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image, alt: post.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();
  const blogPosts = await getVisiblePosts();
  const siteUrl = "https://simple-and-romantic.simple-and-romantic.workers.dev";
  const currentIndex = blogPosts.findIndex((item) => item.slug === post.slug);
  const relatedPosts = blogPosts
    .filter((item) => item.slug !== post.slug)
    .sort((a, b) => {
      const categoryScoreA = a.category === post.category ? 0 : 1;
      const categoryScoreB = b.category === post.category ? 0 : 1;
      if (categoryScoreA !== categoryScoreB) return categoryScoreA - categoryScoreB;
      return Math.abs(blogPosts.indexOf(a) - currentIndex) - Math.abs(blogPosts.indexOf(b) - currentIndex);
    })
    .slice(0, 3);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        image: `${siteUrl}${post.image}`,
        mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
        author: { "@id": `${siteUrl}/#organization` },
        publisher: { "@id": `${siteUrl}/#organization` },
        inLanguage: "pt-BR",
        ...(post.publishedIso ? { datePublished: post.publishedIso, dateModified: post.publishedIso } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: `${siteUrl}/blog/${post.slug}` },
        ],
      },
    ],
  };

  return <main className="article-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeStructuredData(structuredData) }} />
    <BlogHeader />
    <article className={post.slug === "pequenos-gestos-de-amor" ? "article-sr-n-003" : undefined}>
      <header className="article-header section"><nav className="article-breadcrumbs" aria-label="Caminho da página"><Link href="/">Início</Link><span>›</span><Link href="/blog">Blog</Link><span>›</span><span aria-current="page">{post.category}</span></nav><Link className="article-back" href="/blog">← Voltar ao blog</Link><p className="eyebrow">{post.category}</p><h1>{post.title}</h1><p className="article-deck">{post.excerpt}</p><div className="article-meta"><span>{post.published}</span><span>{post.readTime}</span></div></header>
      <div className="article-hero-image"><Image unoptimized src={post.image} alt={post.imageAlt} fill priority sizes="100vw" /></div>
      <div className="article-body">
        <ShareButtons title={post.title} path={`/blog/${post.slug}`} />
        {post.contentNotice && <aside className="article-content-notice" aria-label="Identificação do conteúdo"><strong>{post.contentNotice.label}</strong><p>{post.contentNotice.text}</p></aside>}
        {post.intro.map((paragraph) => <p className="article-intro" key={paragraph}>{paragraph}</p>)}
        {post.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.paragraphLink && <p>{section.paragraphLink.before}<Link href={section.paragraphLink.href}>{section.paragraphLink.linkText}</Link>{section.paragraphLink.after}</p>}{section.afterParagraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.items && <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul>}</section>)}
        <aside className="article-cta">
          <p className="eyebrow">TRANSFORME A IDEIA EM UM ENCONTRO</p>
          <h2>Quer um plano simples para viver a dois?</h2>
          <p>Use nosso criador de encontros ou consulte gratuitamente os 30 roteiros prontos do guia.</p>
          <div className="article-cta-actions">
            <Link className="button primary" href="/#encontrar">Criar nosso encontro <span>→</span></Link>
            <Link className="article-guide-link" href="/guia">Abrir o Guia Gratuito <span>→</span></Link>
            <Link className="article-guide-link" href="/#comunidade">Compartilhar sua história <span>→</span></Link>
          </div>
        </aside>
      </div>
      <aside className="related-posts section" aria-label="Artigos relacionados">
        <div className="section-heading split"><div><p className="eyebrow">CONTINUE SE INSPIRANDO</p><h2>Outras ideias para vocês.</h2></div><p>Escolha uma próxima leitura e transforme uma ideia simples em tempo de qualidade.</p></div>
        <div className="related-grid">{relatedPosts.map((related) => <article key={related.slug}><Link className="related-image" href={`/blog/${related.slug}`}><Image unoptimized src={related.image} alt={related.imageAlt} fill sizes="(max-width: 700px) 100vw, 33vw" /></Link><div><p className="eyebrow">{related.category}</p><h3><Link href={`/blog/${related.slug}`}>{related.title}</Link></h3><Link className="related-link" href={`/blog/${related.slug}`}>Ler artigo →</Link></div></article>)}</div>
      </aside>
    </article>
    <BlogFooter />
  </main>;
}
