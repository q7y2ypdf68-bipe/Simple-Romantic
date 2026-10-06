import type { ReactNode } from "react";
import { LanguageSetter } from "../../components/LanguageSetter";
import { BlogFooterEn, BlogHeaderEn } from "../blog/BlogChromeEn";

export function LegalPageEn({ kicker, title, intro, children }: { kicker: string; title: string; intro: string; children: ReactNode }) {
  return <main className="legal-shell"><LanguageSetter lang="en" /><BlogHeaderEn /><header className="legal-hero"><p className="eyebrow">{kicker}</p><h1>{title}</h1><p>{intro}</p></header><article className="legal-content">{children}</article><BlogFooterEn /></main>;
}
