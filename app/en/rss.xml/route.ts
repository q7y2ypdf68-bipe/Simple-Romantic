import { getVisibleBlogPostsEn } from "../blog/posts-en";

const siteUrl = "https://simpleandromantic.com";
function escapeXml(value: string) { return value.replace(/[<>&'\"]/g, (character) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", "\"": "&quot;" })[character] || character); }

export async function GET() {
  const items = getVisibleBlogPostsEn().map((post) => `<item><title>${escapeXml(post.title)}</title><link>${siteUrl}/en/blog/${post.slug}</link><guid isPermaLink="true">${siteUrl}/en/blog/${post.slug}</guid><description>${escapeXml(post.excerpt)}</description><category>${escapeXml(post.category)}</category><pubDate>${new Date(`${post.publishedIso || "2026-10-06"}T12:00:00Z`).toUTCString()}</pubDate></item>`).join("");
  const body = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>Simple &amp; Romantic Blog</title><link>${siteUrl}/en/blog</link><description>Simple ideas for beautiful memories as a couple.</description><language>en</language><atom:link href="${siteUrl}/en/rss.xml" rel="self" type="application/rss+xml" />${items}</channel></rss>`;
  return new Response(body, { headers: { "content-type": "application/rss+xml; charset=utf-8", "cache-control": "public, max-age=3600" } });
}
