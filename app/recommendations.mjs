export const environments = ["home", "outdoors", "go-out", "any"];
export const budgets = ["free", "low", "more"];
export const durations = ["hour", "afternoon", "day"];
export const occasions = ["casual", "surprise", "reconnect"];

const labels = {
  pt: {
    environment: { home: "Em casa", outdoors: "Ao ar livre", "go-out": "Sair" },
    budget: { free: "Grátis", low: "Baixo custo", more: "Um pouco mais" },
    duration: { hour: "1 hora", afternoon: "Uma tarde", day: "Um dia" },
  },
  en: {
    environment: { home: "At home", outdoors: "Outdoors", "go-out": "Going out" },
    budget: { free: "Free", low: "Low cost", more: "A little more" },
    duration: { hour: "1 hour", afternoon: "An afternoon", day: "A day" },
  },
};

// Every entry uses closed dimensions. Copy belongs to the idea; selection never
// infers cost, duration, setting, or occasion from a display string.
export const ideas = [
  { id: "home-notes", environment: "home", budget: "free", duration: "hour", occasions: ["casual", "reconnect"], pt: ["Troquem bilhetes e uma bebida quente", "Preparem duas bebidas e escrevam uma pergunta bonita para responder sem pressa.", "Deixem os celulares em outro cômodo durante a conversa."], en: ["Share notes over a warm drink", "Make two drinks and write one meaningful question to answer without rushing.", "Leave your phones in another room for the conversation."] },
  { id: "home-cook", environment: "home", budget: "free", duration: "afternoon", occasions: ["casual", "reconnect"], pt: ["Cozinhem uma receita nova juntos", "Escolham uma receita simples, dividam as tarefas e provem tudo antes de servir.", "Guardem a receita com uma nota sobre como foi a tarde."], en: ["Cook a new recipe together", "Choose a simple recipe, share the tasks and taste as you go.", "Save the recipe with a note about the afternoon."] },
  { id: "home-surprise", environment: "home", budget: "more", duration: "day", occasions: ["surprise", "reconnect"], pt: ["Transformem a casa para um dia especial", "Preparem um café demorado, uma playlist e três pequenas pausas escolhidas com carinho.", "Entregue o primeiro detalhe antes de a outra pessoa saber o plano."], en: ["Turn home into a special-day retreat", "Plan a slow breakfast, a playlist and three thoughtful pauses.", "Give the first detail before the other person knows the plan."] },
  { id: "home-film", environment: "home", budget: "low", duration: "hour", occasions: ["casual", "surprise"], pt: ["Façam uma sessão de curta-metragens", "Escolham dois curtas, preparem algo simples para comer e conversem entre um e outro.", "Cada pessoa escolhe um filme sem explicar o motivo antes."], en: ["Have a short-film date", "Pick two short films, make a simple snack and talk between them.", "Each person chooses one film without explaining why first."] },
  { id: "outdoors-walk", environment: "outdoors", budget: "free", duration: "hour", occasions: ["casual", "reconnect"], pt: ["Caminhada sem notificações", "Escolham um trajeto tranquilo e caminhem no ritmo de uma conversa leve.", "No fim, cada pessoa conta um detalhe que reparou no caminho."], en: ["Take a notification-free walk", "Choose a calm route and walk at the pace of an easy conversation.", "At the end, each person shares one detail they noticed."] },
  { id: "outdoors-picnic", environment: "outdoors", budget: "low", duration: "afternoon", occasions: ["surprise", "reconnect"], pt: ["Piquenique ao pôr do sol", "Levem uma toalha, duas bebidas e três músicas que contem a história de vocês.", "Escreva uma frase num papel para entregar quando o céu mudar de cor."], en: ["Sunset picnic", "Bring a blanket, two drinks and three songs that tell your story.", "Write one sentence to share when the sky changes colour."] },
  { id: "outdoors-explore", environment: "outdoors", budget: "more", duration: "day", occasions: ["casual", "surprise"], pt: ["Explorem um parque ou trilha leve", "Planejem um lugar seguro e permitido, levem água e façam pausas para observar juntos.", "Uma pessoa escolhe a primeira parada; a outra escolhe a última."], en: ["Explore a park or easy trail", "Plan a safe, permitted place, bring water and pause to look around together.", "One person chooses the first stop; the other chooses the last."] },
  { id: "outdoors-photo", environment: "outdoors", budget: "free", duration: "afternoon", occasions: ["casual", "surprise"], pt: ["Façam uma caça fotográfica a dois", "Criem uma lista de cores, texturas e pequenos sinais de gentileza para encontrar pelo caminho.", "Montem um álbum com as cinco fotos preferidas."], en: ["Go on a two-person photo hunt", "Make a list of colours, textures and small signs of kindness to find along the way.", "Make an album from your five favourite photos."] },
  { id: "goout-coffee", environment: "go-out", budget: "free", duration: "hour", occasions: ["casual", "reconnect"], pt: ["Escolham um café para conversar", "Vão a um café acessível e deixem uma pergunta aberta guiar a conversa.", "Peçam uma recomendação do lugar e escolham juntos."], en: ["Choose a café for conversation", "Visit an accessible café and let one open question guide the conversation.", "Ask for a recommendation and choose together."] },
  { id: "goout-museum", environment: "go-out", budget: "low", duration: "afternoon", occasions: ["casual", "reconnect"], pt: ["Visitem uma exposição ou biblioteca", "Escolham um espaço cultural com acesso simples e contem um ao outro o que mais chamou atenção.", "Cada pessoa aponta uma obra ou trecho para a outra descobrir."], en: ["Visit an exhibition or library", "Choose an easy-to-access cultural space and share what caught your attention.", "Each person points out one work or passage for the other to discover."] },
  { id: "goout-show", environment: "go-out", budget: "more", duration: "day", occasions: ["surprise"], pt: ["Planejem um dia com uma atração especial", "Escolham uma programação compatível com o orçamento e deixem espaço para uma refeição simples e calma.", "Revele a atração apenas no caminho, se isso for confortável para os dois."], en: ["Plan a day around one special attraction", "Choose an outing that fits the budget and leave room for a simple, unhurried meal.", "Reveal the attraction on the way if that feels comfortable for both of you."] },
  { id: "goout-neighbourhood", environment: "go-out", budget: "free", duration: "afternoon", occasions: ["casual", "surprise"], pt: ["Sejam turistas no próprio bairro", "Escolham três ruas por onde quase não passam e parem onde a curiosidade levar.", "Finjam que precisam recomendar um lugar a uma pessoa visitante."], en: ["Be tourists in your own neighbourhood", "Choose three streets you rarely use and stop wherever curiosity takes you.", "Pretend you need to recommend one place to a visitor."] },
  { id: "home-slow-day", environment: "home", budget: "free", duration: "day", occasions: ["reconnect", "casual"], pt: ["Um dia sem pressa em casa", "Montem um almoço com o que já têm, façam uma pausa sem telas e escolham algo para criar juntos.", "Alternem quem escolhe a próxima pequena atividade."], en: ["A slow day at home", "Make lunch from what you have, take a screen-free pause and create something together.", "Take turns choosing the next small activity."] },
  { id: "outdoors-day", environment: "outdoors", budget: "free", duration: "day", occasions: ["reconnect", "casual"], pt: ["Dia de parque e sombra", "Escolham um parque permitido, levem água e comida simples e deixem o roteiro aberto.", "Separem uma hora para apenas sentar e conversar."], en: ["A day in the park", "Choose a permitted park, bring water and simple food, and keep the plan open.", "Set aside one hour just to sit and talk."] },
  { id: "goout-free-day", environment: "go-out", budget: "free", duration: "day", occasions: ["casual", "reconnect"], pt: ["Um dia de espaços públicos", "Criem uma rota com uma praça, uma biblioteca e um lugar tranquilo para observar a cidade.", "Escolham juntos onde ficar mais tempo."], en: ["A day of public spaces", "Make a route with a square, a library and a quiet place to watch the city.", "Choose together where to stay longest."] },
  { id: "any-free-day", environment: "home", budget: "free", duration: "day", occasions: ["surprise", "reconnect"], pt: ["Um dia de pequenas escolhas", "Cada pessoa prepara uma etapa gratuita do dia e revela a próxima na hora certa.", "Guardem uma escolha para ser decidida em conjunto."], en: ["A day of small choices", "Each person plans one free part of the day and reveals the next at the right moment.", "Save one choice to decide together."] },
];

const budgetRank = { free: 0, low: 1, more: 2 };

function hash(value) {
  let result = 2166136261;
  for (const character of value) result = Math.imul(result ^ character.charCodeAt(0), 16777619);
  return result >>> 0;
}

function assertAnswers(answers) {
  for (const [key, allowed] of Object.entries({ environment: environments, budget: budgets, duration: durations, occasion: occasions })) {
    if (!allowed.includes(answers[key])) throw new Error(`Invalid recommendation ${key}`);
  }
}

export function compatibleIdeas(answers) {
  assertAnswers(answers);
  return ideas.filter((idea) =>
    (answers.environment === "any" || idea.environment === answers.environment)
    && budgetRank[idea.budget] <= budgetRank[answers.budget]
    && idea.duration === answers.duration,
  );
}

export function recommend(answers, language = "pt") {
  assertAnswers(answers);
  const candidates = compatibleIdeas(answers);
  if (!candidates.length) throw new Error("No compatible recommendation");
  const score = (idea) =>
    (answers.environment === "any" ? 20 : 100)
    + (idea.duration === answers.duration ? 50 : 0)
    + (idea.occasions.includes(answers.occasion) ? 35 : 0)
    + (idea.budget === answers.budget ? 20 : 0)
    + (budgetRank[answers.budget] - budgetRank[idea.budget]);
  const highestScore = Math.max(...candidates.map(score));
  const tied = candidates.filter((idea) => score(idea) === highestScore).sort((left, right) => left.id.localeCompare(right.id));
  const idea = tied[hash(`${answers.environment}|${answers.budget}|${answers.duration}|${answers.occasion}`) % tied.length];
  const [title, description, tip] = idea[language === "en" ? "en" : "pt"];
  const text = labels[language === "en" ? "en" : "pt"];
  return { idea, title, description, tip, badges: [text.budget[idea.budget], text.duration[idea.duration], text.environment[idea.environment]] };
}
