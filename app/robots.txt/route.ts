const siteUrl = "https://simple-and-romantic.brunolivercard2.chatgpt.site";

export async function GET() {
  const body = [
    "User-agent: *",
    "Allow: /",
    "Disallow: /admin",
    "Disallow: /api/",
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
