import type { Metadata } from "next";
import { LanguageSetter } from "../../components/LanguageSetter";
import { BlogExplorer, type BlogListItem } from "../../blog/BlogExplorer";
import { serializeStructuredData } from "../../structured-data";
import { BlogFooterEn, BlogHeaderEn } from "./BlogChromeEn";
import { getVisibleBlogPostsEn } from "./posts-en";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description: "Date ideas, small gestures and stories for real couples, on real budgets.",
  alternates: { canonical: "/en/blog", languages: { "pt-BR": "/blog", "es-ES": "/es/blog", en: "/en/blog", "x-default": "/blog" } },
  openGraph: { type: "website", locale: "en_US", url: "/en/blog", title: "Simple & Romantic Blog", description: "Simple ideas for beautiful memories as a couple.", images: [{ url: "/images/blog/13-o-olhar-que-ficou.webp", alt: "Mature couple looking at each other by the sea" }] },
};

export default function BlogPageEn() {
  const posts = getVisibleBlogPostsEn();
  const siteUrl = "https://simpleandromantic.com";
  const items: BlogListItem[] = posts.map((post) => ({ id: post.slug, href: `/en/blog/${post.slug}`, title: post.title, excerpt: post.excerpt, category: post.category, meta: post.readTime, image: post.image, imageAlt: post.imageAlt }));
  const structuredData = { "@context": "https://schema.org", "@type": "Blog", url: `${siteUrl}/en/blog`, name: "Simple & Romantic Blog", description: metadata.description, inLanguage: "en" };

  return <main className="blog-page spanish-page english-page"><LanguageSetter lang="en" /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeStructuredData(structuredData) }} /><BlogHeaderEn />
    <section className="blog-hero section"><p className="eyebrow">ROMANCE FOR REAL LIFE</p><h1>Simple ideas for<br />beautiful memories.</h1><p>Free, practical content for couples who want to break the routine, prepare small gestures and live special moments without spending much.</p></section>
    <section className="editorial-schedule section" aria-labelledby="weekly-rhythm-en"><div className="editorial-schedule-heading"><p className="eyebrow">OUR WEEKLY RHYTHM</p><h2 id="weekly-rhythm-en">There is always something new to live and read as a couple.</h2><p>Three moments a week with guidance, ideas and stories. Stories always say whether they are fiction, inspired by real events or true accounts.</p></div><div className="editorial-schedule-grid"><article><span>TUE</span><div><p>Tip of the week</p><small>Short, practical and warm guidance.</small></div></article><article><span>THU</span><div><p>Ideas and guides</p><small>Plans you can actually put into practice.</small></div></article><article><span>SUN</span><div><p>Couple stories</p><small>Fiction, inspiring true events and community stories.</small></div></article></div></section>
    <section className="blog-list section" aria-label="Blog articles">{items.length ? <BlogExplorer items={items} locale="en" /> : <div className="blog-empty"><span>♡</span><h2>Our English articles are on their way.</h2><p>We are translating them a few at a time. Meanwhile, create a date idea that fits your time and budget.</p><a className="button primary" href="/en/#encontrar">Find an idea <span>→</span></a></div>}</section><BlogFooterEn />
  </main>;
}
