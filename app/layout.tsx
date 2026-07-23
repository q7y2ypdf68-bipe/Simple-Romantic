import type { Metadata } from "next";
import "./globals.css";

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
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "Simple & Romantic",
    title: "Simple & Romantic — Momentos simples, memórias bonitas",
    description: "Ideias gratuitas e de baixo custo para casais criarem encontros, surpresas e memórias bonitas.",
    images: [{
      url: "/images/hero-park.png",
      width: 1200,
      height: 630,
      alt: "Casal vivendo um momento simples e romântico em um parque",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Simple & Romantic — Momentos simples, memórias bonitas",
    description: "Ideias gratuitas e de baixo custo para casais criarem encontros, surpresas e memórias bonitas.",
    images: ["/images/hero-park.png"],
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
        inLanguage: "pt-BR",
        publisher: { "@id": `${siteUrl}/#organization` },
      },
    ],
  };

  return <html lang="pt-BR" data-theme="light" style={{ colorScheme: "light", backgroundColor: "#fffefe" }}><head><meta name="codex-preview" content="development" /><meta name="darkreader-lock" /><meta name="color-scheme" content="light" /><meta name="supported-color-schemes" content="light" /><meta name="theme-color" content="#fffefe" /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /><script dangerouslySetInnerHTML={{ __html: "document.documentElement.dataset.theme='light';document.documentElement.style.colorScheme='light';" }} /></head><body style={{ backgroundColor: "#fffefe", color: "#3b2636" }}>{children}</body></html>;
}
