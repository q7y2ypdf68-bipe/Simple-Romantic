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
