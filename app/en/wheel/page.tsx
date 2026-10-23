import type { Metadata } from "next";
import Link from "next/link";
import { LanguageSetter } from "../../components/LanguageSetter";
import { BlogFooterEn, BlogHeaderEn } from "../blog/BlogChromeEn";
import { CoupleWheel } from "../../components/CoupleWheel";
import { WHEEL_ITEMS } from "../../components/wheel-data";

export const metadata: Metadata = {
  title: "Couple's Wheel | Fun challenges for two",
  description: "Spin the wheel and find a caring challenge to do today with your partner: a massage, breakfast in bed, a dance in the living room and more.",
  alternates: { canonical: "/en/wheel", languages: { "pt-BR": "/roleta", "es-ES": "/es/ruleta", en: "/en/wheel", "x-default": "/roleta" } },
  openGraph: { type: "website", locale: "en_US", url: "/en/wheel", title: "Couple's Wheel", description: "Spin and find today's caring challenge.", images: [{ url: "/images/hero-park.webp", alt: "Couple laughing on a picnic" }] },
};

export default function WheelPageEn() {
  return <main className="online-guide wheel-page"><LanguageSetter lang="en" /><BlogHeaderEn />
    <header className="guide-hero section"><p className="eyebrow">A GAME FOR TWO · FREE</p><h1>Couple's Wheel</h1><p>Spin, find today's challenge and take care of each other, lightly. Twelve simple gestures, for any couple.</p></header>
    <section className="section wheel-section"><CoupleWheel lang="en" /></section>
    <section className="guide-principles section"><article><span>01</span><h2>Take turns</h2><p>Whoever spins is the one who does the challenge, for their partner. Next round, you swap.</p></article><article><span>02</span><h2>One pass per round</h2><p>Each of you can pass once per round, no explanation needed. Pass, and spin again.</p></article><article><span>03</span><h2>Agree first</h2><p>If something doesn't feel right for either of you, just say “pass”. The goal is to laugh and care.</p></article></section>
    <section className="section wheel-list"><div className="section-heading centered"><p className="eyebrow">THE 12 CHALLENGES</p><h2>What the wheel can land on</h2></div><ol>{WHEEL_ITEMS.en.map((item) => <li key={item.s}><strong>{item.e} {item.s}</strong><span>{item.t}</span></li>)}</ol></section>
    <section className="guide-final section"><p className="eyebrow">WANT MORE IDEAS?</p><h2>After the challenge, how about a date?</h2><p>The generator creates 3 simple ideas for your weekend, and the free guide has 30 dates that fit any budget.</p><div className="guide-hero-actions"><Link className="button primary" href="/en#encontrar">Get 3 ideas <span>→</span></Link><Link className="quiet-link" href="/en/guide">See the free guide</Link></div></section>
    <BlogFooterEn />
  </main>;
}
