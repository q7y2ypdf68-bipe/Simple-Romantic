"use client";

import { FormEvent, useState } from "react";
import { HORO, coupleReading, signOptions } from "../horoscopo-casal.mjs";

type Lang = "pt" | "es" | "en";
type Reading = ReturnType<typeof coupleReading>;

const localDay = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
};

// Brincadeira do casal: dois signos → clima do dia, uma ideia de encontro (do motor) e um gesto. Sem IA e sem custo.
export function CoupleHoroscope({ lang }: { lang: Lang }) {
  const t = HORO[lang];
  const options = signOptions(lang) as Array<{ id: string; label: string }>;
  const [signs, setSigns] = useState<{ a: string; b: string } | null>(null);
  const [shift, setShift] = useState(0);
  const [reading, setReading] = useState<Reading | null>(null);

  function show(a: string, b: string, nextShift: number) {
    setSigns({ a, b });
    setShift(nextShift);
    setReading(coupleReading(a, b, localDay(), lang, nextShift));
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
            <h4>{reading.vibe[0]}</h4>
            <p>{reading.vibe[1]}</p>
            <ul className="horoscope-traits"><li><strong>{reading.a.name}</strong> {reading.a.trait}.</li><li><strong>{reading.b.name}</strong> {reading.b.trait}.</li></ul>
          </header>
          <div className="horoscope-cards">
            <section><p className="eyebrow">{t.idea}</p><h4>{reading.idea.title}</h4><p>{reading.idea.whyItFits}</p><ol>{reading.idea.howTo.slice(0, 3).map((step: string) => <li key={step}>{step}</li>)}</ol>{reading.idea.confirmBefore && reading.idea.requirements && <p className="horoscope-confirm"><small>{reading.idea.requirements}</small></p>}</section>
            <section><p className="eyebrow">{t.gesture}</p><p className="horoscope-gesture">{reading.gesture}</p></section>
          </div>
          <div className="horoscope-actions"><button className="button secondary" type="button" onClick={() => show(signs.a, signs.b, shift + 1)}>{t.again}</button><a className="quiet-link" href="#encontrar">{t.more} →</a><p><small>{t.why}</small></p></div>
        </article>
      )}
    </section>
  );
}
