import type { Metadata } from "next";
import Link from "next/link";
import { LanguageSetter } from "../../components/LanguageSetter";
import { serializeStructuredData } from "../../structured-data";
import { BlogFooterEn, BlogHeaderEn } from "../blog/BlogChromeEn";

export const metadata: Metadata = {
  title: "Shop coming soon — Simple & Romantic",
  description: "The future Simple & Romantic selection will bring together picnic items, couple experiences, gifts and adult intimacy products, with full transparency.",
  alternates: { canonical: "/en/shop", languages: { "pt-BR": "/loja", "es-ES": "/es/tienda", "en": "/en/shop", "x-default": "/loja" } },
  openGraph: { locale: "en_US", url: "/en/shop", title: "Shop coming soon — Simple & Romantic", description: "A carefully chosen selection for creating moments as a couple. There are no sales or open orders yet.", images: [{ url: "/images/hero-park.webp", alt: "Couple having a picnic in a park" }] },
};

const categories = [
  ["01", "Couple's picnic", "Sarongs, waterproof blankets, baskets and accessories designed for a simple outdoor date."],
  ["02", "Drinks and temperature", "Bottles, cups and insulated containers to look after every detail during the outing."],
  ["03", "Gifts and gestures", "Small objects and experiences that help turn attention into a memory."],
  ["04", "Intimacy and wellness 18+", "Adult products chosen with elegance, consent, discretion and clear information."],
];

export default function StorePageEn() {
  const structuredData = { "@context": "https://schema.org", "@type": "CollectionPage", name: "Shop coming soon — Simple & Romantic", description: "A future selection for moments as a couple.", inLanguage: "en" };
  return <main className="shop-page spanish-page"><LanguageSetter lang="en" /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeStructuredData(structuredData) }} /><BlogHeaderEn />
    <section className="shop-hero section"><p className="eyebrow">A SELECTION FOR MOMENTS AS A COUPLE</p><h1>We are preparing the shop<br /><em>calmly and transparently.</em></h1><p>We want to bring together products that are useful, beautiful and true to real life, without turning romance into an obligation to consume.</p><span className="shop-status">Coming soon · no sales or orders yet</span></section>
    <section className="shop-categories section"><div className="section-heading split"><div><p className="eyebrow">WHAT WE WANT TO SELECT</p><h2>Four ways to care for the moment.</h2></div><p>These categories present the editorial intention of the project. We will only publish products, prices, availability and partners after validating them.</p></div><div className="shop-category-grid">{categories.map(([number,title,text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="shop-process section"><div><p className="eyebrow">HOW IT WILL WORK</p><h2>Recommendations without hiding the commercial relationship.</h2></div><div className="shop-process-grid"><article><strong>1</strong><h3>Selection</h3><p>First we will assess usefulness, quality, presentation, safety and suitability for our audience.</p></article><article><strong>2</strong><h3>Transparency</h3><p>Each page will clearly state whether there is a partnership, commission or affiliate link.</p></article><article><strong>3</strong><h3>Free choice</h3><p>The free content will remain available. Buying will never be necessary to enjoy a good experience as a couple.</p></article></div></section>
    <section className="shop-readiness section"><div><p className="eyebrow">BEFORE WE OPEN</p><h2>What we still need to define.</h2><ul><li>verified partners and suppliers;</li><li>prices, availability, delivery and returns;</li><li>payment method and customer support;</li><li>specific rules for content and products intended for people over 18.</li></ul></div><aside><span>♡</span><h3>In the meantime</h3><p>The best Simple & Romantic ideas are still free on the blog.</p><Link className="button primary" href="/en/blog">Explore the blog <span>→</span></Link></aside></section>
    <BlogFooterEn />
  </main>;
}
