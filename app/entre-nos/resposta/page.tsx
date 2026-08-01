import type { Metadata } from "next";
import { BlogFooter, BlogHeader } from "../../blog/BlogChrome";
import { ResponseLookup } from "./ResponseLookup";

export const metadata: Metadata = {
  title: "Consultar acolhimento",
  description: "Consulte com seu código particular o estado de um relato enviado ao espaço Entre nós.",
  robots: { index: false, follow: false, noarchive: true },
};

export default async function ResponsePage({ searchParams }: { searchParams: Promise<{ codigo?: string }> }) {
  const initialCode = (await searchParams).codigo?.trim().toUpperCase().slice(0, 40) || "";
  return <main className="listening-page response-page">
    <BlogHeader />
    <section className="response-shell section">
      <div className="response-intro"><p className="eyebrow">ENTRE NÓS</p><h1>Volte quando quiser.</h1><p>Digite o código recebido no envio. Para proteger sua privacidade, não mostramos o relato original nesta página.</p></div>
      <ResponseLookup initialCode={initialCode} />
    </section>
    <BlogFooter />
  </main>;
}
