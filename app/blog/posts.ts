export type BlogSection = {
  heading: string;
  paragraphs?: string[];
  items?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  imageAlt: string;
  published: string;
  publishedIso?: string;
  readTime: string;
  intro: string[];
  sections: BlogSection[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "encontros-romanticos-gratuitos-sair-da-rotina",
    title: "15 ideias de encontros românticos gratuitos para sair da rotina",
    excerpt: "Planos carinhosos para viver momentos diferentes usando espaços públicos e o que vocês já têm.",
    category: "ENCONTROS GRATUITOS",
    image: "/images/beach-walk.png",
    imageAlt: "Casal caminhando junto à praia durante um encontro romântico gratuito",
    published: "24 de julho de 2026",
    publishedIso: "2026-07-24",
    readTime: "8 min de leitura",
    intro: [
      "Sair da rotina não exige comprar ingressos, reservar uma mesa ou viajar para longe. Um encontro começa quando duas pessoas escolhem interromper o automático e dedicar atenção verdadeira uma à outra.",
      "As quinze ideias abaixo foram pensadas para não exigir gastos. Adaptem cada proposta à cidade, ao clima, à mobilidade e aos limites de vocês. Antes de sair, confiram as regras, os horários e a segurança dos espaços públicos.",
    ],
    sections: [
      {
        heading: "Cinco encontros gratuitos ao ar livre",
        items: [
          "Escolham um parque e façam uma caminhada sem destino apressado, alternando quem decide o próximo caminho.",
          "Assistam ao pôr do sol em uma praça, praia, orla ou mirante seguro e de acesso gratuito.",
          "Façam um passeio fotográfico com o celular e registrem cinco detalhes bonitos que normalmente passariam despercebidos.",
          "Visitem um jardim público e escolham juntos o canto mais tranquilo para conversar por trinta minutos.",
          "Percorram uma rota conhecida como se fossem turistas, observando fachadas, histórias e pequenos detalhes do bairro.",
        ],
      },
      {
        heading: "Cinco ideias usando apenas o que vocês já têm",
        items: [
          "Levem água de casa e uma toalha para descansar em um espaço verde, sem transformar o encontro em uma lista de compras.",
          "Criem uma playlist curta com músicas ligadas à história do casal e escutem durante uma caminhada.",
          "Separem fotografias antigas no celular e contem o que cada lembrança ainda significa.",
          "Escrevam três qualidades um do outro em pequenos papéis e troquem no fim do encontro.",
          "Preparem em casa uma bebida simples e levem em uma garrafa reutilizável para apreciar em um lugar bonito.",
        ],
      },
      {
        heading: "Cinco encontros para conversar e se reconectar",
        items: [
          "Sentem em um banco de praça e respondam: o que poderíamos tornar mais leve nesta semana?",
          "Revisitem o local do primeiro encontro ou outro lugar importante e contem o que cada um lembra daquele período.",
          "Façam uma hora sem notificações, com os celulares guardados e atenção inteira na conversa.",
          "Escolham uma biblioteca ou centro cultural gratuito e indiquem um livro, uma exposição ou uma ideia um para o outro.",
          "Terminem o encontro criando juntos o próximo plano gratuito e marquem uma data possível no calendário.",
        ],
      },
      {
        heading: "Como transformar uma ideia gratuita em um encontro especial",
        paragraphs: [
          "Escolham apenas uma proposta e acrescentem um detalhe pessoal: uma música, uma pergunta, uma fotografia ou uma frase escrita à mão. O que torna o encontro romântico não é a quantidade de atividades, mas a intenção colocada no momento.",
          "Também vale preparar um plano alternativo para chuva, lotação ou mudança de horário. Se o passeio precisar ser adiado, isso não diminui o cuidado. O melhor encontro é aquele em que as duas pessoas se sentem seguras, respeitadas e presentes.",
        ],
      },
    ],
  },
  {
    slug: "encontros-romanticos-gastando-pouco",
    title: "15 ideias de encontros românticos gastando pouco",
    excerpt: "Planos simples, bonitos e possíveis para sair da rotina sem transformar carinho em uma conta alta.",
    category: "IDEIAS PARA CASAIS",
    image: "/images/viewpoint-surprise.png",
    imageAlt: "Casal sorrindo durante uma surpresa romântica em um mirante",
    published: "20 de julho de 2026",
    readTime: "7 min de leitura",
    intro: [
      "Um encontro marcante não depende do preço do restaurante, do tamanho do presente ou de uma viagem distante. Na maioria das vezes, o que fica na memória é a sensação de ter sido lembrado, ouvido e escolhido.",
      "Por isso, reunimos ideias que cabem na vida real. Você pode adaptar cada uma ao tempo disponível, à cidade onde mora e ao orçamento do casal. O objetivo não é impressionar desconhecidos: é criar presença entre duas pessoas.",
    ],
    sections: [
      {
        heading: "Ideias gratuitas ao ar livre",
        items: [
          "Assistir ao pôr do sol em um parque, mirante ou praça tranquila.",
          "Fazer uma caminhada fotográfica e registrar cinco detalhes bonitos do caminho.",
          "Levar uma playlist compartilhada para um passeio sem pressa.",
          "Revisitar o lugar do primeiro encontro e contar o que cada um lembra daquele dia.",
          "Escolher um banco de praça, deixar os celulares guardados e conversar por trinta minutos.",
        ],
      },
      {
        heading: "Encontros simples com um pequeno orçamento",
        items: [
          "Montar um piquenique com frutas, sanduíches preparados em casa e uma bebida gelada.",
          "Comprar um doce para dividir e conhecer a pé uma parte diferente do bairro.",
          "Preparar café em uma garrafa térmica e procurar um lugar bonito para tomar juntos.",
          "Escolher ingredientes baratos e cozinhar uma receita nova em dupla.",
          "Fazer uma noite de cinema em casa com ingresso escrito à mão e petiscos simples.",
        ],
      },
      {
        heading: "Pequenos gestos que transformam o encontro",
        items: [
          "Escrever três qualidades da outra pessoa e entregar no fim do encontro.",
          "Criar uma playlist com músicas que lembrem momentos do relacionamento.",
          "Levar uma fotografia antiga e contar por que aquele dia foi importante.",
          "Combinar uma hora inteira sem notificações ou redes sociais.",
          "Terminar o encontro escolhendo juntos a próxima experiência simples.",
        ],
      },
      {
        heading: "Como escolher a melhor ideia",
        paragraphs: [
          "Pense primeiro na personalidade de vocês. Há casais que descansam conversando; outros preferem caminhar, cozinhar ou descobrir lugares. Depois, considere o clima, o tempo disponível, o transporte e a segurança do local.",
          "A melhor ideia é aquela que pode acontecer de verdade. Comece pequeno, cuide dos detalhes e deixe espaço para a espontaneidade. Romance acessível não é romance menor: é carinho pensado para a vida que vocês têm hoje.",
        ],
      },
    ],
  },
  {
    slug: "piquenique-romantico-simples",
    title: "Como preparar um piquenique romântico simples",
    excerpt: "Um guia prático para escolher o lugar, montar a cesta e criar um clima especial sem complicação.",
    category: "GUIA PRÁTICO",
    image: "/images/hero-park.png",
    imageAlt: "Casal sorrindo durante um piquenique romântico no parque",
    published: "20 de julho de 2026",
    readTime: "6 min de leitura",
    intro: [
      "O piquenique é um dos encontros mais fáceis de personalizar. Pode acontecer em um parque, jardim, praia, mirante ou até no quintal de casa. Com planejamento simples, ele se transforma em uma pausa bonita no meio da rotina.",
      "Você não precisa de uma cesta perfeita nem de uma decoração cara. Uma toalha limpa, comida fácil de dividir e atenção aos detalhes já criam a base de um encontro acolhedor.",
    ],
    sections: [
      {
        heading: "1. Escolha um lugar confortável e seguro",
        paragraphs: [
          "Procure um espaço público permitido, movimentado na medida certa e com sombra, banheiro ou comércio por perto. Observe o horário do pôr do sol, a previsão do tempo e a facilidade para voltar para casa.",
          "Se for a primeira visita, chegue um pouco antes. Assim você escolhe o melhor ponto sem transformar a surpresa em correria.",
        ],
      },
      {
        heading: "2. Monte um cardápio fácil",
        items: [
          "Sanduíches ou wraps preparados em casa.",
          "Frutas lavadas e cortadas em potes bem fechados.",
          "Biscoitos, castanhas ou um doce para dividir.",
          "Água e uma bebida que os dois gostem.",
          "Guardanapos, copos reutilizáveis e um saco para recolher todo o lixo.",
        ],
      },
      {
        heading: "3. Crie uma atmosfera com o que vocês já têm",
        paragraphs: [
          "Leve uma toalha confortável, uma pequena caixa de som em volume respeitoso e uma playlist curta. Se quiser acrescentar uma surpresa, escreva um bilhete ou leve uma fotografia do casal.",
          "Evite exagerar na decoração. O lugar, a luz natural e a conversa devem continuar sendo os protagonistas.",
        ],
      },
      {
        heading: "4. Tenha um plano alternativo",
        paragraphs: [
          "Vento, chuva ou lotação podem mudar o roteiro. Escolha previamente uma cafeteria acessível, uma área coberta ou a possibilidade de levar o piquenique para casa. Ter uma alternativa evita frustração e preserva o clima do encontro.",
          "O segredo é simples: prepare o necessário, mas não tente controlar cada minuto. O melhor do piquenique é justamente poder ficar, conversar e aproveitar sem pressa.",
        ],
      },
    ],
  },
  {
    slug: "surpresas-romanticas-sem-gastar",
    title: "12 surpresas românticas que não custam quase nada",
    excerpt: "Gestos pequenos para demonstrar carinho, reacender a conexão e deixar um dia comum mais especial.",
    category: "SURPRESAS SIMPLES",
    image: "/images/beach-walk.png",
    imageAlt: "Casal caminhando junto à praia durante o pôr do sol",
    published: "20 de julho de 2026",
    readTime: "5 min de leitura",
    intro: [
      "Surpresa não precisa significar segredo elaborado ou presente caro. Ela acontece quando alguém percebe que houve intenção: uma mensagem enviada na hora certa, uma música escolhida com cuidado ou um plano feito pensando na outra pessoa.",
      "As ideias abaixo servem para namorados, casados e casais que desejam voltar a reservar tempo para a relação. Adapte tudo ao jeito de vocês.",
    ],
    sections: [
      {
        heading: "Surpresas para um dia comum",
        items: [
          "Esconder um bilhete carinhoso na bolsa, no livro ou perto do café.",
          "Enviar uma mensagem contando uma lembrança feliz do relacionamento.",
          "Preparar a bebida preferida da pessoa antes que ela peça.",
          "Organizar uma playlist de cinco músicas e explicar a escolha de cada uma.",
          "Assumir uma tarefa cansativa para oferecer uma hora de descanso verdadeiro.",
          "Separar três fotografias e montar uma pequena linha do tempo do casal.",
        ],
      },
      {
        heading: "Surpresas para aproveitar juntos",
        items: [
          "Convidar para ver o pôr do sol sem revelar o destino exato.",
          "Preparar um jantar simples e transformar a mesa com luz mais suave e música.",
          "Criar uma sessão de cinema com o filme favorito e um convite feito à mão.",
          "Planejar uma caminhada em um lugar que vocês ainda não conhecem.",
          "Fazer um pote com perguntas leves para conversar sem olhar o celular.",
          "Entregar um vale-encontro com data aberta para escolherem juntos.",
        ],
      },
      {
        heading: "O detalhe mais importante",
        paragraphs: [
          "Uma boa surpresa respeita o gosto, o tempo e os limites da outra pessoa. Nem todo mundo gosta de exposição pública, mudanças inesperadas ou grandes declarações. O romantismo funciona melhor quando demonstra conhecimento e cuidado.",
          "Se a semana estiver corrida, escolha algo pequeno. A constância de gestos sinceros cria mais conexão do que uma única produção grandiosa. O objetivo é dizer, de um jeito concreto: eu pensei em você.",
        ],
      },
    ],
  },
  {
    slug: "encontro-romantico-no-parque",
    title: "Encontro romântico no parque: roteiro gratuito e completo",
    excerpt: "Um plano simples para transformar um parque próximo em cenário de conversa, descanso e conexão.",
    category: "LUGARES PÚBLICOS",
    image: "/images/hero-park.png",
    imageAlt: "Casal aproveitando um encontro tranquilo em um parque",
    published: "22 de julho de 2026",
    readTime: "6 min de leitura",
    intro: [
      "Parques são espaços democráticos: permitem caminhar, conversar, observar a paisagem e fazer uma pausa sem obrigação de consumir. Com um pouco de intenção, um passeio comum pode se tornar um encontro que realmente aproxima.",
      "Este roteiro foi pensado para ser gratuito. Usem o que já têm em casa, escolham um lugar seguro e adaptem o ritmo ao conforto dos dois.",
    ],
    sections: [
      { heading: "Antes de sair", items: ["Confiram o horário de funcionamento e a previsão do tempo.", "Escolham uma área movimentada, iluminada e com acesso fácil.", "Levem água, proteção solar e uma pequena toalha, se já tiverem.", "Avisem alguém de confiança sobre o destino quando o lugar for novo."] },
      { heading: "Um roteiro de duas horas", items: ["Comecem com uma caminhada de vinte minutos, sem pressa e sem celular na mão.", "Escolham um banco ou área tranquila e contem um momento bom da semana.", "Façam uma brincadeira: cada pessoa encontra três detalhes bonitos no lugar.", "Terminem escolhendo uma música para ouvir juntos no caminho de volta."] },
      { heading: "Como deixar o passeio especial", paragraphs: ["O diferencial não está na decoração. Pode ser uma pergunta que vocês nunca fizeram, uma fotografia antiga no celular ou um bilhete curto entregue no fim.", "Respeitem o espaço público, o volume da música e os limites de cada pessoa. Levar todo o lixo embora também faz parte do cuidado."] },
    ],
  },
  {
    slug: "encontro-romantico-em-dia-de-chuva",
    title: "9 ideias de encontro para um dia de chuva",
    excerpt: "Planos acolhedores, gratuitos ou de baixo custo, para quando o tempo muda sem cancelar o carinho.",
    category: "PLANOS ALTERNATIVOS",
    image: "/images/beach-walk.png",
    imageAlt: "Casal caminhando junto e aproveitando uma mudança no clima",
    published: "22 de julho de 2026",
    readTime: "5 min de leitura",
    intro: [
      "A chuva pode cancelar um piquenique, mas não precisa cancelar o encontro. O segredo é abandonar a ideia de uma programação perfeita e criar uma experiência confortável com o espaço e os recursos disponíveis.",
      "As sugestões abaixo funcionam em casa ou em locais públicos cobertos. Escolham uma que combine com a energia do dia.",
    ],
    sections: [
      { heading: "Ideias para ficar em casa", items: ["Cozinhar uma receita usando apenas ingredientes disponíveis.", "Rever fotografias antigas e escolher cinco para uma pasta especial.", "Fazer uma sessão de cinema com intervalo para conversar sobre o filme.", "Montar uma playlist para os próximos passeios.", "Escrever juntos uma lista de lugares gratuitos que desejam conhecer."] },
      { heading: "Ideias fora de casa", items: ["Visitar uma biblioteca pública e escolher um texto um para o outro.", "Conhecer um mercado coberto e observar sabores, aromas e histórias do lugar.", "Passear por um centro cultural com entrada gratuita.", "Tomar a bebida levada de casa em uma área coberta com vista para a chuva."] },
      { heading: "Plano B sem frustração", paragraphs: ["Decidam o plano alternativo antes de sair. Assim, a mudança parece parte do encontro, não um fracasso. Levem guarda-chuva, verifiquem o transporte e evitem locais sujeitos a alagamento.", "Um encontro memorável não depende do céu aberto. Depende da sensação de que o tempo juntos continua importante."] },
    ],
  },
  {
    slug: "como-reconectar-com-parceiro",
    title: "Como reconectar com seu parceiro sem grandes planos",
    excerpt: "Práticas simples de presença e conversa para casais que sentem a rotina ocupando espaço demais.",
    category: "CONEXÃO",
    image: "/images/viewpoint-surprise.png",
    imageAlt: "Casal conversando e se reconectando em um mirante",
    published: "22 de julho de 2026",
    readTime: "7 min de leitura",
    intro: [
      "A distância dentro de uma relação nem sempre aparece como uma grande briga. Às vezes, ela se instala em conversas apressadas, cansaço, tarefas e dias inteiros vividos no modo automático.",
      "Reconectar não significa resolver tudo em uma noite. Significa abrir pequenos espaços seguros para voltar a perceber, ouvir e compreender a pessoa ao lado.",
    ],
    sections: [
      { heading: "Comecem com vinte minutos", paragraphs: ["Escolham um horário possível e guardem os celulares. Cada pessoa fala por alguns minutos sobre como realmente está, enquanto a outra apenas escuta, sem corrigir ou preparar uma defesa.", "O objetivo inicial não é chegar a uma solução. É recuperar a experiência de ser ouvido."] },
      { heading: "Perguntas que ajudam", items: ["O que mais consumiu sua energia nesta semana?", "Em que momento você se sentiu apoiado por mim?", "O que poderíamos tornar mais leve juntos?", "Que momento simples você gostaria de repetir?", "Como posso demonstrar carinho de um jeito que faça sentido para você?"] },
      { heading: "Transformem intenção em rotina", paragraphs: ["Marquem um encontro curto e gratuito por semana: uma caminhada, um café feito em casa ou uma conversa na varanda. A regularidade importa mais que a duração.", "Quando houver conflitos persistentes, sofrimento ou insegurança, buscar apoio profissional é uma forma de cuidado, não um sinal de fracasso."] },
    ],
  },
  {
    slug: "passeio-fotografico-para-casais",
    title: "Passeio fotográfico para casais: uma ideia gratuita",
    excerpt: "Um encontro criativo usando apenas o celular, o bairro e um olhar mais atento para o caminho.",
    category: "ENCONTROS CRIATIVOS",
    image: "/images/viewpoint-surprise.png",
    imageAlt: "Casal registrando lembranças durante um passeio pela cidade",
    published: "22 de julho de 2026",
    readTime: "5 min de leitura",
    intro: [
      "Um passeio fotográfico transforma uma caminhada em jogo de observação. Não é preciso câmera profissional: o celular já basta. A proposta é desacelerar e descobrir juntos detalhes que normalmente passariam despercebidos.",
      "Escolham uma rota segura, de preferência durante o dia, e combinem um tema para orientar as fotografias.",
    ],
    sections: [
      { heading: "Escolham um desafio", items: ["Cinco cores encontradas pelo caminho.", "Portas, janelas e fachadas interessantes.", "Pequenos sinais de gentileza na cidade.", "Reflexos, sombras e formas curiosas.", "Três fotografias que representem o relacionamento."] },
      { heading: "Durante o passeio", paragraphs: ["Alternem quem escolhe a direção e parem quando algo chamar atenção. Evitem fotografar pessoas identificáveis sem autorização e respeitem áreas onde imagens não são permitidas.", "Ao final, sentem em uma praça e cada pessoa escolhe suas três fotos favoritas, explicando o motivo."] },
      { heading: "Guardem a memória", paragraphs: ["Criem um álbum compartilhado com a data e o nome do lugar. Uma das imagens pode virar papel de parede do celular ou acompanhar uma mensagem de carinho no dia seguinte.", "O valor do encontro está na história construída enquanto vocês olham para a mesma cidade com curiosidade."] },
    ],
  },
  {
    slug: "encontro-em-casa-sem-gastar",
    title: "10 ideias de encontro em casa sem gastar dinheiro",
    excerpt: "Maneiras de sair do automático e criar uma noite especial usando apenas o que vocês já têm.",
    category: "EM CASA",
    image: "/images/hero-park.png",
    imageAlt: "Casal sorrindo e compartilhando um momento simples",
    published: "22 de julho de 2026",
    readTime: "6 min de leitura",
    intro: [
      "Ficar em casa não precisa significar repetir a rotina. Uma mudança de intenção, ambiente e atenção pode transformar algumas horas comuns em um encontro íntimo e divertido.",
      "Antes de escolher a ideia, combinem uma regra simples: durante aquele período, tarefas e notificações ficam em segundo plano.",
    ],
    sections: [
      { heading: "Dez planos usando o que já existe", items: ["Preparar juntos uma receita improvisada.", "Fazer um cinema temático com um filme disponível.", "Criar uma playlist contando a história do casal.", "Montar um quiz sobre lembranças compartilhadas.", "Reorganizar um canto da casa para tomar café e conversar.", "Fazer uma degustação às cegas de alimentos que já estão na despensa.", "Aprender passos de dança com um vídeo gratuito.", "Planejar uma caminhada para o fim de semana.", "Escrever cartas para abrir daqui a um ano.", "Escolher fotografias para criar uma retrospectiva digital."] },
      { heading: "Mude o ambiente sem comprar nada", paragraphs: ["Apaguem a luz principal, usem um abajur, arrumem a mesa ou estendam uma toalha no chão. A alteração visual ajuda o cérebro a perceber que aquele momento é diferente da rotina.", "Não tentem reproduzir uma imagem perfeita de rede social. Criem conforto e espaço para rir quando algo não sair como esperado."] },
    ],
  },
  {
    slug: "perguntas-para-casais-conversarem",
    title: "25 perguntas para casais conversarem com mais presença",
    excerpt: "Perguntas leves, afetivas e profundas para acompanhar uma caminhada, um piquenique ou uma noite em casa.",
    category: "CONVERSAS",
    image: "/images/beach-walk.png",
    imageAlt: "Casal conversando durante uma caminhada perto do mar",
    published: "22 de julho de 2026",
    readTime: "8 min de leitura",
    intro: [
      "Boas perguntas criam caminhos para histórias que a rotina não costuma alcançar. Elas não são testes e não precisam ser respondidas rapidamente. O mais importante é escutar sem transformar cada resposta em debate.",
      "Escolham apenas algumas perguntas por encontro. Se um assunto causar desconforto, respeitem o limite e retomem quando houver segurança.",
    ],
    sections: [
      { heading: "Para começar de forma leve", items: ["Qual pequeno momento desta semana fez você sorrir?", "Que lugar da nossa cidade você gostaria de conhecer?", "Qual música combina com nossa fase atual?", "Que hábito simples deixa seu dia melhor?", "Qual lembrança nossa sempre melhora seu humor?", "Como seria uma tarde perfeita sem gastar nada?", "Que coisa nova você gostaria de aprender comigo?", "Qual comida traz uma memória boa para você?"] },
      { heading: "Para fortalecer a conexão", items: ["Quando você se sente mais amado por mim?", "Que gesto meu fez diferença recentemente?", "O que poderíamos celebrar mais?", "Como podemos dividir melhor o cansaço?", "Que tradição simples poderíamos criar?", "O que você gostaria que eu perguntasse com mais frequência?", "Qual sonho pequeno podemos realizar neste mês?", "Como você prefere receber apoio em um dia difícil?"] },
      { heading: "Para olhar adiante", items: ["Que memória queremos construir neste ano?", "O que desejamos preservar mesmo quando a rotina mudar?", "Qual lugar próximo merece uma visita juntos?", "Como seria nosso domingo ideal?", "Que atitude pode tornar nossa casa mais acolhedora?", "O que queremos aprender sobre nós dois?", "Qual promessa realista podemos fazer para a próxima semana?", "Que experiência gratuita ainda nunca vivemos juntos?", "Pelo que você sente gratidão hoje?"] },
    ],
  },
  {
    slug: "seguranca-em-encontros-lugares-publicos",
    title: "Como planejar encontros seguros em lugares públicos",
    excerpt: "Um checklist prático para aproveitar parques, praias, praças e mirantes com tranquilidade.",
    category: "SEGURANÇA E CUIDADO",
    image: "/images/hero-park.png",
    imageAlt: "Casal aproveitando com tranquilidade um parque público",
    published: "22 de julho de 2026",
    readTime: "6 min de leitura",
    intro: [
      "Espaços públicos permitem encontros bonitos e acessíveis, mas cada lugar exige atenção ao horário, transporte, clima e regras locais. Planejar esses detalhes não diminui a espontaneidade: protege o momento.",
      "Este checklist serve tanto para casais antigos quanto para pessoas que ainda estão se conhecendo.",
    ],
    sections: [
      { heading: "Antes do encontro", items: ["Pesquise horário, iluminação, acessibilidade e movimento do local.", "Confira a previsão do tempo e alertas da região.", "Planeje ida e volta, incluindo uma alternativa de transporte.", "Mantenha o celular carregado e leve apenas o necessário.", "Em encontros recentes, compartilhe local e horário com alguém de confiança."] },
      { heading: "Durante o passeio", items: ["Permaneça em áreas permitidas e evite caminhos isolados.", "Respeite os limites físicos e emocionais de todos.", "Não deixe objetos pessoais sem supervisão.", "Consuma bebidas com responsabilidade e nunca dirija após beber.", "Observe mudanças no clima, no movimento e no transporte disponível."] },
      { heading: "Consentimento sempre importa", paragraphs: ["Um plano romântico precisa ser confortável para as duas pessoas. Surpresas não anulam o direito de perguntar, recusar, mudar de ideia ou ir embora.", "Se algo parecer inseguro, encerrem ou mudem o encontro. Nenhuma fotografia, roteiro ou expectativa vale mais que o bem-estar de vocês."] },
    ],
  },
];

export function getPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
