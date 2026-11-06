import { getVisiblePosts } from "../blog/posts-db";
import { getVisiblePostsLang } from "../blog/posts-db";
import { articleTranslations } from "../blog/translations";

const siteUrl = "https://simpleandromantic.com";
const staticPages = [
  { path: "", frequency: "weekly", priority: "1.0" },
  { path: "/blog", frequency: "weekly", priority: "0.9" },
  { path: "/loja", frequency: "monthly", priority: "0.6" },
  { path: "/guia", frequency: "monthly", priority: "0.9" },
  { path: "/roleta", frequency: "monthly", priority: "0.7" },
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
  { path: "/es/ruleta", frequency: "monthly", priority: "0.7" },
  { path: "/es/entre-nos", frequency: "weekly", priority: "0.9" },
  { path: "/es/contacto", frequency: "yearly", priority: "0.4" },
  { path: "/es/privacidad", frequency: "yearly", priority: "0.2" },
  { path: "/es/terminos", frequency: "yearly", priority: "0.2" },
  { path: "/es/normas-de-la-comunidad", frequency: "yearly", priority: "0.3" },
  { path: "/en", frequency: "weekly", priority: "0.9" },
  { path: "/en/blog", frequency: "weekly", priority: "0.9" },
  { path: "/en/shop", frequency: "monthly", priority: "0.6" },
  { path: "/en/guide", frequency: "monthly", priority: "0.9" },
  { path: "/en/community", frequency: "monthly", priority: "0.6" },
  { path: "/en/wheel", frequency: "monthly", priority: "0.7" },
  { path: "/en/between-us", frequency: "weekly", priority: "0.9" },
  { path: "/en/contact", frequency: "yearly", priority: "0.4" },
  { path: "/en/privacy", frequency: "yearly", priority: "0.2" },
  { path: "/en/terms", frequency: "yearly", priority: "0.2" },
  { path: "/en/community-guidelines", frequency: "yearly", priority: "0.3" },
];

// Groups of the same page in the three languages (for hreflang).
const pageGroups: Array<{ pt: string; es: string; en: string }> = [
  { pt: "", es: "/es", en: "/en" },
  { pt: "/blog", es: "/es/blog", en: "/en/blog" },
  { pt: "/loja", es: "/es/tienda", en: "/en/shop" },
  { pt: "/guia", es: "/es/guia", en: "/en/guide" },
  { pt: "/roleta", es: "/es/ruleta", en: "/en/wheel" },
  { pt: "/entre-nos", es: "/es/entre-nos", en: "/en/between-us" },
  { pt: "/contato", es: "/es/contacto", en: "/en/contact" },
  { pt: "/privacidade", es: "/es/privacidad", en: "/en/privacy" },
  { pt: "/termos", es: "/es/terminos", en: "/en/terms" },
  { pt: "/regras-da-comunidade", es: "/es/normas-de-la-comunidad", en: "/en/community-guidelines" },
];

function alternatesFor(url: string): string[] | null {
  const path = url.replace(siteUrl, "");
  let row: { pt: string; es: string; en: string } | undefined = pageGroups.find((g) => g.pt === path || g.es === path || g.en === path);
  if (!row) {
    const m = path.match(/^(?:\/(es|en))?\/blog\/(.+)$/);
    if (m) {
      const lang = (m[1] ?? "pt") as "pt" | "es" | "en";
      const t = articleTranslations.find((r) => r[lang] === m[2]);
      if (t) row = { pt: `/blog/${t.pt}`, es: `/es/blog/${t.es}`, en: `/en/blog/${t.en}` };
    }
  }
  if (!row) return null;
  const link = (hl: string, p: string) => `<xhtml:link rel="alternate" hreflang="${hl}" href="${escapeXml(siteUrl + p)}"/>`;
  return [link("pt-BR", row.pt), link("es-ES", row.es), link("en", row.en), link("x-default", row.pt)];
}

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
  const blogPostsEs = await getVisiblePostsLang("es");
  const blogPostsEn = await getVisiblePostsLang("en");
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
    ...blogPostsEn.map((post) => ({
      url: `${siteUrl}/en/blog/${post.slug}`,
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
    <priority>${page.priority}</priority>${(alternatesFor(page.url) ?? []).map((l) => `
    ${l}`).join("")}${page.image ? `
    <image:image>
      <image:loc>${escapeXml(page.image)}</image:loc>
    </image:image>` : ""}
  </url>`).join("");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}
</urlset>
`;

  return new Response(body, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
