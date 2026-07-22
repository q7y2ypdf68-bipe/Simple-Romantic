import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BlogFooter, BlogHeader } from "./BlogChrome";
import { blogPosts } from "./posts";
import { desc, eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog | Simple & Romantic",
  description: "Ideias de encontros românticos, surpresas simples e lugares bonitos para casais que querem viver mais gastando pouco.",
};

export default async function BlogPage() {
  const communityStories = await getPublishedStories();
  return (
    <main className="blog-page">
      <BlogHeader />
      <section className="blog-hero section">
        <p className="eyebrow">ROMANCE PARA A VIDA REAL</p>
        <h1>Ideias simples para criar<br />memórias bonitas.</h1>
        <p>Conteúdo prático para casais que querem sair da rotina, aproveitar lugares públicos, preparar pequenas surpresas e viver momentos especiais sem gastar muito.</p>
      </section>
      <section className="blog-list section" aria-label="Artigos do blog">
        <div className="blog-grid blog-grid-page">
          {blogPosts.map((post) => <ArticleCard key={post.slug} post={post} />)}
          {communityStories.map((story) => <CommunityCard key={story.id} story={story} />)}
        </div>
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

function ArticleCard({ post }: { post: (typeof blogPosts)[number] }) {
  return <article className="blog-card">
    <Link className="blog-card-image" href={`/blog/${post.slug}`}><Image src={post.image} alt={post.imageAlt} fill sizes="(max-width: 700px) 100vw, 33vw" /></Link>
    <div className="blog-card-copy"><p className="eyebrow">{post.category}</p><h2><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2><p>{post.excerpt}</p><div className="blog-card-meta"><span>{post.readTime}</span><Link href={`/blog/${post.slug}`}>Ler artigo →</Link></div></div>
  </article>;
}

function CommunityCard({ story }: { story: Awaited<ReturnType<typeof getPublishedStories>>[number] }) {
  const author = story.anonymous ? "Publicação anônima" : story.authorName || "Comunidade Simple & Romantic";
  return <article className="blog-card community-blog-card">
    <Link className="community-card-art" href={`/blog/historias/${story.id}`}><span>♥</span><small>HISTÓRIA REAL</small></Link>
    <div className="blog-card-copy"><p className="eyebrow">DA NOSSA COMUNIDADE</p><h2><Link href={`/blog/historias/${story.id}`}>{story.title}</Link></h2><p>{story.content.slice(0, 180)}{story.content.length > 180 ? "…" : ""}</p><div className="blog-card-meta"><span>{author}</span><Link href={`/blog/historias/${story.id}`}>Ler história →</Link></div></div>
  </article>;
}
