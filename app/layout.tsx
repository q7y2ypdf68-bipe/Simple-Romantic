import type { Metadata } from "next";
import "./globals.css";
import { AnalyticsTracker } from "./components/AnalyticsTracker";
import { serializeStructuredData } from "./structured-data";

const siteUrl = "https://simple-and-romantic.brunolivercard2.chatgpt.site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Simple & Romantic — Momentos simples, memórias bonitas",
    template: "%s | Simple & Romantic",
  },
  description: "Encontros acessíveis, lugares bonitos e pequenas surpresas para casais reais, com orçamentos reais.",
  applicationName: "Simple & Romantic",
  authors: [{ name: "Simple & Romantic", url: siteUrl }],
  creator: "Simple & Romantic",
  publisher: "Simple & Romantic",
  category: "Relacionamentos",
  keywords: [
    "ideias de encontros",
    "encontros românticos",
    "encontros baratos",
    "romance acessível",
    "surpresas românticas",
    "lugares para casais",
    "programas gratuitos para casais",
  ],
  alternates: {
    canonical: "/",
    languages: { "pt-BR": "/", "es-ES": "/es", "x-default": "/" },
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "Simple & Romantic",
    title: "Simple & Romantic — Momentos simples, memórias bonitas",
    description: "Ideias gratuitas e de baixo custo para casais criarem encontros, surpresas e memórias bonitas.",
    images: [{
      url: "/images/hero-park.webp",
      width: 1200,
      height: 630,
      alt: "Casal vivendo um momento simples e romântico em um parque",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Simple & Romantic — Momentos simples, memórias bonitas",
    description: "Ideias gratuitas e de baixo custo para casais criarem encontros, surpresas e memórias bonitas.",
    images: ["/images/hero-park.webp"],
  },
  icons: {
    icon: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "kv-3Y3TxawyrnteVacXO6PSW-LteDXtNq-sY1IOaeqQ",
    other: {
      "msvalidate.01": "D210218D1B79720F2974CD02D21AB4D5",
    },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Simple & Romantic",
        url: siteUrl,
        logo: `${siteUrl}/favicon.svg`,
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Simple & Romantic",
        description: "Ideias gratuitas e de baixo custo para encontros românticos, surpresas e momentos a dois.",
        inLanguage: ["pt-BR", "es-ES"],
        publisher: { "@id": `${siteUrl}/#organization` },
      },
    ],
  };

  const themeScript = `(function(){try{var root=document.documentElement;root.lang=location.pathname==='/es'||location.pathname.indexOf('/es/')===0?'es-ES':'pt-BR';var saved=localStorage.getItem('simple-romantic-theme');var theme=saved==='dark'||saved==='light'?saved:(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');root.dataset.theme=theme;root.style.colorScheme=theme;}catch(e){document.documentElement.dataset.theme='light';}})();`;

  return <html lang="pt-BR" data-theme="light" suppressHydrationWarning><head><meta name="codex-preview" content="development" /><meta name="color-scheme" content="light dark" /><meta name="supported-color-schemes" content="light dark" /><meta name="theme-color" media="(prefers-color-scheme: light)" content="#fffefe" /><meta name="theme-color" media="(prefers-color-scheme: dark)" content="#171116" /><script dangerouslySetInnerHTML={{ __html: themeScript }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeStructuredData(structuredData) }} /></head><body><AnalyticsTracker />{children}</body></html>;
}
