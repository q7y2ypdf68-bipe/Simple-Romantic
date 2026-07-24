import { blogPosts } from "../blog/posts";

const siteUrl = "https://simple-and-romantic.brunolivercard2.chatgpt.site";
const lastModified = "2026-07-24";

const staticPages = [
  { path: "", frequency: "weekly", priority: "1.0" },
  { path: "/blog", frequency: "weekly", priority: "0.9" },
  { path: "/guia", frequency: "monthly", priority: "0.9" },
  { path: "/contato", frequency: "yearly", priority: "0.4" },
  { path: "/privacidade", frequency: "yearly", priority: "0.2" },
  { path: "/termos", frequency: "yearly", priority: "0.2" },
  { path: "/regras-da-comunidade", frequency: "yearly", priority: "0.3" },
];

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
  const pages = [
    ...staticPages.map((page) => ({
      url: `${siteUrl}${page.path}`,
      lastModified,
      frequency: page.frequency,
      priority: page.priority,
      image: null,
    })),
    ...blogPosts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified,
      frequency: "monthly",
      priority: "0.8",
      image: `${siteUrl}${post.image}`,
    })),
  ];

  const urls = pages.map((page) => `
  <url>
    <loc>${escapeXml(page.url)}</loc>
    <lastmod>${page.lastModified}</lastmod>
    <changefreq>${page.frequency}</changefreq>
    <priority>${page.priority}</priority>${page.image ? `
    <image:image>
      <image:loc>${escapeXml(page.image)}</image:loc>
    </image:image>` : ""}
  </url>`).join("");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${urls}
</urlset>
`;

  return new Response(body, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
