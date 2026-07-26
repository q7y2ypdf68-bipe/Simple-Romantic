import { integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const communitySubmissions = sqliteTable("community_submissions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  kind: text("kind").notNull(),
  authorName: text("author_name"),
  email: text("email").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  location: text("location"),
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
  status: text("status").notNull().default("new"),
  createdAt: text("created_at").notNull(),
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
