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
  readTime: string;
  intro: string[];
  sections: BlogSection[];
};

export const blogPosts: BlogPost[] = [
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
];

export function getPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
