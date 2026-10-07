"use client";

import { FormEvent, useEffect, useState } from "react";

const SHARE_PATH = { pt: "/", es: "/es", en: "/en" } as const;
import { HORO, coupleReading, periodReading, signOptions } from "../horoscopo-casal.mjs";
import PERIODOS from "../horoscopo-periodos.mjs";

type Lang = "pt" | "es" | "en";
type Reading = ReturnType<typeof coupleReading>;
type PeriodResult = ReturnType<typeof periodReading>;
type Tab = "day" | "week" | "month" | "year";

const localParts = () => {
  const now = new Date();
  return { y: now.getFullYear(), m: now.getMonth() + 1, d: now.getDate() };
};
const dayText = ({ y, m, d }: { y: number; m: number; d: number }) => `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

type Used = { day: string; shift: number } & Record<string, string | number | null>;
const MEMORY_KEY = "sr-horo";
const pairOf = (a: string, b: string) => [a, b].sort().join("+");
// Lembra (só neste aparelho) o que já saiu para este casal, para não repetir nos dias seguintes.
function readMemory(pair: string): Used[] {
  try {
    const all = JSON.parse(localStorage.getItem(MEMORY_KEY) ?? "{}");
    return Array.isArray(all[pair]) ? all[pair] : [];
  } catch { return []; }
}
function saveMemory(pair: string, used: Used) {
  try {
    const all = JSON.parse(localStorage.getItem(MEMORY_KEY) ?? "{}");
    const list = (Array.isArray(all[pair]) ? all[pair] : []).filter((item: Used) => !(item.day === used.day && item.shift === used.shift));
    all[pair] = [...list, used].slice(-40);
    localStorage.setItem(MEMORY_KEY, JSON.stringify(all));
  } catch {}
}

// Brincadeira do casal: dois signos → clima do dia, uma ideia de encontro (do motor) e um gesto. Sem IA e sem custo.
export function CoupleHoroscope({ lang }: { lang: Lang }) {
  const t = HORO[lang];
  const options = signOptions(lang) as Array<{ id: string; label: string }>;
  const [signs, setSigns] = useState<{ a: string; b: string } | null>(null);
  const [shift, setShift] = useState(0);
  const [reading, setReading] = useState<Reading | null>(null);
  const [tab, setTab] = useState<Tab>("day");
  const [period, setPeriod] = useState<PeriodResult | null>(null);

  const [note, setNote] = useState("");
  const [canShare, setCanShare] = useState(false);
  useEffect(() => { setCanShare(typeof navigator !== "undefined" && typeof navigator.share === "function"); }, []);
  const tt = t as unknown as { shareText: string; copied: string; share: string; copy: string };
  function shareData(a: string, b: string) {
    const names = t.signs as Record<string, string[]>;
    return { text: tt.shareText.replace("{a}", names[a][0]).replace("{b}", names[b][0]), url: `https://simpleandromantic.com${SHARE_PATH[lang]}#horoscopo` };
  }
  async function share(a: string, b: string) {
    const { text, url } = shareData(a, b);
    try { await navigator.share({ title: t.title, text, url }); } catch {}
  }
  function whatsapp(a: string, b: string) {
    const { text, url } = shareData(a, b);
    window.open(`https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`, "_blank", "noopener");
  }
  async function copyLink(a: string, b: string) {
    const { text, url } = shareData(a, b);
    try { await navigator.clipboard.writeText(`${text} ${url}`); setNote(tt.copied); setTimeout(() => setNote(""), 2500); } catch {}
  }
  const shareButtons = (a: string, b: string) => (
    <>
      <button className="button secondary" type="button" onClick={() => whatsapp(a, b)} aria-label="WhatsApp"><svg className="wa-icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="#25D366" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2z"/><path fill="#fff" d="M8.6 7.3c-.2-.4-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.900 4.300 2.400 1 2.900.8 3.400.7.500-.1 1.600-.7 1.800-1.300.2-.6.2-1.200.2-1.300-.1-.1-.3-.2-.6-.3l-1.900-.9c-.3-.1-.4-.1-.6.100l-.8 1c-.1.200-.3.200-.6.100-.3-.1-1.200-.4-2.300-1.400-.8-.8-1.400-1.700-1.600-2-.1-.3 0-.4.100-.5l.4-.5c.1-.1.200-.3.300-.4.100-.2 0-.3 0-.4z"/></svg>WhatsApp</button>
      {canShare && <button className="button secondary" type="button" onClick={() => share(a, b)}>{tt.share}</button>}
      <button className="button secondary" type="button" onClick={() => copyLink(a, b)}>{tt.copy}</button>
    </>
  );

  async function showPeriod(a: string, b: string, kind: Exclude<Tab, "day">, nextShift: number) {
    const parts = localParts();
    const { periodSky } = await import("../ceu.mjs");
    setPeriod(periodReading(a, b, periodSky(kind, parts.y, parts.m, parts.d), lang, nextShift));
    setShift(nextShift);
    setTab(kind);
  }

  async function show(a: string, b: string, nextShift: number) {
    setTab("day");
    const parts = localParts();
    const { skyForDay } = await import("../ceu.mjs");
    const pair = pairOf(a, b);
    const next = coupleReading(a, b, dayText(parts), lang, nextShift, skyForDay(parts.y, parts.m, parts.d), readMemory(pair));
    saveMemory(pair, next.used as Used);
    setSigns({ a, b });
    setShift(nextShift);
    setReading(next);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const a = String(data.get("signA") ?? ""), b = String(data.get("signB") ?? "");
    if (a && b) show(a, b, 0);
  }

  return (
    <section className="horoscope section" id="horoscopo">
      <div className="section-heading centered"><p className="eyebrow">{t.kicker}</p><h2>{t.title}</h2><p>{t.text}</p></div>
      <form className="horoscope-form" onSubmit={submit}>
        <label><span>{t.you}</span><select name="signA" required defaultValue=""><option value="" disabled>{t.placeholder}</option>{options.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label>
        <label><span>{t.partner}</span><select name="signB" required defaultValue=""><option value="" disabled>{t.placeholder}</option>{options.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label>
        <button className="button primary" type="submit">{t.button}<span>→</span></button>
      </form>
      {reading && signs && (
        <div className="horoscope-tabs" role="tablist">
          {(["day", "week", "month", "year"] as Tab[]).map((item) => (
            <button key={item} type="button" role="tab" aria-selected={tab === item} className={tab === item ? "active" : ""} onClick={() => (item === "day" ? show(signs.a, signs.b, 0) : showPeriod(signs.a, signs.b, item, 0))}>{(PERIODOS[lang] as { tabs: Record<Tab, string> }).tabs[item]}</button>
          ))}
        </div>
      )}
      {reading && signs && tab !== "day" && period && (
        <article className="horoscope-result" aria-live="polite">
          <header>
            <p className="eyebrow">{(PERIODOS[lang] as { tabs: Record<Tab, string> }).tabs[tab]}</p>
            <h3>{period.a.name} + {period.b.name}</h3>
            <h4>{period.title}</h4>
            {period.chips.length > 0 && <ul className="horoscope-traits horoscope-chips">{period.chips.map((chip: string) => <li key={chip}>{chip}</li>)}</ul>}
            {period.paragraphs.map((text: string) => <p key={text}>{text}</p>)}
            {period.lines.length > 0 && <ul className="horoscope-lines">{period.lines.map((text: string) => <li key={text}>{text}</li>)}</ul>}
          </header>
          <div className="horoscope-cards"><section><p className="eyebrow">{t.gesture}</p><p className="horoscope-gesture">{period.gesture}</p></section></div>
          <p className="horoscope-closing"><em>{period.closing}</em></p>
          <div className="horoscope-actions">{shareButtons(signs.a, signs.b)}<button className="button secondary" type="button" onClick={() => showPeriod(signs.a, signs.b, tab as Exclude<Tab, "day">, shift + 1)}>{t.again}</button><p><small>{t.why}</small></p>{note && <p role="status"><small>{note}</small></p>}</div>
        </article>
      )}
      {reading && signs && tab === "day" && (
        <article className="horoscope-result" aria-live="polite">
          <header>
            <p className="eyebrow">{t.today} · {reading.a.element} + {reading.b.element}</p>
            <h3>{reading.a.name} + {reading.b.name}</h3>
            <h4>{reading.title}</h4>
            {reading.chips.length > 0 && <ul className="horoscope-traits horoscope-chips">{reading.chips.map((chip: string) => <li key={chip}>{chip}</li>)}</ul>}
            {reading.paragraphs.map((text: string) => <p key={text}>{text}</p>)}
          </header>
          <div className="horoscope-cards">
            <section><p className="eyebrow">{t.idea}</p><h4>{reading.idea.title}</h4><p>{reading.idea.whyItFits}</p><ol>{reading.idea.howTo.slice(0, 3).map((step: string) => <li key={step}>{step}</li>)}</ol>{reading.idea.confirmBefore && reading.idea.requirements && <p className="horoscope-confirm"><small>{reading.idea.requirements}</small></p>}</section>
            <section><p className="eyebrow">{t.gesture}</p><p className="horoscope-gesture">{reading.gesture}</p></section>
          </div>
          {reading.closing && <p className="horoscope-closing"><em>{reading.closing}</em></p>}
          <div className="horoscope-actions">{shareButtons(signs.a, signs.b)}<button className="button secondary" type="button" onClick={() => show(signs.a, signs.b, shift + 1)}>{t.again}</button><a className="quiet-link" href="#encontrar">{t.more} →</a><p><small>{t.why}</small></p>{note && <p role="status"><small>{note}</small></p>}</div>
        </article>
      )}
    </section>
  );
}
