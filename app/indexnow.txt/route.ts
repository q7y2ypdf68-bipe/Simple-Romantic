// Chave pública do IndexNow (Bing, Yandex etc.). Não é segredo.
export async function GET() {
  return new Response("16b0bd6d58f766d40e4431401dab07d2", {
    headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600" },
  });
}
