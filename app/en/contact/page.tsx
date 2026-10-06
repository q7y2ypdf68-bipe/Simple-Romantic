import type { Metadata } from "next";
import { LegalPageEn } from "../legal/LegalPageEn";
import { ContactFormEn } from "./ContactFormEn";

export const metadata: Metadata = { title: "Contact", description: "Get in touch with the Simple & Romantic team.", alternates: { canonical: "/en/contact", languages: { "pt-BR": "/contato", "es-ES": "/es/contacto", "en": "/en/contact", "x-default": "/contato" } } };
export default function ContactPageEn() { return <LegalPageEn kicker="TALK TO US" title="Contact" intro="Send questions, suggestions or requests related to your data and submissions."><ContactFormEn /></LegalPageEn>; }
