import type { Metadata } from "next";
import { LanguageSetter } from "../../components/LanguageSetter";
import { BlogFooterEs, BlogHeaderEs } from "../blog/BlogChromeEs";
import { CommunityFormEs } from "./CommunityFormEs";

export const metadata: Metadata = { title: "Comunidad — comparte tu historia", description: "Envía una historia, idea o sorpresa para que el equipo de Simple & Romantic la revise.", alternates: { canonical: "/es/comunidad", languages: { "es-ES": "/es/comunidad", en: "/en/community" } } };
export default function CommunityPageEs() { return <main className="legal-shell"><LanguageSetter lang="es-ES" /><BlogHeaderEs /><header className="legal-hero"><p className="eyebrow">HISTORIAS QUE ACERCAN</p><h1>Comparte algo que pueda inspirar.</h1><p>Tu aportación entra en una cola privada y se revisa antes de cualquier publicación. Puedes elegir aparecer de forma anónima.</p></header><article className="legal-content"><CommunityFormEs /></article><BlogFooterEs /></main>; }
