CREATE TABLE IF NOT EXISTS `blog_posts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`language` text DEFAULT 'pt-BR' NOT NULL,
	`title` text NOT NULL,
	`seo_title` text,
	`excerpt` text NOT NULL,
	`category` text NOT NULL,
	`series` text,
	`image` text DEFAULT '' NOT NULL,
	`image_alt` text DEFAULT '' NOT NULL,
	`published` text DEFAULT '' NOT NULL,
	`published_iso` text,
	`read_time` text DEFAULT '' NOT NULL,
	`intro` text DEFAULT '[]' NOT NULL,
	`sections` text DEFAULT '[]' NOT NULL,
	`content_notice_label` text,
	`content_notice_text` text,
	`status` text DEFAULT 'published' NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text
);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS `blog_posts_slug_unique` ON `blog_posts` (`slug`);--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `blog_images` (
	`id` text PRIMARY KEY NOT NULL,
	`content_type` text NOT NULL,
	`data` text NOT NULL,
	`filename` text,
	`created_at` text NOT NULL
);--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `admin_login_attempts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`ip` text NOT NULL,
	`created_at` text NOT NULL
);
