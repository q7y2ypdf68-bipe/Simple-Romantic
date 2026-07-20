import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BlogFooter, BlogHeader } from "./BlogChrome";
import { blogPosts } from "./posts";

export const metadata: Metadata = {
  title: "Blog | Simple & Romantic",
  description: "Ideias de encontros românticos, surpresas simples e lugares bonitos para casais que querem viver mais gastando pouco.",
};

export default function BlogPage() {
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
        </div>
      </section>
      <BlogFooter />
    </main>
  );
}

function ArticleCard({ post }: { post: (typeof blogPosts)[number] }) {
  return <article className="blog-card">
    <Link className="blog-card-image" href={`/blog/${post.slug}`}><Image src={post.image} alt={post.imageAlt} fill sizes="(max-width: 700px) 100vw, 33vw" /></Link>
    <div className="blog-card-copy"><p className="eyebrow">{post.category}</p><h2><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2><p>{post.excerpt}</p><div className="blog-card-meta"><span>{post.readTime}</span><Link href={`/blog/${post.slug}`}>Ler artigo →</Link></div></div>
  </article>;
}
