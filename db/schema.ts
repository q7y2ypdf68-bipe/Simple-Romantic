import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

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
