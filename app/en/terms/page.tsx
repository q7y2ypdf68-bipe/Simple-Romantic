import type { Metadata } from "next";
import { LegalPageEn } from "../legal/LegalPageEn";

export const metadata: Metadata = { title: "Terms of Use", description: "Terms of use for the content and tools of Simple & Romantic.", alternates: { canonical: "/en/terms", languages: { "pt-BR": "/termos", "es-ES": "/es/terminos", "en": "/en/terms", "x-default": "/termos" } } };

export default function TermsPageEn() {
  return <LegalPageEn kicker="A RESPECTFUL EXPERIENCE" title="Terms of Use" intro="By using the site you accept these terms. Last updated: August 23, 2026.">
    <h2>1. Purpose</h2><p>We offer editorial content, suggestions and tools for inspiration. The ideas do not replace your own judgment about safety, weather, accessibility, local rules or the suitability of a place.</p>
    <h2>2. Visitor responsibility</h2><p>You decide whether a suggestion is suitable and must respect the laws, opening hours, property, rules of public spaces, and the consent and boundaries of everyone involved.</p>
    <h2>3. Submitted content</h2><p>You declare that you have the right to share the material and grant Simple & Romantic a free, non-exclusive license to review, adapt, publish and distribute it within the project. You remain the author and may withdraw the authorization through a reasonable request.</p>
    <h2>4. Between Us</h2><p>Between Us is an editorial space for listening and welcome, not a psychology, therapy, emergency, investigation, or medical or legal advice service. Messages are not monitored in real time and sending one does not guarantee an immediate reply. If there is danger, contact the emergency services.</p><p>Stories are private by default. Possible publication requires specific authorization, review and an editorial decision. Keep your code: it lets you check the status, read a possible reply and permanently delete the story.</p>
    <h2>5. Prohibited content</h2><p>We do not accept material that is illegal, threatening, discriminatory, invasive, misleading, commercial without authorization, that exposes third-party data or that infringes copyright. We may reject, edit, remove or delete submissions.</p>
    <h2>6. Intellectual property</h2><p>The texts, visual identity, organization and our own materials are protected. You may share links and short excerpts with attribution, but you may not reproduce the project in full or exploit it commercially without authorization.</p>
    <h2>7. Availability</h2><p>We try to keep the service useful and correct, but we do not guarantee continuous availability, specific results or that all information is always up to date.</p>
    <h2>8. Changes and contact</h2><p>We may improve the site and these terms. Questions or requests can be sent through <a href="/en/contact">Contact</a>.</p>
  </LegalPageEn>;
}
