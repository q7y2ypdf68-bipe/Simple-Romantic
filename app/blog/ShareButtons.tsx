"use client";

import { useState } from "react";

export function ShareButtons({ title, path }: { title: string; path: string }) {
  const [copied, setCopied] = useState(false);
  const siteUrl = "https://simple-and-romantic.brunolivercard2.chatgpt.site";
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
      window.prompt("Copie o endereço do artigo:", url);
    }
  }

  return <aside className="article-share" aria-label="Compartilhar este artigo">
    <div><p className="eyebrow">GOSTOU DA IDEIA?</p><strong>Compartilhe com quem você quer viver esse momento.</strong></div>
    <div className="share-actions">
      <button className="share-main" type="button" onClick={share}>Compartilhar <span>↗</span></button>
      <a href={`https://wa.me/?text=${encodedText}%20${encodedUrl}`} target="_blank" rel="noopener noreferrer" aria-label="Compartilhar no WhatsApp">WhatsApp</a>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noopener noreferrer" aria-label="Compartilhar no Facebook">Facebook</a>
      <button type="button" onClick={copy}>{copied ? "Link copiado ✓" : "Copiar link"}</button>
    </div>
  </aside>;
}
