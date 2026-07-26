import type { Metadata } from "next";
import Link from "next/link";
import { BlogFooter, BlogHeader } from "../blog/BlogChrome";
import guide from "../../content/guide-pt-br.json";

export const metadata: Metadata = {
  title: "30 encontros simples gastando pouco | Guia gratuito",
  description: "Guia gratuito com 30 encontros simples, roteiros, pequenos detalhes e planos alternativos para casais.",
  alternates: { canonical: "/guia" },
  openGraph: {
    type: "article",
    url: "/guia",
    title: "30 encontros simples gastando pouco",
    description: "Guia gratuito com ideias possíveis, roteiros e planos alternativos para casais.",
    images: [{ url: "/images/hero-park.webp", alt: "Casal aproveitando um encontro simples em um parque" }],
  },
};

export default function GuidePage() {
  return <main className="online-guide"><BlogHeader />
    <header className="guide-hero section"><p className="eyebrow">GUIA GRATUITO · SEM CONTEÚDO BLOQUEADO</p><h1>30 encontros simples<br />gastando pouco</h1><p>Ideias possíveis para criar presença, conversa e memórias bonitas usando lugares públicos e o que vocês já têm.</p><div className="guide-hero-actions"><Link className="button primary" href="/downloads/30-encontros-simples-gastando-pouco.pdf" download>Baixar o PDF gratuito <span>↓</span></Link><Link className="quiet-link" href="#encontros">Ver as 30 ideias</Link></div></header>
    <section className="guide-principles section"><article><span>01</span><h2>Escolham sem pressão</h2><p>Não é uma lista de obrigações. Comecem pela ideia que cabe no tempo e na energia de vocês.</p></article><article><span>02</span><h2>Adaptem à vida real</h2><p>Confiram clima, transporte, acessibilidade, regras do local e o que já existe em casa.</p></article><article><span>03</span><h2>Cuidem um do outro</h2><p>Consentimento, segurança e conforto valem mais que qualquer roteiro ou surpresa.</p></article></section>
    <section className="guide-list section" id="encontros"><div className="section-heading centered"><p className="eyebrow">ESCOLHAM UMA IDEIA</p><h2>O encontro começa no possível.</h2><p>Cada plano inclui lugar, duração, o que levar, um detalhe afetivo e uma alternativa.</p></div><div className="guide-grid">{guide.map(item => <article className="guide-card" key={item.number}><div className="guide-card-head"><span>{item.number}</span><div><p>{item.cost} · {item.duration}</p><h2>{item.title}</h2></div></div><dl><div><dt>Onde</dt><dd>{item.setting}</dd></div><div><dt>Levar</dt><dd>{item.bring}</dd></div><div><dt>O plano</dt><dd>{item.plan}</dd></div><div><dt>Pequeno detalhe</dt><dd>{item.detail}</dd></div><div><dt>Plano B</dt><dd>{item.backup}</dd></div></dl></article>)}</div></section>
    <section className="guide-final section"><p className="eyebrow">AGORA É COM VOCÊS</p><h2>Criem o encontro 31.</h2><p>Misturem uma atividade, uma conversa e um gesto com a cara de vocês. O objetivo nunca foi cumprir uma lista — foi voltar a escolher tempo juntos.</p><Link className="button primary" href="/#encontrar">Criar nosso encontro <span>→</span></Link></section>
    <BlogFooter />
  </main>;
}
