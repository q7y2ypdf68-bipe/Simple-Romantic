// Descobre, a partir da cidade informada, que tipos de lugar existem por perto (dados abertos do OpenStreetMap).
// Roda no navegador do visitante; nada é gravado no nosso servidor. Se qualquer passo falhar, não filtramos nada.
export type PlaceKind = "beach" | "park" | "nature" | "cinema" | "theatre" | "museum" | "gallery" | "bookshop" | "bowling" | "ferry" | "train" | "market";
export type PlaceInfo = { name: string; places: PlaceKind[]; at: number };

// "beach" = costa de mar por perto (raio maior). Prainhas de rio/lago marcadas no mapa não contam, para não sugerir mar no interior.
const QUERIES: Array<[PlaceKind, string, number?]> = [
  ["beach", '["natural"="coastline"]', 30000],
  ["park", '["leisure"~"^(park|garden)$"]'],
  ["nature", '["leisure"="nature_reserve"]'],
  ["cinema", '["amenity"="cinema"]'],
  ["theatre", '["amenity"~"^(theatre|arts_centre)$"]'],
  ["museum", '["tourism"="museum"]'],
  ["gallery", '["tourism"="gallery"]'],
  ["bookshop", '["shop"="books"]'],
  ["bowling", '["leisure"="bowling_alley"]'],
  ["ferry", '["amenity"="ferry_terminal"]'],
  ["train", '["railway"="station"]'],
  ["market", '["amenity"="marketplace"]'],
];
const KEY = "sr-place";
const RADIUS = 15000;
// Os servidores públicos do Overpass às vezes ficam ocupados: consultamos vários ao mesmo tempo e usamos o primeiro que responder bem.
const MIRRORS = ["https://overpass.openstreetmap.fr/api/interpreter", "https://overpass-api.de/api/interpreter", "https://z.overpass-api.de/api/interpreter"];

export function readPlace(): PlaceInfo | null {
  try {
    const raw = JSON.parse(window.localStorage.getItem(KEY) ?? "null");
    if (raw && typeof raw.name === "string" && Array.isArray(raw.places) && Date.now() - Number(raw.at) < 30 * 86400_000) return raw as PlaceInfo;
  } catch { /* sem cidade guardada */ }
  return null;
}
export function savePlace(info: PlaceInfo | null) {
  try { if (info) window.localStorage.setItem(KEY, JSON.stringify(info)); else window.localStorage.removeItem(KEY); } catch { /* vale só nesta visita */ }
}

async function timed(url: string, init: RequestInit | undefined, ms: number) {
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), ms);
  try { return await fetch(url, { ...init, signal: ctl.signal }); } finally { clearTimeout(timer); }
}

async function placesAround(lat: number, lon: number, name: string): Promise<PlaceInfo | null> {
  const body = `[out:json][timeout:15];${QUERIES.map(([, f, r]) => `(nwr${f}(around:${r ?? RADIUS},${lat},${lon}););out count;`).join("")}`;
  const counts = await Promise.any(MIRRORS.map(async (url) => {
    const res = await timed(url, { method: "POST", body: `data=${encodeURIComponent(body)}`, headers: { "Content-Type": "application/x-www-form-urlencoded" } }, 25000);
    if (!res.ok) throw new Error("mirror failed");
    const rows = ((await res.json()) as { elements?: Array<{ type: string; tags?: { total?: string } }> }).elements?.filter((e) => e.type === "count") ?? [];
    if (rows.length !== QUERIES.length) throw new Error("bad answer");
    return rows;
  }));
  const places = QUERIES.filter((_, i) => Number(counts[i]?.tags?.total ?? 0) > 0).map(([kind]) => kind);
  const info = { name, places, at: Date.now() };
  savePlace(info);
  return info;
}

// Devolve null se não achar a cidade ou se o serviço falhar (nesse caso o site funciona como antes).
export async function lookupPlace(city: string, lang: string): Promise<PlaceInfo | null> {
  const q = city.trim().slice(0, 80);
  if (q.length < 2) return null;
  try {
    const geo = await timed(`https://nominatim.openstreetmap.org/search?format=json&limit=1&accept-language=${encodeURIComponent(lang)}&q=${encodeURIComponent(q)}`, undefined, 8000);
    if (!geo.ok) return null;
    const hit = ((await geo.json()) as Array<{ lat: string; lon: string; display_name: string }>)[0];
    if (!hit) return null;
    const lat = Number(hit.lat), lon = Number(hit.lon);
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
    return await placesAround(lat, lon, hit.display_name.split(",").slice(0, 2).join(",").trim());
  } catch {
    return null;
  }
}

export type HereError = "denied" | "unavailable" | "timeout" | "map";

// Botão "Usar minha localização": o navegador pede permissão; as coordenadas só são usadas aqui, para consultar o mapa, e não são guardadas.
export async function lookupHere(lang: string): Promise<PlaceInfo | HereError> {
  let lat = 0, lon = 0;
  try {
    const pos = await new Promise<GeolocationPosition>((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 15000, maximumAge: 600000 }));
    lat = pos.coords.latitude; lon = pos.coords.longitude;
  } catch (error) {
    const code = (error as { code?: number })?.code;
    return code === 1 ? "denied" : code === 3 ? "timeout" : "unavailable";
  }
  let name = "";
  try {
    const rev = await timed(`https://nominatim.openstreetmap.org/reverse?format=json&zoom=10&accept-language=${encodeURIComponent(lang)}&lat=${lat}&lon=${lon}`, undefined, 8000);
    const j = (await rev.json()) as { address?: Record<string, string>; display_name?: string };
    const ad = j.address ?? {};
    name = [ad.city ?? ad.town ?? ad.village ?? ad.municipality ?? ad.county, ad.country].filter(Boolean).join(", ") || (j.display_name ?? "").split(",").slice(0, 2).join(",").trim();
  } catch { /* sem nome: usamos as coordenadas */ }
  try {
    return (await placesAround(lat, lon, name || `${lat.toFixed(2)}, ${lon.toFixed(2)}`)) ?? "map";
  } catch {
    return "map";
  }
}
