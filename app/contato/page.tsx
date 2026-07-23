import type { Metadata } from "next";
import { LegalPage } from "../legal/LegalPage";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = { title: "Contato", description: "Fale com a equipe do Simple & Romantic.", alternates: { canonical: "/contato" } };
export default function ContactPage() { return <LegalPage kicker="FALE COM A GENTE" title="Contato" intro="Envie dúvidas, sugestões ou pedidos relacionados aos seus dados e às suas contribuições."><ContactForm /></LegalPage>; }
