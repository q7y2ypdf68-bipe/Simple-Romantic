"use client";

import { FormEvent, useMemo, useState } from "react";

type Language = "pt" | "en";

const copy = {
  pt: {
    nav: ["Encontrar uma ideia", "Lugares", "Como funciona", "Guias"],
    heroKicker: "ROMANCE ACESSÍVEL · MOMENTOS REAIS",
    heroTitleA: "Romance não precisa",
    heroTitleB: "ser caro.",
    heroText:
      "Descubra lugares bonitos, encontros simples e pequenas surpresas para viver a dois — perto de você e dentro do seu orçamento.",
    heroCta: "Encontrar uma ideia",
    explore: "Explorar lugares",
    proof: ["Ideias a partir de €0", "Sem complicações", "Para casais reais"],
    finderKicker: "O PLANO COMEÇA AQUI",
    finderTitle: "O que vocês gostariam de viver hoje?",
    finderText: "Conte-nos o essencial. Nós transformamos isso num encontro possível.",
    location: "Onde vocês estão?",
    locationPlaceholder: "Ex.: Lisboa, Porto, São Paulo…",
    budget: "Quanto querem gastar?",
    budgets: ["Grátis", "Até €10", "Até €25"],
    time: "Quanto tempo têm?",
    times: ["1 hora", "Uma tarde", "Um dia"],
    occasion: "Qual é a ocasião?",
    occasions: ["Encontro casual", "Uma surpresa", "Reconectar"],
    find: "Criar o nosso encontro",
    resultKicker: "UMA IDEIA PARA VOCÊS",
    resultTitle: "Piquenique ao pôr do sol",
    resultText:
      "Escolham um jardim ou miradouro próximo. Levem uma manta, duas bebidas e três músicas que contem a história de vocês. Cheguem 30 minutos antes do pôr do sol.",
    resultMeta: ["€0–€10", "1–2 horas", "Ao ar livre"],
    resultTip: "Pequeno detalhe",
    resultTipText: "Escreva uma frase num papel e entregue apenas quando o sol começar a desaparecer.",
    placesKicker: "PERTO DE VOCÊ",
    placesTitle: "Lugares simples. Memórias bonitas.",
    placesText: "Começamos por espaços públicos: bonitos, acessíveis e perfeitos para desacelerar juntos.",
    cards: [
      ["Jardins e parques", "Manta, fruta, uma bebida e tempo sem notificações.", "GRÁTIS", "Ver ideias"],
      ["Praias e marginais", "Uma caminhada, música partilhada e o melhor lugar para ver o céu mudar.", "€0–€10", "Ver ideias"],
      ["Miradouros e praças", "Uma surpresa pequena com uma vista que faz o resto do trabalho.", "GRÁTIS", "Ver ideias"],
    ],
    howKicker: "SIMPLES, COMO DEVE SER",
    howTitle: "Menos tempo a planear. Mais tempo juntos.",
    steps: [
      ["01", "Diga-nos o essencial", "Localização, orçamento, tempo disponível e o momento que querem criar."],
      ["02", "Receba um plano possível", "Uma ideia clara, com lista do que levar e alternativas para o clima."],
      ["03", "Torne-o pessoal", "Acrescente uma música, uma frase ou uma memória que só pertence a vocês."],
    ],
    guideKicker: "PARA GUARDAR E REPETIR",
    guideTitle: "30 encontros simples por menos de €20",
    guideText: "O nosso primeiro guia reúne planos rápidos, listas práticas e pequenas surpresas para todas as semanas.",
    guideCta: "Avise-me quando estiver pronto",
    mailPlaceholder: "O seu melhor e-mail",
    footer: "Momentos simples. Memórias bonitas.",
    footerNote: "Feito para casais reais, com orçamentos reais.",
    sent: "Perfeito! Vamos avisar você em primeira mão.",
  },
  en: {
    nav: ["Find an idea", "Places", "How it works", "Guides"],
    heroKicker: "AFFORDABLE ROMANCE · REAL MOMENTS",
    heroTitleA: "Romance doesn't have",
    heroTitleB: "to be expensive.",
    heroText:
      "Discover beautiful places, simple dates and thoughtful surprises to enjoy together — near you and within your budget.",
    heroCta: "Find an idea",
    explore: "Explore places",
    proof: ["Ideas from €0", "No complications", "For real couples"],
    finderKicker: "YOUR PLAN STARTS HERE",
    finderTitle: "What would you like to experience today?",
    finderText: "Tell us the essentials. We'll turn them into a date you can actually enjoy.",
    location: "Where are you?",
    locationPlaceholder: "E.g. Lisbon, London, New York…",
    budget: "How much would you like to spend?",
    budgets: ["Free", "Up to €10", "Up to €25"],
    time: "How much time do you have?",
    times: ["1 hour", "An afternoon", "A day"],
    occasion: "What's the occasion?",
    occasions: ["Casual date", "A surprise", "Reconnect"],
    find: "Create our date",
    resultKicker: "AN IDEA FOR YOU",
    resultTitle: "Sunset picnic",
    resultText:
      "Choose a nearby garden or viewpoint. Bring a blanket, two drinks and three songs that tell your story. Arrive 30 minutes before sunset.",
    resultMeta: ["€0–€10", "1–2 hours", "Outdoors"],
    resultTip: "A little detail",
    resultTipText: "Write one sentence on paper and share it only when the sun begins to disappear.",
    placesKicker: "NEAR YOU",
    placesTitle: "Simple places. Beautiful memories.",
    placesText: "We start with public spaces: beautiful, accessible and perfect for slowing down together.",
    cards: [
      ["Gardens & parks", "A blanket, fruit, a drink and time without notifications.", "FREE", "See ideas"],
      ["Beaches & waterfronts", "A walk, a shared playlist and the best place to watch the sky change.", "€0–€10", "See ideas"],
      ["Viewpoints & squares", "A small surprise with a view that does the rest of the work.", "FREE", "See ideas"],
    ],
    howKicker: "SIMPLE, AS IT SHOULD BE",
    howTitle: "Less time planning. More time together.",
    steps: [
      ["01", "Tell us the essentials", "Location, budget, available time and the moment you'd like to create."],
      ["02", "Get a realistic plan", "A clear idea, what to bring and useful alternatives for the weather."],
      ["03", "Make it personal", "Add a song, a note or a memory that belongs only to the two of you."],
    ],
    guideKicker: "SAVE IT. REPEAT IT.",
    guideTitle: "30 simple dates under €20",
    guideText: "Our first guide brings together quick plans, practical lists and thoughtful surprises for every week.",
    guideCta: "Tell me when it's ready",
    mailPlaceholder: "Your best email",
    footer: "Simple moments. Beautiful memories.",
    footerNote: "Made for real couples with real budgets.",
    sent: "Perfect! You'll be the first to know.",
  },
};

export default function Home() {
  const [language, setLanguage] = useState<Language>("pt");
  const [resultVisible, setResultVisible] = useState(false);
  const [message, setMessage] = useState("");
  const t = useMemo(() => copy[language], [language]);

  function createDate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResultVisible(true);
    requestAnimationFrame(() => document.querySelector("#resultado")?.scrollIntoView({ behavior: "smooth", block: "center" }));
  }

  function joinList(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(t.sent);
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Simple and Romantic — início">
          <span className="brand-heart" aria-hidden="true">S<span>&</span>R</span>
          <span className="brand-name">Simple <i>&</i> Romantic<small>SIMPLE MOMENTS · BEAUTIFUL MEMORIES</small></span>
        </a>
        <nav aria-label="Navegação principal">
          <a href="#encontrar">{t.nav[0]}</a><a href="#lugares">{t.nav[1]}</a><a href="#como">{t.nav[2]}</a><a href="#guias">{t.nav[3]}</a>
        </nav>
        <div className="language" aria-label="Idioma">
          <button className={language === "pt" ? "active" : ""} onClick={() => setLanguage("pt")}>PT</button>
          <span>/</span>
          <button className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")}>EN</button>
        </div>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow">{t.heroKicker}</p>
          <h1>{t.heroTitleA}<br /><em>{t.heroTitleB}</em></h1>
          <p className="hero-text">{t.heroText}</p>
          <div className="hero-actions">
            <a className="button primary" href="#encontrar">{t.heroCta}<span>→</span></a>
            <a className="quiet-link" href="#lugares">{t.explore}</a>
          </div>
          <div className="proof">{t.proof.map((item) => <span key={item}>✓ {item}</span>)}</div>
        </div>
        <div className="hero-scene" role="img" aria-label="Casal num jardim ao pôr do sol">
          <div className="sun" /><div className="cloud cloud-one" /><div className="cloud cloud-two" />
          <div className="hill hill-back" /><div className="hill hill-front" />
          <div className="tree"><span /><i /></div>
          <div className="couple person-one"><span /></div><div className="couple person-two"><span /></div>
          <div className="picnic-card"><small>THIS WEEKEND</small><strong>Sunset, a blanket<br />and no rush.</strong><span>€0 — €10</span></div>
        </div>
      </section>

      <section className="finder section" id="encontrar">
        <div className="section-heading centered"><p className="eyebrow">{t.finderKicker}</p><h2>{t.finderTitle}</h2><p>{t.finderText}</p></div>
        <form className="finder-form" onSubmit={createDate}>
          <label className="location-field"><span>01</span><strong>{t.location}</strong><input required placeholder={t.locationPlaceholder} /></label>
          <Choice number="02" title={t.budget} name="budget" options={t.budgets} />
          <Choice number="03" title={t.time} name="time" options={t.times} />
          <Choice number="04" title={t.occasion} name="occasion" options={t.occasions} />
          <button className="button primary finder-button" type="submit">{t.find}<span>→</span></button>
        </form>
        {resultVisible && <article className="date-result" id="resultado">
          <div className="result-visual"><span>☀</span><small>{t.resultMeta[0]}</small></div>
          <div className="result-copy"><p className="eyebrow">{t.resultKicker}</p><h3>{t.resultTitle}</h3><p>{t.resultText}</p><div className="result-meta">{t.resultMeta.map(item => <span key={item}>{item}</span>)}</div></div>
          <div className="result-tip"><span>♡</span><div><strong>{t.resultTip}</strong><p>{t.resultTipText}</p></div></div>
        </article>}
      </section>

      <section className="places section" id="lugares">
        <div className="section-heading split"><div><p className="eyebrow">{t.placesKicker}</p><h2>{t.placesTitle}</h2></div><p>{t.placesText}</p></div>
        <div className="place-grid">{t.cards.map((card, index) => <article className={`place-card place-${index + 1}`} key={card[0]}>
          <div className="place-art"><span>{index === 0 ? "✿" : index === 1 ? "≈" : "◒"}</span><small>{card[2]}</small></div>
          <div className="place-copy"><small>0{index + 1}</small><h3>{card[0]}</h3><p>{card[1]}</p><a href="#encontrar">{card[3]} →</a></div>
        </article>)}</div>
      </section>

      <section className="how section" id="como">
        <div className="section-heading centered light"><p className="eyebrow">{t.howKicker}</p><h2>{t.howTitle}</h2></div>
        <div className="steps">{t.steps.map(step => <article key={step[0]}><span>{step[0]}</span><h3>{step[1]}</h3><p>{step[2]}</p></article>)}</div>
      </section>

      <section className="guide section" id="guias">
        <div className="guide-cover"><span>30</span><strong>Simple<br />Dates</strong><small>UNDER €20</small></div>
        <div className="guide-copy"><p className="eyebrow">{t.guideKicker}</p><h2>{t.guideTitle}</h2><p>{t.guideText}</p>
          <form onSubmit={joinList}><input type="email" required placeholder={t.mailPlaceholder} aria-label={t.mailPlaceholder} /><button type="submit">{t.guideCta} →</button></form>
          <p className="form-message" aria-live="polite">{message}</p>
        </div>
      </section>

      <footer><a className="brand footer-brand" href="#inicio"><span className="brand-heart">S<span>&</span>R</span><span className="brand-name">Simple <i>&</i> Romantic</span></a><p>{t.footer}</p><small>{t.footerNote}</small><div><a href="#">Instagram</a><a href="#">Pinterest</a><a href="#">Privacy</a></div></footer>
    </main>
  );
}

function Choice({ number, title, name, options }: { number: string; title: string; name: string; options: string[] }) {
  return <fieldset><legend><span>{number}</span>{title}</legend><div className="choices">{options.map((option, index) => <label key={option}><input type="radio" name={name} value={option} defaultChecked={index === 0} /><span>{option}</span></label>)}</div></fieldset>;
}
