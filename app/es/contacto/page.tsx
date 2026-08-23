import type { Metadata } from "next";
import { LegalPageEs } from "../legal/LegalPageEs";
import { ContactFormEs } from "./ContactFormEs";

export const metadata: Metadata = { title: "Contacto", description: "Habla con el equipo de Simple & Romantic.", alternates: { canonical: "/es/contacto", languages: { "pt-BR": "/contato", "es-ES": "/es/contacto" } } };
export default function ContactPageEs() { return <LegalPageEs kicker="HABLA CON NOSOTROS" title="Contacto" intro="Envía preguntas, sugerencias o solicitudes relacionadas con tus datos y aportaciones."><ContactFormEs /></LegalPageEs>; }
