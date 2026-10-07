// Céu real calculado no navegador/servidor (astronomy-engine, MIT). Zodíaco tropical. Tudo vem do cálculo: nenhuma data é inventada.
import * as A from "astronomy-engine";

export const signIndexOf = (longitude) => Math.floor((((longitude % 360) + 360) % 360) / 30);
const noon = (y, m, d) => new Date(Date.UTC(y, m - 1, d, 12));
const lonOf = (body, time) => (body === "Moon" ? A.EclipticGeoMoon(time).lon : A.Ecliptic(A.GeoVector(body, time, true)).elon);
const retroAt = (time) => {
  const next = new Date(time.getTime() + 86400000);
  return ((lonOf("Mercury", next) - lonOf("Mercury", time) + 540) % 360) - 180 < 0;
};
const phaseIndex = (degrees) => Math.floor(((degrees + 22.5) % 360) / 45); // 0 nova, 1 crescente, 2 quarto crescente, 3 gibosa crescente, 4 cheia, 5 gibosa minguante, 6 quarto minguante, 7 minguante

// Dia civil (y, m, d): fotografia do céu ao meio-dia (UTC).
export function skyForDay(y, m, d) {
  const t = noon(y, m, d);
  const before = new Date(t.getTime() - 86400000);
  const retro = retroAt(t), retroBefore = retroAt(before);
  const start = new Date(Date.UTC(y, m - 1, d, 0)), end = new Date(Date.UTC(y, m - 1, d + 1, 0));
  const quarter = A.SearchMoonQuarter(start);
  const event = quarter.time.date < end ? { kind: ["new", "first", "full", "last"][quarter.quarter], sign: signIndexOf(A.EclipticGeoMoon(quarter.time).lon) } : null;
  return {
    moon: signIndexOf(lonOf("Moon", t)),
    phase: phaseIndex(A.MoonPhase(t)),
    event,
    mercury: { sign: signIndexOf(lonOf("Mercury", t)), retro, station: retro && !retroBefore ? "retro" : !retro && retroBefore ? "direct" : null },
    venus: signIndexOf(lonOf("Venus", t)),
    mars: signIndexOf(lonOf("Mars", t)),
    sun: signIndexOf(lonOf("Sun", t)),
  };
}

// ---- Períodos maiores (semana, mês, 12 meses): tudo calculado, nenhuma data inventada ----
const dayParts = (y, m, d, add) => { const t = new Date(Date.UTC(y, m - 1, d + add)); return [t.getUTCFullYear(), t.getUTCMonth() + 1, t.getUTCDate()]; };
const stamp = (parts) => ({ y: parts[0], m: parts[1], d: parts[2] });

// Primeiro dia de cada mudança de signo de um planeta lento.
function ingresses(body, y, m, d, days) {
  const list = [];
  let last = signIndexOf(lonOf(body, noon(y, m, d)));
  for (let k = 1; k < days; k += 1) {
    const p = dayParts(y, m, d, k);
    const sign = signIndexOf(lonOf(body, noon(...p)));
    if (sign !== last) { if (!list.length || list[list.length - 1].sign !== sign) list.push({ sign, ...stamp(p) }); last = sign; }
  }
  return list;
}

export function periodSky(kind, y, m, d) {
  let start, days;
  if (kind === "week") { start = [y, m, d]; days = 7; }
  else if (kind === "month") { start = [y, m, 1]; days = new Date(Date.UTC(y, m, 0)).getUTCDate(); }
  else { start = [y, m, d]; days = 365; }
  const list = [];
  for (let k = 0; k < days; k += 1) list.push({ ...stamp(dayParts(...start, k)), sky: skyForDay(...dayParts(...start, k)) });
  const events = list.filter((item) => item.sky.event).map((item) => ({ ...stamp([item.y, item.m, item.d]), ...item.sky.event }));
  const retro = [];
  let open = null;
  for (const item of list) {
    if (item.sky.mercury.retro && !open) open = { from: stamp([item.y, item.m, item.d]), to: null };
    if (!item.sky.mercury.retro && open) { open.to = stamp([item.y, item.m, item.d]); retro.push(open); open = null; }
  }
  if (open) retro.push(open);
  const result = { kind, start: stamp(start), days, list, events, retro, first: list[0].sky, last: list[list.length - 1].sky };
  if (kind === "year") {
    const end = new Date(Date.UTC(...dayParts(...start, days)));
    const eclipses = [];
    let lunar = A.SearchLunarEclipse(noon(...start));
    while (lunar.peak.date < end) { eclipses.push({ type: "lunar", ...stamp([lunar.peak.date.getUTCFullYear(), lunar.peak.date.getUTCMonth() + 1, lunar.peak.date.getUTCDate()]) }); lunar = A.NextLunarEclipse(lunar.peak); }
    let solar = A.SearchGlobalSolarEclipse(noon(...start));
    while (solar.peak.date < end) { eclipses.push({ type: "solar", ...stamp([solar.peak.date.getUTCFullYear(), solar.peak.date.getUTCMonth() + 1, solar.peak.date.getUTCDate()]) }); solar = A.NextGlobalSolarEclipse(solar.peak); }
    result.eclipses = eclipses.sort((x, y2) => (x.y - y2.y) || (x.m - y2.m) || (x.d - y2.d));
    result.jupiter = { sign: signIndexOf(lonOf("Jupiter", noon(...start))), ingress: ingresses("Jupiter", ...start, days) };
    result.saturn = { sign: signIndexOf(lonOf("Saturn", noon(...start))), ingress: ingresses("Saturn", ...start, days) };
  }
  return result;
}
