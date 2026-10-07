"use client";

import { FormEvent, useState } from "react";
import { HORO, coupleReading, signOptions } from "../horoscopo-casal.mjs";

type Lang = "pt" | "es" | "en";
type Reading = ReturnType<typeof coupleReading>;

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

  async function show(a: string, b: string, nextShift: number) {
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
          <div className="horoscope-actions"><button className="button secondary" type="button" onClick={() => show(signs.a, signs.b, shift + 1)}>{t.again}</button><a className="quiet-link" href="#encontrar">{t.more} →</a><p><small>{t.why}</small></p></div>
        </article>
      )}
    </section>
  );
}
