// Artigos novos de novembro/2026 (PT/ES/EN). Cada um só entra no site quando a foto existir em public/images/blog.
// Uso: node social/rascunhos/instalar-artigo.mjs <chave>   (ex.: conto-luz)
const L = (pt, es, en) => ({ pt, es, en });

export const artigos = {
  "conto-luz": {
    iso: "2026-11-08", image: "/images/blog/34-conto-luz-velas.webp", series: "CONTOS", kind: "conto",
    slugs: L("conto-a-noite-em-que-acabou-a-luz", "cuento-la-noche-en-que-se-fue-la-luz", "story-the-night-the-lights-went-out"),
    pt: {
      title: "A noite em que acabou a luz",
      excerpt: "Um conto sobre uma noite de chuva, um apagão e duas pessoas que, sem tela nenhuma, voltam a se ouvir.",
      imageAlt: "Casal sentado no chão da sala à luz de velas, rindo, com um baralho de cartas entre os dois",
      readTime: "5 min de leitura",
      intro: ["Quando a luz acabou, Sofia estava no meio de uma frase e Diego no meio de um e-mail. O apartamento inteiro ficou em silêncio, só com o barulho da chuva na janela.", "— Quanto tempo você acha que demora? — perguntou ela. Diego olhou para o celular, que já tinha 9% de bateria, e o virou para baixo sobre a mesa."],
      sections: [
        { heading: "Velas e um baralho velho", paragraphs: ["Procuraram velas pela casa e acharam três, uma delas torta, de um jantar de anos atrás. Sofia lembrou de um baralho que morava numa gaveta da cozinha. Sentaram no chão da sala, com uma manta nas costas, e ele embaralhou mal, como sempre.", "Jogaram até perderem a conta das partidas. Diego trapaceou duas vezes e confessou as duas. Fazia muito tempo que os dois não riam alto na mesma sala."] },
        { heading: "Perguntas sem pressa", paragraphs: ["Sem tela, a conversa foi escorregando para outros lugares. Sofia perguntou qual era o medo que ele tinha aos dez anos. Diego pensou um pouco e respondeu que era o escuro, e os dois olharam para as velas e começaram a rir de novo.", "Ele contou do primeiro emprego, que nunca tinha contado inteiro. Ela contou de um plano antigo que guardava em silêncio: fazer um curso de fotografia. — Por que nunca me falou? — Porque nunca sobrou uma noite para isso, ela respondeu."] },
        { heading: "Quando a luz voltou", paragraphs: ["Perto da meia-noite, a geladeira deu um estalo e as lâmpadas acenderam de uma vez. Os dois piscaram, meio ofendidos. Diego foi até a parede para desligar o interruptor.", "— Deixa mais um pouco assim — pediu Sofia. Apagou-se a luz de novo, desta vez por vontade deles, e ficaram mais meia hora entre as velas.", "No dia seguinte, Diego procurou cursos de fotografia perto de casa. Combinaram uma noite sem luz por mês, de propósito, só com velas, cartas e perguntas. Às vezes uma queda de energia é só o lembrete de que o melhor da noite não precisa de tomada."] }
      ]
    },
    es: {
      title: "La noche en que se fue la luz",
      excerpt: "Un cuento sobre una noche de lluvia, un apagón y dos personas que, sin pantallas, vuelven a escucharse.",
      imageAlt: "Pareja sentada en el suelo del salón a la luz de las velas, riendo, con una baraja de cartas entre los dos",
      readTime: "5 min de lectura",
      intro: ["Cuando se fue la luz, Sofía estaba a mitad de una frase y Diego a mitad de un correo. Todo el piso quedó en silencio, solo con el ruido de la lluvia en la ventana.", "—¿Cuánto crees que tardará? —preguntó ella. Diego miró el móvil, que ya tenía un 9 % de batería, y lo dejó boca abajo sobre la mesa."],
      sections: [
        { heading: "Velas y una baraja vieja", paragraphs: ["Buscaron velas por la casa y encontraron tres, una de ellas torcida, de una cena de hace años. Sofía se acordó de una baraja que vivía en un cajón de la cocina. Se sentaron en el suelo del salón con una manta en la espalda y él barajó mal, como siempre.", "Jugaron hasta perder la cuenta de las partidas. Diego hizo trampa dos veces y confesó las dos. Hacía mucho que no se reían a carcajadas en la misma habitación."] },
        { heading: "Preguntas sin prisa", paragraphs: ["Sin pantallas, la conversación fue deslizándose hacia otros lugares. Sofía le preguntó cuál era el miedo que tenía a los diez años. Diego lo pensó un momento y respondió que la oscuridad; los dos miraron las velas y se echaron a reír otra vez.", "Él le contó su primer trabajo, que nunca había contado entero. Ella le habló de un plan antiguo que guardaba en silencio: hacer un curso de fotografía. —¿Por qué nunca me lo dijiste? —Porque nunca sobró una noche para eso —respondió ella."] },
        { heading: "Cuando volvió la luz", paragraphs: ["Hacia medianoche, la nevera dio un chasquido y las bombillas se encendieron de golpe. Los dos parpadearon, algo ofendidos. Diego fue hasta la pared para apagar el interruptor.", "—Déjalo un poco más así —pidió Sofía. La luz se apagó otra vez, ahora por voluntad de ellos, y se quedaron media hora más entre las velas.", "Al día siguiente, Diego buscó cursos de fotografía cerca de casa. Acordaron una noche sin luz al mes, a propósito, solo con velas, cartas y preguntas. A veces un apagón es solo el recordatorio de que lo mejor de la noche no necesita enchufe."] }
      ]
    },
    en: {
      title: "The night the lights went out",
      excerpt: "A story about a rainy night, a power cut and two people who, with no screens, start listening to each other again.",
      imageAlt: "Couple sitting on the living room floor by candlelight, laughing, with a deck of cards between them",
      readTime: "5 min read",
      intro: ["When the power went out, Sofia was halfway through a sentence and Diego halfway through an email. The whole apartment fell quiet, with only the rain against the window.", "\"How long do you think it'll take?\" she asked. Diego looked at his phone, already down to 9%, and turned it face down on the table."],
      sections: [
        { heading: "Candles and an old deck of cards", paragraphs: ["They searched the house for candles and found three, one of them bent, left over from a dinner years ago. Sofia remembered a deck of cards that lived in a kitchen drawer. They sat on the living room floor with a blanket over their backs, and he shuffled badly, as always.", "They played until they lost count of the rounds. Diego cheated twice and confessed both times. It had been a long while since the two of them had laughed out loud in the same room."] },
        { heading: "Questions without a hurry", paragraphs: ["With no screens, the conversation drifted to other places. Sofia asked what he was afraid of when he was ten. Diego thought for a moment and said the dark, and they both looked at the candles and started laughing again.", "He told her about his first job, which he had never told in full. She told him about an old plan she had kept quiet: taking a photography course. \"Why didn't you ever tell me?\" \"Because there was never a night left for it,\" she said."] },
        { heading: "When the lights came back", paragraphs: ["Near midnight, the fridge clicked and every bulb came on at once. They both blinked, slightly offended. Diego walked to the wall to switch it off.", "\"Leave it like this a little longer,\" Sofia asked. The light went out again, this time by choice, and they stayed another half hour among the candles.", "The next day, Diego looked up photography courses near home. They agreed on one night without light a month, on purpose, with just candles, cards and questions. Sometimes a power cut is only a reminder that the best part of the evening doesn't need a socket."] }
      ]
    }
  },

  "conselho-fim-de-semana": {
    iso: "2026-11-10", image: "/images/blog/35-conselho-fim-de-semana.webp", series: "CONSELHO DA SEMANA", kind: "conselho",
    slugs: L("conselho-da-semana-combinem-o-fim-de-semana-na-quinta", "consejo-semanal-acordad-el-fin-de-semana-el-jueves", "weekly-tip-plan-the-weekend-on-thursday"),
    link: L(["/blog/encontro-romantico-de-ultima-hora", "encontros de última hora, quando o fim de semana chegou sem plano"], ["/es/blog/cita-romantica-de-ultima-hora", "citas de última hora, cuando el fin de semana llega sin plan"], ["/en/blog/last-minute-romantic-date", "last-minute dates, for when the weekend arrives with no plan"]),
    pt: {
      title: "Conselho da semana: combinem o fim de semana na quinta-feira",
      seoTitle: "Como planejar o fim de semana a dois em dez minutos",
      excerpt: "Fim de semana sem plano costuma acabar no sofá. Dez minutos na quinta, com uma pergunta simples, mudam o resto da semana.",
      imageAlt: "Casal sentado lado a lado no sofá, olhando juntos para uma agenda aberta e sorrindo",
      readTime: "3 min de leitura",
      intro: ["Na sexta à noite todo mundo está cansado, e o fim de semana sem plano costuma terminar no sofá, cada um com a sua tela. Não é falta de vontade: é falta de combinar.", "O conselho desta terça-feira é marcar uma conversa curta na quinta, quando ainda há energia, para escolher uma coisa boa para o sábado ou o domingo."],
      sections: [
        { heading: "Como fazer a conversa de quinta", items: ["Escolham dez minutos: durante o jantar ou depois de lavar a louça.", "Cada um diz uma coisa que gostaria de fazer no fim de semana, grande ou pequena.", "Escolham uma só, a que for mais fácil de realizar, e fechem dia e horário.", "Quem não escolheu planeja o detalhe: o lugar, o que levar ou o horário de saída."] },
        { heading: "Perguntas que ajudam", items: ["O que você está com vontade de fazer e há muito tempo não faz?", "Prefere algo calmo ou algo que nos tire de casa?", "Qual é a coisa mais simples que deixaria o nosso sábado bom?"] },
        { heading: "Não precisa ser perfeito", paragraphs: ["Combinar não significa lotar a agenda. Um passeio de uma hora, um café na praça ou um filme com pipoca já contam. O importante é que os dois saibam que o encontro existe e esperem por ele.", "Se o plano cair por causa do tempo ou do cansaço, troquem por uma versão menor e mantenham a data."] },
        { heading: "O pequeno compromisso da semana", paragraphs: ["Na quinta, reservem dez minutos e escolham uma coisa para o fim de semana. Só isso."], paragraphLink: { before: "E se o fim de semana chegar sem nada combinado, veja ", linkText: "encontros de última hora, quando o fim de semana chegou sem plano", href: "/blog/encontro-romantico-de-ultima-hora", after: "." } }
      ]
    },
    es: {
      title: "Consejo de la semana: acordad el fin de semana el jueves",
      seoTitle: "Cómo planear el fin de semana en pareja en diez minutos",
      excerpt: "Un fin de semana sin plan suele acabar en el sofá. Diez minutos el jueves, con una pregunta sencilla, cambian el resto de la semana.",
      imageAlt: "Pareja sentada en el sofá, mirando juntos una agenda abierta y sonriendo",
      readTime: "3 min de lectura",
      intro: ["El viernes por la noche todo el mundo está cansado, y un fin de semana sin plan suele terminar en el sofá, cada uno con su pantalla. No es falta de ganas: es falta de ponerse de acuerdo.", "El consejo de este martes es reservar una conversación corta el jueves, cuando todavía hay energía, para elegir algo bueno para el sábado o el domingo."],
      sections: [
        { heading: "Cómo hacer la conversación del jueves", items: ["Elegid diez minutos: durante la cena o después de fregar los platos.", "Cada uno dice algo que le gustaría hacer el fin de semana, grande o pequeño.", "Elegid una sola cosa, la más fácil de hacer, y cerrad día y hora.", "Quien no la eligió se encarga del detalle: el sitio, qué llevar o la hora de salida."] },
        { heading: "Preguntas que ayudan", items: ["¿Qué te apetece hacer y hace mucho que no haces?", "¿Prefieres algo tranquilo o algo que nos saque de casa?", "¿Qué es lo más sencillo que haría bueno nuestro sábado?"] },
        { heading: "No hace falta que sea perfecto", paragraphs: ["Acordar no significa llenar la agenda. Un paseo de una hora, un café en la plaza o una película con palomitas ya cuentan. Lo importante es que los dos sepan que la cita existe y la esperen.", "Si el plan se cae por el tiempo o por el cansancio, cambiadlo por una versión más pequeña y mantened la fecha."] },
        { heading: "El pequeño compromiso de la semana", paragraphs: ["El jueves, reservad diez minutos y elegid una cosa para el fin de semana. Solo eso."], paragraphLink: { before: "Y si el fin de semana llega sin nada acordado, mirad ", linkText: "citas de última hora, cuando el fin de semana llega sin plan", href: "/es/blog/cita-romantica-de-ultima-hora", after: "." } }
      ]
    },
    en: {
      title: "Weekly tip: plan the weekend on Thursday",
      seoTitle: "How to plan a weekend for two in ten minutes",
      excerpt: "A weekend with no plan often ends on the couch. Ten minutes on Thursday, with one simple question, change the rest of the week.",
      imageAlt: "Couple sitting side by side on the sofa, looking together at an open planner and smiling",
      readTime: "3 min read",
      intro: ["By Friday night everyone is tired, and a weekend with no plan usually ends on the couch, each with their own screen. It's not a lack of will: it's a lack of agreeing.", "This Tuesday's tip is to set a short chat on Thursday, while there is still energy, to pick one good thing for Saturday or Sunday."],
      sections: [
        { heading: "How to have the Thursday chat", items: ["Pick ten minutes: over dinner or after the dishes.", "Each of you says one thing you'd like to do this weekend, big or small.", "Choose just one, the easiest to pull off, and fix the day and time.", "Whoever didn't choose plans the detail: the place, what to bring or when to leave."] },
        { heading: "Questions that help", items: ["What do you feel like doing that we haven't done in a long time?", "Would you rather have something calm or something that gets us out of the house?", "What is the simplest thing that would make our Saturday good?"] },
        { heading: "It doesn't have to be perfect", paragraphs: ["Agreeing doesn't mean filling the calendar. An hour's walk, a coffee in the square or a movie with popcorn all count. What matters is that you both know the date exists and look forward to it.", "If the plan falls through because of weather or tiredness, swap it for a smaller version and keep the date."] },
        { heading: "This week's small commitment", paragraphs: ["On Thursday, set aside ten minutes and choose one thing for the weekend. That's all."], paragraphLink: { before: "And if the weekend arrives with nothing planned, see ", linkText: "last-minute dates, for when the weekend arrives with no plan", href: "/en/blog/last-minute-romantic-date", after: "." } }
      ]
    }
  },

  "natal-a-dois": {
    iso: "2026-11-12", image: "/images/blog/36-natal-a-dois.webp", series: "IDEIAS E GUIAS", kind: "ideias",
    slugs: L("natal-a-dois-10-ideias-simples-e-baratas", "navidad-en-pareja-10-ideas-sencillas-y-economicas", "christmas-for-two-10-simple-budget-ideas"),
    pt: {
      title: "Natal a dois: 10 ideias simples e baratas para viver a época em casal",
      seoTitle: "Natal a dois: 10 ideias simples e baratas para casais",
      excerpt: "Dez ideias para curtir a época de Natal em casal sem gastar muito: luzes, cartas, doces feitos juntos e pequenos rituais que viram tradição.",
      category: "IDEIAS PARA CASAIS",
      imageAlt: "Casal abraçado diante de uma pequena árvore de Natal iluminada, numa sala aconchegante",
      readTime: "5 min de leitura",
      intro: ["O Natal chega com lista de compras, agenda cheia e a sensação de que tudo precisa ser grande. Para um casal, o mais bonito costuma ser o contrário: pequenos rituais que só vocês dois entendem.", "Estas dez ideias custam pouco, cabem na semana corrida e funcionam em qualquer casa."],
      sections: [
        { heading: "Para enfeitar e preparar", items: ["Montem a árvore ou os enfeites ouvindo a playlist de Natal que cada um escolheu.", "Façam juntos um enfeite à mão para o ano: um por pessoa, com a data escrita atrás.", "Passeiem à noite para ver as luzes da cidade, de mãos dadas e com chocolate quente na garrafa."] },
        { heading: "Para fazer juntos na cozinha", items: ["Preparem um doce ou biscoito de Natal, ainda que saia torto.", "Escolham um prato novo para a ceia e testem antes, numa noite só de vocês.", "Embrulhem juntos os presentes das famílias, com música e um café."] },
        { heading: "Para criar tradição", items: ["Escrevam uma carta curta um para o outro, para abrir só no Natal do ano que vem.", "Escolham um filme de Natal para rever todo ano, sempre com a mesma manta e o mesmo lanche.", "Façam uma lista dos três melhores momentos do ano, e conversem sobre cada um.", "Reservem uma noite antes do Natal em que ninguém fala de presente, só de memórias."] },
        { heading: "Um cuidado simples", paragraphs: ["Combinem de antemão quanto querem gastar e o que realmente importa para cada um. Assim o Natal não vira cobrança, e as ideias pequenas ganham espaço."], paragraphLink: { before: "Para mais ideias que cabem no orçamento, veja ", linkText: "encontros românticos gastando pouco", href: "/blog/encontros-romanticos-gastando-pouco", after: "." } }
      ]
    },
    es: {
      title: "Navidad en pareja: 10 ideas sencillas y económicas para vivir la época",
      seoTitle: "Navidad en pareja: 10 ideas sencillas y económicas",
      excerpt: "Diez ideas para disfrutar de la Navidad en pareja sin gastar mucho: luces, cartas, dulces hechos juntos y pequeños rituales que se vuelven tradición.",
      category: "IDEAS PARA PAREJAS",
      imageAlt: "Pareja abrazada frente a un pequeño árbol de Navidad iluminado, en un salón acogedor",
      readTime: "5 min de lectura",
      intro: ["La Navidad llega con lista de compras, agenda llena y la sensación de que todo tiene que ser grande. Para una pareja, lo más bonito suele ser lo contrario: pequeños rituales que solo vosotros dos entendéis.", "Estas diez ideas cuestan poco, caben en la semana apretada y funcionan en cualquier casa."],
      sections: [
        { heading: "Para decorar y preparar", items: ["Montad el árbol o los adornos escuchando la lista de villancicos que cada uno eligió.", "Haced juntos un adorno a mano para el año: uno por persona, con la fecha escrita detrás.", "Pasead de noche para ver las luces de la ciudad, de la mano y con chocolate caliente en el termo."] },
        { heading: "Para hacer juntos en la cocina", items: ["Preparad un dulce o unas galletas de Navidad, aunque salgan torcidos.", "Elegid un plato nuevo para la cena y probadlo antes, una noche solo vuestra.", "Envolved juntos los regalos de las familias, con música y un café."] },
        { heading: "Para crear tradición", items: ["Escribíos una carta corta para abrirla solo en la Navidad del año que viene.", "Elegid una película navideña para ver cada año, siempre con la misma manta y la misma merienda.", "Haced una lista de los tres mejores momentos del año y hablad de cada uno.", "Reservad una noche antes de Navidad en la que nadie hable de regalos, solo de recuerdos."] },
        { heading: "Un cuidado sencillo", paragraphs: ["Acordad de antemano cuánto queréis gastar y qué es lo que de verdad importa a cada uno. Así la Navidad no se convierte en una exigencia y las ideas pequeñas ganan espacio."], paragraphLink: { before: "Para más ideas que caben en el presupuesto, mirad ", linkText: "citas románticas gastando poco", href: "/es/blog/citas-romanticas-gastando-poco", after: "." } }
      ]
    },
    en: {
      title: "Christmas for two: 10 simple, budget-friendly ideas for couples",
      seoTitle: "Christmas for two: 10 simple budget ideas for couples",
      excerpt: "Ten ideas to enjoy Christmas as a couple without spending much: lights, letters, treats made together and small rituals that become tradition.",
      category: "DATE IDEAS",
      imageAlt: "Couple hugging in front of a small lit Christmas tree in a cozy living room",
      readTime: "5 min read",
      intro: ["Christmas arrives with a shopping list, a full calendar and the feeling that everything has to be big. For a couple, the loveliest part is often the opposite: small rituals only the two of you understand.", "These ten ideas cost little, fit into a busy week and work in any home."],
      sections: [
        { heading: "To decorate and prepare", items: ["Put up the tree or the decorations while listening to the Christmas playlist each of you picked.", "Make one handmade ornament together for the year: one each, with the date written on the back.", "Walk at night to see the city lights, hand in hand, with hot chocolate in a flask."] },
        { heading: "To do together in the kitchen", items: ["Bake a Christmas treat or cookies, even if they come out crooked.", "Pick a new dish for the Christmas meal and try it first, on a night just for the two of you.", "Wrap the family gifts together, with music and a coffee."] },
        { heading: "To build a tradition", items: ["Write each other a short letter to open only next Christmas.", "Pick a Christmas movie to rewatch every year, always with the same blanket and the same snack.", "List the three best moments of the year and talk about each one.", "Set aside one evening before Christmas when nobody mentions gifts, only memories."] },
        { heading: "One simple precaution", paragraphs: ["Agree beforehand how much you want to spend and what really matters to each of you. That way Christmas doesn't turn into pressure, and the small ideas get room."], paragraphLink: { before: "For more ideas that fit the budget, see ", linkText: "romantic dates on a small budget", href: "/en/blog/romantic-dates-on-a-small-budget", after: "." } }
      ]
    }
  }
};
