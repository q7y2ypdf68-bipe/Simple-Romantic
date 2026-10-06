import { getVisiblePosts } from "../blog/posts-db";
import { getVisibleBlogPostsEs } from "../es/blog/posts-es";

const siteUrl = "https://simpleandromantic.com";
const staticPages = [
  { path: "", frequency: "weekly", priority: "1.0" },
  { path: "/blog", frequency: "weekly", priority: "0.9" },
  { path: "/loja", frequency: "monthly", priority: "0.6" },
  { path: "/guia", frequency: "monthly", priority: "0.9" },
  { path: "/entre-nos", frequency: "weekly", priority: "0.9" },
  { path: "/contato", frequency: "yearly", priority: "0.4" },
  { path: "/privacidade", frequency: "yearly", priority: "0.2" },
  { path: "/termos", frequency: "yearly", priority: "0.2" },
  { path: "/regras-da-comunidade", frequency: "yearly", priority: "0.3" },
  { path: "/es", frequency: "weekly", priority: "0.9" },
  { path: "/es/blog", frequency: "weekly", priority: "0.9" },
  { path: "/es/tienda", frequency: "monthly", priority: "0.6" },
  { path: "/es/guia", frequency: "monthly", priority: "0.9" },
  { path: "/es/comunidad", frequency: "monthly", priority: "0.6" },
  { path: "/es/entre-nos", frequency: "weekly", priority: "0.9" },
  { path: "/es/contacto", frequency: "yearly", priority: "0.4" },
  { path: "/es/privacidad", frequency: "yearly", priority: "0.2" },
  { path: "/es/terminos", frequency: "yearly", priority: "0.2" },
  { path: "/es/normas-de-la-comunidad", frequency: "yearly", priority: "0.3" },
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
  const blogPosts = await getVisiblePosts();
  const blogPostsEs = getVisibleBlogPostsEs();
  const pages = [
    ...staticPages.map((page) => ({
      url: `${siteUrl}${page.path}`,
      frequency: page.frequency,
      priority: page.priority,
      image: null,
    })),
    ...blogPosts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: post.publishedIso,
      frequency: "monthly",
      priority: "0.8",
      image: `${siteUrl}${post.image}`,
    })),
    ...blogPostsEs.map((post) => ({
      url: `${siteUrl}/es/blog/${post.slug}`,
      lastModified: post.publishedIso,
      frequency: "monthly",
      priority: "0.8",
      image: `${siteUrl}${post.image}`,
    })),
  ];

  const urls = pages.map((page) => `
  <url>
    <loc>${escapeXml(page.url)}</loc>
    ${page.lastModified ? `<lastmod>${page.lastModified}</lastmod>` : ""}
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
