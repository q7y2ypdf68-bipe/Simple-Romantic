import type { Metadata } from "next";
import { LanguageSetter } from "../../components/LanguageSetter";
import { BlogFooterEn, BlogHeaderEn } from "../blog/BlogChromeEn";
import { CommunityFormEn } from "./CommunityFormEn";

export const metadata: Metadata = { title: "Community — share your story", description: "Send a story, idea or surprise for the Simple & Romantic team to review.", alternates: { canonical: "/en/community", languages: { "pt-BR": "/#comunidade", "es-ES": "/es/comunidad", "en": "/en/community" } } };
export default function CommunityPageEn() { return <main className="legal-shell"><LanguageSetter lang="en" /><BlogHeaderEn /><header className="legal-hero"><p className="eyebrow">STORIES THAT BRING US CLOSER</p><h1>Share something that might inspire.</h1><p>Your submission goes into a private queue and is reviewed before anything is published. You can choose to appear anonymously.</p></header><article className="legal-content"><CommunityFormEn /></article><BlogFooterEn /></main>; }
