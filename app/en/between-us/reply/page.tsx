import type { Metadata } from "next";
import { LanguageSetter } from "../../../components/LanguageSetter";
import { BlogFooterEn, BlogHeaderEn } from "../../blog/BlogChromeEn";
import { ResponseLookupEn } from "./ResponseLookupEn";

export const metadata: Metadata = { title: "Check for a reply", description: "Use your private code to check the status of a story sent to Between Us.", alternates: { canonical: "/en/between-us/reply", languages: { "pt-BR": "/entre-nos/resposta", "es-ES": "/es/entre-nos/respuesta", "en": "/en/between-us/reply", "x-default": "/entre-nos/resposta" } }, openGraph: { locale: "en_US" }, robots: { index: false, follow: false, noarchive: true } };

export default async function ResponsePageEn({ searchParams }: { searchParams: Promise<{ code?: string }> }) {
  const initialCode = (await searchParams).code?.trim().toUpperCase().slice(0, 40) || "";
  return <main className="listening-page response-page"><LanguageSetter lang="en" /><BlogHeaderEn /><section className="response-shell section"><div className="response-intro"><p className="eyebrow">BETWEEN US</p><h1>Come back whenever you like.</h1><p>Enter the code you received when you sent your story. To protect your privacy, we don&apos;t show the original text on this page.</p></div><ResponseLookupEn initialCode={initialCode} /></section><BlogFooterEn /></main>;
}
