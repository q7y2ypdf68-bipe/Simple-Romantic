// Which article is the translation of which (used for hreflang between languages).
export const articleTranslations = [
  { pt: "pequenos-gestos-de-amor", es: "pequenos-gestos-de-amor", en: "small-gestures-of-love" },
  { pt: "conto-o-olhar-que-ficou", es: "cuento-la-mirada-que-se-quedo", en: "story-the-look-that-stayed" },
  { pt: "conselho-da-semana-dez-minutos-de-presenca", es: "consejo-semanal-diez-minutos-de-presencia", en: "weekly-tip-ten-minutes-of-presence" },
  { pt: "conto-a-mesa-perto-da-janela", es: "cuento-la-mesa-junto-a-la-ventana", en: "story-the-table-by-the-window" },
  { pt: "encontro-romantico-de-ultima-hora", es: "cita-romantica-de-ultima-hora", en: "last-minute-romantic-date" },
  { pt: "encontros-romanticos-gratuitos-sair-da-rotina", es: "citas-romanticas-gratis-salir-de-la-rutina", en: "free-romantic-dates-break-the-routine" },
  { pt: "encontros-romanticos-gastando-pouco", es: "citas-romanticas-gastando-poco", en: "romantic-dates-on-a-small-budget" },
  { pt: "piquenique-romantico-simples", es: "como-preparar-un-picnic-romantico", en: "simple-romantic-picnic" },
  { pt: "surpresas-romanticas-sem-gastar", es: "sorpresas-romanticas-sin-gastar", en: "romantic-surprises-without-spending" },
  { pt: "encontro-romantico-no-parque", es: "cita-romantica-en-el-parque", en: "romantic-date-in-the-park" },
  { pt: "encontro-romantico-em-dia-de-chuva", es: "citas-para-un-dia-de-lluvia", en: "rainy-day-romantic-date" },
  { pt: "como-reconectar-com-parceiro", es: "como-reconectar-con-tu-pareja", en: "how-to-reconnect-with-your-partner" },
  { pt: "passeio-fotografico-para-casais", es: "paseo-fotografico-para-parejas", en: "photo-walk-for-couples" },
  { pt: "encontro-em-casa-sem-gastar", es: "citas-en-casa-sin-gastar", en: "date-at-home-without-spending" },
  { pt: "perguntas-para-casais-conversarem", es: "preguntas-para-parejas", en: "questions-for-couples-to-talk" },
  { pt: "seguranca-em-encontros-lugares-publicos", es: "seguridad-en-citas-en-lugares-publicos", en: "safe-dates-in-public-places" },
  { pt: "namoro-a-distancia-como-continuar-presente", es: "noviazgo-a-distancia-como-seguir-presentes", en: "long-distance-relationship-staying-present" },
  { pt: "como-sair-da-rotina-a-dois-sem-gastar-muito", es: "como-salir-de-la-rutina-en-pareja-sin-gastar-mucho", en: "break-the-routine-as-a-couple-on-a-budget" },
  { pt: "depois-de-uma-discussao-como-voltar-a-se-aproximar", es: "despues-de-una-discusion-como-volver-a-acercarse", en: "after-an-argument-how-to-come-close-again" },
  { pt: "aniversario-de-namoro-sem-gastar-muito", es: "aniversario-de-pareja-sin-gastar-mucho", en: "dating-anniversary-without-spending-much" },
  { pt: "primeiro-encontro-simples-ideias-para-conversar", es: "primera-cita-sencilla-ideas-para-conversar", en: "simple-first-date-conversation-ideas" },
  { pt: "tempo-de-qualidade-quando-os-dois-estao-cansados", es: "tiempo-de-calidad-cuando-los-dos-estais-cansados", en: "quality-time-when-you-are-both-tired" },
  { pt: "noite-romantica-em-casa-do-zero", es: "noche-romantica-en-casa-desde-cero", en: "romantic-night-at-home-from-scratch" },
] as const;

type Lang = "pt" | "es" | "en";

export function translationsOf(lang: Lang, slug: string) {
  return articleTranslations.find((row) => row[lang] === slug) ?? null;
}

export const articleLanguages = { pt: "pt-BR", es: "es-ES", en: "en" } as const;
export const articleBase = { pt: "/blog", es: "/es/blog", en: "/en/blog" } as const;

/** Builds the Next.js `alternates.languages` object for an article. */
export function articleAlternates(lang: Lang, slug: string) {
  const row = translationsOf(lang, slug);
  if (!row) return { [articleLanguages[lang]]: `${articleBase[lang]}/${slug}` };
  const languages: Record<string, string> = {};
  for (const l of ["pt", "es", "en"] as const) languages[articleLanguages[l]] = `${articleBase[l]}/${row[l]}`;
  languages["x-default"] = `/blog/${row.pt}`;
  return languages;
}
