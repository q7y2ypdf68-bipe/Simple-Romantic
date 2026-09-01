# Motor de Ideias V2

## Autoridade e cobertura

O motor usa o pacote canónico `SR_MOTOR_IDEIAS_V2_AUTHORITY` (v2.0.0), mantido
ao lado do source do site e importado como dados de build — sem depender de um
caminho absoluto em runtime. A fonte contém 89 famílias, 58 campos por ficha,
72 gestos, 82 variantes literais e as regras de elegibilidade, ranking, sessão
e renderização.

`VARIANT_DATA_GAP=false`: não há gap editorial evitável conhecido para o
lançamento V1. Isso não garante cobertura universal: 18 das 108 combinações
ficam honestamente esgotadas por duração/custo estrutural. O catálogo público
nunca inventa títulos, passos, custos, disponibilidade, clima ou Plano B.

## Implementação

`app/recommendations.mjs` é um motor determinístico com dados V2 e uma API
`createV2Engine` para testar variantes controladas. A produção recebe somente
as 82 variantes canónicas. Uma futura variante precisa trazer um `familyId`
válido, duração concreta, banda C0–C4, cenário, requisitos,
disponibilidade/clima e conteúdo literal de renderização.

Os hard gates precedem integralmente o ranking: veto estrutural, cenário,
duração, custo incremental, consentimento/segurança, acessibilidade, requisito
impossível, disponibilidade/clima obrigatório sem Plano B e surpresa insegura
eliminam candidatos. O ranking restante é lexicográfico: tier, ocasião,
cenário, duração, F3/F2/F1, interação, compromisso, preparação,
personalização, diversidade e desempate estável.

O estado em memória da sessão impede repetição literal e desprioriza família,
mecânica e categoria recentes. Quando não resta variante elegível, a interface
mostra a mensagem de esgotamento, sem relaxar um hard gate.

## Testes

`tests/recommendations.test.mjs` valida as invariantes do pacote, a matriz real
de 108 filtros, rotação e renderização do corpus. `TEST FIXTURES` permanecem
isoladas para gates unitários; não são importadas na produção nem constituem
conteúdo editorial publicável.
