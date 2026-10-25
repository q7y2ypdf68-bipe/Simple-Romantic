"use client";

import { useEffect, useState } from "react";
import { CoupleWheel } from "./CoupleWheel";
import type { Lang } from "./wheel-data";

const PATH = { pt: "/roleta", es: "/es/ruleta", en: "/en/wheel" } as const;

const TEXT = {
  pt: { kicker: "RODA DO CARINHO", title: "Gire a roleta e descubra o desafio da noite", text: "Doze desafios simples de carinho, para qualquer casal. Gire, cumpra e depois gire de novo.", hookTitle: "Isso fica melhor a dois", hook: "Mande a roleta para o seu par, ou para aquela amiga que também precisa de um empurrãozinho. Quem girar primeiro, desafia o outro.", whatsapp: "Enviar pelo WhatsApp", share: "Compartilhar", copy: "Copiar link", copied: "Link copiado!", message: "Achei uma roleta de desafios de carinho para casais. Gira a sua e vê o que sai:" },
  es: { kicker: "RULETA DEL CARIÑO", title: "Gira la ruleta y descubre el reto de esta noche", text: "Doce retos sencillos de cariño, para cualquier pareja. Gira, cúmplelo y vuelve a girar.", hookTitle: "Esto es mejor entre dos", hook: "Envía la ruleta a tu pareja, o a ese amigo o amiga que también necesita un empujoncito. Quien gire primero, reta al otro.", whatsapp: "Enviar por WhatsApp", share: "Compartir", copy: "Copiar enlace", copied: "¡Enlace copiado!", message: "He encontrado una ruleta de retos de cariño para parejas. Gira la tuya y mira qué sale:" },
  en: { kicker: "THE CARING WHEEL", title: "Spin the wheel and find tonight's challenge", text: "Twelve simple, caring challenges for any couple. Spin, do it, then spin again.", hookTitle: "This is better together", hook: "Send the wheel to your partner, or to a friend who could use a little nudge. Whoever spins first challenges the other.", whatsapp: "Send on WhatsApp", share: "Share", copy: "Copy link", copied: "Link copied!", message: "I found a wheel of caring challenges for couples. Spin yours and see what comes up:" },
} as const;

export function HomeWheel({ lang }: { lang: Lang }) {
  const t = TEXT[lang];
  const [canShare, setCanShare] = useState(false);
  const [note, setNote] = useState("");
  const url = `https://simpleandromantic.com${PATH[lang]}?utm_source=convite`;

  useEffect(() => {
    setCanShare(typeof navigator !== "undefined" && typeof navigator.share === "function");
  }, []);

  const whatsapp = () => window.open(`https://wa.me/?text=${encodeURIComponent(`${t.message} ${url}`)}`, "_blank", "noopener");
  const share = async () => { try { await navigator.share({ title: t.title, text: t.message, url }); } catch {} };
  const copy = async () => {
    try { await navigator.clipboard.writeText(`${t.message} ${url}`); setNote(t.copied); setTimeout(() => setNote(""), 2500); } catch {}
  };

  return (
    <section className="wheel-home section" id="roleta">
      <div className="section-heading centered"><p className="eyebrow">{t.kicker}</p><h2>{t.title}</h2><p>{t.text}</p></div>
      <CoupleWheel lang={lang} hideShare />
      <div className="wheel-hook">
        <strong>♥ {t.hookTitle}</strong>
        <p>{t.hook}</p>
        <div className="wheel-actions">
          <button className="button primary" type="button" onClick={whatsapp}>{t.whatsapp}</button>
          {canShare && <button className="button secondary" type="button" onClick={share}>{t.share}</button>}
          <button className="button secondary" type="button" onClick={copy}>{t.copy}</button>
        </div>
        {note && <p className="wheel-note" role="status">{note}</p>}
      </div>
    </section>
  );
}
