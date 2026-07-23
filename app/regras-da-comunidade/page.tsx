import type { Metadata } from "next";
import { LegalPage } from "../legal/LegalPage";

export const metadata: Metadata = { title: "Regras da Comunidade", description: "Regras para compartilhar histórias e ideias com respeito e segurança.", alternates: { canonical: "/regras-da-comunidade" } };

export default function RulesPage() {
  return <LegalPage kicker="HISTÓRIAS QUE APROXIMAM" title="Regras da Comunidade" intro="Queremos histórias verdadeiras, úteis e acolhedoras. Estas regras protegem quem compartilha e quem lê.">
    <h2>Compartilhe com respeito</h2><p>Conte sua experiência sem humilhar, ameaçar, discriminar ou expor alguém. Divergências são permitidas; ataques pessoais, assédio e discurso de ódio não são.</p>
    <h2>Proteja a privacidade</h2><p>Não publique telefones, endereços, documentos, conversas privadas, imagens ou detalhes que identifiquem terceiros sem consentimento. Use nomes fictícios quando necessário.</p>
    <h2>Envie conteúdo original</h2><p>Compartilhe textos e ideias que você criou ou tem autorização para usar. Não copie artigos, letras, fotos ou relatos de outras pessoas.</p>
    <h2>Sem spam ou propaganda disfarçada</h2><p>Links excessivos, promoções não solicitadas, golpes e conteúdo automatizado podem ser bloqueados. Parcerias comerciais precisam ser combinadas previamente.</p>
    <h2>Moderação antes da publicação</h2><p>Toda contribuição entra numa fila privada. Podemos corrigir linguagem, pedir esclarecimentos, recusar ou retirar um conteúdo para proteger a comunidade. A seleção editorial não é uma promessa de publicação.</p>
    <h2>Anonimato e retirada</h2><p>Você pode pedir publicação anônima. Também pode solicitar correção ou retirada pela página de <a href="/contato">Contato</a>, usando o mesmo e-mail do envio para facilitar a verificação.</p>
  </LegalPage>;
}
