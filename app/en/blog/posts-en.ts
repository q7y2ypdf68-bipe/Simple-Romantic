import type { BlogPost } from "../../blog/posts";
import { posts as a } from "./parts/part-A";
import { posts as b } from "./parts/part-B";
import { posts as c } from "./parts/part-C";
import { posts as d } from "./parts/part-D";
import { posts as e } from "./parts/part-E";
import { posts as f } from "./parts/part-F";

// English translations of the Portuguese articles, same publication dates.
export const blogPostsEn: BlogPost[] = [...a, ...b, ...c, ...d, ...e, ...f].sort((x, y) => (y.publishedIso || "").localeCompare(x.publishedIso || ""));

export function getPostEn(slug: string) {
  return blogPostsEn.find((post) => post.slug === slug);
}

export function getVisibleBlogPostsEn(now = new Date()) {
  const today = new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Lisbon", year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
  return blogPostsEn.filter((post) => !post.publishedIso || post.publishedIso <= today);
}
