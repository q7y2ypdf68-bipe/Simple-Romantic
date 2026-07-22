import type { Metadata } from "next";
import { LegalPage } from "../legal/LegalPage";

export const metadata: Metadata = { title: "Política de Privacidade | Simple & Romantic", description: "Como o Simple & Romantic trata dados pessoais, contribuições e inscrições." };

export default function PrivacyPage() {
  return <LegalPage kicker="TRANSPARÊNCIA E CUIDADO" title="Política de Privacidade" intro="Esta política explica, em linguagem simples, quais dados usamos e por quê. Última atualização: 22 de julho de 2026.">
    <h2>1. Quem somos</h2><p>O Simple & Romantic é um projeto editorial e comunitário sobre encontros acessíveis, lugares públicos e pequenas surpresas para casais.</p>
    <h2>2. Dados que você escolhe enviar</h2><p>Podemos receber nome ou apelido, e-mail, cidade, histórias, ideias, mensagens de contato e inscrição no guia. O e-mail de quem envia uma contribuição é usado para contato e moderação e não aparece publicamente.</p>
    <h2>3. Como usamos esses dados</h2><ul><li>receber, revisar e moderar contribuições;</li><li>publicar apenas conteúdos selecionados e autorizados;</li><li>responder dúvidas e solicitações;</li><li>enviar o guia ou novidades solicitadas;</li><li>prevenir spam, fraude e abuso.</li></ul>
    <h2>4. Publicação de histórias</h2><p>Nenhuma contribuição é publicada automaticamente. A equipe revisa o material e pode ajustar ortografia ou clareza sem alterar o sentido. Se você escolher publicação anônima, seu nome não será exibido.</p>
    <h2>5. Compartilhamento</h2><p>Não vendemos dados pessoais. Podemos usar prestadores técnicos necessários para hospedar o site e armazenar os dados, sempre limitados à operação do serviço ou ao cumprimento da lei.</p>
    <h2>6. Conservação e segurança</h2><p>Mantemos os dados pelo tempo necessário às finalidades descritas, à moderação, à segurança e a obrigações legais. Aplicamos controles razoáveis, mas nenhum serviço on-line elimina todos os riscos.</p>
    <h2>7. Seus direitos</h2><p>Você pode pedir acesso, correção, exclusão ou retirada de uma contribuição publicada. Também pode cancelar comunicações futuras. Envie a solicitação pela página de <a href="/contato">Contato</a>.</p>
    <h2>8. Crianças e dados de terceiros</h2><p>Não envie dados pessoais, imagens ou histórias identificáveis de terceiros sem autorização. O serviço não é dirigido a crianças.</p>
    <h2>9. Alterações</h2><p>Esta política pode ser atualizada para acompanhar novas funções ou exigências legais. A data no início identifica a versão vigente.</p>
  </LegalPage>;
}
