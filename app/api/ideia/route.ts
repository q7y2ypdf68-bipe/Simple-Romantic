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
const BANK_TARGET = 6; // quantas ideias guardar por combinação antes de só reaproveitar
const PER_VISITOR_DAILY = 12; // criações por visitante por dia
const GLOBAL_DAILY = 60; // criações por dia no site todo (cota gratuita da Workers AI)
const MODELS = ["@cf/meta/llama-3.3-70b-instruct-fp8-fast", "@cf/meta/llama-3.1-8b-instruct"];

type AiBinding = { run: (model: string, input: Record<string, unknown>) => Promise<unknown> };
type Answers = { environment: string; budget: string; duration: string; occasion: string };

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
const BLOCK = /\b(droga|drogas|cocaína|maconha|arma|armas|invadir|invasão|ilegal|perigos[oa]|bêbad[oa]|embriag|drugs?|weapon|trespass|illegal|dangerous|drunk)\b/i;

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

function prompt(a: Answers, lang: Lang, avoid: string[]) {
  const pt = lang === "pt";
  const env_ = { home: pt ? "em casa" : "at home", outdoors: pt ? "ao ar livre" : "outdoors", "go-out": pt ? "saindo de casa, na cidade" : "going out in town", any: pt ? "em qualquer lugar" : "anywhere" }[a.environment];
  const cost = { free: pt ? "ZERO reais/euros: usar só o que já existe em casa ou lugares gratuitos" : "ZERO money: only things already at home or free places", low: pt ? "baixo custo: até cerca de 15 euros no total para o casal" : "low cost: up to about 15 euros total for the couple", more: pt ? "um pouco mais: até cerca de 60 euros no total, sem luxo" : "a bit more: up to about 60 euros total, no luxury" }[a.budget];
  const time = { hour: pt ? "cerca de 1 hora" : "about 1 hour", afternoon: pt ? "uma tarde (3 a 5 horas)" : "an afternoon (3 to 5 hours)", day: pt ? "um dia inteiro (6 a 10 horas), com começo, meio e fim" : "a full day (6 to 10 hours), with a beginning, middle and end" }[a.duration];
  const occ = { casual: pt ? "encontro casual e leve" : "a casual, light date", surprise: pt ? "uma surpresa: uma pessoa prepara em segredo para a outra, de forma simples e segura" : "a surprise: one person secretly prepares it for the other, simple and safe", reconnect: pt ? "reconectar: foco em conversa e atenção um ao outro, sem celular" : "reconnect: focus on conversation and attention, no phones" }[a.occasion];
  if (pt) {
    return `Você cria UMA ideia de encontro para um casal, em português do Brasil, simples e realista, para uma marca chamada Simple & Romantic (romance acessível, momentos simples, pouco dinheiro).
Filtros do casal: lugar: ${env_}. Orçamento: ${cost}. Tempo: ${time}. Clima: ${occ}.
Regras: respeite o orçamento e o tempo à risca; nada perigoso, ilegal, que dependa de álcool, de carro alugado, de reservas difíceis ou de invadir lugares; nada que exija comprar coisas caras; passos concretos e curtos; tom caloroso, sem exageros.${avoid.length ? ` NÃO repita estas ideias: ${avoid.join("; ")}.` : ""}
Responda SOMENTE com JSON válido, sem texto antes ou depois, neste formato exato:
{"title":"título curto e atraente","whyItFits":"1 ou 2 frases dizendo por que combina com os filtros","howTo":["passo 1","passo 2","passo 3","passo 4","passo 5"],"smallDetail":"um detalhe pequeno que faz a diferença","surprise":"só se o clima for surpresa: o que a pessoa prepara em segredo; senão vazio","planB":"uma alternativa curta se chover ou der errado"}
"howTo" deve ter de 4 a 7 passos.`;
  }
  return `You create ONE date idea for a couple, in English, simple and realistic, for a brand called Simple & Romantic (accessible romance, simple moments, little money).
Couple's filters: place: ${env_}. Budget: ${cost}. Time: ${time}. Mood: ${occ}.
Rules: respect the budget and time strictly; nothing dangerous, illegal, alcohol-dependent, needing a rental car, hard reservations or trespassing; nothing requiring expensive purchases; concrete short steps; warm tone, no exaggeration.${avoid.length ? ` DO NOT repeat these ideas: ${avoid.join("; ")}.` : ""}
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

function validate(obj: Record<string, unknown> | null): Omit<IdeaResult, "id" | "badges" | "confirmBefore"> | null {
  if (!obj) return null;
  const title = clean(obj.title, 100);
  const whyItFits = clean(obj.whyItFits, 400);
  const smallDetail = clean(obj.smallDetail, 300);
  const howTo = Array.isArray(obj.howTo) ? obj.howTo.map((s) => clean(s, 260)).filter(Boolean) : [];
  if (!title || !whyItFits || !smallDetail || howTo.length < 3 || howTo.length > 8) return null;
  const all = [title, whyItFits, smallDetail, ...howTo, clean(obj.surprise, 300), clean(obj.planB, 260)].join(" ");
  if (BLOCK.test(all)) return null;
  const surprise = clean(obj.surprise, 300);
  const planB = clean(obj.planB, 260);
  return { title, whyItFits, smallDetail, howTo: howTo.slice(0, 7), ...(surprise ? { surprise } : {}), ...(planB ? { planB: { id: "ai-planb", title: planB } } : {}) };
}

async function generate(a: Answers, lang: Lang, avoid: string[]) {
  const ai = (env as unknown as { AI?: AiBinding }).AI;
  if (!ai) return null;
  for (const model of MODELS) {
    try {
      const raw = await ai.run(model, { messages: [{ role: "user", content: prompt(a, lang, avoid) }], max_tokens: 900, temperature: 0.8 });
      const ok = validate(extractJson(raw));
      if (ok) return ok;
    } catch (error) {
      console.error("Workers AI failed", model, error);
    }
  }
  return null;
}

const dur = { pt: { hour: "1 hora", afternoon: "uma tarde", day: "um dia" }, en: { hour: "1 hour", afternoon: "an afternoon", day: "a day" } };
const costLabel = { free: "C0", low: "C1", more: "C2" } as Record<string, string>;
function toResult(id: string, body: Omit<IdeaResult, "id" | "badges" | "confirmBefore">, a: Answers, lang: Lang): IdeaResult {
  return { ...body, id, confirmBefore: false, aiGenerated: true, badges: [costLabel[a.budget] ?? "C0", (dur[lang] as Record<string, string>)[a.duration], a.environment] };
}

export async function POST(request: Request) {
  let a: Answers = { environment: "any", budget: "free", duration: "day", occasion: "casual" };
  let lang: Lang = "pt";
  let exclude: string[] = [];
  try {
    const p = (await request.json()) as Record<string, unknown>;
    const env_ = clean(p.environment, 12), budget = clean(p.budget, 8), duration = clean(p.duration, 12), occasion = clean(p.occasion, 12);
    if (!ENVS.includes(env_) || !BUDGETS.includes(budget) || !DURATIONS.includes(duration) || !OCCASIONS.includes(occasion)) {
      return NextResponse.json({ error: "Filtros inválidos." }, { status: 400 });
    }
    a = { environment: env_, budget, duration, occasion };
    lang = p.language === "en" ? "en" : "pt";
    exclude = Array.isArray(p.exclude) ? p.exclude.map((x) => clean(x, 40)).filter(Boolean).slice(0, 30) : [];
  } catch {
    return NextResponse.json({ error: "Pedido inválido." }, { status: 400 });
  }

  const fallback = () => NextResponse.json({ status: "recommendation", result: staticIdea(a, lang, exclude), source: "static" });

  try {
    await ensureTables();
    const combo = `${a.environment}|${a.budget}|${a.duration}|${a.occasion}`;
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
