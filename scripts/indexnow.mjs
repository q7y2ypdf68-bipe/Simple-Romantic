// Avisa Bing, Yandex etc. (IndexNow) das URLs do sitemap. Uso: node scripts/indexnow.mjs [--url URL ...]
// O Google não participa do IndexNow; para ele vale o sitemap + Inspeção de URL.
const SITE = "https://simple-and-romantic.simple-and-romantic.workers.dev";
const KEY = "16b0bd6d58f766d40e4431401dab07d2";
const extra = process.argv.slice(2).filter((a) => a.startsWith("http"));
const xml = await (await fetch(SITE + "/sitemap.xml")).text();
const urls = [...new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]).concat(extra))];
const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: new URL(SITE).host, key: KEY, keyLocation: SITE + "/indexnow.txt", urlList: urls }),
});
console.log(res.status, urls.length + " URLs enviadas");
