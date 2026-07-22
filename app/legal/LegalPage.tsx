import type { ReactNode } from "react";
import { BlogFooter, BlogHeader } from "../blog/BlogChrome";

export function LegalPage({ kicker, title, intro, children }: { kicker: string; title: string; intro: string; children: ReactNode }) {
  return <main className="legal-shell"><BlogHeader /><header className="legal-hero"><p className="eyebrow">{kicker}</p><h1>{title}</h1><p>{intro}</p></header><article className="legal-content">{children}</article><BlogFooter /></main>;
}
