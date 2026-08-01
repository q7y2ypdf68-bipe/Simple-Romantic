import type { Metadata } from "next";
import { LegalPage } from "../legal/LegalPage";

export const metadata: Metadata = { title: "Termos de Uso", description: "Condições de uso do conteúdo e das ferramentas do Simple & Romantic.", alternates: { canonical: "/termos" } };

export default function TermsPage() {
  return <LegalPage kicker="UMA EXPERIÊNCIA RESPEITOSA" title="Termos de Uso" intro="Ao usar o site, você concorda com estas condições. Última atualização: 1º de agosto de 2026.">
    <h2>1. Finalidade do site</h2><p>Oferecemos conteúdo editorial, sugestões e ferramentas de inspiração. As ideias não substituem avaliação pessoal de segurança, clima, acessibilidade, regras locais ou adequação do lugar.</p>
    <h2>2. Responsabilidade do visitante</h2><p>Você decide se uma sugestão é adequada e deve respeitar leis, horários, propriedade, regras de espaços públicos, consentimento e limites de todas as pessoas envolvidas.</p>
    <h2>3. Conteúdo enviado</h2><p>Você declara ter o direito de compartilhar o material e concede ao Simple & Romantic autorização gratuita e não exclusiva para revisar, adaptar, publicar e divulgar a contribuição no projeto. A autoria continua sendo sua e a autorização pode ser retirada mediante solicitação razoável.</p>
    <h2>4. Entre nós</h2><p>O Entre nós é um espaço de escuta e acolhimento editorial, não um serviço de psicologia, terapia, emergência, investigação nem aconselhamento médico ou jurídico. As mensagens não são monitoradas em tempo real, e o envio não garante resposta imediata. Em situação de perigo, procure os serviços de emergência do seu país.</p><p>Relatos permanecem privados por padrão. Uma possível publicação depende de autorização específica, revisão e nova decisão editorial. Guarde seu código de acompanhamento: ele é a forma de consultar o estado e eventual resposta.</p>
    <h2>5. Conteúdo proibido</h2><p>Não aceitamos material ilegal, ameaçador, discriminatório, invasivo, enganoso, comercial sem autorização, que exponha dados de terceiros ou viole direitos autorais. Podemos recusar, editar, despublicar ou excluir contribuições.</p>
    <h2>6. Propriedade intelectual</h2><p>Textos, identidade visual, organização e materiais próprios do site são protegidos. Você pode compartilhar links e pequenos trechos com crédito, mas não reproduzir o projeto integralmente ou explorá-lo comercialmente sem autorização.</p>
    <h2>7. Disponibilidade e garantias</h2><p>Buscamos manter o serviço útil e correto, mas não garantimos disponibilidade contínua, resultado específico ou que toda informação esteja sempre atualizada.</p>
    <h2>8. Alterações e contato</h2><p>Podemos aprimorar o site e estes termos. Dúvidas, pedidos de correção ou retirada podem ser enviados pela página de <a href="/contato">Contato</a>.</p>
  </LegalPage>;
}
