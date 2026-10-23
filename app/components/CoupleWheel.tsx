"use client";

import { useEffect, useRef, useState } from "react";

type Lang = "pt" | "es" | "en";
type Item = { e: string; s: string; t: string };

const PATH = { pt: "/roleta", es: "/es/ruleta", en: "/en/wheel" } as const;

// 12 desafios neutros: servem para qualquer casal. A ordem alterna carinho, tarefa e diversão.
const ITEMS: Record<Lang, Item[]> = {
  pt: [
    { e: "💆", s: "Massagem completa", t: "Massagem completa de 10 minutos no seu par. Sem pressa, com óleo ou creme, e o celular longe." },
    { e: "🍽️", s: "Lavar a louça", t: "Lave toda a louça de hoje, sem reclamar e sem avisar que está fazendo." },
    { e: "🦶", s: "Massagem nos pés", t: "Massagem nos pés do seu par, 5 minutos em cada um. Quem recebe só relaxa." },
    { e: "💬", s: "3 elogios", t: "Diga 3 elogios sinceros ao seu par, olhando nos olhos." },
    { e: "🛁", s: "Banho com carinho", t: "Prepare um banho para o seu par: água na temperatura certa, toalha quentinha e nada de pressa." },
    { e: "🚿", s: "Limpar o banheiro", t: "Deixe o banheiro limpo e cheiroso hoje. O seu par só descobre quando entrar." },
    { e: "💃", s: "Dançar na sala", t: "Escolham uma música e dancem na sala, mesmo sem saber dançar." },
    { e: "🎬", s: "Filme e lanche", t: "Escolha o filme e o lanche da noite, e o seu par aceita sem discutir." },
    { e: "☕", s: "Café na cama", t: "Faça o café da manhã e leve até o seu par, na cama ou no sofá." },
    { e: "🧹", s: "Arrumar a casa", t: "Arrume a cama e a sala enquanto o seu par descansa." },
    { e: "🤗", s: "Cafuné", t: "Cafuné de 5 minutos no seu par, em silêncio ou ao som da música favorita dele(a)." },
    { e: "📵", s: "Sem celular", t: "30 minutos sem celular, só conversando, com um assunto escolhido pelo seu par." },
  ],
  es: [
    { e: "💆", s: "Masaje completo", t: "Masaje completo de 10 minutos a tu pareja. Sin prisa, con aceite o crema y el móvil lejos." },
    { e: "🍽️", s: "Fregar los platos", t: "Friega todos los platos de hoy, sin quejarte y sin avisar de que lo estás haciendo." },
    { e: "🦶", s: "Masaje de pies", t: "Masaje en los pies de tu pareja, 5 minutos en cada uno. Quien lo recibe solo se relaja." },
    { e: "💬", s: "3 cumplidos", t: "Dile a tu pareja 3 cumplidos sinceros, mirándole a los ojos." },
    { e: "🛁", s: "Baño con mimo", t: "Prepara un baño para tu pareja: agua a buena temperatura, toalla calentita y nada de prisa." },
    { e: "🚿", s: "Limpiar el baño", t: "Deja el cuarto de baño limpio y con buen olor. Tu pareja lo descubrirá al entrar." },
    { e: "💃", s: "Bailar en el salón", t: "Elegid una canción y bailad en el salón, aunque no sepáis bailar." },
    { e: "🎬", s: "Peli y picoteo", t: "Elige la película y el picoteo de la noche, y tu pareja acepta sin discutir." },
    { e: "☕", s: "Desayuno en la cama", t: "Prepara el desayuno y llévaselo a tu pareja, a la cama o al sofá." },
    { e: "🧹", s: "Ordenar la casa", t: "Ordena la cama y el salón mientras tu pareja descansa." },
    { e: "🤗", s: "Mimos en el pelo", t: "5 minutos de caricias en el pelo a tu pareja, en silencio o con su canción favorita." },
    { e: "📵", s: "Sin móvil", t: "30 minutos sin móvil, solo hablando, de un tema que elija tu pareja." },
  ],
  en: [
    { e: "💆", s: "Full massage", t: "Give your partner a 10-minute full massage. No rush, with oil or lotion, and phones far away." },
    { e: "🍽️", s: "Wash the dishes", t: "Wash all of today's dishes, without complaining or announcing it." },
    { e: "🦶", s: "Foot massage", t: "Massage your partner's feet, 5 minutes each. The one receiving only relaxes." },
    { e: "💬", s: "3 compliments", t: "Give your partner 3 sincere compliments, looking them in the eye." },
    { e: "🛁", s: "A caring bath", t: "Run a bath for your partner: the right temperature, a warm towel and no rush." },
    { e: "🚿", s: "Clean the bathroom", t: "Leave the bathroom clean and fresh. Your partner finds out when they walk in." },
    { e: "💃", s: "Dance at home", t: "Pick a song and dance in the living room, even if you can't dance." },
    { e: "🎬", s: "Movie and snacks", t: "Pick tonight's movie and snacks, and your partner agrees without arguing." },
    { e: "☕", s: "Breakfast in bed", t: "Make breakfast and bring it to your partner, in bed or on the sofa." },
    { e: "🧹", s: "Tidy up", t: "Make the bed and tidy the living room while your partner rests." },
    { e: "🤗", s: "Head strokes", t: "5 minutes of gentle head strokes for your partner, in silence or with their favorite song." },
    { e: "📵", s: "No phones", t: "30 minutes with no phones, just talking, on a topic your partner picks." },
  ],
};

const TEXT = {
  pt: { spin: "Girar a roleta", spinning: "Girando…", next: "Cumprido! Nova rodada", pass: "Passar (1 vez)", passUsed: "Você já passou nesta rodada.", challenge: "Seu desafio", shared: "Alguém mandou este desafio para você. Quer girar a sua?", wheelLabel: "Roleta do Casal com 12 desafios", share: "Compartilhar", copy: "Copiar link", copied: "Link copiado!", shareText: "A Roleta do Casal escolheu um desafio para a gente: “{x}”. Gire a sua:", hint: "Toque em girar e descubra o desafio de hoje." },
  es: { spin: "Girar la ruleta", spinning: "Girando…", next: "¡Hecho! Nueva ronda", pass: "Pasar (1 vez)", passUsed: "Ya has pasado en esta ronda.", challenge: "Tu reto", shared: "Alguien te ha enviado este reto. ¿Quieres girar el tuyo?", wheelLabel: "Ruleta de pareja con 12 retos", share: "Compartir", copy: "Copiar enlace", copied: "¡Enlace copiado!", shareText: "La Ruleta de pareja nos ha elegido un reto: «{x}». Gira la tuya:", hint: "Pulsa girar y descubre el reto de hoy." },
  en: { spin: "Spin the wheel", spinning: "Spinning…", next: "Done! New round", pass: "Pass (once)", passUsed: "You already passed this round.", challenge: "Your challenge", shared: "Someone sent you this challenge. Want to spin your own?", wheelLabel: "Couple's Wheel with 12 challenges", share: "Share", copy: "Copy link", copied: "Link copied!", shareText: "The Couple's Wheel picked a challenge for us: “{x}”. Spin yours:", hint: "Tap spin and find out today's challenge." },
} as const;

const COLORS = ["#ff7b6b", "#ffd45b", "#ed3f78", "#89d7ea"];
const SLICE = 30;
const point = (angle: number, radius: number) => {
  const rad = (angle * Math.PI) / 180;
  return [200 + radius * Math.sin(rad), 200 - radius * Math.cos(rad)] as const;
};
const slicePath = (index: number) => {
  const [x1, y1] = point(index * SLICE, 190);
  const [x2, y2] = point((index + 1) * SLICE, 190);
  return `M200 200 L${x1.toFixed(2)} ${y1.toFixed(2)} A190 190 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`;
};

function randomIndex(avoid: number | null) {
  let pick = 0;
  for (let tries = 0; tries < 8; tries += 1) {
    const buffer = new Uint32Array(1);
    if (typeof crypto !== "undefined" && crypto.getRandomValues) crypto.getRandomValues(buffer);
    else buffer[0] = Math.floor(Math.random() * 4294967295);
    pick = buffer[0] % ITEMS.pt.length;
    if (pick !== avoid) break;
  }
  return pick;
}

export function CoupleWheel({ lang }: { lang: Lang }) {
  const items = ITEMS[lang];
  const tt = TEXT[lang];
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [passes, setPasses] = useState(1);
  const [fromLink, setFromLink] = useState(false);
  const [note, setNote] = useState("");
  const [canShare, setCanShare] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const pending = useRef<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setReduceMotion(!!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches);
    setCanShare(typeof navigator !== "undefined" && typeof navigator.share === "function");
    try {
      const wanted = Number(new URLSearchParams(window.location.search).get("d"));
      if (Number.isInteger(wanted) && wanted >= 0 && wanted < items.length) {
        setResult(wanted);
        setFromLink(true);
        setRotation(360 - (wanted * SLICE + SLICE / 2));
      }
    } catch {}
    return () => { if (timer.current) clearTimeout(timer.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function finish() {
    if (pending.current === null) return;
    setResult(pending.current);
    pending.current = null;
    setSpinning(false);
  }

  function spin(isPass: boolean) {
    if (spinning) return;
    const reduce = reduceMotion;
    const index = randomIndex(result);
    const jitter = (Math.random() - 0.5) * (SLICE - 8);
    const target = (360 - (index * SLICE + SLICE / 2) + jitter + 360) % 360;
    const base = rotation - (rotation % 360);
    const next = base + 360 * 5 + target;
    if (isPass) setPasses(0); else setPasses(1);
    setFromLink(false);
    setNote("");
    setSpinning(true);
    pending.current = index;
    setRotation(next);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(finish, reduce ? 60 : 4700);
  }

  const shareUrl = (index: number) => `https://simpleandromantic.com${PATH[lang]}?d=${index}`;
  const shareText = (index: number) => tt.shareText.replace("{x}", items[index].t);
  async function share(index: number) {
    try { await navigator.share({ title: items[index].s, text: shareText(index), url: shareUrl(index) }); } catch {}
  }
  function whatsapp(index: number) {
    window.open(`https://wa.me/?text=${encodeURIComponent(`${shareText(index)} ${shareUrl(index)}`)}`, "_blank", "noopener");
  }
  async function copy(index: number) {
    try { await navigator.clipboard.writeText(`${shareText(index)} ${shareUrl(index)}`); setNote(tt.copied); setTimeout(() => setNote(""), 2500); } catch {}
  }

  return (
    <div className="wheel-box">
      <div className="wheel-stage">
        <div className="wheel-pointer" aria-hidden="true" />
        <svg className="wheel-svg" viewBox="0 0 400 400" role="img" aria-label={tt.wheelLabel}
          style={{ transform: `rotate(${rotation}deg)`, transition: spinning && !reduceMotion ? "transform 4.5s cubic-bezier(.12,.62,.08,1)" : "none" }}>
          <circle cx="200" cy="200" r="196" fill="#fff" />
          {items.map((item, index) => (
            <g key={item.s}>
              <path d={slicePath(index)} fill={COLORS[index % COLORS.length]} stroke="#fff" strokeWidth="3" />
              <text x={point(index * SLICE + SLICE / 2, 140)[0]} y={point(index * SLICE + SLICE / 2, 140)[1]} fontSize="34" textAnchor="middle" dominantBaseline="central"
                transform={`rotate(${index * SLICE + SLICE / 2} ${point(index * SLICE + SLICE / 2, 140)[0]} ${point(index * SLICE + SLICE / 2, 140)[1]})`}>{item.e}</text>
            </g>
          ))}
        </svg>
        <div className="wheel-hub" aria-hidden="true">♥</div>
      </div>

      <div className="wheel-result" aria-live="polite">
        {result === null ? (
          <p className="wheel-hint">{tt.hint}</p>
        ) : !spinning ? (
          <>
            {fromLink && <p className="wheel-shared">{tt.shared}</p>}
            <p className="eyebrow">{tt.challenge}</p>
            <h3><span aria-hidden="true">{items[result].e}</span> {items[result].s}</h3>
            <p>{items[result].t}</p>
          </>
        ) : <p className="wheel-hint">{tt.spinning}</p>}
      </div>

      <div className="wheel-actions">
        {result === null || fromLink ? (
          <button className="button primary" type="button" onClick={() => spin(false)} disabled={spinning}>{spinning ? tt.spinning : tt.spin}</button>
        ) : (
          <>
            <button className="button primary" type="button" onClick={() => spin(false)} disabled={spinning}>{tt.next}</button>
            <button className="button secondary" type="button" onClick={() => spin(true)} disabled={spinning || passes < 1} title={passes < 1 ? tt.passUsed : undefined}>{tt.pass}</button>
          </>
        )}
      </div>

      {result !== null && !spinning && (
        <div className="wheel-actions wheel-share">
          <button className="button secondary" type="button" onClick={() => whatsapp(result)} aria-label="WhatsApp">WhatsApp</button>
          {canShare && <button className="button secondary" type="button" onClick={() => share(result)}>{tt.share}</button>}
          <button className="button secondary" type="button" onClick={() => copy(result)}>{tt.copy}</button>
        </div>
      )}
      {note && <p className="wheel-note" role="status">{note}</p>}
    </div>
  );
}

export const WHEEL_ITEMS = ITEMS;
