import type { Metadata } from "next";
import { articleAlternates } from "../../../blog/translations";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LanguageSetter } from "../../../components/LanguageSetter";
import { ShareButtons } from "../../../blog/ShareButtons";
import { blogPosts } from "../../../blog/posts";
import { serializeStructuredData } from "../../../structured-data";
import { BlogFooterEn, BlogHeaderEn } from "../BlogChromeEn";
import { blogPostsEn, getPostEn } from "../posts-en";

export function generateStaticParams() { return blogPostsEn.map((post) => ({ slug: post.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = getPostEn((await params).slug);
  if (!post) return {};
  const index = blogPostsEn.findIndex((item) => item.slug === post.slug);
  const portuguesePost = blogPosts[index];
  return { title: post.title, description: post.excerpt, alternates: { canonical: `/en/blog/${post.slug}`, languages: articleAlternates("en", post.slug) }, openGraph: { type: "article", locale: "en_US", url: `/en/blog/${post.slug}`, siteName: "Simple & Romantic", title: post.title, description: post.excerpt, images: [{ url: post.image, alt: post.imageAlt }] } };
}

export default async function ArticlePageEn({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPostEn((await params).slug);
  if (!post) notFound();
  const siteUrl = "https://simpleandromantic.com";
  const currentIndex = blogPostsEn.findIndex((item) => item.slug === post.slug);
  const related = blogPostsEn.filter((item) => item.slug !== post.slug).sort((a, b) => (a.category === post.category ? 0 : 1) - (b.category === post.category ? 0 : 1) || Math.abs(blogPostsEn.indexOf(a) - currentIndex) - Math.abs(blogPostsEn.indexOf(b) - currentIndex)).slice(0, 3);
  const structuredData = { "@context": "https://schema.org", "@type": "BlogPosting", headline: post.title, description: post.excerpt, image: `${siteUrl}${post.image}`, mainEntityOfPage: `${siteUrl}/en/blog/${post.slug}`, author: { "@type": "Organization", name: "Simple & Romantic" }, publisher: { "@type": "Organization", name: "Simple & Romantic" }, inLanguage: "en", datePublished: post.publishedIso, dateModified: post.publishedIso };

  return <main className="article-page spanish-page english-page"><LanguageSetter lang="en" /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeStructuredData(structuredData) }} /><BlogHeaderEn /><article>
    <header className="article-header section"><nav className="article-breadcrumbs" aria-label="Page path"><Link href="/en">Home</Link><span>›</span><Link href="/en/blog">Blog</Link><span>›</span><span aria-current="page">{post.category}</span></nav><Link className="article-back" href="/en/blog">← Back to the blog</Link><p className="eyebrow">{post.category}</p><h1>{post.title}</h1><p className="article-deck">{post.excerpt}</p><div className="article-meta"><span>{post.published}</span><span>{post.readTime}</span></div></header>
    <div className="article-hero-image"><Image unoptimized src={post.image} alt={post.imageAlt} fill priority sizes="100vw" /></div>
    <div className="article-body"><ShareButtons title={post.title} path={`/en/blog/${post.slug}`} locale="en" />{post.contentNotice && <aside className="article-content-notice" aria-label="Content type"><strong>{post.contentNotice.label}</strong><p>{post.contentNotice.text}</p></aside>}{post.intro.map((paragraph) => <p className="article-intro" key={paragraph}>{paragraph}</p>)}{post.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.items && <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul>}</section>)}
      <aside className="article-cta"><p className="eyebrow">TURN THE IDEA INTO A DATE</p><h2>Want a simple plan to enjoy as a couple?</h2><p>Go back to the start and create an idea that fits your time and budget.</p><div className="article-cta-actions"><Link className="button primary" href="/en/#encontrar">Create our date <span>→</span></Link><Link className="article-guide-link" href="/en/blog">See more ideas <span>→</span></Link></div></aside>
    </div>
    <aside className="related-posts section" aria-label="Related articles"><div className="section-heading split"><div><p className="eyebrow">KEEP BEING INSPIRED</p><h2>More ideas for you two.</h2></div><p>Pick your next read and turn a simple idea into quality time.</p></div><div className="related-grid">{related.map((item) => <article key={item.slug}><Link className="related-image" href={`/en/blog/${item.slug}`}><Image unoptimized src={item.image} alt={item.imageAlt} fill sizes="(max-width: 700px) 100vw, 33vw" /></Link><div><p className="eyebrow">{item.category}</p><h3><Link href={`/en/blog/${item.slug}`}>{item.title}</Link></h3><Link className="related-link" href={`/en/blog/${item.slug}`}>Read article →</Link></div></article>)}</div></aside>
  </article><BlogFooterEn /></main>;
}
