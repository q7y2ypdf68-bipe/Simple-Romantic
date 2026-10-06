import type { Metadata } from "next";
import { BlogFooter, BlogHeader } from "./BlogChrome";
import { getVisiblePosts } from "./posts-db";
import { BlogExplorer, type BlogListItem } from "./BlogExplorer";
import { desc, eq } from "drizzle-orm";
import { serializeStructuredData } from "../structured-data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description: "Conteúdo gratuito com ideias de encontros românticos, surpresas simples e lugares bonitos para casais.",
  alternates: { canonical: "/blog", languages: { "pt-BR": "/blog", "es-ES": "/es/blog", "x-default": "/blog" } },
  openGraph: {
    type: "website",
    url: "/blog",
    title: "Blog Simple & Romantic",
    description: "Ideias de encontros, surpresas e lugares bonitos para viver a dois sem gastar muito.",
    images: [{ url: "/images/blog/01-encontros-gratuitos.webp", alt: "Casal jovem adulto caminhando e sorrindo em um jardim público" }],
  },
};

export default async function BlogPage() {
  const blogPosts = await getVisiblePosts();
  const communityStories = await getPublishedStories();
  const siteUrl = "https://simpleandromantic.com";
  const items: BlogListItem[] = [
    ...blogPosts.map((post) => ({
      id: post.slug,
      href: `/blog/${post.slug}`,
      title: post.title,
      excerpt: post.excerpt,
      category: post.category,
      meta: post.readTime,
      image: post.image,
      imageAlt: post.imageAlt,
    })),
    ...communityStories.map((story) => ({
      id: `community-${story.id}`,
      href: `/blog/historias/${story.id}`,
      title: story.title,
      excerpt: `${story.content.slice(0, 180)}${story.content.length > 180 ? "…" : ""}`,
      category: "DA NOSSA COMUNIDADE",
      meta: story.anonymous ? "Publicação anônima" : story.authorName || "Comunidade Simple & Romantic",
      community: true,
    })),
  ];
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": `${siteUrl}/blog#blog`,
        url: `${siteUrl}/blog`,
        name: "Blog Simple & Romantic",
        description: metadata.description,
        inLanguage: "pt-BR",
      },
      {
        "@type": "ItemList",
        itemListElement: blogPosts.map((post, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${siteUrl}/blog/${post.slug}`,
          name: post.title,
        })),
      },
    ],
  };

  return (
    <main className="blog-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeStructuredData(structuredData) }} />
      <BlogHeader />
      <section className="blog-hero section">
        <p className="eyebrow">ROMANCE PARA A VIDA REAL</p>
        <h1>Ideias simples para criar<br />memórias bonitas.</h1>
        <p>Conteúdo gratuito e prático para casais que querem sair da rotina, aproveitar lugares públicos, preparar pequenas surpresas e viver momentos especiais sem gastar muito.</p>
      </section>
      <section className="editorial-schedule section" aria-labelledby="editorial-schedule-title">
        <div className="editorial-schedule-heading">
          <p className="eyebrow">NOSSO RITMO SEMANAL</p>
          <h2 id="editorial-schedule-title">Sempre há algo novo para viver e ler a dois.</h2>
          <p>Três encontros por semana com ideias, orientação e histórias. Os contos são sempre identificados como ficção, inspiração em fatos ou relato real.</p>
        </div>
        <div className="editorial-schedule-grid">
          <article><span>TER</span><div><p>Conselho da semana</p><small>Uma orientação breve, prática e acolhedora.</small></div></article>
          <article><span>QUI</span><div><p>Ideias e guias</p><small>Planos possíveis para colocar em prática.</small></div></article>
          <article><span>DOM</span><div><p>Contos de casais</p><small>Ficção, fatos inspiradores e histórias da comunidade.</small></div></article>
        </div>
      </section>
      <section className="blog-list section" aria-label="Artigos do blog">
        <BlogExplorer items={items} />
      </section>
      <BlogFooter />
    </main>
  );
}

async function getPublishedStories() {
  try {
    const [{ getDb }, { communitySubmissions }] = await Promise.all([import("../../db"), import("../../db/schema")]);
    return await getDb().select().from(communitySubmissions).where(eq(communitySubmissions.status, "published")).orderBy(desc(communitySubmissions.publishedAt)).limit(12);
  } catch {
    return [];
  }
}
