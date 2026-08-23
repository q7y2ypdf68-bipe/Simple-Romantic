# Simple & Romantic — Pack final da auditoria (tarefas 4, 5 e 6)

## Objetivo

Concluir as três frentes restantes em uma única execução controlada, com um único ciclo de validação e uma única publicação final. Preservar integralmente as versões 30, 31 e 32 já aprovadas: privacidade e retenção, espanhol da Espanha e modo escuro.

## Estado de partida

- Site público: `Simple & Romantic`.
- Tarefa 1 concluída: privacidade, consentimento, retenção e eliminação de relatos.
- Tarefa 2 concluída: experiência completa em espanhol da Espanha.
- Tarefa 3 concluída: consolidação do modo escuro.
- Última versão publicada antes deste pack: versão 32.

## Tarefa 4 — Central administrativa, mensagens e métricas

Auditar e consolidar a área privada para que Bruno controle o projeto sem depender de URLs dispersas.

### Entregas obrigatórias

1. Uma central administrativa única com acessos claros para:
   - visão geral;
   - estatísticas;
   - desabafos do Entre nós;
   - histórias e ideias da comunidade;
   - mensagens de contato;
   - inscritos no guia.
2. Indicadores úteis no resumo:
   - visualizações dos últimos 30 dias;
   - páginas mais acessadas;
   - origens gerais das visitas;
   - quantidades pendentes em cada caixa de entrada.
3. Identificação visível do idioma de cada mensagem: português ou espanhol da Espanha.
4. Explicação simples dentro do painel sobre a diferença entre visualizações, visitantes únicos e cliques da Pesquisa Google.
5. Rotas administrativas protegidas e excluídas de indexação e da medição pública.
6. Estados vazios, erros e navegação mobile coerentes.

### Restrições

- Não expor mensagens privadas, e-mails ou códigos no site público.
- Não instalar rastreamento invasivo, cookies publicitários ou identificação individual.
- Não afirmar que visualizações internas equivalem a pessoas únicas.
- Não alterar os prazos de retenção aprovados na tarefa 1.

## Tarefa 5 — SEO, indexação e integridade técnica

Fazer uma auditoria técnica completa das rotas públicas em português e espanhol e corrigir somente problemas comprovados.

### Entregas obrigatórias

1. Validar:
   - títulos e descrições;
   - URLs canônicas;
   - `hreflang` entre português do Brasil e espanhol da Espanha;
   - idioma correto do HTML;
   - Open Graph e compartilhamento;
   - dados estruturados;
   - sitemap;
   - RSS nos dois idiomas;
   - robots.txt.
2. Procurar e corrigir:
   - links internos quebrados;
   - rotas que enviam o leitor espanhol para páginas portuguesas;
   - páginas privadas indexáveis;
   - páginas públicas ausentes do sitemap;
   - duplicidade ou conflito de metadados.
3. Criar testes automáticos para os problemas encontrados.
4. Não prometer que o Google indexará imediatamente as páginas. O Site apenas deve fornecer sinais técnicos corretos.

### Restrições

- Não solicitar nova validação no Search Console enquanto existir uma validação em andamento.
- Não criar páginas artificiais apenas para aumentar o número de URLs.
- Não modificar conteúdo editorial aprovado sem necessidade técnica.

## Tarefa 6 — Loja: fundação segura, sem venda prematura

Preparar o projeto para uma futura loja sem ativar pagamentos, pedidos ou promessas comerciais antes de existirem fornecedores e condições aprovadas.

### Entregas obrigatórias

1. Criar uma página pública `Loja`/`Tienda` com posicionamento de curadoria para casais e indicação transparente de que a seleção comercial está em preparação.
2. Organizar as futuras categorias:
   - piquenique a dois;
   - térmicos, copos e acessórios reutilizáveis;
   - cangas, mantas e itens para encontros ao ar livre;
   - presentes e pequenos gestos;
   - intimidade e bem-estar adulto, apresentados com elegância e destinados a maiores de 18 anos.
3. Preparar componentes de catálogo reutilizáveis, mas sem preços inventados, estoque fictício ou botões de compra falsos.
4. Incluir uma explicação de transparência para futuras parcerias e links de afiliados.
5. Adicionar Loja/Tienda ao cabeçalho completo e ao rodapé em ambos os idiomas.
6. Deixar documentadas, sem implementar, as dependências para a fase comercial:
   - fornecedor;
   - modelo de estoque ou afiliado;
   - preços;
   - entrega;
   - devoluções;
   - garantia;
   - pagamento;
   - faturação;
   - restrição etária quando aplicável.

### Restrições

- Não ativar checkout, recolher dados de pagamento ou aceitar encomendas.
- Não inventar produtos, preços, marcas, avaliações, disponibilidade ou descontos.
- Não usar imagens de produtos sem licença ou origem aprovada.
- Não apresentar produtos adultos a menores nem usar linguagem explícita.
- Não transformar o site em marketplace nesta fase.

## Áreas congeladas

- Privacidade, consentimento e retenção aprovados na tarefa 1.
- Traduções e rotas espanholas aprovadas na tarefa 2, salvo correções técnicas comprovadas.
- Sistema de modo escuro aprovado na tarefa 3, salvo regressão causada por este pack.
- Calendário editorial, artigos, contos e imagens existentes.
- Identidade visual, marca, paleta e tipografia.

## Método obrigatório

1. Usar o checkout existente do Sites e preservar sua arquitetura.
2. Fazer diagnóstico curto antes das alterações.
3. Implementar as tarefas 4, 5 e 6 em sequência, mas sem checkpoints intermediários.
4. Adicionar testes direcionados para painel, SEO, links bilíngues e loja sem checkout.
5. Executar compilação, lint e todos os testes.
6. Não iniciar navegador ou inspeção visual automatizada, salvo pedido explícito de Bruno.
7. Fazer uma única publicação final após todas as validações.

## Critérios de aceite

- Todas as rotas existentes continuam funcionando.
- Nenhuma informação privada aparece em páginas públicas, sitemap, RSS ou métricas públicas.
- Português e espanhol mantêm navegação coerente no próprio idioma.
- Cabeçalho e rodapé incluem a futura loja nos dois idiomas.
- A loja não possui checkout, preços, estoque ou produtos fictícios.
- Sitemap, robots, RSS, canônicas e `hreflang` são coerentes.
- Compilação, lint e testes passam sem erro.
- Uma única versão final é publicada e verificada.

## Relatório final esperado

Entregar somente:

1. versão publicada e link;
2. resumo curto das três tarefas;
3. total de testes aprovados;
4. pendências que dependem de decisão comercial de Bruno.

