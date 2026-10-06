import type { Metadata } from "next";
import Link from "next/link";
import { BlogFooter, BlogHeader } from "../blog/BlogChrome";
import { serializeStructuredData } from "../structured-data";

export const metadata: Metadata = {
  title: "Loja em preparação — Simple & Romantic",
  description: "A futura curadoria Simple & Romantic reunirá itens para piqueniques, experiências a dois, presentes e intimidade adulta, com transparência.",
  alternates: { canonical: "/loja", languages: { "pt-BR": "/loja", "es-ES": "/es/tienda", en: "/en/shop", "x-default": "/loja" } },
  openGraph: { locale: "pt_BR", url: "/loja", title: "Loja em preparação — Simple & Romantic", description: "Uma curadoria cuidadosa para criar momentos a dois. Ainda não há vendas nem encomendas abertas.", images: [{ url: "/images/hero-park.webp", alt: "Casal durante um piquenique num parque" }] },
};

const categories = [
  ["01", "Piquenique a dois", "Cangas, mantas impermeáveis, cestos e acessórios pensados para um encontro simples ao ar livre."],
  ["02", "Bebidas e temperatura", "Garrafas, copos e recipientes térmicos para manter cada detalhe agradável durante o passeio."],
  ["03", "Presentes e gestos", "Pequenos objetos e experiências que ajudem a transformar atenção em memória."],
  ["04", "Intimidade e bem-estar 18+", "Produtos adultos selecionados com elegância, consentimento, discrição e informação clara."],
];

export default function StorePage() {
  const structuredData = { "@context": "https://schema.org", "@type": "CollectionPage", name: "Loja em preparação — Simple & Romantic", description: "Curadoria futura para momentos a dois.", inLanguage: "pt-BR" };
  return <main className="shop-page"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeStructuredData(structuredData) }} /><BlogHeader />
    <section className="shop-hero section"><p className="eyebrow">UMA CURADORIA PARA MOMENTOS A DOIS</p><h1>A loja está a ser preparada<br /><em>com calma e transparência.</em></h1><p>Queremos reunir produtos úteis, bonitos e coerentes com a vida real — sem transformar o romantismo numa obrigação de consumo.</p><span className="shop-status">Em preparação · ainda não existem vendas nem encomendas</span></section>
    <section className="shop-categories section"><div className="section-heading split"><div><p className="eyebrow">O QUE PRETENDEMOS SELECIONAR</p><h2>Quatro formas de cuidar do momento.</h2></div><p>As categorias são uma apresentação editorial do projeto. Produtos, preços, disponibilidade e parceiros só serão publicados depois de validação.</p></div><div className="shop-category-grid">{categories.map(([number,title,text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="shop-process section"><div><p className="eyebrow">COMO FUNCIONARÁ</p><h2>Recomendação sem esconder a relação comercial.</h2></div><div className="shop-process-grid"><article><strong>1</strong><h3>Curadoria</h3><p>Primeiro avaliamos utilidade, qualidade, apresentação, segurança e adequação ao público.</p></article><article><strong>2</strong><h3>Transparência</h3><p>Cada página indicará claramente quando existir parceria, comissão ou link de afiliado.</p></article><article><strong>3</strong><h3>Escolha livre</h3><p>O conteúdo gratuito continuará disponível. Comprar nunca será condição para viver uma boa experiência a dois.</p></article></div></section>
    <section className="shop-readiness section"><div><p className="eyebrow">ANTES DA ABERTURA</p><h2>O que ainda precisa ser definido.</h2><ul><li>parceiros e fornecedores verificados;</li><li>preços, disponibilidade, entrega e devoluções;</li><li>forma de pagamento e apoio ao cliente;</li><li>regras específicas para conteúdo e produtos destinados a maiores de 18 anos.</li></ul></div><aside><span>♡</span><h3>Enquanto isso</h3><p>As melhores ideias do Simple & Romantic continuam gratuitas no blog.</p><Link className="button primary" href="/blog">Explorar o blog <span>→</span></Link></aside></section>
    <BlogFooter />
  </main>;
}
