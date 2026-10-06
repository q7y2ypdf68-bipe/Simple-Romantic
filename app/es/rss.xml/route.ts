import { getVisibleBlogPostsEs } from "../blog/posts-es";

const siteUrl = "https://simpleandromantic.com";
function escapeXml(value: string) { return value.replace(/[<>&'\"]/g, (character) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", "\"": "&quot;" })[character] || character); }

export async function GET() {
  const items = getVisibleBlogPostsEs().map((post) => `<item><title>${escapeXml(post.title)}</title><link>${siteUrl}/es/blog/${post.slug}</link><guid isPermaLink="true">${siteUrl}/es/blog/${post.slug}</guid><description>${escapeXml(post.excerpt)}</description><category>${escapeXml(post.category)}</category><pubDate>${new Date(`${post.publishedIso || "2026-07-22"}T12:00:00Z`).toUTCString()}</pubDate></item>`).join("");
  const body = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>Blog Simple &amp; Romantic en español</title><link>${siteUrl}/es/blog</link><description>Ideas sencillas para crear recuerdos bonitos en pareja.</description><language>es-ES</language><atom:link href="${siteUrl}/es/rss.xml" rel="self" type="application/rss+xml" />${items}</channel></rss>`;
  return new Response(body, { headers: { "content-type": "application/rss+xml; charset=utf-8", "cache-control": "public, max-age=3600" } });
}
