import type { Metadata } from "next";
import Link from "next/link";
import { BlogFooter, BlogHeader } from "../blog/BlogChrome";
import { ListeningForm } from "./ListeningForm";

export const metadata: Metadata = {
  title: "Entre nós — um espaço para ser ouvido",
  description: "Um espaço privado de escuta e acolhimento para adultos que precisam colocar em palavras o que estão sentindo.",
  alternates: { canonical: "/entre-nos" },
};

export default function ListeningPage() {
  return <main className="listening-page">
    <BlogHeader />
    <section className="listening-hero section">
      <div className="listening-hero-copy">
        <p className="eyebrow">ENTRE NÓS · UM ESPAÇO PARA SER OUVIDO</p>
        <h1>Pode falar.<br /><em>Sua história importa.</em></h1>
        <p>Às vezes, colocar em palavras aquilo que está preso dentro de nós já é o começo de um pouco de alívio. Escreva do seu jeito. Nós vamos ler com respeito.</p>
        <div className="listening-hero-actions"><a className="button primary" href="#desabafar">Quero desabafar <span>↓</span></a><Link className="quiet-link" href="/entre-nos/resposta">Consultar acolhimento</Link></div>
      </div>
      <div className="listening-promise" aria-label="Nosso compromisso">
        <span aria-hidden="true">♡</span>
        <p>Nossa promessa</p>
        <strong>Escutar antes de responder.</strong>
        <small>Sem julgamento. Sem publicação automática. Sem respostas vazias.</small>
      </div>
    </section>

    <section className="listening-principles section" aria-label="Como funciona">
      <article><span>01</span><h2>Privado por padrão</h2><p>Seu relato entra numa área reservada e não aparece publicamente.</p></article>
      <article><span>02</span><h2>Você escolhe</h2><p>Pode apenas desabafar ou pedir uma palavra de acolhimento e reflexão.</p></article>
      <article><span>03</span><h2>Resposta humana</h2><p>Cada mensagem é revisada individualmente. Nada é respondido automaticamente.</p></article>
    </section>

    <section className="listening-form-section section" id="desabafar">
      <div className="listening-form-intro">
        <p className="eyebrow">ESTE MOMENTO É SEU</p>
        <h2>O que está no seu coração?</h2>
        <p>Não precisa escrever bonito, explicar tudo ou encontrar as palavras perfeitas. Apenas evite nomes completos, telefones, endereços, documentos e detalhes que identifiquem outras pessoas.</p>
        <aside className="listening-safety"><strong>Este não é um serviço de emergência.</strong><p>As mensagens não são monitoradas em tempo real. Em perigo imediato, procure a emergência do seu país.</p><div><span><b>Portugal:</b> 112 · SNS 24: 808 24 24 24</span><span><b>Brasil:</b> SAMU 192 · CVV 188 · Polícia 190</span></div></aside>
      </div>
      <ListeningForm />
    </section>

    <section className="listening-aftercare section">
      <p className="eyebrow">O QUE ACONTECE DEPOIS</p>
      <h2>Você não precisa ficar esperando diante da tela.</h2>
      <p>Depois do envio, você receberá um código particular. Guarde-o para consultar, quando quiser, se o relato foi lido e se deixamos uma palavra para você.</p>
      <Link className="button primary" href="/entre-nos/resposta">Já tenho um código <span>→</span></Link>
    </section>
    <BlogFooter />
  </main>;
}
