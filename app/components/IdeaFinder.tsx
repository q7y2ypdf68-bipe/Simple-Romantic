"use client";

import { FormEvent, useEffect, useState } from "react";
import { recommend } from "../recommendations.mjs";
import { finderCopy, type FinderLang } from "./idea-finder-copy";

type Answers = { environment: string; budget: string; duration: string; occasion: string; period: string; flame?: boolean };
type Idea = { id: string; title: string; whyItFits: string; howTo: string[]; smallDetail?: string; badges: string[]; planB?: { title: string }; surprise?: string; confirmBefore?: boolean; requirements?: string; aiGenerated?: boolean; flame?: boolean; relaxed?: boolean };
type Session = { displayed: Array<{ candidateId: string; familyId: string; mechanic: string; category: string; modifierIds?: string[]; gestureId?: string; timestamp: number }> };

// Aceita, no link, tanto os valores em inglês quanto palavras nos 3 idiomas.
const LINK_MAP: Record<string, Record<string, string>> = {
  lugar: { casa: "home", home: "home", hogar: "home", arlivre: "outdoors", outdoors: "outdoors", airelibre: "outdoors", sair: "go-out", "go-out": "go-out", salir: "go-out", qualquer: "any", any: "any", cualquiera: "any" },
  orcamento: { gratis: "free", free: "free", baixo: "low", low: "low", bajo: "low", mais: "more", more: "more", mas: "more" },
  tempo: { hora: "hour", hour: "hour", tarde: "afternoon", afternoon: "afternoon", dia: "day", day: "day" },
  momento: { qualquer: "any", any: "any", cualquiera: "any", tanto: "any", dia: "day", day: "day", dedia: "day", diurno: "day", noite: "night", noche: "night", night: "night", anoite: "night", denoche: "night" },
  clima: { casual: "casual", informal: "casual", surpresa: "surprise", sorpresa: "surprise", surprise: "surprise", reconectar: "reconnect", reconnect: "reconnect" },
};
const LINK_NAMES: Record<string, string> = { lugar: "environment", orcamento: "budget", tempo: "time", clima: "occasion", momento: "period" };

export function IdeaFinder({ lang }: { lang: FinderLang }) {
  const t = finderCopy[lang];
  const [resultVisible, setResultVisible] = useState(false);
  const [recommendation, setRecommendation] = useState<{ status: string; result?: Idea } | null>(null);
  const [recommendationSession, setRecommendationSession] = useState<Session>({ displayed: [] });
  const [aiShown, setAiShown] = useState<string[]>([]);
  const [finding, setFinding] = useState(false);
  const [trio, setTrio] = useState<Idea[] | null>(null);
  const [lastAnswers, setLastAnswers] = useState<Answers | null>(null);
  const [flameOn, setFlameOn] = useState(false);
  const [flameAsk, setFlameAsk] = useState(false);

  // Modo Chama é +18: usa a mesma confirmação guardada dos artigos de intimidade.
  function toggleFlame(checked: boolean) {
    if (!checked) { setFlameOn(false); setFlameAsk(false); return; }
    let ok = false;
    try { ok = window.localStorage.getItem("sr-adult") === "1"; } catch { ok = false; }
    if (ok) setFlameOn(true); else setFlameAsk(true);
  }
  function confirmAdult() {
    try { window.localStorage.setItem("sr-adult", "1"); } catch { /* vale só nesta visita */ }
    setFlameAsk(false);
    setFlameOn(true);
  }

  function readAnswers(data: FormData): Answers {
    return { environment: String(data.get("environment")), budget: String(data.get("budget")), duration: String(data.get("time")), occasion: String(data.get("occasion")), period: String(data.get("period") ?? "any"), flame: data.get("flame") === "on" };
  }

  // Motor curado primeiro; se não houver ideia para os filtros, a IA cria uma (plano B); por fim, ideias de reserva.
  async function resolveIdea(answers: Answers, session: Session, shown: string[]) {
    setLastAnswers(answers);
    const next = recommend(answers, session, lang) as { status: string; result?: Idea; session?: Session };
    if (next.status === "recommendation") {
      setRecommendation(next);
      setRecommendationSession(next.session ?? { displayed: [] });
      return;
    }
    if (answers.flame) { setRecommendation(next); return; }
    setFinding(true);
    try {
      const response = await fetch("/api/ideia", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...answers, language: lang, exclude: shown }) });
      const body = await response.json();
      if (response.ok && body?.status === "recommendation" && body.result) {
        setRecommendation({ status: "recommendation", result: body.result });
        setAiShown((list) => [...list, String(body.result.id)]);
        return;
      }
    } catch {
      // cai no aviso abaixo
    } finally {
      setFinding(false);
    }
    setRecommendation(next);
  }

  async function threeIdeas(answers: Answers) {
    setLastAnswers(answers);
    setRecommendation(null);
    setTrio(null);
    setResultVisible(true);
    setFinding(true);
    requestAnimationFrame(() => document.querySelector("#resultado")?.scrollIntoView({ behavior: "smooth", block: "center" }));
    const found: Idea[] = [];
    let session: Session = { displayed: [] };
    const shown: string[] = [];
    try {
      for (let i = 0; i < 3; i++) {
        const next = recommend(answers, session, lang) as { status: string; result?: Idea; session?: Session };
        if (next.status === "recommendation" && next.result) {
          session = next.session ?? session;
          found.push(next.result);
          continue;
        }
        if (answers.flame) break;
        try {
          const response = await fetch("/api/ideia", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...answers, language: lang, exclude: shown }) });
          const body = await response.json();
          if (response.ok && body?.result) {
            shown.push(String(body.result.id));
            found.push(body.result);
          }
        } catch {
          // segue com o que já temos
        }
      }
    } finally {
      setFinding(false);
    }
    setTrio(found);
  }

  async function createDate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const answers = readAnswers(new FormData(event.currentTarget));
    setAiShown([]);
    setTrio(null);
    setResultVisible(true);
    requestAnimationFrame(() => document.querySelector("#resultado")?.scrollIntoView({ behavior: "smooth", block: "center" }));
    await resolveIdea(answers, { displayed: [] }, []);
  }

  function formAnswers() {
    const form = document.querySelector<HTMLFormElement>(".finder-form");
    return form ? readAnswers(new FormData(form)) : null;
  }

  async function anotherIdea() {
    const answers = formAnswers();
    if (answers) await resolveIdea(answers, recommendationSession, aiShown);
  }

  function pickThree() {
    const answers = formAnswers();
    if (answers) void threeIdeas(answers);
  }

  // Link com filtros (posts nas redes): ?lugar=casa&orcamento=gratis&tempo=tarde&clima=surpresa[&ideias=3]
  useEffect(() => {
    try {
      const q = new URLSearchParams(window.location.search);
      let any = false;
      for (const key of Object.keys(LINK_MAP)) {
        const value = LINK_MAP[key][(q.get(key) ?? "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")];
        if (!value) continue;
        const input = document.querySelector<HTMLInputElement>(`.finder-form input[name="${LINK_NAMES[key]}"][value="${value}"]`);
        if (input) { input.checked = true; any = true; }
      }
      if (any || q.get("ideias") || q.get("ideas")) {
        const answers = formAnswers();
        if (!answers) return;
        if (q.get("ideias") === "3" || q.get("ideas") === "3") void threeIdeas(answers);
        else { setAiShown([]); setResultVisible(true); void resolveIdea(answers, { displayed: [] }, []); }
        document.querySelector("#encontrar")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } catch {
      /* sem link de filtros: tudo normal */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const badgesFor = (idea: Idea) => {
    const env = idea.badges?.[2] ?? lastAnswers?.environment ?? "any";
    return [t.cost[idea.badges?.[0]] ?? t.cost.C0, lastAnswers ? t.duration[lastAnswers.duration] : "", t.place[env] ?? "", lastAnswers ? (t.periodLabel[lastAnswers.period] ?? "") : ""].filter(Boolean);
  };

  const result = recommendation?.status === "recommendation" ? recommendation.result : undefined;

  return (
    <section className="finder section" id="encontrar">
      <div className="section-heading centered"><p className="eyebrow">{t.kicker}</p><h2>{t.title}</h2><p>{t.text}</p></div>
      <form className="finder-form" onSubmit={createDate}>
        <Choice number="01" title={t.environment} name="environment" options={t.environments} />
        <Choice number="02" title={t.budget} name="budget" options={t.budgets} />
        <Choice number="03" title={t.time} name="time" options={t.times} />
        <Choice number="04" title={t.occasion} name="occasion" options={t.occasions} />
        <Choice number="05" title={t.period} name="period" options={t.periods} />
        <fieldset className="flame-field"><legend><span>06</span>{t.flameTitle}</legend><label className="flame-toggle"><input type="checkbox" name="flame" checked={flameOn} onChange={(event) => toggleFlame(event.target.checked)} /><span>{t.flameLabel}</span></label><p className="flame-hint">{t.flameHint}</p>{flameAsk && <div className="flame-ask" role="alertdialog" aria-labelledby="flame-ask-title"><strong id="flame-ask-title">{t.flameAskTitle}</strong><p>{t.flameAskText}</p><div><button type="button" className="button primary" onClick={confirmAdult}>{t.flameYes}</button><button type="button" className="button secondary" onClick={() => setFlameAsk(false)}>{t.flameNo}</button></div></div>}</fieldset>
        <div className="finder-actions"><button className="button primary finder-button" type="submit">{t.find}<span>→</span></button><button className="button secondary finder-three" type="button" onClick={pickThree}>{t.three}</button></div>
      </form>
      {resultVisible && !finding && trio && trio.length > 0 && <div className="idea-trio" id="resultado" aria-live="polite"><p className="eyebrow">{t.threeTitle}</p>{trio.some((item) => item.flame) && <p className="result-flame-note"><small>{t.flameNote}</small></p>}<div className="idea-trio-grid">{trio.map((item) => <article key={item.id} className={item.flame ? "is-flame" : undefined}>{item.flame && <span className="trio-flame-chip">🔥 {t.flameBadge} +18</span>}<h3>{item.title}</h3><p>{item.whyItFits}</p><ol>{item.howTo.slice(0, 5).map((step) => <li key={step}>{step}</li>)}</ol><div className="result-meta">{badgesFor(item).map((b) => <span key={b}>{b}</span>)}</div>{item.planB && <p><strong>{t.planB}</strong> {item.planB.title}</p>}</article>)}</div></div>}
      {resultVisible && !finding && !trio && result && <article className="date-result" id="resultado">
        <div className="result-visual"><span>{result.flame ? "🔥" : "☀"}</span><small>{badgesFor(result)[0]}</small></div>
        <div className="result-copy"><p className="eyebrow">{t.resultKicker}</p><h3>{result.title}</h3>{result.flame && <p className="result-flame-note"><small>{result.relaxed ? `${t.flameRelaxed} ` : ""}{t.flameNote}</small></p>}{result.aiGenerated && <p className="result-ai-note"><small>{t.aiNote}</small></p>}<p>{result.whyItFits}</p><ol>{result.howTo.map((step) => <li key={step}>{step}</li>)}</ol><div className="result-meta">{badgesFor(result).map((item) => <span key={item}>{item}</span>)}</div>{result.surprise && <p><strong>{t.surprise}</strong> {result.surprise}</p>}{result.planB && <p><strong>{t.planB}</strong> {result.planB.title}</p>}{result.confirmBefore && <p><strong>{t.confirm}</strong> {result.requirements}</p>}<button className="button secondary" type="button" onClick={anotherIdea}>{t.anotherIdea}</button></div>
        <div className="result-tip"><span>♡</span><div><strong>{t.tip}</strong><p>{result.smallDetail}</p></div></div>
      </article>}
      {resultVisible && finding && <article className="date-result date-result-empty" id="resultado" aria-live="polite"><div className="result-copy"><p className="eyebrow">{t.resultKicker}</p><h3>{t.finding}</h3></div></article>}
      {resultVisible && !finding && !trio && recommendation?.status === "exhausted" && <article className="date-result date-result-empty" id="resultado"><div className="result-copy"><p className="eyebrow">{t.resultKicker}</p><h3>{t.exhausted}</h3></div></article>}
    </section>
  );
}

function Choice({ number, title, name, options }: { number: string; title: string; name: string; options: Array<{ value: string; label: string }> }) {
  return <fieldset key={name}><legend><span>{number}</span>{title}</legend><div className="choices">{options.map((item, index) => <label key={item.value}><input type="radio" name={name} value={item.value} defaultChecked={index === 0} /><span>{item.label}</span></label>)}</div></fieldset>;
}
