import type { Metadata } from "next";
import { LegalPageEn } from "../legal/LegalPageEn";

export const metadata: Metadata = { title: "Community Guidelines", description: "Guidelines for sharing stories and ideas with respect and safety.", alternates: { canonical: "/en/community-guidelines", languages: { "pt-BR": "/regras-da-comunidade", "es-ES": "/es/normas-de-la-comunidad", "en": "/en/community-guidelines", "x-default": "/regras-da-comunidade" } } };

export default function CommunityRulesPageEn() {
  return <LegalPageEn kicker="STORIES THAT BRING US CLOSER" title="Community Guidelines" intro="We want stories that are true, useful and welcoming. These guidelines protect those who share and those who read.">
    <h2>Share with respect</h2><p>Tell your experience without humiliating, threatening, discriminating against or exposing anyone. Disagreements are welcome; personal attacks, harassment and hate speech are not.</p>
    <h2>Protect privacy</h2><p>Do not send phone numbers, addresses, documents, private conversations, images or data that identify third parties without their consent. Use fictitious names when necessary.</p>
    <h2>Submit original content</h2><p>Share texts and ideas that you created or have permission to use. Do not copy other people's articles, lyrics, photographs or stories.</p>
    <h2>No spam or hidden advertising</h2><p>Excessive links, unsolicited promotions, scams and automated content may be blocked. Commercial partnerships must be agreed in advance.</p>
    <h2>Prior moderation</h2><p>Every submission goes into a private queue. We may correct the language, request clarifications, reject or remove content to protect the community. Editorial selection does not promise publication.</p>
    <h2>Anonymity and removal</h2><p>You can request anonymous publication and ask for corrections or removal through <a href="/en/contact">Contact</a>, using the same email as the submission to make verification easier.</p>
  </LegalPageEn>;
}
