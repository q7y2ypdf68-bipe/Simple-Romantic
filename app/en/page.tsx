import { coupleMetadata } from "../horoscopo-og";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LanguageSetter } from "../components/LanguageSetter";
import { IdeaFinder } from "../components/IdeaFinder";
import { CoupleHoroscope } from "../components/CoupleHoroscope";
import { MobileMenu } from "../components/MobileMenu";
import { ThemeToggle } from "../components/ThemeToggle";
import { getVisiblePostsLang } from "../blog/posts-db";

export const dynamic = "force-dynamic";

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ casal?: string | string[] }> }): Promise<Metadata> {
  return coupleMetadata("en", (await searchParams).casal);
}

export const metadata: Metadata = {
  title: "Simple & Romantic — Simple moments, beautiful memories",
  description: "Affordable date ideas, simple plans and small gestures for real couples.",
  alternates: { canonical: "/en", languages: { "pt-BR": "/", "es-ES": "/es", en: "/en", "x-default": "/" } },
  openGraph: { locale: "en_US", url: "/en", title: "Simple & Romantic", description: "Simple ideas to nurture your connection and create beautiful memories as a couple.", images: [{ url: "/images/hero-park.webp", alt: "Couple enjoying a picnic in a park" }] },
};

export default async function EnglishHome() {
  const posts = (await getVisiblePostsLang("en")).slice(0, 3);
  const links = [{ href: "/en/#encontrar", label: "Find an idea" }, { href: "/en/#lugares", label: "Places" }, { href: "/en/#como", label: "How it works" }, { href: "/en/guide", label: "Free guide" }, { href: "/en/blog", label: "Blog" }, { href: "/en/shop", label: "Shop" }, { href: "/en/community", label: "Community" }, { href: "/en/between-us", label: "Between us" }];
  return <main className="spanish-page english-page"><LanguageSetter lang="en" />
    <header className="site-header"><Link className="brand" href="/en" aria-label="Simple & Romantic — home"><span className="brand-heart" aria-hidden="true">♥</span><span className="brand-name"><strong>simple</strong><i>& romantic</i><small>SIMPLE MOMENTS · BEAUTIFUL MEMORIES</small></span></Link><nav aria-label="Main navigation"><a href="#encontrar">Find an idea</a><a href="#lugares">Places</a><a href="#como">How it works</a><Link href="/en/guide">Free guide</Link><Link href="/en/blog">Blog</Link><Link href="/en/shop">Shop</Link><Link href="/en/community">Community</Link><Link href="/en/between-us">Between us</Link></nav><div className="header-actions"><ThemeToggle locale="en" /><div className="language" aria-label="Language"><Link className="language-mobile-switch" href="/" hrefLang="pt-BR">PT-BR</Link><span>/</span><strong>EN</strong><span>/</span><Link className="language-mobile-switch" href="/es" hrefLang="es-ES">ES</Link></div><MobileMenu links={links} openLabel="Open menu" closeLabel="Close menu" /></div></header>

    <section className="hero" id="inicio"><div className="hero-copy"><p className="eyebrow">AFFORDABLE ROMANCE · REAL MOMENTS</p><h1>Romance doesn’t have<br /><em>to be expensive.</em></h1><p className="hero-text">Discover beautiful places, simple dates and small gestures to enjoy as a couple — close to you and within your budget.</p><div className="hero-actions"><a className="button primary" href="#encontrar">Find an idea <span>→</span></a><Link className="quiet-link" href="/en/blog">Read the blog</Link></div><div className="proof"><span>✓ Free content</span><span>✓ No hassle</span><span>✓ For real couples</span></div></div><div className="hero-scene"><Image unoptimized src="/images/hero-park.webp" alt="Couple smiling during a picnic in a park" fill priority sizes="(max-width: 1000px) 100vw, 49vw" /><div className="photo-wash" /><div className="picnic-card"><small>THIS WEEKEND</small><strong>Sunset, a blanket<br />and no rush.</strong><span>FREE OR LOW COST</span></div></div></section>

    <IdeaFinder lang="en" />
    <CoupleHoroscope lang="en" />

    <section className="section" id="empezar"><div className="section-heading centered"><p className="eyebrow">TO GET STARTED</p><h2>Three paths for this week</h2></div><div className="spanish-idea-grid"><article><span>01</span><h3>Go out without spending</h3><p>A walk, a blanket, something from home and a question worth a slow answer.</p><Link className="quiet-link" href="/en/#encontrar">Find a free idea →</Link></article><article><span>02</span><h3>Set something up today</h3><p>Spontaneous plans that need no booking and no weeks of planning.</p><Link className="quiet-link" href="/en/#encontrar">Pick a plan →</Link></article><article><span>03</span><h3>Reconnect</h3><p>Gestures and questions to leave autopilot and look at each other again.</p><Link className="quiet-link" href="/en/guide">Nurture the connection →</Link></article></div></section>

    <section className="places section" id="lugares"><div className="section-heading split"><div><p className="eyebrow">CLOSE TO YOU</p><h2>Simple places. Beautiful memories.</h2></div><p>We start with public spaces: pretty, accessible and perfect for slowing down together.</p></div><div className="place-grid">{[["Parks and gardens", "/images/hero-park.webp", "A blanket, some fruit and time without notifications."], ["Beaches and seafronts", "/images/beach-walk.webp", "A walk, a playlist and a changing sky."], ["Viewpoints and squares", "/images/viewpoint-surprise.webp", "A small surprise with a view that does the rest."]].map((card, index) => <article className="place-card" key={card[0]}><div className="place-art"><Image unoptimized src={card[1]} alt={card[0]} fill sizes="(max-width: 700px) 100vw, 34vw" /><small>{index === 1 ? "LOW COST" : "FREE"}</small></div><div className="place-copy"><small>0{index + 1}</small><h3>{card[0]}</h3><p>{card[2]}</p><Link href="/en/#encontrar">Find an idea →</Link></div></article>)}</div></section>

    <section className="home-blog section" id="como"><div className="blog-welcome"><p className="eyebrow">ROMANCE FOR REAL LIFE</p><h2>Love doesn’t have to wait for a special occasion.</h2><div className="blog-welcome-copy"><p><strong>Simple & Romantic</strong> was born for couples who want to share more moments without relying on expensive restaurants or big productions.</p><p>Here you will find ideas, stories, small gestures and guides to turn an ordinary day into a memory.</p><p>Because romance isn’t how much you spend. It’s noticing, caring and being present.</p></div><Link className="button primary" href="/en/blog">Explore the blog <span>→</span></Link></div>{posts.length > 0 && <><div className="section-heading split blog-heading"><div><p className="eyebrow">NEW READS</p><h2>Start with a simple idea.</h2></div><p>Tips, guides and stories published every Tuesday, Thursday and Sunday.</p></div><div className="blog-grid">{posts.map((post) => <article className="blog-card" key={post.slug}><Link className="blog-card-image" href={`/en/blog/${post.slug}`}><Image unoptimized src={post.image} alt={post.imageAlt} fill sizes="(max-width: 700px) 100vw, 33vw" /></Link><div className="blog-card-copy"><p className="eyebrow">{post.category}</p><h3><Link href={`/en/blog/${post.slug}`}>{post.title}</Link></h3><p>{post.excerpt}</p><div className="blog-card-meta"><span>{post.readTime}</span><Link href={`/en/blog/${post.slug}`}>Read →</Link></div></div></article>)}</div></>}</section>

    <section className="home-listening section"><div className="home-listening-symbol" aria-hidden="true">♡</div><div><p className="eyebrow">BETWEEN US · A LISTENING SPACE</p><h2>Is something weighing on your heart?</h2><p>You can write privately, without giving your name or email. We will read you with respect and, if you wish, leave a word of support.</p><div><Link className="button primary" href="/en/between-us">I’d like to be heard <span>→</span></Link><Link className="quiet-link" href="/en/between-us/reply">I already have a code</Link></div></div></section>

    <footer><Link className="brand footer-brand" href="/en"><span className="brand-heart">♥</span><span className="brand-name"><strong>simple</strong><i>& romantic</i></span></Link><p>Simple moments. Beautiful memories.</p><small>Free content for real couples, with real budgets.</small><div><Link href="/en/guide">Free guide</Link><Link href="/en/blog">Blog</Link><Link href="/en/shop">Shop</Link><Link href="/en/community">Community</Link><Link href="/en/between-us">Between us</Link><Link href="/en/privacy">Privacy</Link><Link href="/en/terms">Terms</Link><Link href="/en/community-guidelines">Guidelines</Link><Link href="/en/contact">Contact</Link></div></footer>
  </main>;
}
