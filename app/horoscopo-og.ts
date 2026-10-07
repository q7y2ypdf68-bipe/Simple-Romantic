import type { Metadata } from "next";
import { HORO, SIGN_IDS } from "./horoscopo-casal.mjs";

type Lang = "pt" | "es" | "en";
const LOCALE = { pt: "pt_BR", es: "es_ES", en: "en_US" } as const;
const PATH = { pt: "/", es: "/es", en: "/en" } as const;
const TITLE = { pt: "Horóscopo do casal", es: "Horóscopo de pareja", en: "Couple's horoscope" } as const;
const DESC = {
  pt: "Uma leitura só de diversão, feita com o céu real. Descubra a do seu casal.",
  es: "Una lectura solo por diversión, hecha con el cielo real. Descubrid la de vuestra pareja.",
  en: "A just-for-fun reading made with the real sky. Find your couple's.",
} as const;

// Se o link traz ?casal=a-b válido, a prévia (WhatsApp etc.) mostra a imagem do casal.
export function coupleMetadata(lang: Lang, casal: string | string[] | undefined): Metadata {
  const raw = Array.isArray(casal) ? casal[0] : casal;
  const [a, b, extra] = String(raw ?? "").split("-");
  if (!a || !b || extra !== undefined || !SIGN_IDS.includes(a) || !SIGN_IDS.includes(b)) return {};
  const [first, second] = [a, b].sort((x, y) => SIGN_IDS.indexOf(x) - SIGN_IDS.indexOf(y));
  const signs = (HORO[lang] ?? HORO.pt).signs as Record<string, string[]>;
  const names = first === second ? `${signs[first][0]} + ${signs[first][0]}` : `${signs[first][0]} + ${signs[second][0]}`;
  const title = `${names} · ${TITLE[lang]}`;
  const images = [{ url: `/images/horoscopo/${lang}/${first}-${second}.jpg`, width: 1200, height: 630, alt: title }];
  return {
    title,
    description: DESC[lang],
    alternates: { canonical: PATH[lang] },
    openGraph: { locale: LOCALE[lang], url: PATH[lang], title, description: DESC[lang], siteName: "Simple & Romantic", type: "website", images },
    twitter: { card: "summary_large_image", title, description: DESC[lang], images: images.map((i) => i.url) },
  };
}
