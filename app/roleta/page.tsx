import type { Metadata } from "next";
import Link from "next/link";
import { BlogFooter, BlogHeader } from "../blog/BlogChrome";
import { CoupleWheel, WHEEL_ITEMS } from "../components/CoupleWheel";

export const metadata: Metadata = {
  title: "Roleta do Casal | Desafios divertidos para dois",
  description: "Gire a roleta e descubra um desafio de carinho para fazer hoje com o seu par: massagem, café na cama, dança na sala e mais.",
  alternates: { canonical: "/roleta", languages: { "pt-BR": "/roleta", "es-ES": "/es/ruleta", en: "/en/wheel", "x-default": "/roleta" } },
  openGraph: { type: "website", url: "/roleta", title: "Roleta do Casal", description: "Gire e descubra o desafio de carinho de hoje.", images: [{ url: "/images/hero-park.webp", alt: "Casal rindo em um piquenique" }] },
};

export default function WheelPage() {
  return <main className="online-guide wheel-page"><BlogHeader />
    <header className="guide-hero section"><p className="eyebrow">JOGO PARA DOIS · GRÁTIS</p><h1>Roleta do Casal</h1><p>Gire, descubra o desafio de hoje e cuidem um do outro com leveza. São 12 gestos simples, para qualquer casal.</p></header>
    <section className="section wheel-section"><CoupleWheel lang="pt" /></section>
    <section className="guide-principles section"><article><span>01</span><h2>Alternem as rodadas</h2><p>Quem gira é quem cumpre o desafio, para o par. Na próxima rodada, trocam.</p></article><article><span>02</span><h2>Passar vale 1 vez</h2><p>Cada um pode passar uma vez por rodada, sem explicar. Quem passa gira de novo.</p></article><article><span>03</span><h2>Combinem antes</h2><p>Se algo não estiver bom para um dos dois, é só dizer “passo”. O objetivo é rir e se cuidar.</p></article></section>
    <section className="section wheel-list"><div className="section-heading centered"><p className="eyebrow">OS 12 DESAFIOS</p><h2>O que pode sair na roleta</h2></div><ol>{WHEEL_ITEMS.pt.map((item) => <li key={item.s}><strong>{item.e} {item.s}</strong><span>{item.t}</span></li>)}</ol></section>
    <section className="guide-final section"><p className="eyebrow">QUER MAIS IDEIAS?</p><h2>Depois do desafio, que tal um encontro?</h2><p>O gerador cria 3 ideias simples para o seu fim de semana, e o guia gratuito reúne 30 encontros que cabem no bolso.</p><div className="guide-hero-actions"><Link className="button primary" href="/#encontrar">Gerar 3 ideias <span>→</span></Link><Link className="quiet-link" href="/guia">Ver o guia gratuito</Link></div></section>
    <BlogFooter />
  </main>;
}
