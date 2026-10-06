const siteUrl = "https://simpleandromantic.com";

export async function GET() {
  const body = [
    "User-agent: *",
    "Allow: /",
    "Disallow: /admin",
    "Disallow: /api/",
    "Disallow: /entre-nos/resposta",
    "Disallow: /es/entre-nos/respuesta",
    `Sitemap: ${siteUrl}/sitemap.xml`,
    `Host: ${siteUrl}`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
