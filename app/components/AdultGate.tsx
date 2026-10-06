"use client";

import { useEffect, useState } from "react";

const TEXT = {
  pt: { title: "Conteúdo para adultos (+18)", body: "Este artigo fala de intimidade e de relacionamento a dois, sem imagens explícitas. É destinado a maiores de 18 anos.", yes: "Tenho 18 anos ou mais", no: "Voltar ao início", home: "/" },
  es: { title: "Contenido para adultos (+18)", body: "Este artículo habla de intimidad y de la relación de pareja, sin imágenes explícitas. Está dirigido a mayores de 18 años.", yes: "Tengo 18 años o más", no: "Volver al inicio", home: "/es" },
  en: { title: "Adult content (18+)", body: "This article talks about intimacy and relationships between partners, with no explicit images. It is meant for readers aged 18 and over.", yes: "I am 18 or older", no: "Back to the homepage", home: "/en" },
} as const;

// Aviso +18 antes de artigos de intimidade. A escolha fica guardada neste navegador (se o navegador permitir).
export function AdultGate({ lang }: { lang: "pt" | "es" | "en" }) {
  const [open, setOpen] = useState(false);
  const t = TEXT[lang];
  useEffect(() => {
    try {
      if (window.localStorage.getItem("sr-adult") !== "1") setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  if (!open) return null;
  const confirm = () => {
    try { window.localStorage.setItem("sr-adult", "1"); } catch { /* sem armazenamento: só vale nesta visita */ }
    setOpen(false);
  };
  return (
    <div role="dialog" aria-modal="true" aria-labelledby="adult-title" style={{ position: "fixed", inset: 0, zIndex: 1000, background: "linear-gradient(160deg,#ffe3ec,#fff3d9 60%,#dff3f8)", display: "grid", placeItems: "center", padding: 24 }}>
      <div style={{ maxWidth: 480, textAlign: "center", color: "#49243d" }}>
        <p style={{ fontSize: 56, margin: 0 }}>♥</p>
        <h2 id="adult-title" style={{ font: "500 32px/1.2 Georgia,serif", margin: "8px 0 14px" }}>{t.title}</h2>
        <p style={{ fontSize: 18, lineHeight: 1.5, color: "#6b3f59" }}>{t.body}</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 26 }}>
          <button type="button" onClick={confirm} style={{ background: "#ed3f78", color: "#fff", border: 0, borderRadius: 99, padding: "14px 26px", fontSize: 17, fontWeight: 700, cursor: "pointer" }}>{t.yes}</button>
          <a href={t.home} style={{ border: "2px solid #f3c6d6", borderRadius: 99, padding: "12px 24px", fontSize: 17, color: "#49243d", textDecoration: "none" }}>{t.no}</a>
        </div>
      </div>
    </div>
  );
}
