import { NextResponse } from "next/server";
import { env } from "cloudflare:workers";
import { staticIdea, type IdeaResult, type Lang } from "../../ideia-fallback";

// Plano B do gerador de ideias: quando o motor curado não tem ideia para os filtros,
// a IA (Workers AI) cria uma na hora. Cada ideia criada é guardada no banco (D1) e reaproveitada.
// Camadas: banco de ideias -> IA -> ideia pronta de reserva. Nunca devolve vazio.

const ENVS = ["home", "outdoors", "go-out", "any"];
const BUDGETS = ["free", "low", "more"];
const DURATIONS = ["hour", "afternoon", "day"];
const OCCASIONS = ["casual", "surprise", "reconnect"];
const PERIODS = ["any", "day", "night"];
const BANK_TARGET = 6; // quantas ideias guardar por combinação antes de só reaproveitar
const PER_VISITOR_DAILY = 12; // criações por visitante por dia
const GLOBAL_DAILY = 60; // criações por dia no site todo (cota gratuita da Workers AI)
const MODELS = ["@cf/meta/llama-3.3-70b-instruct-fp8-fast", "@cf/meta/llama-3.1-8b-instruct"];

type AiBinding = { run: (model: string, input: Record<string, unknown>) => Promise<unknown> };
type Answers = { environment: string; budget: string; duration: string; occasion: string; period: string };


// Temas sorteados a cada criação: garantem variedade de verdade (a IA sozinha tende a repetir piquenique/cinema).
const THEMES: Record<Lang, Record<string, string[]>> = {
  pt: {
    home: ["cozinhar juntos um prato que nenhum dos dois nunca fez", "noite de jogos com um torneio e prêmio bobo", "spa caseiro com massagem, música e luz baixa", "cartas e memórias: reler mensagens antigas e fotos", "karaokê ou baile na sala", "arte a dois: pintar, desenhar o retrato um do outro ou montar um mural", "degustação às cegas de comidas ou chás", "faxina divertida e reorganizar um canto da casa juntos como projeto", "cápsula do tempo: escrever cartas para abrir daqui a um ano", "aula improvisada: um ensina ao outro algo que sabe", "cabana de cobertores com leitura em voz alta"],
    outdoors: ["caminhada com um objetivo (mirante, nascer ou pôr do sol)", "fotografar a cidade como turistas", "caça ao tesouro criada por um dos dois", "andar de bicicleta ou patins por um trajeto novo", "jogos de rua: frisbee, bola, badminton, corrida de brincadeira", "explorar um bairro ou uma praia que nunca visitaram", "desenhar ou escrever sentados num lugar bonito", "piquenique simples (só se combinar bem com o tempo)", "feira ou mercado ao ar livre para escolher ingredientes"],
    "go-out": ["bairro novo: caminhar sem pressa e escolher lugares por impulso", "museu, galeria ou exposição (grátis se possível)", "café ou padaria do bairro com um desafio de conversa", "mercado ou feira para escolher ingredientes e depois cozinhar", "mirante ou jardim da cidade", "livraria ou sebo: cada um escolhe um livro para o outro", "tour de petiscos baratos em vários lugares", "cinema ou teatro de bairro, ou sessão ao ar livre", "aula aberta, oficina ou evento gratuito da cidade", "passeio de transporte público até um ponto desconhecido"],
    any: ["uma mistura de casa e rua com um desafio divertido", "dia de primeiras vezes: fazer algo que nenhum dos dois nunca fez", "homenagem ao primeiro encontro de vocês", "projeto a dois que sobra como lembrança", "caça a pequenas tradições do casal"],
  },
  en: {
    home: ["cook a dish neither of you has made", "game night tournament with a silly prize", "home spa with massage, music and low light", "letters and memories: reread old messages and photos", "karaoke or dance night in the living room", "make art together: paint, draw each other or build a collage", "blind tasting of foods or teas", "tackle a small home project together", "time capsule: write letters to open in a year", "improvised class: each teaches the other something", "blanket fort with reading aloud"],
    outdoors: ["a walk with a goal (viewpoint, sunrise or sunset)", "photograph your city like tourists", "a treasure hunt made by one of you", "bike or skate a new route", "street games: frisbee, ball, badminton", "explore a neighborhood or beach you never visited", "sit somewhere beautiful and draw or write", "a simple picnic (only if it suits the weather)", "an open-air market to choose ingredients"],
    "go-out": ["a new neighborhood: wander and choose places on impulse", "a museum, gallery or exhibition (free if possible)", "a local cafe or bakery with a conversation challenge", "a market to pick ingredients, then cook", "a viewpoint or city garden", "a bookstore: each picks a book for the other", "a cheap snack crawl across several places", "a neighborhood cinema, theater or open-air screening", "a free open class, workshop or city event", "a public-transport trip to somewhere unknown"],
    any: ["a mix of home and town with a fun challenge", "a day of firsts: something neither has done", "a tribute to your first date", "a project for two that leaves a keepsake", "build a small couple tradition"],
  },
  es: {
    home: ["cocinar juntos un plato que ninguno haya hecho nunca", "noche de juegos con torneo y premio tonto", "spa casero con masaje, música y luz tenue", "cartas y recuerdos: releer mensajes antiguos y fotos", "karaoke o baile en el salón", "arte a dúo: pintar, dibujar el retrato del otro o montar un mural", "cata a ciegas de comidas o infusiones", "reorganizar un rincón de la casa juntos como proyecto", "cápsula del tiempo: escribir cartas para abrir dentro de un año", "clase improvisada: cada uno enseña al otro algo que sabe", "cabaña de mantas con lectura en voz alta"],
    outdoors: ["paseo con un objetivo (mirador, amanecer o atardecer)", "fotografiar la ciudad como turistas", "búsqueda del tesoro creada por uno de los dos", "ir en bici o en patines por una ruta nueva", "juegos de calle: frisbi, pelota, bádminton, carreritas de broma", "explorar un barrio o una playa que nunca hayáis visitado", "dibujar o escribir sentados en un lugar bonito", "pícnic sencillo (solo si encaja con el tiempo)", "mercadillo o feria al aire libre para elegir ingredientes"],
    "go-out": ["barrio nuevo: pasear sin prisa y elegir lugares por impulso", "museo, galería o exposición (gratis si es posible)", "café o panadería del barrio con un reto de conversación", "mercado o feria para elegir ingredientes y luego cocinar", "mirador o jardín de la ciudad", "librería o tienda de segunda mano: cada uno elige un libro para el otro", "ruta de tapas o pinchos baratos por varios sitios", "cine o teatro de barrio, o sesión al aire libre", "clase abierta, taller o evento gratuito de la ciudad", "viaje en transporte público hasta un punto desconocido"],
    any: ["una mezcla de casa y calle con un reto divertido", "día de primeras veces: hacer algo que ninguno de los dos haya hecho nunca", "homenaje a vuestra primera cita", "proyecto a dos que deje un recuerdo", "buscar pequeñas tradiciones de la pareja"],
  },
};
// Temas só para a noite (usados quando o casal escolhe "à noite").
const NIGHT_THEMES: Record<Lang, Record<string, string[]>> = {
  pt: {
    home: ["jantar à luz de velas feito juntos", "cinema em casa com cabana de cobertores e votação do filme", "baile na sala com a luz baixa", "noite de playlist: cada um escolhe músicas para o outro", "banho de espuma, massagem e música suave", "noite de estrelas da janela ou da varanda com histórias e um cobertor", "cartas e memórias à luz de velas", "degustação às cegas de chás ou sobremesas à noite"],
    outdoors: ["observar estrelas a olho nu, deitados numa manta num lugar seguro e sem muita luz", "caminhada à noite por ruas iluminadas e conhecidas", "mirante à noite para ver a cidade acesa", "sentar num banco de praça iluminado com um chá quente e conversar", "fotografar as luzes da cidade como turistas"],
    "go-out": ["jantar simples num lugar do bairro", "cinema ou teatro de bairro", "passeio pelas luzes da cidade com parada para um chá ou sobremesa", "petiscos de rua ao anoitecer", "música ao vivo num lugar tranquilo", "livraria ou café aberto à noite com um desafio de conversa"],
    any: ["uma noite de luz baixa, música e conversa sem celular", "noite de primeiras vezes em casa ou perto de casa", "homenagem ao primeiro encontro à noite"],
  },
  en: {
    home: ["a candlelit dinner cooked together", "movie night in a blanket fort with a vote", "a dance in the living room with low light", "a playlist night: each picks songs for the other", "a bubble bath, massage and soft music", "stargazing from the window or balcony with stories and a blanket", "letters and memories by candlelight", "blind tasting of teas or desserts at night"],
    outdoors: ["stargazing with the naked eye, lying on a blanket in a safe, dark-enough spot", "an evening walk through lit, familiar streets", "a viewpoint at night to see the city lit up", "sitting on a lit park bench with a hot tea and talking", "photographing the city lights like tourists"],
    "go-out": ["a simple dinner at a neighbourhood place", "a neighbourhood cinema or theatre", "a stroll through the city lights with a stop for tea or dessert", "street snacks at dusk", "live music at a quiet spot", "a bookshop or cafe open in the evening with a conversation challenge"],
    any: ["a low-light night with music and conversation, no phones", "a night of firsts at or near home", "a tribute to your first date, in the evening"],
  },
  es: {
    home: ["una cena a la luz de las velas cocinada juntos", "cine en casa con cabaña de mantas y votación de la peli", "baile en el salón con luz tenue", "noche de playlist: cada uno elige canciones para el otro", "baño de espuma, masaje y música suave", "noche de estrellas desde la ventana o el balcón con historias y una manta", "cartas y recuerdos a la luz de las velas", "cata a ciegas de infusiones o postres por la noche"],
    outdoors: ["mirar las estrellas a simple vista, tumbados en una manta en un sitio seguro y con poca luz", "paseo nocturno por calles iluminadas y conocidas", "mirador de noche para ver la ciudad encendida", "sentarse en un banco iluminado con una infusión caliente y charlar", "fotografiar las luces de la ciudad como turistas"],
    "go-out": ["una cena sencilla en un sitio del barrio", "cine o teatro de barrio", "paseo por las luces de la ciudad con parada para un té o un postre", "tapeo callejero al anochecer", "música en directo en un sitio tranquilo", "librería o café abierto por la noche con un reto de conversación"],
    any: ["una noche de luz tenue, música y conversación sin móvil", "noche de primeras veces en casa o cerca de casa", "homenaje a vuestra primera cita, por la noche"],
  },
};
const pick = <T,>(list: T[]) => list[Math.floor(Math.random() * list.length)];

let ready = false;
async function ensureTables() {
  if (ready) return;
  const db = env.DB;
  await db.exec("CREATE TABLE IF NOT EXISTS ai_ideas (id INTEGER PRIMARY KEY AUTOINCREMENT, combo TEXT NOT NULL, lang TEXT NOT NULL, title TEXT NOT NULL, body TEXT NOT NULL, created_at TEXT NOT NULL)");
  await db.exec("CREATE INDEX IF NOT EXISTS ai_ideas_combo ON ai_ideas (combo, lang)");
  await db.exec("CREATE TABLE IF NOT EXISTS ai_usage (day TEXT NOT NULL, who TEXT NOT NULL, n INTEGER NOT NULL DEFAULT 0, PRIMARY KEY (day, who))");
  ready = true;
}

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/\s+/g, " ").trim().slice(0, max) : "");
const BLOCK = /\b(droga|drogas|cocaína|maconha|marihuana|arma|armas|invadir|invasão|colarse|allanar|ilegal|perigos[oa]|peligros[oa]|bêbad[oa]|borrach[oa]|embriag|drugs?|weapon|trespass|illegal|dangerous|drunk)\b/i;
const BRANDS = /\b(sky ?map|star ?walk|stellarium|google|maps|spotify|netflix|youtube|instagram|tiktok|tinder|uber|airbnb|booking|ifood|whatsapp|pinterest|amazon|ikea|zara|starbucks|mcdonald'?s)\b/i; // nunca citamos apps ou marcas
const NIGHTWORDS = /(estrel|noite|noturn|escur|anoitec|luz de vela|luzes acesas|stars?\b|night|evening|dark|dusk|estrellas|noche|nocturn|anochec)/i;
const DAYWORDS = /(pôr do sol|por do sol|nascer do sol|sunset|sunrise|puesta de sol|amanecer|manhã|manana|morning)/i;
const PRICE = /(\d\s?(€|euros?|reais|usd|dólares|dollars)\b|r\$\s?\d|[€$]\s?\d)/i; // nunca mostramos valores inventados

async function sha(text: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].slice(0, 8).map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function usage(who: string, day: string) {
  const row = await env.DB.prepare("SELECT n FROM ai_usage WHERE day = ? AND who = ?").bind(day, who).first<{ n: number }>();
  return row?.n ?? 0;
}
async function bump(who: string, day: string) {
  await env.DB.prepare("INSERT INTO ai_usage (day, who, n) VALUES (?, ?, 1) ON CONFLICT(day, who) DO UPDATE SET n = n + 1").bind(day, who).run();
}

const L = {
  pt: {
    env: { home: "em casa", outdoors: "ao ar livre", "go-out": "saindo de casa, na cidade", any: "em qualquer lugar" },
    cost: { free: "ZERO: usar só o que já existe em casa ou lugares gratuitos", low: "baixo custo: gastar muito pouco, algo simples como um café, um lanche ou um item pequeno", more: "um pouco mais: um gasto pequeno e concreto que faz diferença (um prato especial, um ingresso, flores), sem luxo" },
    time: { hour: "cerca de 1 hora", afternoon: "uma tarde (3 a 5 horas)", day: "um dia inteiro (6 a 10 horas), com começo, meio e fim" },
    period: { any: "qualquer momento do dia", day: "DE DIA (nada de noite, estrelas ou luzes acesas)", night: "À NOITE (depois do pôr do sol; tudo acontece à noite, com segurança)" },
    occ: { casual: "encontro casual e leve", surprise: "uma surpresa: uma pessoa prepara em segredo para a outra, de forma simples e segura", reconnect: "reconectar: foco em conversa e atenção um ao outro, sem celular" },
  },
  en: {
    env: { home: "at home", outdoors: "outdoors", "go-out": "going out in town", any: "anywhere" },
    cost: { free: "ZERO: only things already at home or free places", low: "low cost: spend very little, something simple like a coffee, a snack or one small item", more: "a bit more: one small, concrete spend that makes a difference (a special dish, a ticket, flowers), no luxury" },
    time: { hour: "about 1 hour", afternoon: "an afternoon (3 to 5 hours)", day: "a full day (6 to 10 hours), with a beginning, middle and end" },
    period: { any: "any time of day", day: "DAYTIME (nothing at night, no stars or lights)", night: "EVENING/NIGHT (after sunset; everything happens at night, safely)" },
    occ: { casual: "a casual, light date", surprise: "a surprise: one person secretly prepares it for the other, simple and safe", reconnect: "reconnect: focus on conversation and attention, no phones" },
  },
  es: {
    env: { home: "en casa", outdoors: "al aire libre", "go-out": "saliendo de casa, por la ciudad", any: "en cualquier lugar" },
    cost: { free: "CERO: usar solo lo que ya hay en casa o lugares gratuitos", low: "bajo coste: gastar muy poco, algo sencillo como un café, un tentempié o un objeto pequeño", more: "un poco más: un gasto pequeño y concreto que marque la diferencia (un plato especial, una entrada, flores), sin lujos" },
    time: { hour: "alrededor de 1 hora", afternoon: "una tarde (de 3 a 5 horas)", day: "un día entero (de 6 a 10 horas), con principio, desarrollo y final" },
    period: { any: "cualquier momento del día", day: "DE DÍA (nada de noche, estrellas ni luces encendidas)", night: "DE NOCHE (después de la puesta de sol; todo ocurre de noche, con seguridad)" },
    occ: { casual: "una cita informal y ligera", surprise: "una sorpresa: una persona la prepara en secreto para la otra, de forma sencilla y segura", reconnect: "reconectar: centrarse en la conversación y en la atención mutua, sin móvil" },
  },
} as const;

function prompt(a: Answers, lang: Lang, avoid: string[], theme: string) {
  const l = L[lang];
  const env_ = l.env[a.environment as keyof typeof l.env];
  const cost = l.cost[a.budget as keyof typeof l.cost];
  const time = l.time[a.duration as keyof typeof l.time];
  const occ = l.occ[a.occasion as keyof typeof l.occ];
  if (lang === "pt") {
    return `Você cria UMA ideia de encontro para um casal, em português do Brasil, simples e realista, para uma marca chamada Simple & Romantic (romance acessível, momentos simples, pouco dinheiro).
Filtros do casal: lugar: ${env_}. Orçamento: ${cost}. Tempo: ${time}. Momento do dia: ${l.period[a.period as keyof typeof l.period]}. Clima: ${occ}.
TEMA desta ideia (siga-o): ${theme}.
Regras: respeite o orçamento e o tempo à risca; nada perigoso, ilegal, que dependa de álcool, de carro alugado, de reservas difíceis ou de invadir lugares; nada que exija comprar coisas caras; passos concretos e curtos; tom caloroso, sem exageros. O LUGAR é obrigatório: se for "saindo de casa", todos os passos acontecem fora de casa, a partir do primeiro; se for "ao ar livre", ao ar livre; se for "em casa", dentro de casa. Se o orçamento for "um pouco mais", inclua pelo menos um gasto concreto e pequeno que faça diferença. Se for ZERO, não gaste nada. NUNCA cite nomes de aplicativos, sites, lojas ou marcas (diga só "um app gratuito de mapa do céu", por exemplo, ou melhor, nem isso). NUNCA cite valores, moedas, números de preço nem a palavra "orçamento" no texto (só diga o que gastar, ex.: "um café"). NUNCA escreva horários numéricos (como "das 6 às 10"); descreva o ritmo com palavras (manhã, meio do dia, fim de tarde, noite). Não use piquenique nem parque se o tema não pedir. O plano B precisa ser específico e coerente com a ideia, em uma frase.${avoid.length ? ` NÃO repita estas ideias: ${avoid.join("; ")}.` : ""}
Responda SOMENTE com JSON válido, sem texto antes ou depois, neste formato exato:
{"title":"título curto e atraente","whyItFits":"1 ou 2 frases dizendo por que combina com os filtros","howTo":["passo 1","passo 2","passo 3","passo 4","passo 5"],"smallDetail":"um detalhe pequeno que faz a diferença","surprise":"só se o clima for surpresa: o que a pessoa prepara em segredo; senão vazio","planB":"uma alternativa curta se chover ou der errado"}
"howTo" deve ter de 4 a 7 passos.`;
  }
  if (lang === "es") {
    return `Creas UNA idea de cita para una pareja, en español de España (tuteando a una persona o hablando a "vosotros" cuando sean los dos), sencilla y realista, para una marca llamada Simple & Romantic (romance asequible, momentos sencillos, poco dinero).
Filtros de la pareja: lugar: ${env_}. Presupuesto: ${cost}. Tiempo: ${time}. Momento del día: ${l.period[a.period as keyof typeof l.period]}. Ambiente: ${occ}.
TEMA de esta idea (síguelo): ${theme}.
Reglas: respeta el presupuesto y el tiempo a rajatabla; nada peligroso, ilegal, que dependa del alcohol, de un coche de alquiler, de reservas difíciles o de colarse en sitios; nada que obligue a comprar cosas caras; pasos concretos y cortos; tono cálido, sin exagerar. El LUGAR es obligatorio: si es "saliendo de casa", todos los pasos ocurren fuera de casa, desde el primero; si es "al aire libre", al aire libre; si es "en casa", dentro de casa. Si el presupuesto es "un poco más", incluye al menos un gasto concreto y pequeño que marque la diferencia. Si es CERO, no gastéis nada. NUNCA cites nombres de aplicaciones, webs, tiendas ni marcas. NUNCA cites cantidades, monedas, precios ni la palabra "presupuesto" en el texto (di solo en qué gastar, p. ej. "un café"). NUNCA escribas horas numéricas (como "de 6 a 10"); describe el ritmo con palabras (mañana, mediodía, tarde, noche). No uses pícnic ni parque si el tema no lo pide. El plan B debe ser concreto y coherente con la idea, en una frase.${avoid.length ? ` NO repitas estas ideas: ${avoid.join("; ")}.` : ""}
Responde SOLO con JSON válido, sin texto antes ni después, con este formato exacto:
{"title":"título corto y atractivo","whyItFits":"1 o 2 frases que expliquen por qué encaja con los filtros","howTo":["paso 1","paso 2","paso 3","paso 4","paso 5"],"smallDetail":"un detalle pequeño que marca la diferencia","surprise":"solo si el ambiente es sorpresa: lo que la persona prepara en secreto; si no, vacío","planB":"una alternativa corta si llueve o sale mal"}
"howTo" debe tener entre 4 y 7 pasos.`;
  }
  return `You create ONE date idea for a couple, in English, simple and realistic, for a brand called Simple & Romantic (accessible romance, simple moments, little money).
Couple's filters: place: ${env_}. Budget: ${cost}. Time: ${time}. Time of day: ${l.period[a.period as keyof typeof l.period]}. Mood: ${occ}.
THEME of this idea (follow it): ${theme}.
Rules: respect the budget and time strictly; nothing dangerous, illegal, alcohol-dependent, needing a rental car, hard reservations or trespassing; nothing requiring expensive purchases; concrete short steps; warm tone, no exaggeration. The PLACE is mandatory: if "going out in town", every step including the first happens out of the house; if "outdoors", outdoors; if "at home", indoors. If the budget is "a bit more", include at least one small concrete spend that makes a difference. If ZERO, spend nothing. NEVER name apps, websites, shops or brands. NEVER quote prices, currencies, amounts or the word "budget" in the text (just say what to spend, e.g. "a coffee"). NEVER write clock times (like "6 to 10"); describe pace with words (morning, midday, late afternoon, evening). Do not use picnic or park unless the theme asks for it. Plan B must be specific and consistent with the idea, in one sentence.${avoid.length ? ` DO NOT repeat these ideas: ${avoid.join("; ")}.` : ""}
Reply ONLY with valid JSON, no text before or after, in this exact format:
{"title":"short appealing title","whyItFits":"1 or 2 sentences on why it fits the filters","howTo":["step 1","step 2","step 3","step 4","step 5"],"smallDetail":"one small detail that makes the difference","surprise":"only if mood is surprise: what the person secretly prepares; otherwise empty","planB":"a short alternative if it rains or goes wrong"}
"howTo" must have 4 to 7 steps.`;
}

function extractJson(raw: unknown): Record<string, unknown> | null {
  if (raw && typeof raw === "object") {
    const r = (raw as { response?: unknown }).response;
    if (r && typeof r === "object") return r as Record<string, unknown>;
    if (typeof r === "string") return extractJson(r);
    if ("title" in (raw as object)) return raw as Record<string, unknown>;
    return null;
  }
  if (typeof raw !== "string") return null;
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start < 0 || end <= start) return null;
  try { return JSON.parse(raw.slice(start, end + 1)); } catch { return null; }
}

function validate(obj: Record<string, unknown> | null, period = "any", duration = "afternoon"): Omit<IdeaResult, "id" | "badges" | "confirmBefore"> | null {
  if (!obj) return null;
  const title = clean(obj.title, 100);
  const whyItFits = clean(obj.whyItFits, 400);
  const smallDetail = clean(obj.smallDetail, 300);
  const howTo = Array.isArray(obj.howTo) ? obj.howTo.map((s) => clean(s, 260)).filter(Boolean) : [];
  if (!title || !whyItFits || !smallDetail || howTo.length < 3 || howTo.length > 8) return null;
  const all = [title, whyItFits, smallDetail, ...howTo, clean(obj.surprise, 300), clean(obj.planB, 260)].join(" ");
  if (BLOCK.test(all) || PRICE.test(all) || BRANDS.test(all)) return null;
  if ((period === "day" || (period === "any" && duration !== "hour")) && NIGHTWORDS.test(all)) return null; // sem noite quando é de dia
  if (period === "night" && DAYWORDS.test(all)) return null;
  const surprise = clean(obj.surprise, 300);
  const planB = clean(obj.planB, 260);
  return { title, whyItFits, smallDetail, howTo: howTo.slice(0, 7), ...(surprise ? { surprise } : {}), ...(planB ? { planB: { id: "ai-planb", title: planB } } : {}) };
}

async function generate(a: Answers, lang: Lang, avoid: string[]) {
  const concrete = a.environment === "any" ? pick(["home", "outdoors", "go-out"]) : a.environment;
  const themeSet = a.period === "night" ? NIGHT_THEMES : THEMES;
  const theme = pick(themeSet[lang][concrete] ?? themeSet[lang].any);
  const ai = (env as unknown as { AI?: AiBinding }).AI;
  if (!ai) return null;
  for (const model of MODELS) {
    try {
      const raw = await ai.run(model, { messages: [{ role: "user", content: prompt(a, lang, avoid, theme) }], max_tokens: 900, temperature: 0.95, top_p: 0.95 });
      const ok = validate(extractJson(raw), a.period, a.duration);
      if (ok) return ok;
    } catch (error) {
      console.error("Workers AI failed", model, error);
    }
  }
  return null;
}

const dur = { pt: { hour: "1 hora", afternoon: "uma tarde", day: "um dia" }, en: { hour: "1 hour", afternoon: "an afternoon", day: "a day" }, es: { hour: "1 hora", afternoon: "una tarde", day: "un día" } };
const costLabel = { free: "C0", low: "C1", more: "C2" } as Record<string, string>;
function toResult(id: string, body: Omit<IdeaResult, "id" | "badges" | "confirmBefore">, a: Answers, lang: Lang): IdeaResult {
  return { ...body, id, confirmBefore: false, aiGenerated: true, badges: [costLabel[a.budget] ?? "C0", (dur[lang] as Record<string, string>)[a.duration], a.environment] };
}

export async function POST(request: Request) {
  let a: Answers = { environment: "any", budget: "free", duration: "day", occasion: "casual", period: "any" };
  let lang: Lang = "pt";
  let exclude: string[] = [];
  try {
    const p = (await request.json()) as Record<string, unknown>;
    const env_ = clean(p.environment, 12), budget = clean(p.budget, 8), duration = clean(p.duration, 12), occasion = clean(p.occasion, 12);
    const period = p.period === undefined ? "any" : clean(p.period, 8);
    if (!ENVS.includes(env_) || !BUDGETS.includes(budget) || !DURATIONS.includes(duration) || !OCCASIONS.includes(occasion) || !PERIODS.includes(period)) {
      return NextResponse.json({ error: "Filtros inválidos." }, { status: 400 });
    }
    a = { environment: env_, budget, duration, occasion, period };
    lang = p.language === "en" ? "en" : p.language === "es" ? "es" : "pt";
    exclude = Array.isArray(p.exclude) ? p.exclude.map((x) => clean(x, 40)).filter(Boolean).slice(0, 30) : [];
  } catch {
    return NextResponse.json({ error: "Pedido inválido." }, { status: 400 });
  }

  const fallback = () => NextResponse.json({ status: "recommendation", result: staticIdea(a, lang, exclude), source: "static" });

  try {
    await ensureTables();
    const combo = `${a.environment}|${a.budget}|${a.duration}|${a.occasion}${a.period === "any" ? "" : `|${a.period}`}`;
    const day = new Date().toISOString().slice(0, 10);
    const who = await sha(request.headers.get("cf-connecting-ip") ?? "anon");

    type Row = { id: number; title: string; body: string };
    const rows: Row[] = (await env.DB.prepare("SELECT id, title, body FROM ai_ideas WHERE combo = ? AND lang = ? ORDER BY id DESC LIMIT 40").bind(combo, lang).all<Row>()).results ?? [];
    const fresh = rows.filter((r) => !exclude.includes(`ai-${r.id}`));
    const serveCached = () => {
      const r = fresh[Math.floor(Math.random() * fresh.length)];
      try {
        const body = JSON.parse(r.body);
        return NextResponse.json({ status: "recommendation", result: toResult(`ai-${r.id}`, body, a, lang), source: "bank" });
      } catch { return null; }
    };

    if (fresh.length && rows.length >= BANK_TARGET) {
      const cached = serveCached();
      if (cached) return cached;
    }

    const [mine, total] = await Promise.all([usage(who, day), usage("*", day)]);
    if (mine < PER_VISITOR_DAILY && total < GLOBAL_DAILY) {
      const avoid = [...rows.slice(0, 8).map((r) => r.title)];
      const body = await generate(a, lang, avoid);
      if (body) {
        const saved = await env.DB.prepare("INSERT INTO ai_ideas (combo, lang, title, body, created_at) VALUES (?, ?, ?, ?, ?)").bind(combo, lang, body.title, JSON.stringify(body), new Date().toISOString()).run();
        await Promise.all([bump(who, day), bump("*", day)]);
        const id = saved.meta?.last_row_id ?? Date.now();
        return NextResponse.json({ status: "recommendation", result: toResult(`ai-${id}`, body, a, lang), source: "ai" });
      }
    }

    if (fresh.length) {
      const cached = serveCached();
      if (cached) return cached;
    }
    return fallback();
  } catch (error) {
    console.error("Unable to create idea", error);
    return fallback();
  }
}
