"use client";

import { FormEvent, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getVisibleBlogPosts } from "./blog/posts";
import { MobileMenu } from "./components/MobileMenu";
import { ThemeToggle } from "./components/ThemeToggle";

type Language = "pt" | "en";

const copy = {
  pt: {
    nav: ["Encontrar uma ideia", "Lugares", "Como funciona", "Guia gratuito", "Blog", "Comunidade", "Entre nós"],
    heroKicker: "ROMANCE ACESSÍVEL · MOMENTOS REAIS",
    heroTitleA: "Romance não precisa",
    heroTitleB: "ser caro.",
    heroText:
      "Descubra lugares bonitos, encontros simples e pequenas surpresas para viver a dois — perto de você e dentro do seu orçamento.",
    heroCta: "Encontrar uma ideia",
    explore: "Explorar lugares",
    proof: ["Conteúdo 100% gratuito", "Sem complicação", "Para casais reais"],
    finderKicker: "O PLANO COMEÇA AQUI",
    finderTitle: "O que vocês gostariam de viver hoje?",
    finderText: "Conte o essencial. A gente transforma isso em um encontro possível.",
    location: "Onde vocês estão?",
    locationPlaceholder: "Ex.: São Paulo, Salvador, Lisboa…",
    budget: "Quanto vocês querem gastar?",
    budgets: ["Grátis", "Baixo custo", "Um pouco mais"],
    time: "Quanto tempo vocês têm?",
    times: ["1 hora", "Uma tarde", "Um dia"],
    occasion: "Qual é a ocasião?",
    occasions: ["Encontro casual", "Uma surpresa", "Reconectar"],
    find: "Criar o nosso encontro",
    resultKicker: "UMA IDEIA PARA VOCÊS",
    resultTitle: "Piquenique ao pôr do sol",
    resultText:
      "Escolham um parque ou mirante próximo. Levem uma toalha, duas bebidas e três músicas que contem a história de vocês. Cheguem 30 minutos antes do pôr do sol.",
    resultMeta: ["Grátis ou baixo custo", "1–2 horas", "Ao ar livre"],
    resultTip: "Pequeno detalhe",
    resultTipText: "Escreva uma frase num papel e entregue apenas quando o sol começar a desaparecer.",
    placesKicker: "PERTO DE VOCÊ",
    placesTitle: "Lugares simples. Memórias bonitas.",
    placesText: "A gente começa pelos espaços públicos: bonitos, acessíveis e perfeitos para desacelerar juntos.",
    cards: [
      ["Jardins e parques", "Manta, fruta, uma bebida e tempo sem notificações.", "GRÁTIS", "Ver ideias"],
      ["Praias e orlas", "Uma caminhada, uma playlist compartilhada e o melhor lugar para ver o céu mudar.", "BAIXO CUSTO", "Ver ideias"],
      ["Mirantes e praças", "Uma surpresa pequena com uma vista que faz o resto do trabalho.", "GRÁTIS", "Ver ideias"],
    ],
    howKicker: "SIMPLES, COMO DEVE SER",
    howTitle: "Menos tempo planejando. Mais tempo juntos.",
    steps: [
      ["01", "Conte o essencial", "Localização, orçamento, tempo disponível e o momento que vocês querem criar."],
      ["02", "Receba um plano possível", "Uma ideia clara, com lista do que levar e alternativas para o clima."],
      ["03", "Deixe com a cara de vocês", "Acrescente uma música, uma frase ou uma memória que só pertence ao casal."],
    ],
    guideKicker: "PARA GUARDAR E REPETIR",
    guideTitle: "30 encontros simples gastando pouco",
    guideText: "Nosso primeiro guia gratuito reúne planos rápidos, listas práticas e pequenas surpresas para todas as semanas.",
    guideCta: "Quero receber o guia",
    mailPlaceholder: "Seu melhor e-mail",
    footer: "Momentos simples. Memórias bonitas.",
    footerNote: "Conteúdo gratuito para casais reais, com orçamentos reais.",
    sent: "Perfeito! Você vai saber em primeira mão.",
    communityKicker: "HISTÓRIAS QUE APROXIMAM",
    communityTitle: "Sua história também pode inspirar alguém.",
    communityText: "Conte um momento especial, compartilhe uma ideia de encontro ou aquela surpresa simples que deu certo. Sua contribuição pode ajudar outros casais a criarem novas memórias.",
    communityTypes: ["Nossa história", "Ideia de encontro", "Uma surpresa"],
    communityName: "Seu nome ou apelido (opcional)",
    communityEmail: "Seu e-mail",
    communityEmailHelp: "O e-mail é privado e nunca será publicado.",
    communityTitleField: "Dê um título à sua contribuição",
    communityStory: "Conte sua história ou ideia",
    communityStoryHint: "Inclua os detalhes que podem ajudar ou inspirar outro casal.",
    communityLocation: "Cidade e país (opcional)",
    communityAnonymous: "Quero que minha contribuição seja publicada anonimamente.",
    communityConsent: "Autorizo a equipe do Simple & Romantic a revisar e, se selecionada, publicar esta contribuição.",
    communitySubmit: "Compartilhar com a gente",
    communitySuccess: "Recebemos sua contribuição! Ela será revisada com carinho antes de qualquer publicação.",
    communityError: "Não foi possível enviar agora. Confira os campos e tente novamente.",
    communitySteps: [
      ["01", "Você compartilha", "Conte do seu jeito. Não precisa escrever perfeitamente."],
      ["02", "A gente revisa", "Toda contribuição passa por moderação antes de aparecer no blog."],
      ["03", "Outros se inspiram", "Se publicada, sua experiência poderá ajudar casais em qualquer lugar."],
    ],
    listeningKicker: "ENTRE NÓS · UM ESPAÇO DE ESCUTA",
    listeningTitle: "Tem algo preso no seu coração?",
    listeningText: "Você pode escrever de forma privada, sem informar e-mail ou nome. Nós vamos ler com respeito e, se você quiser, deixar uma palavra de acolhimento.",
    listeningCta: "Quero ser ouvido",
    listeningLookup: "Já tenho um código",
  },
  en: {
    nav: ["Find an idea", "Places", "How it works", "Free guide", "Blog", "Community", "Between us"],
    heroKicker: "AFFORDABLE ROMANCE · REAL MOMENTS",
    heroTitleA: "Romance doesn't have",
    heroTitleB: "to be expensive.",
    heroText:
      "Discover beautiful places, simple dates and thoughtful surprises to enjoy together — near you and within your budget.",
    heroCta: "Find an idea",
    explore: "Explore places",
    proof: ["100% free content", "No complications", "For real couples"],
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
    guideText: "Our first free guide brings together quick plans, practical lists and thoughtful surprises for every week.",
    guideCta: "Tell me when it's ready",
    mailPlaceholder: "Your best email",
    footer: "Simple moments. Beautiful memories.",
    footerNote: "Free content for real couples with real budgets.",
    sent: "Perfect! You'll be the first to know.",
    communityKicker: "STORIES THAT BRING US CLOSER",
    communityTitle: "Your story can inspire someone too.",
    communityText: "Tell us about a special moment, share a date idea or a simple surprise that worked. Your contribution may help other couples create new memories.",
    communityTypes: ["Our story", "Date idea", "A surprise"],
    communityName: "Your name or nickname (optional)",
    communityEmail: "Your email",
    communityEmailHelp: "Your email stays private and is never published.",
    communityTitleField: "Give your contribution a title",
    communityStory: "Tell your story or share your idea",
    communityStoryHint: "Include details that may help or inspire another couple.",
    communityLocation: "City and country (optional)",
    communityAnonymous: "Publish my contribution anonymously.",
    communityConsent: "I allow the Simple & Romantic team to review and, if selected, publish this contribution.",
    communitySubmit: "Share with us",
    communitySuccess: "We received your contribution! It will be carefully reviewed before anything is published.",
    communityError: "We couldn't send it right now. Check the fields and try again.",
    communitySteps: [
      ["01", "You share", "Tell it your way. It doesn't need to be perfectly written."],
      ["02", "We review", "Every contribution is moderated before it appears on the blog."],
      ["03", "Others get inspired", "If published, your experience may help couples anywhere."],
    ],
    listeningKicker: "BETWEEN US · A LISTENING SPACE",
    listeningTitle: "Is something weighing on your heart?",
    listeningText: "You may write privately without sharing your email or name. We will read with respect and, if you choose, leave a thoughtful word of support.",
    listeningCta: "I want to be heard",
    listeningLookup: "I already have a code",
  },
};

export default function Home() {
  const blogPosts = getVisibleBlogPosts();
  const [language, setLanguage] = useState<Language>("pt");
  const [resultVisible, setResultVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [guideReady, setGuideReady] = useState(false);
  const [communityStatus, setCommunityStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [communityError, setCommunityError] = useState("");
  const t = useMemo(() => copy[language], [language]);
  const mobileLinks = [
    { href: "#encontrar", label: t.nav[0] },
    { href: "#lugares", label: t.nav[1] },
    { href: "#como", label: t.nav[2] },
    { href: "/guia", label: t.nav[3] },
    { href: "#blog", label: t.nav[4] },
    { href: "#comunidade", label: t.nav[5] },
    { href: "/entre-nos", label: t.nav[6] },
  ];

  function createDate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResultVisible(true);
    requestAnimationFrame(() => document.querySelector("#resultado")?.scrollIntoView({ behavior: "smooth", block: "center" }));
  }

  async function joinList(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setGuideReady(false);
    setMessage(language === "pt" ? "Enviando…" : "Sending…");
    try {
      const response = await fetch("/api/guide", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: data.get("email"), language, consent: data.get("guideConsent") === "on", website: data.get("website") }) });
      const result = await response.json().catch(() => ({})) as { error?: string };
      if (!response.ok) throw new Error(result.error);
      form.reset(); setMessage(language === "pt" ? "Pronto! O guia gratuito já está disponível." : "Done! Your free guide is ready."); setGuideReady(true);
    } catch (error) { setMessage(error instanceof Error && error.message ? error.message : language === "pt" ? "Não foi possível cadastrar agora. Tente novamente." : "We couldn't sign you up right now. Please try again."); }
  }

  async function shareWithCommunity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCommunityStatus("sending");
    setCommunityError("");
    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/community", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: data.get("kind"),
          authorName: data.get("authorName"),
          email: data.get("email"),
          title: data.get("title"),
          content: data.get("content"),
          location: data.get("location"),
          anonymous: data.get("anonymous") === "on",
          consent: data.get("consent") === "on",
          website: data.get("website"),
        }),
      });

      const result = await response.json().catch(() => ({})) as { error?: string };
      if (!response.ok) throw new Error(result.error || "submission failed");
      form.reset();
      setCommunityStatus("success");
    } catch (error) {
      setCommunityError(error instanceof Error && error.message !== "submission failed" ? error.message : "");
      setCommunityStatus("error");
    }
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Simple and Romantic — início">
          <span className="brand-heart" aria-hidden="true">♥</span>
          <span className="brand-name"><strong>simple</strong><i>& romantic</i><small>SIMPLE MOMENTS · BEAUTIFUL MEMORIES</small></span>
        </a>
        <nav aria-label="Navegação principal">
          <a href="#encontrar">{t.nav[0]}</a><a href="#lugares">{t.nav[1]}</a><a href="#como">{t.nav[2]}</a><Link href="/guia">{t.nav[3]}</Link><a href="#blog">{t.nav[4]}</a><a href="#comunidade">{t.nav[5]}</a><Link href="/entre-nos">{t.nav[6]}</Link>
        </nav>
        <div className="header-actions">
          <ThemeToggle />
          <div className="language" aria-label="Idioma">
            <button className={language === "pt" ? "active" : ""} onClick={() => setLanguage("pt")}>PT-BR</button>
            <span>/</span>
            <button className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")}>EN</button>
            <span>/</span>
            <Link className="language-mobile-switch" href="/es" hrefLang="es-ES">ES</Link>
          </div>
          <MobileMenu
            links={mobileLinks}
            openLabel={language === "pt" ? "Abrir menu" : "Open menu"}
            closeLabel={language === "pt" ? "Fechar menu" : "Close menu"}
          />
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
        <div className="hero-scene">
          <Image unoptimized src="/images/hero-park.webp" alt={language === "pt" ? "Casal sorrindo durante um piquenique em um parque" : "Couple smiling during a picnic in a park"} fill priority sizes="(max-width: 1000px) 100vw, 49vw" />
          <div className="photo-wash" />
          <div className="picnic-card"><small>{language === "pt" ? "NESTE FIM DE SEMANA" : "THIS WEEKEND"}</small><strong>{language === "pt" ? <>Um pôr do sol,<br />uma toalha e calma.</> : <>Sunset, a blanket<br />and no rush.</>}</strong><span>{language === "pt" ? "GRÁTIS OU BAIXO CUSTO" : "FREE OR LOW COST"}</span></div>
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
          <div className="place-art"><Image unoptimized src={index === 0 ? "/images/hero-park.webp" : index === 1 ? "/images/beach-walk.webp" : "/images/viewpoint-surprise.webp"} alt={card[0]} fill sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 34vw" /><small>{card[2]}</small></div>
          <div className="place-copy"><small>0{index + 1}</small><h3>{card[0]}</h3><p>{card[1]}</p><a href="#encontrar">{card[3]} →</a></div>
        </article>)}</div>
      </section>

      <section className="home-blog section" id="blog">
        <div className="blog-welcome">
          <p className="eyebrow">ROMANCE PARA A VIDA REAL</p>
          <h2>O amor não precisa esperar uma ocasião especial.</h2>
          <div className="blog-welcome-copy">
            <p>O <strong>Simple & Romantic</strong> nasceu para casais que desejam viver mais momentos juntos sem depender de restaurantes caros, viagens distantes ou grandes produções.</p>
            <p>Aqui você encontra ideias de encontros, lugares públicos bonitos, pequenas surpresas e guias práticos para transformar um dia comum em uma memória que vale guardar.</p>
            <p>Porque romantismo não é quanto se gasta. É perceber, preparar e estar presente.</p>
          </div>
          <Link className="button primary" href="/blog">Conhecer o blog <span>→</span></Link>
        </div>
        <div className="section-heading split blog-heading"><div><p className="eyebrow">CONTEÚDOS PARA INSPIRAR</p><h2>Comece por uma ideia simples.</h2></div><p>Leituras rápidas e úteis para planejar encontros possíveis, preparar surpresas e cuidar da conexão.</p></div>
        <div className="blog-grid">
          {blogPosts.slice(0, 3).map((post) => <article className="blog-card" key={post.slug}>
            <Link className="blog-card-image" href={`/blog/${post.slug}`}><Image unoptimized src={post.image} alt={post.imageAlt} fill sizes="(max-width: 700px) 100vw, 33vw" /></Link>
            <div className="blog-card-copy"><p className="eyebrow">{post.category}</p><h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3><p>{post.excerpt}</p><div className="blog-card-meta"><span>{post.readTime}</span><Link href={`/blog/${post.slug}`}>Ler artigo →</Link></div></div>
          </article>)}
        </div>
        <div className="blog-all"><Link className="quiet-link" href="/blog">Ver todos os conteúdos →</Link></div>
      </section>

      <section className="how section" id="como">
        <div className="section-heading centered light"><p className="eyebrow">{t.howKicker}</p><h2>{t.howTitle}</h2></div>
        <div className="steps">{t.steps.map(step => <article key={step[0]}><span>{step[0]}</span><h3>{step[1]}</h3><p>{step[2]}</p></article>)}</div>
      </section>

      <section className="home-listening section" aria-labelledby="home-listening-title">
        <div className="home-listening-symbol" aria-hidden="true">♡</div>
        <div>
          <p className="eyebrow">{t.listeningKicker}</p>
          <h2 id="home-listening-title">{t.listeningTitle}</h2>
          <p>{t.listeningText}</p>
          <div><Link className="button primary" href="/entre-nos">{t.listeningCta} <span>→</span></Link><Link className="quiet-link" href="/entre-nos/resposta">{t.listeningLookup}</Link></div>
        </div>
      </section>

      <section className="community section" id="comunidade">
        <div className="community-intro">
          <p className="eyebrow">{t.communityKicker}</p>
          <h2>{t.communityTitle}</h2>
          <p>{t.communityText}</p>
          <div className="community-steps">
            {t.communitySteps.map((step) => <article key={step[0]}><span>{step[0]}</span><div><h3>{step[1]}</h3><p>{step[2]}</p></div></article>)}
          </div>
        </div>
        <form className="community-form" onSubmit={shareWithCommunity}>
          <fieldset className="community-type">
            <legend>{language === "pt" ? "O que você quer compartilhar?" : "What would you like to share?"}</legend>
            <div>{t.communityTypes.map((label, index) => <label key={label}><input type="radio" name="kind" value={["story", "idea", "surprise"][index]} defaultChecked={index === 0} /><span>{label}</span></label>)}</div>
          </fieldset>
          <div className="community-row">
            <label><span>{t.communityName}</span><input name="authorName" autoComplete="name" maxLength={80} /></label>
            <label><span>{t.communityEmail}</span><input name="email" type="email" autoComplete="email" maxLength={160} required /><small>{t.communityEmailHelp}</small></label>
          </div>
          <label><span>{t.communityTitleField}</span><input name="title" minLength={4} maxLength={120} required /></label>
          <label><span>{t.communityStory}</span><textarea name="content" minLength={40} maxLength={3000} rows={7} required /><small>{t.communityStoryHint}</small></label>
          <label><span>{t.communityLocation}</span><input name="location" autoComplete="address-level2" maxLength={120} /></label>
          <label className="community-check"><input name="anonymous" type="checkbox" /><span>{t.communityAnonymous}</span></label>
          <label className="community-check"><input name="consent" type="checkbox" required /><span>{t.communityConsent} {language === "pt" ? <>Li e aceito os <Link href="/termos">Termos de Uso</Link>, a <Link href="/privacidade">Política de Privacidade</Link> e as <Link href="/regras-da-comunidade">Regras da Comunidade</Link>.</> : <>I have read and accept the <Link href="/termos">Terms</Link>, <Link href="/privacidade">Privacy Policy</Link> and <Link href="/regras-da-comunidade">Community Rules</Link>.</>}</span></label>
          <label className="community-honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
          <button className="button primary" type="submit" disabled={communityStatus === "sending"}>{communityStatus === "sending" ? (language === "pt" ? "Enviando…" : "Sending…") : t.communitySubmit}<span>→</span></button>
          <p className={`community-message ${communityStatus}`} role="status" aria-live="polite">{communityStatus === "success" ? t.communitySuccess : communityStatus === "error" ? communityError || t.communityError : ""}</p>
        </form>
      </section>

      <section className="guide section" id="guias">
        <div className="guide-cover"><span>30</span><strong>{language === "pt" ? <>Encontros<br />simples</> : <>Simple<br />dates</>}</strong><small>{language === "pt" ? "PARA GASTAR POUCO" : "ON A SMALL BUDGET"}</small></div>
        <div className="guide-copy"><p className="eyebrow">{t.guideKicker}</p><h2>{t.guideTitle}</h2><p>{t.guideText}</p>
          <form id="guide-form" onSubmit={joinList}><input name="email" type="email" required placeholder={t.mailPlaceholder} aria-label={t.mailPlaceholder} /><button type="submit">{t.guideCta} →</button><label className="community-honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label></form>
          <label className="guide-consent"><input name="guideConsent" form="guide-form" type="checkbox" required /><span>{language === "pt" ? <>Quero receber o guia e aceito a <Link href="/privacidade">Política de Privacidade</Link>.</> : <>I want to receive the guide and accept the <Link href="/privacidade">Privacy Policy</Link>.</>}</span></label>
          <p className="form-message" aria-live="polite">{message}</p>
          {guideReady && <div className="guide-ready"><a className="button primary" href="/downloads/30-encontros-simples-gastando-pouco.pdf" download>{language === "pt" ? "Baixar o PDF gratuito" : "Download the free PDF"} <span>↓</span></a><Link className="quiet-link" href="/guia">{language === "pt" ? "Ler no site" : "Read online"}</Link></div>}
        </div>
      </section>

      <footer><a className="brand footer-brand" href="#inicio"><span className="brand-heart">♥</span><span className="brand-name"><strong>simple</strong><i>& romantic</i></span></a><p>{t.footer}</p><small>{t.footerNote}</small><div><Link href="/guia">Guia gratuito</Link><Link href="/entre-nos">Entre nós</Link><Link href="/privacidade">Privacidade</Link><Link href="/termos">Termos de Uso</Link><Link href="/regras-da-comunidade">Regras da Comunidade</Link><Link href="/contato">Contato</Link><Link href="/admin/painel">Administração</Link></div></footer>
    </main>
  );
}

function Choice({ number, title, name, options }: { number: string; title: string; name: string; options: string[] }) {
  return <fieldset><legend><span>{number}</span>{title}</legend><div className="choices">{options.map((option, index) => <label key={option}><input type="radio" name={name} value={option} defaultChecked={index === 0} /><span>{option}</span></label>)}</div></fieldset>;
}
