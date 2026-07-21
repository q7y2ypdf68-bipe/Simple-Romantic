CREATE TABLE `community_submissions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`kind` text NOT NULL,
	`author_name` text,
	`email` text NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`location` text,
	`anonymous` integer DEFAULT false NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`created_at` text NOT NULL
);
