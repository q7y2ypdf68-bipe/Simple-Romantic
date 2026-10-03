"use client";

import { useState } from "react";

export function ShareButtons({ title, path, locale = "pt" }: { title: string; path: string; locale?: "pt" | "es" }) {
  const [copied, setCopied] = useState(false);
  const siteUrl = "https://simple-and-romantic.simple-and-romantic.workers.dev";
  const url = `${siteUrl}${path}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(`${title} — Simple & Romantic`);

  async function share() {
    if (navigator.share) {
      try {
        await navigator.share({ title, text: `${title} — Simple & Romantic`, url });
        return;
      } catch {
        return;
      }
    }
    await copy();
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.prompt(locale === "es" ? "Copia la dirección del artículo:" : "Copie o endereço do artigo:", url);
    }
  }

  return <aside className="article-share" aria-label={locale === "es" ? "Compartir este artículo" : "Compartilhar este artigo"}>
    <div><p className="eyebrow">{locale === "es" ? "¿TE HA GUSTADO?" : "GOSTOU DA IDEIA?"}</p><strong>{locale === "es" ? "Compártelo con la persona con quien quieres vivir este momento." : "Compartilhe com quem você quer viver esse momento."}</strong></div>
    <div className="share-actions">
      <button className="share-main" type="button" onClick={share}>{locale === "es" ? "Compartir" : "Compartilhar"} <span>↗</span></button>
      <a href={`https://wa.me/?text=${encodedText}%20${encodedUrl}`} target="_blank" rel="noopener noreferrer" aria-label={locale === "es" ? "Compartir en WhatsApp" : "Compartilhar no WhatsApp"}>WhatsApp</a>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noopener noreferrer" aria-label={locale === "es" ? "Compartir en Facebook" : "Compartilhar no Facebook"}>Facebook</a>
      <button type="button" onClick={copy}>{copied ? (locale === "es" ? "Enlace copiado ✓" : "Link copiado ✓") : (locale === "es" ? "Copiar enlace" : "Copiar link")}</button>
    </div>
  </aside>;
}
