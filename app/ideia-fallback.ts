// Ideias prontas de reserva: o gerador NUNCA fica sem resposta, mesmo se a IA e o banco falharem.
// Todas custam zero e cabem em qualquer tempo (a versão curta e a longa vêm descritas no passo final).
export type Lang = "pt" | "en";
export type IdeaResult = {
  id: string;
  title: string;
  whyItFits: string;
  howTo: string[];
  smallDetail: string;
  surprise?: string;
  planB?: { id: string; title: string };
  confirmBefore: boolean;
  requirements?: string;
  badges: string[];
  aiGenerated?: boolean;
};
type Base = { id: string; env: "home" | "outdoors" | "go-out"; pt: Omit<IdeaResult, "id" | "badges" | "confirmBefore">; en: Omit<IdeaResult, "id" | "badges" | "confirmBefore"> };

const BASE: Base[] = [
  { id: "h1", env: "home",
    pt: { title: "Dia de cozinha a dois: o prato que vocês nunca fizeram", whyItFits: "Cozinhar juntos transforma uma tarefa comum em tempo de conversa, risada e parceria, sem gastar além do que já tem na despensa.", howTo: ["Abram a despensa e a geladeira e escolham juntos um prato com o que tiver.", "Dividam as tarefas: um prepara, o outro tempera e escolhe a música.", "Arrumem a mesa como se fosse restaurante: toalha, vela ou luz baixa.", "Comam sem celular e digam uma coisa de que gostaram na semana um do outro.", "Para um dia inteiro, comecem pela sobremesa de manhã e deixem o jantar para a noite."], smallDetail: "Deem um nome engraçado ao prato e anotem a receita para repetir." },
    en: { title: "Cook together: a dish you have never made", whyItFits: "Cooking together turns a chore into time for talking, laughing and teamwork, without spending beyond what is already in the pantry.", howTo: ["Open the pantry and fridge and pick a dish together from what you have.", "Split the jobs: one prepares, the other seasons and picks the music.", "Set the table like a restaurant: tablecloth, candle or soft light.", "Eat with no phones and say one thing you liked about each other this week.", "For a full day, start with a dessert in the morning and leave dinner for the evening."], smallDetail: "Give the dish a funny name and write the recipe down to repeat it." } },
  { id: "h2", env: "home",
    pt: { title: "Cinema em casa com cabana e votação de filmes", whyItFits: "Uma noite de filme vira encontro de verdade quando tem cenário, escolha a dois e um ritual só de vocês.", howTo: ["Cada um escreve 3 filmes ou séries em papeizinhos e sorteiem um.", "Montem uma cabana com cobertor, almofadas e uma luz baixa.", "Façam pipoca ou o lanche que tiver em casa.", "No intervalo, cada um conta qual cena mais o marcou.", "Para um dia mais longo, façam uma maratona com 2 ou 3 títulos e pausas para caminhar."], smallDetail: "Guardem o papelzinho do filme como lembrança do encontro." },
    en: { title: "Movie night in a blanket fort, with a vote", whyItFits: "A movie night becomes a real date when it has a setting, a shared choice and a ritual that is only yours.", howTo: ["Each writes 3 films or shows on slips of paper and you draw one.", "Build a fort with blankets, pillows and soft light.", "Make popcorn or whatever snack you have at home.", "At the break, each tells which scene stayed with them the most.", "For a longer day, run a marathon of 2 or 3 titles with walking breaks."], smallDetail: "Keep the slip of paper as a souvenir of the date." } },
  { id: "h3", env: "home",
    pt: { title: "Cartas para o futuro: 'daqui a um ano, nós…'", whyItFits: "Escrever um para o outro cria conexão profunda e custa só papel e caneta.", howTo: ["Cada um escreve uma carta curta para o outro, em silêncio, por 15 minutos.", "Incluam 3 lembranças boas e 1 sonho para o próximo ano.", "Leiam em voz alta, um de cada vez, sem interromper.", "Fechem as cartas em envelopes e marquem a data de abrir.", "Se tiver o dia todo, façam depois uma caminhada ou um café em casa para conversar sobre o que leram."], smallDetail: "Guardem as cartas num lugar combinado e marquem a data no calendário." },
    en: { title: "Letters to the future: 'a year from now, we…'", whyItFits: "Writing to each other builds deep connection and costs only paper and a pen.", howTo: ["Each writes a short letter to the other, in silence, for 15 minutes.", "Include 3 good memories and 1 dream for next year.", "Read them aloud, one at a time, without interrupting.", "Seal the letters in envelopes and set the date to open them.", "With a full day, follow up with a walk or coffee at home to talk about what you read."], smallDetail: "Keep the letters in an agreed place and mark the date in the calendar." } },
  { id: "o1", env: "outdoors",
    pt: { title: "Caminhada sem destino com uma regra divertida", whyItFits: "Andar lado a lado solta a conversa, e uma regrinha transforma o passeio numa pequena aventura.", howTo: ["Escolham um bairro, parque ou trilha fácil perto de vocês.", "Regra: a cada esquina, quem escolher o caminho alterna.", "Procurem 3 coisas bonitas ou curiosas e tirem uma foto de cada.", "Parem num banco e conversem sobre o melhor momento do mês.", "Se for um dia inteiro, levem água e lanche simples e estiquem até o pôr do sol."], smallDetail: "Levem uma garrafa de água e um casaco leve, e deixem o celular no bolso." },
    en: { title: "A walk with no destination and one fun rule", whyItFits: "Walking side by side loosens up conversation, and one small rule turns the walk into a tiny adventure.", howTo: ["Pick a neighbourhood, park or easy trail near you.", "Rule: at every corner, the one choosing the way alternates.", "Look for 3 beautiful or curious things and take one photo of each.", "Stop on a bench and talk about the best moment of the month.", "For a full day, bring water and a simple snack and stretch it to sunset."], smallDetail: "Bring a bottle of water and a light jacket, and keep the phone in your pocket." } },
  { id: "o2", env: "outdoors",
    pt: { title: "Piquenique simples com o que tem em casa", whyItFits: "Um piquenique cria clima de encontro com quase nada: uma manta, comida simples e um lugar bonito.", howTo: ["Juntem o que tiver: pão, frutas, queijo, bolachas, algo para beber.", "Escolham um jardim ou parque e levem uma manta ou toalha grande.", "Arrumem tudo com carinho: guardanapos e um copo para cada um.", "Joguem algo leve: cartas, perguntas ou um jogo de palavras.", "Para um dia inteiro, comecem pela manhã e voltem para ver o pôr do sol."], smallDetail: "Levem um saquinho para recolher o lixo e deixar o lugar melhor do que acharam." },
    en: { title: "A simple picnic with what you have at home", whyItFits: "A picnic creates the date mood with almost nothing: a blanket, simple food and a pretty place.", howTo: ["Gather what you have: bread, fruit, cheese, crackers, something to drink.", "Pick a garden or park and bring a blanket or large towel.", "Lay it out with care: napkins and a cup for each of you.", "Play something light: cards, questions or a word game.", "For a full day, start in the morning and come back to watch the sunset."], smallDetail: "Bring a small bag to collect your rubbish and leave the place better than you found it." } },
  { id: "o3", env: "outdoors",
    pt: { title: "Pôr do sol com lista de gratidão", whyItFits: "Acompanhar o fim do dia juntos desacelera, e dizer o que agradecem aproxima.", howTo: ["Descubram o horário do pôr do sol e escolham um lugar alto ou aberto.", "Cheguem 30 minutos antes e sentem-se sem pressa.", "Cada um diz 3 coisas pelas quais é grato naquela semana.", "Digam 1 coisa que admiram no outro.", "Se tiver o dia todo, comecem com uma caminhada e deixem o pôr do sol para o final."], smallDetail: "Tirem uma foto dos dois com o céu atrás, sem pose." },
    en: { title: "Sunset with a gratitude list", whyItFits: "Watching the day end together slows things down, and saying what you are grateful for brings you closer.", howTo: ["Check the sunset time and choose a high or open spot.", "Arrive 30 minutes early and sit without hurry.", "Each says 3 things they are grateful for that week.", "Each says 1 thing they admire in the other.", "With a full day, start with a walk and save the sunset for the end."], smallDetail: "Take a photo of the two of you with the sky behind, no posing." } },
  { id: "g1", env: "go-out",
    pt: { title: "Turistas na própria cidade", whyItFits: "Ver sua cidade como visitantes faz o comum parecer novo, e passear quase não custa nada.", howTo: ["Escolham 3 lugares da cidade onde nunca entraram ou que não visitam há tempos.", "Vão a pé ou de transporte público, e olhem para cima e para os detalhes.", "Em cada lugar, tirem uma foto juntos.", "Parem em um café ou banco e conversem sobre o que descobriram.", "Em um dia inteiro, vão do mais perto ao mais longe e terminem em um mirante."], smallDetail: "Procurem lugares de entrada gratuita, como igrejas, praças, mercados e jardins." },
    en: { title: "Tourists in your own city", whyItFits: "Seeing your city like visitors makes the ordinary feel new, and wandering costs almost nothing.", howTo: ["Pick 3 places in the city you have never entered or have not visited in a long time.", "Go on foot or by public transport, and look up and at the details.", "At each place, take a photo together.", "Stop at a cafe or a bench and talk about what you discovered.", "Over a full day, go from the nearest to the furthest and end at a viewpoint."], smallDetail: "Look for free-entry places such as churches, squares, markets and gardens." } },
  { id: "g2", env: "go-out",
    pt: { title: "Feira, mercado ou biblioteca: escolha uma coisa para o outro", whyItFits: "Procurar algo para o outro mostra atenção, e as ideias mais simples costumam ser as mais lembradas.", howTo: ["Vão a uma feira, mercado de rua, sebo ou biblioteca.", "Cada um dá uma volta separado por 20 minutos.", "Cada um escolhe algo pequeno e barato, ou só uma ideia, que combine com o outro.", "Encontrem-se, troquem e expliquem a escolha.", "Em um dia inteiro, terminem com um lanche em um banco de praça."], smallDetail: "Definam antes um teto de valor, ou nenhum, e vale escolher só um livro ou uma música." },
    en: { title: "Market, fair or library: pick something for each other", whyItFits: "Looking for something for the other shows attention, and the simplest ideas are often the most remembered.", howTo: ["Go to a fair, street market, second-hand bookshop or library.", "Each wanders alone for 20 minutes.", "Each picks something small and cheap, or just an idea, that suits the other.", "Meet up, swap and explain your choice.", "Over a full day, finish with a snack on a park bench."], smallDetail: "Agree on a spending cap beforehand, or none at all: choosing a book or a song counts." } },
  { id: "g3", env: "go-out",
    pt: { title: "Mapa dos 'primeiros': refazer o caminho do começo", whyItFits: "Voltar aos lugares da história de vocês reacende lembranças e gratidão, sem custo nenhum.", howTo: ["Listem 3 lugares importantes para vocês: onde se conheceram, o primeiro encontro, um lugar especial.", "Visitem os que forem possíveis, na ordem em que aconteceram.", "Em cada um, contem o que lembram do dia, sem corrigir o outro.", "Tirem uma foto parecida com a da época, se tiverem.", "Terminem dizendo o que mais mudou e o que continua igual em vocês."], smallDetail: "Se algum lugar já não existir, façam a conversa em um banco parecido." },
    en: { title: "Map of 'firsts': retrace the beginning", whyItFits: "Going back to the places of your story rekindles memories and gratitude, at no cost.", howTo: ["List 3 places that matter to you: where you met, the first date, a special spot.", "Visit the ones you can, in the order they happened.", "At each, tell what you remember from that day, without correcting each other.", "Take a photo like the one from back then, if you have it.", "Finish by saying what changed most and what stayed the same in you."], smallDetail: "If a place no longer exists, have the conversation on a similar bench." } },
];

const label = {
  pt: { duration: { hour: "1 hora", afternoon: "uma tarde", day: "um dia" }, free: "grátis" },
  en: { duration: { hour: "1 hour", afternoon: "an afternoon", day: "a day" }, free: "free" },
};

export function staticIdea(
  answers: { environment: string; duration: string; budget?: string; occasion?: string },
  lang: Lang,
  exclude: string[] = [],
): IdeaResult {
  const pool = BASE.filter((item) => answers.environment === "any" || item.env === answers.environment);
  const usable = (pool.length ? pool : BASE);
  const fresh = usable.filter((item) => !exclude.includes(`static-${item.id}`));
  const list = fresh.length ? fresh : usable;
  const pick = list[Math.floor(Math.random() * list.length)];
  const text = pick[lang];
  const d = (label[lang].duration as Record<string, string>)[answers.duration] ?? label[lang].duration.afternoon;
  const howTo = answers.duration === "day" ? text.howTo : text.howTo.slice(0, -1);
  return { ...text, howTo, id: `static-${pick.id}`, confirmBefore: false, badges: ["C0", label[lang].free, d] };
}
