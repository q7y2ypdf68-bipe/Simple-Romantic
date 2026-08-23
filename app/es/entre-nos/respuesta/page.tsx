import type { Metadata } from "next";
import { LanguageSetter } from "../../../components/LanguageSetter";
import { BlogFooterEs, BlogHeaderEs } from "../../blog/BlogChromeEs";
import { ResponseLookupEs } from "./ResponseLookupEs";

export const metadata: Metadata = { title: "Consultar respuesta", description: "Consulta con tu código privado el estado de un relato enviado a Entre nosotros.", robots: { index: false, follow: false, noarchive: true } };

export default async function ResponsePageEs({ searchParams }: { searchParams: Promise<{ codigo?: string }> }) {
  const initialCode = (await searchParams).codigo?.trim().toUpperCase().slice(0, 40) || "";
  return <main className="listening-page response-page"><LanguageSetter lang="es-ES" /><BlogHeaderEs /><section className="response-shell section"><div className="response-intro"><p className="eyebrow">ENTRE NOSOTROS</p><h1>Vuelve cuando quieras.</h1><p>Introduce el código recibido al enviar el relato. Para proteger tu privacidad, no mostramos el texto original en esta página.</p></div><ResponseLookupEs initialCode={initialCode} /></section><BlogFooterEs /></main>;
}
