export type FinderLang = "pt" | "es" | "en";

type Opt = { value: string; label: string };
export type FinderCopy = {
  kicker: string; title: string; text: string;
  environment: string; budget: string; time: string; occasion: string;
  environments: Opt[]; budgets: Opt[]; times: Opt[]; occasions: Opt[]; periods: Opt[]; period: string;
  find: string; three: string; threeTitle: string; resultKicker: string; anotherIdea: string;
  finding: string; aiNote: string; exhausted: string; tip: string;
  surprise: string; planB: string; confirm: string;
  flameTitle: string; flameLabel: string; flameHint: string; flameAskTitle: string; flameAskText: string; flameYes: string; flameNo: string; flameBadge: string; flameRelaxed: string; flameNote: string;
  placeTitle: string; placeHint: string; placeHolder: string; placeBtn: string; placeBusy: string; placeOk: string; placeFail: string; placeClear: string
  cost: Record<string, string>; duration: Record<string, string>; place: Record<string, string>; periodLabel: Record<string, string>;
};

export const finderCopy: Record<FinderLang, FinderCopy> = {
  pt: {
    kicker: "O PLANO COMEÇA AQUI", title: "O que vocês gostariam de viver hoje?", text: "Conte o essencial. A gente transforma isso em um encontro possível.",
    environment: "Que tipo de programa vocês querem?", budget: "Quanto vocês querem gastar?", time: "Quanto tempo vocês têm?", occasion: "Qual é a ocasião?",
    environments: [{ value: "home", label: "Em casa" }, { value: "outdoors", label: "Ao ar livre" }, { value: "go-out", label: "Sair" }, { value: "any", label: "Tanto faz" }],
    budgets: [{ value: "free", label: "Grátis" }, { value: "low", label: "Baixo custo" }, { value: "more", label: "Um pouco mais" }],
    times: [{ value: "hour", label: "1 hora" }, { value: "afternoon", label: "Uma tarde" }, { value: "day", label: "Um dia" }],
    occasions: [{ value: "casual", label: "Encontro casual" }, { value: "surprise", label: "Uma surpresa" }, { value: "reconnect", label: "Reconectar" }],
    period: "Que momento do dia?", periods: [{ value: "any", label: "Tanto faz" }, { value: "day", label: "De dia" }, { value: "night", label: "À noite" }],
    find: "Criar o nosso encontro", three: "Me dê 3 ideias", threeTitle: "3 ideias para vocês", resultKicker: "UMA IDEIA PARA VOCÊS", anotherIdea: "Quero outra ideia",
    finding: "Procurando uma ideia para vocês…", aiNote: "Ideia criada na hora para os seus filtros. Confira detalhes e horários antes de sair.",
    exhausted: "Ainda não temos uma ideia para estes filtros. Tente mudar o tempo, o orçamento ou o tipo de programa.", tip: "Pequeno detalhe",
    surprise: "Surpresa:", planB: "Plano B:", confirm: "Confirme antes:",
    cost: { C0: "Grátis", C1: "Baixo custo", C2: "Um pouco mais" }, duration: { hour: "1 hora", afternoon: "Uma tarde", day: "Um dia" }, place: { home: "Em casa", outdoors: "Ao ar livre", "go-out": "Sair", any: "Tanto faz" }, periodLabel: { day: "De dia", night: "À noite" },
    flameTitle: "Modo Chama (+18)", flameLabel: "Ativar o modo Chama 🔥", flameHint: "Ideias mais íntimas e sensuais, para maiores de 18 anos. Sem nada explícito e sempre com consentimento.",
    flameAskTitle: "Conteúdo para adultos (+18)", flameAskText: "O modo Chama sugere encontros mais íntimos e sensuais, sem imagens e sem nada explícito. É destinado a maiores de 18 anos.", flameYes: "Tenho 18 anos ou mais", flameNo: "Agora não",
    flameBadge: "Modo Chama", flameRelaxed: "Não havia uma ideia exata para esses filtros. Aqui vai uma que combina com o clima.", flameNote: "Combinem antes o que é bem-vindo. Qualquer um pode dizer “passo” ou parar, a qualquer momento.",
    placeTitle: "Sua cidade (opcional)", placeHint: "Assim só sugerimos programas que existem aí perto (praia, cinema, parque…). Usamos dados abertos de mapas, direto no seu navegador, e não guardamos nada no nosso servidor.", placeHolder: "Ex.: Lisboa, Madri, Curitiba", placeBtn: "Usar esta cidade", placeBusy: "Procurando lugares perto de…", placeOk: "Ideias ajustadas para", placeFail: "Não consegui consultar essa cidade agora. Vamos mostrar ideias para qualquer lugar.", placeClear: "Limpar cidade",
  },
  es: {
    kicker: "EL PLAN EMPIEZA AQUÍ", title: "¿Qué os gustaría vivir hoy?", text: "Contadnos lo esencial. Lo convertimos en una cita posible.",
    environment: "¿Qué tipo de plan queréis?", budget: "¿Cuánto queréis gastar?", time: "¿Cuánto tiempo tenéis?", occasion: "¿Cuál es la ocasión?",
    environments: [{ value: "home", label: "En casa" }, { value: "outdoors", label: "Al aire libre" }, { value: "go-out", label: "Salir" }, { value: "any", label: "Me da igual" }],
    budgets: [{ value: "free", label: "Gratis" }, { value: "low", label: "Bajo coste" }, { value: "more", label: "Un poco más" }],
    times: [{ value: "hour", label: "1 hora" }, { value: "afternoon", label: "Una tarde" }, { value: "day", label: "Un día" }],
    occasions: [{ value: "casual", label: "Cita informal" }, { value: "surprise", label: "Una sorpresa" }, { value: "reconnect", label: "Reconectar" }],
    period: "¿En qué momento del día?", periods: [{ value: "any", label: "Me da igual" }, { value: "day", label: "De día" }, { value: "night", label: "De noche" }],
    find: "Crear nuestra cita", three: "Dame 3 ideas", threeTitle: "3 ideas para vosotros", resultKicker: "UNA IDEA PARA VOSOTROS", anotherIdea: "Quiero otra idea",
    finding: "Buscando una idea para vosotros…", aiNote: "Idea creada al momento para vuestros filtros. Comprobad detalles y horarios antes de salir.",
    exhausted: "Todavía no tenemos una idea para estos filtros. Probad a cambiar el tiempo, el presupuesto o el tipo de plan.", tip: "Un pequeño detalle",
    surprise: "Sorpresa:", planB: "Plan B:", confirm: "Confirmad antes:",
    cost: { C0: "Gratis", C1: "Bajo coste", C2: "Un poco más" }, duration: { hour: "1 hora", afternoon: "Una tarde", day: "Un día" }, place: { home: "En casa", outdoors: "Al aire libre", "go-out": "Salir", any: "Me da igual" }, periodLabel: { day: "De día", night: "De noche" },
    flameTitle: "Modo Llama (+18)", flameLabel: "Activar el modo Llama 🔥", flameHint: "Ideas más íntimas y sensuales, para mayores de 18 años. Nada explícito y siempre con consentimiento.",
    flameAskTitle: "Contenido para adultos (+18)", flameAskText: "El modo Llama propone citas más íntimas y sensuales, sin imágenes y sin nada explícito. Está dirigido a mayores de 18 años.", flameYes: "Tengo 18 años o más", flameNo: "Ahora no",
    flameBadge: "Modo Llama", flameRelaxed: "No había una idea exacta para esos filtros. Aquí tenéis una que encaja con el ambiente.", flameNote: "Acordad antes qué es bienvenido. Cualquiera puede decir “paso” o parar, en cualquier momento.",
    placeTitle: "Tu ciudad (opcional)", placeHint: "Así solo sugerimos planes que existen cerca de vosotros (playa, cine, parque…). Usamos datos abiertos de mapas, directamente en vuestro navegador, y no guardamos nada en nuestro servidor.", placeHolder: "Ej.: Madrid, Sevilla, Lisboa", placeBtn: "Usar esta ciudad", placeBusy: "Buscando lugares cerca de…", placeOk: "Ideas ajustadas para", placeFail: "No he podido consultar esa ciudad ahora. Mostraremos ideas para cualquier lugar.", placeClear: "Borrar ciudad",
  },
  en: {
    kicker: "YOUR PLAN STARTS HERE", title: "What would you like to experience today?", text: "Tell us the essentials. We'll turn them into a date you can actually enjoy.",
    environment: "What kind of plan would you like?", budget: "How much would you like to spend?", time: "How much time do you have?", occasion: "What's the occasion?",
    environments: [{ value: "home", label: "At home" }, { value: "outdoors", label: "Outdoors" }, { value: "go-out", label: "Going out" }, { value: "any", label: "Anything" }],
    budgets: [{ value: "free", label: "Free" }, { value: "low", label: "Low cost" }, { value: "more", label: "A bit more" }],
    times: [{ value: "hour", label: "1 hour" }, { value: "afternoon", label: "An afternoon" }, { value: "day", label: "A day" }],
    occasions: [{ value: "casual", label: "Casual date" }, { value: "surprise", label: "A surprise" }, { value: "reconnect", label: "Reconnect" }],
    period: "What time of day?", periods: [{ value: "any", label: "Anything" }, { value: "day", label: "Daytime" }, { value: "night", label: "Evening / night" }],
    find: "Create our date", three: "Give me 3 ideas", threeTitle: "3 ideas for you", resultKicker: "AN IDEA FOR YOU", anotherIdea: "Show another idea",
    finding: "Finding an idea for you…", aiNote: "Idea created just now for your filters. Check details and opening times before you go.",
    exhausted: "We don't have an idea for these filters yet. Try changing the time, budget or type of plan.", tip: "A little detail",
    surprise: "Surprise:", planB: "Plan B:", confirm: "Check first:",
    cost: { C0: "Free", C1: "Low cost", C2: "A bit more" }, duration: { hour: "1 hour", afternoon: "An afternoon", day: "A day" }, place: { home: "At home", outdoors: "Outdoors", "go-out": "Going out", any: "Anything" }, periodLabel: { day: "Daytime", night: "Evening / night" },
    flameTitle: "Flame mode (18+)", flameLabel: "Turn on flame mode 🔥", flameHint: "More intimate and sensual ideas, for adults aged 18 and over. Nothing explicit, and always with consent.",
    flameAskTitle: "Adult content (18+)", flameAskText: "Flame mode suggests more intimate and sensual dates, with no images and nothing explicit. It is meant for readers aged 18 and over.", flameYes: "I am 18 or older", flameNo: "Not now",
    flameBadge: "Flame mode", flameRelaxed: "There was no exact idea for those filters. Here is one that fits the mood.", flameNote: "Agree beforehand on what is welcome. Either of you can say “pass” or stop at any time.",
    placeTitle: "Your city (optional)", placeHint: "So we only suggest plans that exist near you (beach, cinema, park…). We use open map data, straight from your browser, and store nothing on our server.", placeHolder: "E.g.: London, Lisbon, Madrid", placeBtn: "Use this city", placeBusy: "Looking for places near…", placeOk: "Ideas tuned for", placeFail: "I couldn't look up that city right now. We'll show ideas for anywhere.", placeClear: "Clear city",
  },
};
