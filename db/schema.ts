import { integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const communitySubmissions = sqliteTable("community_submissions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  kind: text("kind").notNull(),
  authorName: text("author_name"),
  email: text("email").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  location: text("location"),
  language: text("language").notNull().default("pt-BR"),
  anonymous: integer("anonymous", { mode: "boolean" }).notNull().default(false),
  status: text("status").notNull().default("pending"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at"),
  publishedAt: text("published_at"),
});

export const guideSubscribers = sqliteTable("guide_subscribers", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  language: text("language").notNull().default("pt-BR"),
  status: text("status").notNull().default("subscribed"),
  consentAt: text("consent_at").notNull(),
  createdAt: text("created_at").notNull(),
});

export const contactRequests = sqliteTable("contact_requests", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name"),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  language: text("language").notNull().default("pt-BR"),
  status: text("status").notNull().default("new"),
  createdAt: text("created_at").notNull(),
});

export const listeningSubmissions = sqliteTable("listening_submissions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  accessCode: text("access_code").notNull().unique(),
  alias: text("alias"),
  need: text("need").notNull(),
  message: text("message").notNull(),
  language: text("language").notNull().default("pt-BR"),
  publicationConsent: integer("publication_consent", { mode: "boolean" }).notNull().default(false),
  consentVersion: text("consent_version"),
  consentAt: text("consent_at"),
  status: text("status").notNull().default("new"),
  response: text("response"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at"),
  respondedAt: text("responded_at"),
  expiresAt: text("expires_at"),
});

export const analyticsDaily = sqliteTable("analytics_daily", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  day: text("day").notNull(),
  path: text("path").notNull(),
  source: text("source").notNull().default("Direto"),
  views: integer("views").notNull().default(0),
}, (table) => [
  uniqueIndex("analytics_daily_day_path_source_unique").on(table.day, table.path, table.source),
]);

export const blogPosts = sqliteTable("blog_posts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  language: text("language").notNull().default("pt-BR"),
  title: text("title").notNull(),
  seoTitle: text("seo_title"),
  excerpt: text("excerpt").notNull(),
  category: text("category").notNull(),
  series: text("series"),
  image: text("image").notNull().default(""),
  imageAlt: text("image_alt").notNull().default(""),
  published: text("published").notNull().default(""),
  publishedIso: text("published_iso"),
  readTime: text("read_time").notNull().default(""),
  intro: text("intro").notNull().default("[]"),
  sections: text("sections").notNull().default("[]"),
  contentNoticeLabel: text("content_notice_label"),
  contentNoticeText: text("content_notice_text"),
  status: text("status").notNull().default("published"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at"),
});

export const blogImages = sqliteTable("blog_images", {
  id: text("id").primaryKey(),
  contentType: text("content_type").notNull(),
  data: text("data").notNull(),
  filename: text("filename"),
  createdAt: text("created_at").notNull(),
});

export const adminLoginAttempts = sqliteTable("admin_login_attempts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  ip: text("ip").notNull(),
  createdAt: text("created_at").notNull(),
});
