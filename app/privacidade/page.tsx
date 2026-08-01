import type { Metadata } from "next";
import { LegalPage } from "../legal/LegalPage";

export const metadata: Metadata = { title: "Política de Privacidade", description: "Como o Simple & Romantic trata dados pessoais, contribuições e inscrições.", alternates: { canonical: "/privacidade" } };

export default function PrivacyPage() {
  return <LegalPage kicker="TRANSPARÊNCIA E CUIDADO" title="Política de Privacidade" intro="Esta política explica, em linguagem simples, quais dados usamos e por quê. Última atualização: 1º de agosto de 2026.">
    <h2>1. Quem somos</h2><p>O Simple & Romantic é um projeto editorial e comunitário sobre encontros acessíveis, lugares públicos e pequenas surpresas para casais.</p>
    <h2>2. Dados que você escolhe enviar</h2><p>Podemos receber nome ou apelido, e-mail, cidade, histórias, ideias, mensagens de contato e inscrição no guia. O e-mail de quem envia uma contribuição é usado para contato e moderação e não aparece publicamente.</p>
    <h2>3. Como usamos esses dados</h2><ul><li>receber, revisar e moderar contribuições;</li><li>publicar apenas conteúdos selecionados e autorizados;</li><li>responder dúvidas e solicitações;</li><li>enviar o guia ou novidades solicitadas;</li><li>prevenir spam, fraude e abuso.</li></ul>
    <h2>4. Publicação de histórias</h2><p>Nenhuma contribuição é publicada automaticamente. A equipe revisa o material e pode ajustar ortografia ou clareza sem alterar o sentido. Se você escolher publicação anônima, seu nome não será exibido.</p>
    <h2>5. Espaço Entre nós</h2><p>O espaço de escuta permite enviar um relato sem informar nome ou e-mail. Guardamos o apelido opcional, a finalidade escolhida, o relato, a autorização opcional para publicação, a resposta preparada e um código aleatório de acompanhamento. O relato permanece privado por padrão. A autorização para uma possível publicação é separada e não garante que o texto será publicado.</p><p>Não envie nomes completos, endereços, telefones, documentos, dados de saúde identificáveis ou informações que permitam reconhecer terceiros. O código de acompanhamento deve ser guardado em segurança, pois permite consultar o estado e a resposta vinculada ao relato.</p>
    <h2>6. Compartilhamento</h2><p>Não vendemos dados pessoais. Podemos usar prestadores técnicos necessários para hospedar o site e armazenar os dados, sempre limitados à operação do serviço ou ao cumprimento da lei.</p>
    <h2>7. Estatísticas de uso</h2><p>Contamos visualizações de páginas de forma agregada e sem cookies. O relatório interno guarda apenas o dia, a página acessada, a origem geral da visita e a quantidade de visualizações. Não armazenamos nome, e-mail, endereço IP nem histórico individual nessa medição.</p>
    <h2>8. Conservação e segurança</h2><p>Mantemos os dados pelo tempo necessário às finalidades descritas, à moderação, à segurança e a obrigações legais. Relatos do Entre nós podem ser excluídos do painel após o encerramento do acolhimento. Aplicamos controles razoáveis, mas nenhum serviço on-line elimina todos os riscos.</p>
    <h2>9. Seus direitos</h2><p>Você pode pedir acesso, correção, exclusão ou retirada de uma contribuição publicada. Também pode cancelar comunicações futuras. Envie a solicitação pela página de <a href="/contato">Contato</a>. No Entre nós, conserve o código de acompanhamento para ajudar a confirmar a solicitação.</p>
    <h2>10. Crianças e dados de terceiros</h2><p>Não envie dados pessoais, imagens ou histórias identificáveis de terceiros sem autorização. O serviço e o espaço Entre nós são destinados exclusivamente a pessoas com 18 anos ou mais.</p>
    <h2>11. Alterações</h2><p>Esta política pode ser atualizada para acompanhar novas funções ou exigências legais. A data no início identifica a versão vigente.</p>
  </LegalPage>;
}
