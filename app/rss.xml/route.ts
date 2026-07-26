import { blogPosts } from "../blog/posts";

const siteUrl = "https://simple-and-romantic.brunolivercard2.chatgpt.site";

function escapeXml(value: string) {
  return value.replace(/[<>&'"]/g, (character) => ({
    "<": "&lt;",
    ">": "&gt;",
    "&": "&amp;",
    "'": "&apos;",
    "\"": "&quot;",
  })[character] || character);
}

export async function GET() {
  const items = blogPosts.map((post) => `<item>
    <title>${escapeXml(post.title)}</title>
    <link>${siteUrl}/blog/${post.slug}</link>
    <guid isPermaLink="true">${siteUrl}/blog/${post.slug}</guid>
    <description>${escapeXml(post.excerpt)}</description>
    <category>${escapeXml(post.category)}</category>
    <pubDate>${new Date(`${post.publishedIso || "2026-07-22"}T12:00:00Z`).toUTCString()}</pubDate>
  </item>`).join("");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blog Simple &amp; Romantic</title>
    <link>${siteUrl}/blog</link>
    <description>Ideias de encontros, surpresas e lugares bonitos para viver a dois sem gastar muito.</description>
    <language>pt-BR</language>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(body, {
    headers: {
      "content-type": "application/rss+xml; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
