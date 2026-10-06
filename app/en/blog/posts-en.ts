import type { BlogPost } from "../../blog/posts";

// English articles. Translations are added a few at a time; slugs are in English.
export const blogPostsEn: BlogPost[] = [];

export function getPostEn(slug: string) {
  return blogPostsEn.find((post) => post.slug === slug);
}

export function getVisibleBlogPostsEn(now = new Date()) {
  const today = new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Lisbon", year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
  return blogPostsEn.filter((post) => !post.publishedIso || post.publishedIso <= today);
}
