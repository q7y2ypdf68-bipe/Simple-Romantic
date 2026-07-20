import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogFooter, BlogHeader } from "../BlogChrome";
import { blogPosts, getPost } from "../posts";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: `${post.title} | Simple & Romantic`, description: post.excerpt };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return <main className="article-page">
    <BlogHeader />
    <article>
      <header className="article-header section"><Link className="article-back" href="/blog">← Voltar ao blog</Link><p className="eyebrow">{post.category}</p><h1>{post.title}</h1><p className="article-deck">{post.excerpt}</p><div className="article-meta"><span>{post.published}</span><span>{post.readTime}</span></div></header>
      <div className="article-hero-image"><Image src={post.image} alt={post.imageAlt} fill priority sizes="100vw" /></div>
      <div className="article-body">
        {post.intro.map((paragraph) => <p className="article-intro" key={paragraph}>{paragraph}</p>)}
        {post.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.items && <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul>}</section>)}
        <aside className="article-cta"><p className="eyebrow">TRANSFORME A IDEIA EM UM ENCONTRO</p><h2>Quer um plano simples para viver a dois?</h2><p>Informe o essencial e use nosso criador de encontros para começar.</p><Link className="button primary" href="/#encontrar">Criar nosso encontro <span>→</span></Link></aside>
      </div>
    </article>
    <BlogFooter />
  </main>;
}
