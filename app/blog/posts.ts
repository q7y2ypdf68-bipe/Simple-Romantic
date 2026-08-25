export type BlogSection = {
  heading: string;
  paragraphs?: string[];
  paragraphLink?: { before: string; linkText: string; href: string; after: string };
  afterParagraphs?: string[];
  items?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  seoTitle?: string;
  excerpt: string;
  category: string;
  image: string;
  imageAlt: string;
  published: string;
  publishedIso?: string;
  readTime: string;
  intro: string[];
  sections: BlogSection[];
  series?: "CONSELHO DA SEMANA" | "IDEIAS E GUIAS" | "CONTOS";
  contentNotice?: {
    label: "CONTO FICTÍCIO" | "INSPIRADO EM FATOS" | "HISTÓRIA REAL" | "CUENTO FICTICIO" | "INSPIRADO EN HECHOS" | "HISTORIA REAL";
    text: string;
  };
};

export const blogPosts: BlogPost[] = [
  {
    slug: "pequenos-gestos-de-amor",
    title: "25 pequenos gestos de amor que cabem num dia comum",
    seoTitle: "25 pequenos gestos de amor para fazer no dia a dia",
    excerpt: "Descubra 25 gestos simples e carinhosos para demonstrar amor no cotidiano, fortalecer a conexão e transformar dias comuns em pequenas memórias.",
    category: "AFETO COTIDIANO",
    series: "IDEIAS E GUIAS",
    image: "/images/blog/15-pequenos-gestos-amor.webp",
    imageAlt: "Casal adulto trocando um gesto carinhoso numa varanda em fim de tarde",
    published: "24 de agosto de 2026",
    publishedIso: "2026-08-24",
    readTime: "8 min de leitura",
    intro: [
      "Nem todo momento especial precisa começar com uma reserva, uma caixa de presente ou uma data marcada no calendário.",
      "Às vezes, ele começa com um café deixado pronto.",
      "Com uma mensagem no meio da tarde.",
      "Com cinco minutos de atenção sem o celular por perto.",
      "Os pequenos gestos têm uma vantagem bonita: eles cabem na vida real. Cabem numa terça-feira cansativa, entre duas tarefas, num orçamento apertado e até naquele dia em que ninguém acordou particularmente romântico.",
      "Por isso, reunimos 25 ideias simples para demonstrar carinho sem transformar o amor em uma produção cinematográfica.",
    ],
    sections: [
      { heading: "1. Prepare algo que a pessoa costuma fazer sozinha", paragraphs: ["Pode ser passar o café, encher a garrafa de água, organizar alguma coisa ou adiantar uma pequena tarefa.", "Não precisa anunciar.", "Às vezes, o carinho funciona melhor quando simplesmente aparece."] },
      { heading: "2. Envie uma mensagem sem precisar de motivo", paragraphs: ["Não espere aniversário, saudade extrema ou alguma grande notícia.", "Um simples “lembrei de você agora” pode interromper um dia comum de um jeito muito bom."] },
      { heading: "3. Pergunte qual foi a melhor parte do dia", paragraphs: ["É uma pergunta pequena, mas abre uma janela.", "E, quando a resposta vier, escute de verdade."] },
      { heading: "4. Deixe um bilhete escondido", paragraphs: ["Na carteira, dentro de um livro, na bolsa, no espelho ou em algum lugar que a pessoa só encontrará mais tarde.", "Pode ter apenas uma frase.", "O encanto está também na descoberta."] },
      { heading: "5. Coloque uma música que faz parte da história de vocês", paragraphs: ["Sem explicação.", "Deixe os primeiros segundos fazerem o trabalho."] },
      { heading: "6. Guarde o celular por alguns minutos", paragraphs: ["Não precisa decretar uma noite inteira sem tecnologia.", "Experimente apenas dez minutos de presença completa.", "Para um mundo que vive piscando notificações, atenção virou um presente raro."] },
      { heading: "7. Leve alguma coisa que a pessoa gosta", paragraphs: ["Um chocolate, uma fruta, um café, um pão favorito.", "O valor está menos no objeto e mais na mensagem silenciosa:", "“Eu lembro do que você gosta.”"] },
      { heading: "8. Faça um elogio específico", paragraphs: ["Em vez de apenas dizer “você está linda” ou “você está lindo”, escolha algo que realmente percebeu.", "“Gosto da forma como você sempre tenta deixar as pessoas à vontade.”", "“Você fica muito bonito quando está concentrado.”", "Especificidade transforma elogio em reconhecimento."] },
      { heading: "9. Mande uma foto antiga de vocês", paragraphs: ["Escolha uma imagem esquecida na galeria e acrescente:", "“Lembra desse dia?”", "Uma fotografia antiga pode abrir uma conversa inteira."] },
      { heading: "10. Abrace por alguns segundos a mais", paragraphs: ["Sem pressa para soltar.", "Sem precisar dizer nada.", "Só fique."] },
      { heading: "11. Faça uma pergunta que normalmente não faria", paragraphs: ["“Tem alguma coisa que você gostaria de fazer comigo este mês?”", "“Qual lugar você gostaria de conhecer comigo?”", "“Do que você sente saudade ultimamente?”", "Relacionamentos também precisam de curiosidade."] },
      { heading: "12. Prepare o espaço para a pessoa descansar", paragraphs: ["Arrume o sofá, diminua a luz, pegue uma manta ou coloque alguma música tranquila.", "Transformar um ambiente comum em acolhimento leva poucos minutos."] },
      { heading: "13. Diga obrigado por algo cotidiano", paragraphs: ["Há coisas que, de tão frequentes, tornam-se invisíveis.", "“Obrigado por sempre lembrar disso.”", "“Obrigado por ter feito aquilo ontem.”", "Reconhecer o cotidiano impede que cuidado vire obrigação silenciosa."] },
      { heading: "14. Divida algo engraçado que tenha a cara de vocês", paragraphs: ["Uma imagem, um vídeo, uma piada interna.", "Casais também constroem intimidade rindo das mesmas bobagens.", "E isso é ótimo."] },
      { heading: "15. Faça companhia numa tarefa chata", paragraphs: ["Dobrar roupa, cozinhar, organizar a casa, ir ao mercado.", "Talvez a atividade continue chata.", "Mas vocês podem torná-la menos solitária."] },
      { heading: "16. Pergunte: “Posso fazer alguma coisa para deixar seu dia mais leve?”", paragraphs: ["Nem sempre haverá uma grande resposta.", "Talvez seja apenas buscar alguma coisa, resolver uma tarefa ou oferecer alguns minutos de silêncio.", "Ainda assim, a pergunta comunica cuidado."] },
      { heading: "17. Escolha uma pequena surpresa para o fim do dia", paragraphs: ["Uma sobremesa.", "Um passeio de dez minutos.", "Um chá.", "Uma música.", "Um episódio de alguma série.", "A surpresa não precisa ser grande para criar expectativa."] },
      { heading: "18. Lembre uma qualidade que você admira", paragraphs: ["Não apenas aparência.", "Coragem, gentileza, humor, paciência, criatividade, responsabilidade, generosidade.", "Ser amado também é sentir-se visto."] },
      { heading: "19. Recrie um pedacinho de uma memória", paragraphs: ["Compre algo que vocês comeram num encontro antigo.", "Volte a uma rua.", "Coloque uma música.", "Repita uma fotografia.", "Não é preciso reconstruir o dia inteiro. Um detalhe já pode trazer a memória de volta."] },
      { heading: "20. Faça um mini-encontro improvisado", paragraphs: ["Pegue duas bebidas e sente na varanda.", "Caminhem pelo bairro.", "Comam alguma coisa no carro.", "Sentem num parque.", "Um encontro começa quando vocês decidem tratar aquele momento como encontro."] },
      { heading: "21. Pergunte se a pessoa quer falar ou apenas companhia", paragraphs: ["Há dias em que queremos contar tudo.", "Em outros, queremos apenas alguém por perto.", "Saber a diferença é uma forma delicada de cuidado."] },
      { heading: "22. Faça algo que facilite a manhã seguinte", paragraphs: ["Deixe alguma coisa preparada.", "Organize o café.", "Separe o que será necessário.", "O gesto acontece hoje, mas o carinho só será descoberto amanhã."] },
      { heading: "23. Diga algo carinhoso antes de dormir", paragraphs: ["Não precisa ser uma declaração elaborada.", "“Gostei de estar com você hoje.”", "“Durma bem.”", "“Foi bom ter você aqui.”", "Algumas palavras simples fecham o dia com outra textura."] },
      { heading: "24. Crie uma pequena tradição de vocês", paragraphs: ["Uma música aos domingos.", "Uma caminhada depois do jantar.", "Um café especial na sexta.", "Uma pergunta antes de dormir.", "Tradições não precisam ser antigas. Alguém precisa inventá-las primeiro."] },
      { heading: "25. Pergunte: “O que nós poderíamos fazer juntos hoje?”", paragraphs: ["Talvez a resposta seja absolutamente simples.", "E esse é justamente o ponto."] },
      {
        heading: "O amor também mora nos intervalos",
        paragraphs: [
          "Grandes momentos são maravilhosos.",
          "Viagens, aniversários, surpresas e encontros especiais merecem espaço.",
          "Mas um relacionamento não acontece apenas nesses dias.",
          "Ele acontece principalmente entre eles.",
          "Na cozinha.",
          "No caminho para casa.",
          "Numa mensagem rápida.",
          "Na forma como alguém percebe que o outro está cansado.",
          "Num abraço antes de sair.",
          "Nos pequenos sinais que dizem, repetidamente:",
          "“Eu ainda vejo você.”",
          "Você não precisa fazer os 25 gestos desta lista.",
          "Escolha um.",
          "Faça hoje.",
        ],
        paragraphLink: { before: "E, se quiser transformar outro dia comum em um pequeno encontro, conheça também o nosso guia ", linkText: "30 encontros simples gastando pouco", href: "/guia", after: "." },
        afterParagraphs: ["Porque romance não precisa esperar uma ocasião especial.", "Às vezes, a ocasião é simplesmente hoje."],
      },
    ],
  },
  {
    slug: "conto-o-olhar-que-ficou",
    title: "O olhar que ficou",
    excerpt: "Um conto sobre duas pessoas que quase se perderam na pressa e reencontraram, num simples olhar, a coragem de voltar a escolher uma à outra.",
    category: "CONTOS",
    series: "CONTOS",
    contentNotice: {
      label: "CONTO FICTÍCIO",
      text: "Esta história é uma obra de ficção. Personagens e acontecimentos foram criados para esta publicação.",
    },
    image: "/images/blog/13-o-olhar-que-ficou.webp",
    imageAlt: "Casal adulto de mãos dadas e trocando um olhar carinhoso numa esplanada junto ao mar",
    published: "2 de agosto de 2026",
    publishedIso: "2026-08-02",
    readTime: "7 min de leitura",
    intro: [
      "Helena percebeu que Rafael já não a olhava como antes. Não era falta de amor, pensava. Era pressa. Os dois tinham aprendido a conversar enquanto procuravam chaves, respondiam mensagens e conferiam a hora. Até os beijos pareciam saber que o autocarro não esperaria.",
      "Naquele domingo, sentaram-se numa pequena esplanada diante do mar. Não havia aniversário, pedido de desculpas nem uma decisão importante para tomar. Apenas duas chávenas, o fim de tarde e um silêncio que, pela primeira vez em muito tempo, nenhum dos dois tentou preencher depressa.",
    ],
    sections: [
      {
        heading: "Um segundo a mais",
        paragraphs: [
          "Rafael levantou os olhos quando Helena afastou uma mecha de cabelo levada pelo vento. Ela sustentou o olhar. Um segundo. Depois outro. Não era um desafio nem uma pergunta. Era o reconhecimento quase esquecido de quem conhece o rosto à sua frente e, ainda assim, pode voltar a descobri-lo.",
          "Ele sorriu de lado, como fazia no início. Helena sentiu vontade de rir, mas não desviou. A cidade continuou atrás deles — copos sobre mesas, passos no passeio, uma bicicleta passando — e, por alguns instantes, tudo pareceu acontecer mais longe.",
          "— Há quanto tempo não fazemos isso? — ela perguntou. Rafael não fingiu não entender. Pousou o telemóvel virado para baixo e respondeu: — Há tempo demais.",
        ],
      },
      {
        heading: "A mão sobre a mesa",
        paragraphs: [
          "Helena contou que sentia saudade de ser percebida antes de precisar pedir. Não queria gestos grandiosos. Queria que ele notasse quando ela chegava cansada, que perguntasse sem olhar para um ecrã e que permanecesse perto o bastante para ouvir a resposta inteira.",
          "Rafael escutou sem se defender. Depois confessou que também sentia falta dela, embora dormissem na mesma cama. Tinha medo de que toda tentativa de aproximação chegasse numa hora errada e, por isso, esperava por um momento perfeito que nunca aparecia.",
          "A mão dele avançou devagar sobre a mesa. Não agarrou a dela; apenas ficou ali, oferecendo espaço. Helena aproximou os dedos e entrelaçou-os aos seus. O gesto era pequeno, mas dizia com clareza: eu ainda estou aqui.",
        ],
      },
      {
        heading: "O caminho de volta",
        paragraphs: [
          "Quando deixaram a esplanada, o céu já misturava rosa e azul. Caminharam sem pressa. Rafael abriu a porta do carro e Helena brincou que aquela gentileza parecia saída de outra época. — Então vamos trazê-la de volta — disse ele.",
          "Antes de entrar, ela tocou o rosto dele e deu-lhe um beijo na testa. Não como recompensa, mas como resposta. Rafael fechou os olhos por um instante. Depois voltou a olhá-la — inteiro, atento, sem procurar a próxima tarefa.",
          "Não prometeram nunca mais se distrair. Prometeram algo mais honesto: reconhecer quando estivessem a desaparecer um do olhar do outro e criar, mesmo num dia comum, alguns minutos para regressar.",
        ],
      },
      {
        heading: "Para levar desta história",
        paragraphs: [
          "Intimidade também se constrói no modo como duas pessoas se veem. Um olhar demorado, uma mão oferecida, um beijo na testa ou uma pergunta feita com atenção podem devolver presença a uma relação cansada pela rotina.",
          "Nesta semana, experimentem guardar os telemóveis por dez minutos e olhar um para o outro sem pressa. Não é preciso transformar o momento em declaração ou resolver tudo. Comecem apenas dizendo: “Estou aqui. Como você está, de verdade?”.",
        ],
      },
    ],
  },
  {
    slug: "conselho-da-semana-dez-minutos-de-presenca",
    title: "Conselho da semana: dez minutos de presença valem mais que um plano perfeito",
    excerpt: "Uma prática curta para interromper o automático, escutar com atenção e cuidar da relação no meio de uma semana comum.",
    category: "CONSELHO DA SEMANA",
    series: "CONSELHO DA SEMANA",
    image: "/images/blog/07-reconectar.webp",
    imageAlt: "Casal adulto conversando com atenção e de mãos dadas à beira do rio",
    published: "31 de julho de 2026",
    publishedIso: "2026-07-31",
    readTime: "4 min de leitura",
    intro: [
      "Nem toda semana oferece tempo para um encontro longo. Ainda assim, quase sempre existe uma pequena janela em que duas pessoas podem sair do automático e voltar a se perceber.",
      "O conselho desta terça-feira é simples: reservem dez minutos de presença inteira. Não para organizar tarefas ou resolver todos os problemas, mas para saber como a pessoa ao lado realmente está.",
    ],
    sections: [
      {
        heading: "Como fazer o encontro de dez minutos",
        items: [
          "Escolham um momento possível e deixem os celulares fora do alcance.",
          "Durante cinco minutos, uma pessoa fala e a outra apenas escuta, sem interromper ou preparar uma resposta.",
          "Depois, troquem os papéis pelos cinco minutos restantes.",
          "Terminem dizendo uma coisa pequena que poderia tornar a semana mais leve para os dois.",
        ],
      },
      {
        heading: "Uma pergunta para começar",
        paragraphs: [
          "Se não souberem por onde iniciar, experimentem: “o que ocupou mais espaço dentro de você hoje?”. A pergunta não exige uma resposta perfeita e abre caminho para falar de cansaço, alegria, preocupação ou expectativa.",
          "Escutar não significa concordar com tudo nem encontrar imediatamente uma solução. Significa oferecer atenção antes de oferecer conselho.",
        ],
      },
      {
        heading: "O pequeno compromisso da semana",
        paragraphs: [
          "Escolham um gesto realista a partir da conversa: dividir uma tarefa, caminhar juntos, preparar um café ou simplesmente repetir os dez minutos em outro dia.",
          "Relacionamentos não se sustentam apenas em grandes planos. Muitas vezes, são esses pequenos espaços de presença que lembram aos dois que continuam no mesmo time.",
        ],
      },
    ],
  },
  {
    slug: "conto-a-mesa-perto-da-janela",
    title: "A mesa perto da janela",
    excerpt: "Um conto sobre duas pessoas, um jantar que quase não aconteceu e a delicadeza de voltar a prestar atenção.",
    category: "CONTOS",
    series: "CONTOS",
    contentNotice: {
      label: "CONTO FICTÍCIO",
      text: "Esta história é uma obra de ficção. Personagens e acontecimentos foram criados para esta publicação.",
    },
    image: "/images/blog/16-a-mesa-perto-da-janela.webp",
    imageAlt: "Casal adulto conversando em casa enquanto a chuva cai do lado de fora",
    published: "31 de julho de 2026",
    publishedIso: "2026-07-31",
    readTime: "6 min de leitura",
    intro: [
      "Quando Clara chegou, a chuva já tinha apagado os contornos dos prédios do outro lado da rua. Encontrou Miguel na cozinha, imóvel diante de duas panelas e de uma receita aberta no celular.",
      "— Eu ia fazer aquele jantar — disse ele, olhando para o molho que claramente não tinha colaborado. Clara pousou a bolsa, provou uma gota com a ponta da colher e tentou não rir. Não conseguiu. Miguel riu também, primeiro sem vontade, depois como quem finalmente soltava o peso do dia.",
    ],
    sections: [
      {
        heading: "O plano que deu errado",
        paragraphs: [
          "A reserva havia sido cancelada por causa da tempestade. Miguel quis salvar a noite reproduzindo em casa o prato do restaurante. Não encontrou dois ingredientes, queimou o alho e deixou cair metade do sal sobre a bancada.",
          "Clara poderia ter aberto o aplicativo de entregas. Em vez disso, tirou da geladeira os ovos, um tomate e o pedaço de queijo que restava. — Vamos jantar o que a casa permitir — propôs.",
          "Prepararam uma omelete torta, dividiram o último pão e levaram tudo para a pequena mesa perto da janela. Nenhum dos dois se lembrava da última vez em que tinham se sentado ali sem computador, contas ou uma lista de tarefas entre eles.",
        ],
      },
      {
        heading: "A pergunta esquecida",
        paragraphs: [
          "Por alguns minutos, observaram a água descendo pelo vidro. Miguel contou que vinha dormindo mal. Clara confessou que sentia saudade de conversar sem que cada frase precisasse resultar numa decisão.",
          "— Em que momento ficamos tão ocupados? — ela perguntou. Miguel não soube responder. Estendeu a mão sobre a mesa e deixou que o silêncio fizesse o que as respostas não conseguiam.",
          "Não resolveram naquela noite o trabalho atrasado, o orçamento apertado nem a viagem que continuava sem data. Combinaram apenas uma coisa: toda quarta-feira, jantariam naquela mesa, ainda que houvesse apenas pão, ovos e vinte minutos disponíveis.",
        ],
      },
      {
        heading: "Depois da chuva",
        paragraphs: [
          "A tempestade diminuiu antes da sobremesa, que foi uma maçã cortada ao meio. Miguel guardou o celular. Clara acendeu o pequeno abajur da sala. A cidade voltou a aparecer atrás da janela, brilhando molhada e imperfeita.",
          "O jantar que quase não aconteceu terminou sem fotografia. Mesmo assim, semanas depois, quando alguém perguntava sobre uma noite especial, os dois pensavam na omelete torta, na chuva e na mesa que os ensinara a caber novamente na vida um do outro.",
        ],
      },
    ],
  },
  {
    slug: "encontro-romantico-de-ultima-hora",
    title: "Encontro romântico de última hora: 12 ideias fáceis para hoje",
    excerpt: "Planos simples e possíveis para transformar algumas horas livres em um momento especial, sem reservas, compras complicadas ou muito dinheiro.",
    category: "IDEIAS PARA CASAIS",
    series: "IDEIAS E GUIAS",
    image: "/images/blog/12-encontro-ultima-hora.webp",
    imageAlt: "Casal adulto preparando junto um encontro romântico simples de última hora",
    published: "31 de julho de 2026",
    publishedIso: "2026-07-31",
    readTime: "9 min de leitura",
    intro: [
      "Uma mensagem no meio da tarde, algumas horas livres que apareceram de repente ou apenas a vontade de interromper a rotina: um encontro romântico não precisa ser planejado com semanas de antecedência para ser cuidadoso e especial.",
      "Espontaneidade não significa ignorar o conforto da outra pessoa. Antes de escolher o plano, confirmem o tempo disponível, a energia do dia, o orçamento e a previsão do tempo. A melhor ideia para hoje é aquela que os dois conseguem aproveitar sem pressa, pressão ou gastos desnecessários.",
    ],
    sections: [
      {
        heading: "Antes de escolher: façam um check-in de dois minutos",
        paragraphs: [
          "Perguntem um ao outro: queremos sair ou ficar em casa? Preferimos conversar, caminhar, comer alguma coisa ou simplesmente descansar juntos? Existe algum limite de horário, mobilidade, alimentação ou dinheiro que precisa ser considerado?",
          "Com essas respostas, eliminem o que não combina com o momento e escolham apenas uma proposta. Não tentem encaixar muitas atividades na mesma noite. Um plano simples, vivido com presença, costuma ser mais agradável do que uma programação cheia de etapas.",
        ],
      },
      {
        heading: "1. Caminhada ao pôr do sol com uma pergunta para cada um",
        paragraphs: [
          "Escolham uma praça, parque, orla ou rua tranquila que já conheçam. Levem água, confiram o horário e façam uma caminhada curta. Durante o percurso, cada pessoa escolhe uma pergunta que gostaria de responder com calma.",
          "Pode ser algo leve, como “qual foi a melhor parte da sua semana?”, ou algo sobre o casal, como “que momento simples você gostaria de repetir?”. A pergunta dá intenção ao passeio sem transformar a conversa em entrevista.",
        ],
      },
      {
        heading: "2. Piquenique improvisado com o que já existe em casa",
        paragraphs: [
          "Não é necessário montar uma cesta perfeita. Separem uma manta ou toalha, água, frutas, sanduíches, biscoitos ou qualquer alimento fácil de transportar que vocês já tenham. Um parque próximo, o quintal, a varanda ou até o chão da sala podem receber o encontro.",
          "Se forem a um espaço público, verifiquem horário, iluminação e regras do local. Levem um saco para recolher o lixo e tenham uma alternativa coberta se o tempo mudar.",
        ],
      },
      {
        heading: "3. Passeio pelo bairro como se vocês fossem visitantes",
        paragraphs: [
          "Escolham uma rua segura onde normalmente passam com pressa e caminhem observando fachadas, jardins, praças e pequenos comércios. Cada pessoa aponta três detalhes que nunca tinha reparado.",
          "O encontro funciona porque muda o olhar sobre um lugar conhecido. Se quiserem, terminem em um banco de praça ou dividam um café, um doce ou uma bebida levada de casa.",
        ],
      },
      {
        heading: "4. Degustação simples de café, chá ou sobremesa em casa",
        paragraphs: [
          "Escolham duas opções disponíveis em casa e sirvam em pequenas porções. Podem comparar cafés, chás, frutas, chocolates ou receitas muito simples. Inventem critérios divertidos: aroma, apresentação, sabor e qual combina mais com uma lembrança do casal.",
          "Uma mesa organizada, luz mais suave e celulares guardados já mudam a atmosfera. O objetivo não é avaliar como especialistas, mas transformar algo cotidiano em experiência compartilhada.",
        ],
      },
      {
        heading: "5. Uma hora sem notificações",
        paragraphs: [
          "Definam um período possível — trinta minutos também servem — e deixem os celulares no silencioso, fora do alcance. Usem esse tempo para conversar, ouvir música, cozinhar ou simplesmente descansar juntos.",
          "Para evitar o silêncio constrangedor, comecem contando uma coisa boa, uma coisa difícil e uma coisa que desejam para os próximos dias. Presença inteira é um dos gestos mais românticos que cabem em uma noite comum.",
        ],
      },
      {
        heading: "6. Playlist de cinco lembranças",
        paragraphs: [
          "Cada pessoa escolhe duas músicas ligadas a momentos do relacionamento; a quinta é escolhida em conjunto para representar a fase atual. Escutem na ordem em que as lembranças aconteceram e contem por que cada escolha importa.",
          "Se moram longe ou não conseguem se encontrar hoje, façam a seleção juntos por chamada e marquem um horário para ouvir. O encontro de última hora também pode acontecer à distância.",
        ],
      },
      {
        heading: "7. Banco com vista e conversa sem roteiro rígido",
        paragraphs: [
          "Procurem um banco em um lugar seguro: praça movimentada, jardim, orla ou mirante de acesso fácil. Levem uma bebida de casa, sentem lado a lado e observem o movimento antes de começar a conversar.",
          "Uma pergunta basta para abrir espaço: “o que você gostaria que fosse mais leve entre nós nesta semana?”. Escutem sem interromper e sem sentir obrigação de resolver tudo naquele momento.",
        ],
      },
      {
        heading: "8. Jantar de despensa feito em dupla",
        paragraphs: [
          "Antes de comprar qualquer coisa, vejam o que há no armário e na geladeira. Escolham uma receita simples ou improvisem uma combinação possível. Dividam as tarefas de acordo com o gosto e o conforto de cada pessoa.",
          "Para deixar o jantar diferente, deem um nome divertido ao prato, arrumem a mesa e escolham uma música para o preparo. Se a receita não ficar perfeita, a história ainda pode ser ótima.",
        ],
      },
      {
        heading: "9. Cinema em casa com escolha compartilhada",
        paragraphs: [
          "Escolham um filme que já esteja disponível, preparem um lanche simples e ajustem o ambiente para ficar confortável. Em vez de perder quarenta minutos discutindo títulos, cada pessoa indica uma opção e vocês decidem por sorteio ou acordo rápido.",
          "Durante o filme, não existe obrigação de criar uma produção elaborada. Uma manta, luz baixa e a decisão de assistir juntos — sem continuar trabalhando ou navegando no celular — já transformam a sessão.",
        ],
      },
      {
        heading: "10. Três bilhetes escondidos pela casa",
        paragraphs: [
          "Escreva três mensagens curtas: uma lembrança feliz, uma qualidade que você admira e um convite para fazer algo juntos. Esconda os papéis em lugares fáceis de encontrar e dê a primeira pista.",
          "O gesto pode ser preparado em poucos minutos e não exige comprar nada. Evite mensagens que criem cobrança; prefira palavras verdadeiras, específicas e carinhosas.",
        ],
      },
      {
        heading: "11. Desafio fotográfico durante uma caminhada",
        paragraphs: [
          "Saiam com o celular e combinem cinco temas: uma cor bonita, algo que lembre o casal, uma textura, uma sombra e um detalhe engraçado. Cada pessoa registra sua interpretação e, no final, vocês escolhem as fotografias favoritas.",
          "Não é necessário publicar. Criem uma pequena pasta particular com a data e uma frase sobre o passeio. A lembrança ganha valor porque nasceu de um olhar compartilhado, não da perfeição das imagens.",
        ],
      },
      {
        heading: "12. Céu, varanda e o próximo pequeno plano",
        paragraphs: [
          "Se a noite estiver agradável, sentem na varanda, no quintal ou em um espaço público permitido para observar o céu. Se não for possível sair, apaguem as luzes fortes, abram a janela e criem alguns minutos de pausa.",
          "Cada pessoa diz algo pelo qual sente gratidão e sugere um encontro simples para a próxima semana. Escolham uma ideia realista e coloquem a data no calendário. Assim, a noite espontânea deixa também uma pequena promessa de continuidade.",
        ],
      },
      {
        heading: "Se o plano mudar, o encontro não fracassou",
        paragraphs: [
          "Chuva, cansaço, trânsito, lotação ou uma mudança de humor podem pedir outra escolha. Tenham sempre uma versão menor do plano: caminhada vira conversa em casa; piquenique vai para a sala; saída longa se transforma em meia hora de café.",
          "Romance de última hora não é fazer qualquer coisa. É perceber uma oportunidade de estar junto e cuidar do momento possível. Escolham com respeito, adaptem sem culpa e deixem que a presença seja a parte principal da programação.",
        ],
      },
    ],
  },
  {
    slug: "encontros-romanticos-gratuitos-sair-da-rotina",
    title: "15 ideias de encontros românticos gratuitos para sair da rotina",
    excerpt: "Planos carinhosos para viver momentos diferentes usando espaços públicos e o que vocês já têm.",
    category: "ENCONTROS GRATUITOS",
    image: "/images/blog/01-encontros-gratuitos.webp",
    imageAlt: "Casal jovem adulto caminhando e sorrindo em um jardim público",
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
    image: "/images/blog/02-gastando-pouco.webp",
    imageAlt: "Duas mulheres adultas compartilhando um lanche simples em uma praça",
    published: "20 de julho de 2026",
    publishedIso: "2026-07-20",
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
    image: "/images/blog/03-piquenique.webp",
    imageAlt: "Casal adulto aproveitando um piquenique simples à beira do lago",
    published: "20 de julho de 2026",
    publishedIso: "2026-07-20",
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
    image: "/images/blog/04-surpresas-simples.webp",
    imageAlt: "Dois homens adultos trocando um bilhete romântico em casa",
    published: "20 de julho de 2026",
    publishedIso: "2026-07-20",
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
    image: "/images/blog/05-encontro-parque.webp",
    imageAlt: "Casal adulto passeando junto por um parque acessível",
    published: "22 de julho de 2026",
    publishedIso: "2026-07-22",
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
    image: "/images/blog/06-dia-de-chuva.webp",
    imageAlt: "Casal adulto jogando e conversando em casa durante um dia de chuva",
    published: "22 de julho de 2026",
    publishedIso: "2026-07-22",
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
    image: "/images/blog/17-como-reconectar-com-parceiro.webp",
    imageAlt: "Casal adulto de mãos dadas durante uma conversa à beira do rio",
    published: "22 de julho de 2026",
    publishedIso: "2026-07-22",
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
    image: "/images/blog/08-passeio-fotografico.webp",
    imageAlt: "Casal adulto fotografando detalhes durante um passeio pela cidade",
    published: "22 de julho de 2026",
    publishedIso: "2026-07-22",
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
    image: "/images/blog/09-encontro-em-casa.webp",
    imageAlt: "Casal adulto preparando uma refeição simples em casa",
    published: "22 de julho de 2026",
    publishedIso: "2026-07-22",
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
    image: "/images/blog/10-perguntas-conversa.webp",
    imageAlt: "Dois homens adultos conversando durante uma caminhada à beira-mar",
    published: "22 de julho de 2026",
    publishedIso: "2026-07-22",
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
    image: "/images/blog/11-seguranca-publica.webp",
    imageAlt: "Casal idoso consultando uma rota antes de um passeio em local público",
    published: "22 de julho de 2026",
    publishedIso: "2026-07-22",
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
  {
    slug: "namoro-a-distancia-como-continuar-presente",
    title: "Namoro à distância: 20 formas de continuar presente mesmo longe",
    seoTitle: "Namoro à distância: 20 formas de continuar presente",
    excerpt: "Ideias simples e reais para manter carinho, presença e conexão em um namoro à distância, mesmo quando a rotina e os horários não ajudam.",
    category: "RELACIONAMENTO À DISTÂNCIA",
    image: "/images/blog/14-namoro-a-distancia.webp",
    imageAlt: "Duas pessoas adultas em videochamada, em casas diferentes, sorrindo uma para a outra",
    published: "24 de agosto de 2026",
    publishedIso: "2026-08-24",
    readTime: "9 min de leitura",
    intro: [
      "Estar longe de quem você ama tem uma característica curiosa: às vezes milhares de quilômetros parecem menores do que uma terça-feira corrida em que os dois mal conseguem conversar.",
      "Porque presença não é apenas estar no mesmo lugar.",
      "Ela também aparece naquele áudio enviado antes de uma reunião importante, na foto de alguma coisa boba que fez você lembrar da outra pessoa, na pergunta feita com atenção e até no silêncio respeitado quando o dia foi pesado.",
      "Um namoro à distância não precisa ser transformado numa maratona de chamadas, mensagens e provas constantes de amor. O desafio é outro: encontrar maneiras pequenas e sustentáveis de continuar fazendo parte da vida um do outro.",
      "Aqui estão 20 ideias para isso.",
    ],
    sections: [
      { heading: "1. Criem um pequeno ritual diário.", paragraphs: ["Não precisa ser uma chamada de uma hora. Pode ser uma mensagem de bom-dia, um áudio antes de dormir ou uma fotografia do café. O valor está na continuidade, não no tamanho."] },
      { heading: "2. Mandem áudios quando escrever parecer pouco.", paragraphs: ["A voz carrega coisas que uma mensagem não consegue reproduzir: pausa, risada, cansaço, entusiasmo. Um áudio de quarenta segundos pode trazer alguém para perto por alguns minutos."] },
      { heading: "3. Compartilhem momentos comuns, não apenas acontecimentos importantes.", paragraphs: ["O cachorro dormindo numa posição absurda, o trânsito, o almoço improvisado, a música que começou a tocar. É justamente esse cotidiano aparentemente insignificante que costuma desaparecer quando duas pessoas vivem longe."] },
      { heading: "4. Marquem o próximo momento de vocês antes de terminar o atual.", paragraphs: ["Saber quando será a próxima chamada ou encontro online evita aquela sensação de “quando vamos conseguir conversar de novo?”."] },
      { heading: "5. Façam pequenos encontros por vídeo.", paragraphs: ["Jantar, café, sobremesa, um copo de alguma coisa ou vinte minutos simplesmente sentados conversando. Não precisa haver produção. Às vezes o melhor encontro começa com “estou cansado, mas queria te ver”."] },
      { heading: "6. Assistam alguma coisa juntos de vez em quando.", paragraphs: ["Escolham um filme, episódio, documentário ou vídeo e combinem o horário. O objetivo não é ficar olhando para a tela em silêncio por duas horas, mas continuar acumulando referências e histórias em comum."] },
      { heading: "7. Criem uma playlist dos dois.", paragraphs: ["Acrescentem músicas aos poucos. Algumas podem representar momentos do relacionamento; outras simplesmente podem ser aquelas que um gostaria que o outro escutasse naquele dia."] },
      { heading: "8. Façam uma pergunta diferente de vez em quando.", paragraphLink: { before: "Não deixem todas as conversas terminarem em “como foi seu dia?”. Nosso artigo com ", linkText: "25 perguntas para casais conversarem com mais presença", href: "/blog/perguntas-para-casais-conversarem", after: " pode ajudar quando vocês quiserem sair do piloto automático." } },
      { heading: "9. Mandem fotos que não iriam para uma rede social.", paragraphs: ["Não precisam ser bonitas. A vista da janela, o supermercado, a mesa bagunçada, alguma coisa encontrada na rua. É uma maneira de dizer: “você ainda participa do meu mundo”."] },
      { heading: "10. Celebrem pequenas conquistas do outro.", paragraphs: ["Uma apresentação que deu certo, uma semana difícil concluída, uma burocracia resolvida. Distância não impede ninguém de dizer: “eu sei o quanto isso significava para você”."] },
      { heading: "11. Escrevam algo à mão de vez em quando.", paragraphs: ["Uma carta ou bilhete enviado pelo correio demora mais do que uma mensagem, e justamente por isso cria outra sensação. Existe algo especial em poder guardar fisicamente palavras de alguém que está longe."] },
      { heading: "12. Criem um álbum compartilhado.", paragraphs: ["Fotografias, prints engraçados, lugares que querem visitar, comidas que querem experimentar e memórias dos encontros presenciais. Com o tempo, ele vira uma pequena cronologia do relacionamento."] },
      { heading: "13. Planejem coisas que farão quando estiverem juntos novamente.", paragraphs: ["Não apenas grandes viagens. Pode ser tomar café naquele lugar, cozinhar uma receita, caminhar num parque ou passar uma tarde sem plano algum."] },
      { heading: "14. Façam alguma coisa paralelamente.", paragraphs: ["Cada um pode cozinhar em sua própria casa, caminhar enquanto conversa ao telefone ou preparar café ao mesmo tempo. Vocês continuam em espaços diferentes, mas compartilham uma pequena experiência."] },
      { heading: "15. Não transformem velocidade de resposta em medidor de amor.", paragraphs: ["Trabalho, sono, estudos e compromissos continuam existindo. Uma resposta que demorou não significa necessariamente desinteresse. Presença saudável também precisa caber na vida real."] },
      { heading: "16. Combinem expectativas sobre comunicação.", paragraphs: ["Há pessoas que gostam de trocar mensagens durante todo o dia. Outras preferem conversar com calma à noite. Falar sobre isso evita que um interprete silêncio como afastamento enquanto o outro simplesmente está vivendo a rotina."] },
      { heading: "17. Guardem espaço para a individualidade.", paragraphs: ["Um relacionamento à distância não precisa funcionar como uma câmera de segurança emocional. Amigos, hobbies, trabalho e momentos sozinho continuam importantes. Ter vida própria também oferece novas histórias para compartilhar."] },
      { heading: "18. Criem um pequeno projeto juntos.", paragraphs: ["Pode ser aprender algumas receitas, montar uma lista de lugares para conhecer, cuidar de uma playlist, ler o mesmo livro ou guardar dinheiro para uma viagem. Um projeto compartilhado cria sensação de continuidade."] },
      { heading: "19. Planejem os encontros presenciais com realismo.", paragraphs: ["Quando houver possibilidade de se ver, conversem sobre datas, custos e expectativas. Nem todo reencontro precisa virar uma viagem perfeita. Às vezes poder cozinhar juntos e dormir no mesmo sofá já é o acontecimento."] },
      { heading: "20. Digam especificamente do que sentem saudade.", paragraphs: ["“Estou com saudade” é bonito. “Hoje senti falta de tomar café com você enquanto você reclama que está quente demais” é ainda mais próximo. Detalhes fazem a outra pessoa perceber que não sentimos falta apenas da ideia do relacionamento, mas dela."] },
      { heading: "Presença não precisa ocupar o dia inteiro", paragraphs: ["Talvez esse seja um dos maiores enganos sobre relacionamentos à distância.", "Vocês não precisam conversar constantemente para provar que estão conectados.", "Alguns dias terão chamadas longas. Outros terão três mensagens e um áudio quase dormindo. Em determinadas semanas, horários simplesmente não combinarão.", "O que ajuda é perceber se, mesmo com essas oscilações, ainda existe curiosidade pela vida do outro, carinho nas pequenas coisas e vontade de continuar construindo experiências compartilhadas.", "Distância já exige bastante energia. O relacionamento não precisa acrescentar uma fiscalização permanente sobre quantas mensagens cada pessoa enviou."] },
      { heading: "Criem algo que seja de vocês", paragraphs: ["Pode ser uma palavra, uma música, uma chamada de domingo, um álbum de fotografias ou a promessa de sempre mandar uma imagem quando encontrarem um lugar onde gostariam de estar juntos.", "Relacionamentos criam intimidade também através dessas pequenas tradições.", "E talvez seja justamente aí que um namoro à distância encontre sua própria forma de proximidade: não tentando fingir que os quilômetros não existem, mas encontrando maneiras de atravessá-los um pouco todos os dias."], paragraphLink: { before: "Se vocês querem guardar mais ideias para quando estiverem no mesmo lugar novamente, o nosso ", linkText: "Guia Gratuito com 30 encontros simples gastando pouco", href: "/guia", after: " pode ficar esperando pelo próximo reencontro." } },
    ],
  },
  {
    slug: "aniversario-de-namoro-sem-gastar-muito",
    title: "Como comemorar o aniversário de namoro sem gastar muito",
    seoTitle: "Como comemorar o aniversário de namoro sem gastar muito",
    excerpt: "Ideias simples e românticas para comemorar o aniversário de namoro sem gastar muito, com carinho, criatividade e momentos que fazem sentido para vocês.",
    category: "CELEBRAÇÕES SIMPLES",
    image: "/images/blog/20-aniversario-de-namoro-simples.webp",
    imageAlt: "Casal adulto dividindo uma sobremesa em casa, à luz de velas",
    published: "25 de agosto de 2026",
    publishedIso: "2026-08-25",
    readTime: "8 min de leitura",
    intro: ["Aniversário de namoro tem uma armadilha curiosa.", "Quanto mais a gente gosta da data, maior pode ficar a sensação de que precisa fazer alguma coisa extraordinária.", "Restaurante caro. Presente caro. Viagem. Surpresa elaborada. Um plano tão perfeito que, às vezes, começa a parecer uma prova.", "Mas a data não existe para medir quanto vocês conseguem gastar.", "Ela existe porque, em algum momento, duas histórias começaram a caminhar juntas.", "E isso pode ser comemorado de um jeito muito mais simples.", "Uma boa celebração não precisa impressionar ninguém. Precisa fazer sentido para vocês.", "Aqui estão algumas maneiras de transformar o aniversário de namoro em um dia especial sem transformar a conta bancária em vítima da comemoração."],
    sections: [
      { heading: "1. Voltem ao começo da história", paragraphs: ["Tentem lembrar onde tudo começou. Pode ser o lugar do primeiro encontro, a rua onde vocês costumavam caminhar, a praça, o café, a estação, a praia ou até algum canto comum que virou importante.", "Se for possível, voltem até lá. Não precisa reproduzir o primeiro encontro inteiro. A graça é perceber quanto mudou desde aquela época."] },
      { heading: "2. Recriem uma memória antiga", paragraphs: ["Escolham uma fotografia, um encontro ou um momento marcante do relacionamento e façam uma versão atual.", "Talvez seja preparar a mesma comida, voltar ao mesmo lugar ou simplesmente repetir uma fotografia alguns anos depois. É um jeito simples de colocar passado e presente na mesma cena."] },
      { heading: "3. Façam um jantar simples em casa", paragraphs: ["Não precisa ter três pratos, velas em todas as superfícies e uma cozinha parecendo final de programa culinário. Escolham algo que vocês realmente gostem.", "Pode ser massa, pizza feita em casa, hambúrguer, petiscos ou até uma comida que tenha alguma história para vocês. Arrumem a mesa um pouco diferente e deixem o telefone longe por um tempo. O jantar continua simples, mas deixa de ser apenas jantar."] },
      { heading: "4. Escrevam uma carta um para o outro", paragraphs: ["Não precisa ser uma declaração de cinco páginas. Pode começar com: “Uma coisa que eu admiro em você hoje é…”, “Uma memória nossa que ainda me faz sorrir…” ou “Uma coisa que eu espero viver com você…”.", "Escrever obriga a gente a desacelerar um pouco. E algumas frases acabam virando presentes que podem ser guardados por muitos anos."] },
      { heading: "5. Criem uma pequena retrospectiva", paragraphs: ["Juntem fotos do último ano. Vale jantar improvisado, passeio comum, print engraçado, viagem, dia ruim que terminou bem e qualquer pequeno momento que tenha significado alguma coisa.", "Vocês podem assistir juntos no celular, computador ou televisão. O objetivo não é fazer uma produção; é olhar para trás e perceber quanta vida coube naquele período."] },
      { heading: "6. Façam um piquenique de aniversário", paragraphs: ["Uma toalha, algumas coisas para comer e um lugar agradável já bastam. Parque, praia, jardim ou qualquer espaço tranquilo."], paragraphLink: { before: "Nosso guia sobre ", linkText: "como preparar um piquenique romântico simples", href: "/blog/piquenique-romantico-simples", after: " pode ajudar a montar tudo sem complicação." } },
      { heading: "7. Criem uma cápsula do próximo ano", paragraphs: ["Cada um escreve uma coisa que espera viver com o outro, um lugar que gostaria de conhecer, uma pequena meta do casal, alguma previsão engraçada e uma mensagem para vocês mesmos no futuro.", "Guardem tudo em um envelope e abram no próximo aniversário. De repente, a comemoração deste ano já começa a construir a próxima."] },
      { heading: "8. Façam uma playlist da história de vocês", paragraphs: ["Escolham músicas que lembrem o início, uma viagem, uma fase difícil, uma festa, uma piada interna ou um momento importante.", "Depois ouçam juntos. Algumas relações têm trilha sonora sem perceber."] },
      { heading: "9. Preparem uma sobremesa juntos", paragraphs: ["Pode ser brigadeiro, bolo, panquecas, frutas com chocolate ou qualquer coisa simples.", "Não precisa sair perfeito. Na verdade, se der um pouco errado, existe boa chance de virar uma história melhor."] },
      { heading: "10. Organizem um passeio de baixo custo", paragraphs: ["Caminhar por uma parte bonita da cidade, visitar um miradouro, ver o pôr do sol, conhecer uma feira ou explorar um bairro diferente pode virar a programação principal."], paragraphLink: { before: "Se vocês quiserem ampliar as opções, temos também ", linkText: "15 ideias de encontros românticos gastando pouco", href: "/blog/encontros-romanticos-gastando-pouco", after: "." } },
      { heading: "11. Troquem pequenos presentes simbólicos", paragraphs: ["O presente pode existir sem precisar dominar a comemoração: uma fotografia impressa, uma carta, um livro usado, uma flor, um doce favorito, alguma coisa feita à mão ou um objeto pequeno que tenha uma história.", "O valor está menos no preço e mais na mensagem: “Eu pensei em você.”"] },
      { heading: "12. Façam uma lista do que querem viver no próximo ano", paragraphs: ["Não precisa ser uma lista de grandes objetivos. Pode ter coisas como conhecer um restaurante novo, cozinhar uma receita difícil, visitar uma cidade próxima, passar um domingo sem celular ou ver o nascer do sol.", "Essa lista vira uma espécie de mapa de pequenas aventuras."] },
      { heading: "13. Criem uma tradição de aniversário", paragraphs: ["Talvez todo ano vocês tirem uma fotografia no mesmo lugar, escrevam uma carta, comam a mesma sobremesa ou façam uma pergunta um ao outro.", "Com o tempo, a tradição começa a contar a história do relacionamento sozinha."] },
      { heading: "14. Façam um encontro sem agenda", paragraphs: ["Nem toda comemoração precisa ser programada do começo ao fim. Escolham apenas um ponto de partida: “Vamos sair depois do almoço e ver onde o dia leva.”", "Andem, parem quando der vontade, comam alguma coisa e conversem. Às vezes, retirar a obrigação de criar um evento deixa espaço para o próprio dia acontecer."] },
      { heading: "15. Terminam o dia falando sobre vocês", paragraphs: ["Antes de dormir, façam três perguntas: “O que você mais gostou de viver comigo neste último ano?”, “O que você acha que fizemos melhor como casal?” e “O que gostaria que a gente vivesse até o próximo aniversário?”.", "Não é avaliação de desempenho. É apenas uma maneira de lembrar que a data não celebra somente o passado; ela também olha para frente."] },
      { heading: "O tamanho da comemoração não mede o tamanho do relacionamento", paragraphs: ["Existe uma ideia bastante conveniente para o comércio de que datas especiais precisam produzir consumo especial. Mas relacionamentos não funcionam assim.", "Uma noite cara pode ser maravilhosa, uma viagem também, e um presente importante pode ter muito significado. O problema aparece quando o gasto começa a parecer obrigação. O aniversário de namoro pertence ao casal: vocês podem celebrá-lo com jantar sofisticado ou sanduíches no sofá. O que transforma o dia não é a conta; é a intenção colocada nele."] },
      { heading: "Criem uma memória que tenha a cara de vocês", paragraphs: ["Talvez daqui a alguns anos vocês não lembrem quanto custou aquele aniversário. Mas podem lembrar da carta, da receita que quase queimou, da caminhada longa, da fotografia repetida cinco anos depois e da conversa antes de dormir.", "É esse tipo de coisa que vai construindo a história."], paragraphLink: { before: "Se vocês quiserem ainda mais ideias para comemorar sem complicação, o nosso ", linkText: "Guia Gratuito com 30 encontros simples gastando pouco", href: "/guia", after: " pode ajudar a escolher o próximo momento de vocês." } },
    ],
  },
  {
    slug: "primeiro-encontro-simples-ideias-para-conversar",
    title: "Primeiro encontro simples: 15 ideias que ajudam a conversar de verdade",
    seoTitle: "Primeiro encontro simples: 15 ideias que ajudam a conversar de verdade",
    excerpt: "Veja 15 ideias de primeiro encontro simples que ajudam a conversar com leveza, criar conexão de verdade e viver um momento especial sem gastar muito.",
    category: "PRIMEIRO ENCONTRO",
    image: "/images/blog/19-primeiro-encontro-simples.webp",
    imageAlt: "Duas pessoas adultas conversando e sorrindo em uma cafeteria acolhedora",
    published: "25 de agosto de 2026",
    publishedIso: "2026-08-25",
    readTime: "8 min de leitura",
    intro: [
      "Um primeiro encontro não precisa parecer uma prova, uma produção ou uma noite que precisa ser perfeita para valer.",
      "Na maioria das vezes, o que ajuda mesmo é escolher um lugar e um ritmo em que as duas pessoas consigam respirar, conversar e descobrir se gostam de estar ali juntas.",
      "Estas ideias são simples, acessíveis e deixam espaço para aquilo que mais importa: presença, curiosidade e leveza.",
    ],
    sections: [
      { heading: "O melhor primeiro encontro não precisa ser caro nem mirabolante", paragraphs: ["Um programa caro pode até ser bonito, mas não garante conversa nem conforto. Às vezes, uma mesa tranquila, uma caminhada ou uma sobremesa dividida oferecem mais espaço para se conhecerem do que um roteiro cheio de etapas.", "Escolham algo que permita pausas, observação e a liberdade de encerrar quando o encontro já cumpriu seu papel. O objetivo não é impressionar; é perceber como vocês se sentem na companhia um do outro."] },
      { heading: "1. Café em um lugar calmo", paragraphs: ["Uma cafeteria tranquila dá ao encontro um começo simples e sem muita formalidade. Escolham uma mesa em que seja possível ouvir um ao outro e deixem a conversa encontrar seu próprio ritmo.", "Se houver conexão, o café pode se transformar numa caminhada curta. Se não houver, ainda foi um encontro gentil e fácil de terminar."] },
      { heading: "2. Caminhada no parque ou na orla", paragraphs: ["Caminhar lado a lado costuma tirar um pouco da pressão de manter contato visual o tempo inteiro. O caminho oferece pausas naturais, coisas para comentar e um ritmo mais leve para a conversa.", "Prefiram lugares movimentados, seguros e agradáveis. Não precisam percorrer uma grande distância; uma volta curta já basta."] },
      { heading: "3. Livraria seguida de café", paragraphs: ["Passear por uma livraria cria assuntos sem que vocês precisem inventar perguntas o tempo todo. Cada pessoa pode mostrar um título, contar uma leitura marcante ou simplesmente rir das capas mais curiosas.", "Depois, um café por perto ajuda a transformar essas pequenas descobertas em conversa."] },
      { heading: "4. Feira de rua no fim da manhã", paragraphs: ["Uma feira dá ao encontro cor, movimento e muitos motivos para parar por alguns minutos. Vocês podem experimentar algo simples, comentar os cheiros e escolher uma banca para conhecer melhor.", "O ambiente também ajuda quando a conversa ainda está começando: sempre existe alguma coisa acontecendo ao redor."] },
      { heading: "5. Piquenique sem produção", paragraphs: ["Não é preciso levar uma cesta cinematográfica. Duas bebidas, alguma fruta, pão ou biscoitos e uma toalha já resolvem.", "Escolham um parque ou gramado confortável e mantenham tudo leve. A simplicidade deixa mais espaço para conversar do que para organizar."] },
      { heading: "6. Museu gratuito ou centro cultural", paragraphs: ["Exposições e centros culturais oferecem um ponto de partida para olhar, comentar e descobrir gostos em comum. Não é preciso entender tudo; perguntar “o que você achou?” já pode render uma conversa boa.", "Verifiquem antes os horários e as entradas gratuitas. Depois, vocês podem estender o encontro com um café ou uma volta pelo bairro."] },
      { heading: "7. Sorvete e passeio sem pressa", paragraphs: ["Um sorvete é simples, acessível e não pede que o encontro dure horas. Escolham um sabor, caminhem por uma rua agradável e deixem a conversa acontecer enquanto o dia segue.", "É uma boa ideia para quem prefere um encontro curto, mas aberto à possibilidade de ficar mais tempo."] },
      { heading: "8. Banco de praça e uma conversa boa", paragraphs: ["Às vezes o melhor programa é sentar num lugar agradável, observar o movimento e conversar sem pressa. Levem uma bebida ou comprem algo por perto, se quiserem.", "O que faz diferença é escolher uma praça segura, em horário confortável, e deixar o celular fora da mão por alguns minutos."] },
      { heading: "9. Cozinhar algo simples juntos", paragraphs: ["Se já existe confiança para estarem na casa de alguém, preparar uma receita fácil pode ser um encontro gostoso e sem formalidade. Uma massa, sanduíches ou uma sobremesa simples já bastam.", "Dividir pequenas tarefas cria momentos espontâneos e evita aquela sensação de entrevista em frente a uma mesa."] },
      { heading: "10. Jogo de perguntas leves", paragraphs: ["Um jogo de perguntas pode ajudar quando os dois estão um pouco tímidos, desde que as perguntas não pareçam um questionário. Comecem por memórias, músicas, comidas, lugares e pequenas curiosidades."], paragraphLink: { before: "O nosso artigo com ", linkText: "25 perguntas para casais conversarem com mais presença", href: "/blog/perguntas-para-casais-conversarem", after: " traz ideias que podem inspirar uma conversa mais natural." } },
      { heading: "11. Passeio fotográfico pelo bairro", paragraphs: ["Escolham uma rua, praça ou bairro bonito e combinem de fotografar detalhes que chamarem atenção. Não precisa ser sobre tirar boas fotos; é uma forma simples de olhar para o mesmo lugar com curiosidade.", "No fim, cada pessoa pode mostrar suas favoritas e contar por que escolheu aquelas imagens."] },
      { heading: "12. Mercado e ingredientes para uma receita", paragraphs: ["Ir ao mercado para escolher ingredientes de um lanche ou jantar simples transforma uma tarefa comum em passeio. Vocês podem comentar gostos, inventar uma combinação e dividir decisões pequenas.", "Se o encontro estiver indo bem, cozinhem depois. Se não, o mercado já foi um programa leve por si só."] },
      { heading: "13. Pôr do sol em um lugar bonito", paragraphs: ["Assistir ao pôr do sol não exige muita produção, mas cria uma pausa boa no dia. Escolham um lugar público, seguro e com movimento, levem água e cheguem sem a obrigação de fazer algo especial.", "A paisagem ajuda a desacelerar e deixa espaço para conversas mais tranquilas."] },
      { heading: "14. Cafeteria e uma sobremesa compartilhada", paragraphs: ["Dividir uma sobremesa pode deixar o encontro mais descontraído do que um jantar inteiro. Escolham um lugar em que seja possível ficar um pouco sem pressa e experimentem algo novo juntos."], paragraphLink: { before: "Se a noite pedir uma ideia simples de última hora, o artigo ", linkText: "Encontro romântico de última hora: 12 ideias fáceis para hoje", href: "/blog/encontro-romantico-de-ultima-hora", after: " também pode ajudar." } },
      { heading: "15. Um encontro de uma hora, sem pressão", paragraphs: ["Nem todo primeiro encontro precisa ocupar a tarde ou a noite inteira. Combinar uma hora para um café, uma caminhada ou um sorvete pode ser mais confortável para os dois.", "A duração curta diminui a expectativa e permite que vocês saiam com vontade de marcar outro momento, se fizer sentido."] },
      { heading: "Deixem espaço para o encontro ser só um encontro", paragraphs: ["Não existe frase perfeita, pergunta obrigatória ou roteiro que garanta conexão. O mais bonito é perceber se há gentileza, curiosidade e vontade de continuar a conversa."], paragraphLink: { before: "Se quiserem mais ideias simples e acessíveis para os próximos encontros, o nosso ", linkText: "Guia Gratuito com 30 encontros simples gastando pouco", href: "/guia", after: " pode ajudar a encontrar um plano que combine com vocês." } },
    ],
  },
  {
    slug: "tempo-de-qualidade-quando-os-dois-estao-cansados",
    title: "Como criar tempo de qualidade quando os dois estão cansados",
    seoTitle: "Como criar tempo de qualidade quando os dois estão cansados",
    excerpt: "Ideias simples e realistas para casais criarem tempo de qualidade mesmo em dias de cansaço, pouco tempo e rotina pesada.",
    category: "CONEXÃO",
    image: "/images/blog/18-tempo-de-qualidade-casal-cansado.webp",
    imageAlt: "Casal adulto descansando junto no sofá com canecas nas mãos, à luz de velas",
    published: "25 de agosto de 2026",
    publishedIso: "2026-08-25",
    readTime: "8 min de leitura",
    intro: [
      "Tem dias em que o romantismo não perde para a falta de amor.",
      "Perde para o despertador, o trânsito, as mensagens que não param de chegar, a louça, o trabalho, o jantar por fazer e aquela sensação de que o corpo já gastou tudo o que tinha antes mesmo de a noite começar.",
      "Quando os dois estão cansados, “vamos fazer alguma coisa juntos” pode soar menos como convite e mais como outra tarefa na lista.",
      "E talvez esse seja justamente o ponto.",
      "Tempo de qualidade não precisa exigir a energia que vocês já não têm.",
      "Ele pode ser pequeno, silencioso e simples o bastante para caber numa terça-feira comum.",
      "Aqui estão algumas maneiras de criar conexão sem transformar o relacionamento em mais uma obrigação.",
    ],
    sections: [
      { heading: "1. Reduzam o tamanho do encontro", paragraphs: ["Talvez vocês não tenham energia para um jantar especial, um filme inteiro ou uma grande conversa.", "Tudo bem.", "Dez ou quinze minutos juntos ainda contam.", "Um café depois do jantar, alguns minutos no sofá ou uma pequena volta no quarteirão podem ser suficientes para criar uma pausa real no dia.", "O objetivo não é fazer muito.", "É estar ali de verdade durante um pouco de tempo."] },
      { heading: "2. Escolham algo que não precise ser organizado", paragraphs: ["Quando estamos cansados, até decidir o que fazer pode gastar energia.", "Tenham algumas opções fáceis que não precisam de planejamento:"], items: ["tomar alguma coisa juntos;", "sentar na varanda ou perto da janela;", "ouvir três músicas;", "dividir uma sobremesa;", "caminhar alguns minutos;", "deitar no sofá e conversar.", "Quanto menos preparação, maior a chance de acontecer."] },
      { heading: "3. Façam uma pequena transição entre o dia e o casal", paragraphs: ["Às vezes chegamos em casa fisicamente, mas a cabeça continua no trabalho.", "Criem um pequeno ritual para marcar essa mudança.", "Pode ser trocar de roupa, tomar banho, preparar uma bebida ou simplesmente dizer:", "“Me dá dez minutos para desligar e depois sento com você.”", "Esse intervalo evita que o primeiro contato da noite aconteça enquanto alguém ainda está mentalmente preso ao dia."] },
      { heading: "4. Não esperem disposição perfeita", paragraphs: ["Se vocês decidirem passar tempo juntos apenas quando os dois estiverem descansados, animados e sem preocupações, alguns períodos da vida podem ficar quase sem espaço para o casal.", "Nem todo momento precisa começar com energia.", "Às vezes ele começa com:", "“Hoje estou acabado.”", "E a resposta pode ser:", "“Eu também. Vamos ficar aqui um pouco?”", "Isso já é encontro."] },
      { heading: "5. Façam coisas paralelas", paragraphs: ["Tempo de qualidade não exige que vocês estejam olhando um para o outro o tempo inteiro.", "Um pode preparar alguma coisa enquanto o outro fica por perto.", "Vocês podem dobrar roupa conversando, cozinhar juntos ou tomar banho e depois sentar alguns minutos na cama.", "O cotidiano também pode virar cenário para conexão."] },
      { heading: "6. Criem a regra do “sem performance”", paragraphs: ["Não é necessário estar engraçado, interessante ou romântico todas as noites.", "Há dias em que a melhor companhia é alguém diante de quem você não precisa parecer menos cansado do que está.", "Permitam que alguns momentos juntos sejam simplesmente tranquilos.", "Sem expectativa de criar uma memória inesquecível.", "Curiosamente, algumas das melhores acabam aparecendo assim."] },
      { heading: "7. Guardem o celular por alguns minutos", paragraphs: ["Não precisa ser uma guerra contra tecnologia.", "Escolham apenas um pequeno intervalo em que nenhum dos dois fica alternando entre conversa e notificações.", "Pode ser durante o café, a sobremesa ou os primeiros dez minutos no sofá."], paragraphLink: { before: "Nosso ", linkText: "Conselho da semana: dez minutos de presença valem mais que um plano perfeito", href: "/blog/conselho-da-semana-dez-minutos-de-presenca", after: " fala justamente sobre o valor desses pequenos espaços de atenção." } },
      { heading: "8. Façam uma pergunta pequena", paragraphs: ["Quando a energia está baixa, uma conversa profunda de uma hora provavelmente não é o melhor plano.", "Mas uma pergunta simples pode abrir espaço:"], items: ["“Qual foi a melhor parte do seu dia?”", "“O que mais te cansou hoje?”", "“Tem alguma coisa que eu posso facilitar amanhã?”", "“O que você gostaria de fazer comigo neste fim de semana?”", "Não precisam resolver tudo.", "Às vezes basta saber um pouco mais sobre como o outro está."] },
      { heading: "9. Dividam um pequeno prazer", paragraphs: ["Chocolate.", "Fruta.", "Um chá.", "Uma cerveja sem cerimônia.", "Uma música que vocês gostam.", "Um episódio curto.", "Uma coisa simples fica diferente quando vira um pequeno ritual compartilhado."] },
      { heading: "10. Façam um encontro de baixa energia", paragraphs: ["Nem todo encontro precisa tirar vocês de casa.", "Vocês podem:"], items: ["pedir ou preparar algo simples;", "apagar parte das luzes;", "colocar uma playlist;", "sentar juntos;", "deixar o resto da noite mais devagar."], paragraphLink: { before: "Nosso guia de ", linkText: "10 ideias de encontro em casa sem gastar dinheiro", href: "/blog/encontro-em-casa-sem-gastar", after: " também pode ajudar quando vocês quiserem variar sem criar uma operação logística." } },
      { heading: "11. Protejam um pequeno horário recorrente", paragraphs: ["Não precisa ser “toda sexta às 20h”.", "Pode ser simplesmente:", "“Domingo de manhã tomamos café juntos.”", "Ou:", "“Depois que a casa acalmar, ficamos quinze minutos no sofá.”", "Quando um pequeno momento já tem lugar na rotina, vocês precisam tomar menos decisões para fazê-lo acontecer."] },
      { heading: "12. Saibam quando descansar é o próprio cuidado", paragraphs: ["Existe uma diferença entre abandonar constantemente o tempo a dois e reconhecer que, naquela noite, dormir é realmente o melhor que vocês podem fazer um pelo outro.", "Às vezes carinho é preparar água para o outro, ajeitar a cama e dizer:", "“Vamos dormir. Amanhã a gente tenta de novo.”", "Tempo de qualidade também precisa respeitar o corpo."] },
      { heading: "Não transformem conexão em produtividade", paragraphs: ["Existe uma armadilha estranha quando tentamos melhorar um relacionamento:", "começamos a tratar carinho como projeto.", "“Precisamos sair mais.”", "“Precisamos conversar mais.”", "“Precisamos fazer alguma coisa diferente.”", "E, de repente, até o amor ganha uma planilha imaginária.", "Talvez seja mais útil perguntar:", "Qual é a menor coisa boa que conseguimos fazer juntos hoje?", "Alguns dias a resposta será jantar fora.", "Em outros será viajar.", "Mas em muitos dias reais, será apenas sentar perto, dividir alguma coisa e prestar atenção por alguns minutos.", "Isso não é pouco.", "É o tipo de presença que consegue sobreviver à rotina."] },
      { heading: "O relacionamento também mora nos dias comuns", paragraphs: ["Os dias cansados não são intervalo da vida do casal.", "Eles também são a vida do casal.", "É neles que aparecem pequenas oportunidades de cuidado:", "guardar um prato para o outro, oferecer água, perguntar como foi o dia, encostar os pés no sofá, rir de alguma coisa idiota ou ficar cinco minutos abraçados antes de dormir.", "Nenhuma dessas coisas parece grandiosa isoladamente.", "Mas relacionamento é construído em grande parte justamente por aquilo que acontece quando ninguém está tentando criar uma cena perfeita."], paragraphLink: { before: "Se vocês quiserem mais ideias simples para transformar pouco tempo em encontro, o nosso ", linkText: "Guia Gratuito com 30 encontros simples gastando pouco", href: "/guia", after: " pode ajudar." } },
    ],
  },
];

export function getPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getVisibleBlogPosts(now = new Date()) {
  const today = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Europe/Lisbon",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
  return blogPosts.filter((post) => !post.publishedIso || post.publishedIso <= today).sort((a, b) => (b.publishedIso || "").localeCompare(a.publishedIso || ""));
}
