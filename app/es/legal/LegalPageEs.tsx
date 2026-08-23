import type { ReactNode } from "react";
import { LanguageSetter } from "../../components/LanguageSetter";
import { BlogFooterEs, BlogHeaderEs } from "../blog/BlogChromeEs";

export function LegalPageEs({ kicker, title, intro, children }: { kicker: string; title: string; intro: string; children: ReactNode }) {
  return <main className="legal-shell"><LanguageSetter lang="es-ES" /><BlogHeaderEs /><header className="legal-hero"><p className="eyebrow">{kicker}</p><h1>{title}</h1><p>{intro}</p></header><article className="legal-content">{children}</article><BlogFooterEs /></main>;
}
