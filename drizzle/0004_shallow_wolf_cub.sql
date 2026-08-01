CREATE TABLE `listening_submissions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`access_code` text NOT NULL,
	`alias` text,
	`need` text NOT NULL,
	`message` text NOT NULL,
	`publication_consent` integer DEFAULT false NOT NULL,
	`status` text DEFAULT 'new' NOT NULL,
	`response` text,
	`created_at` text NOT NULL,
	`updated_at` text,
	`responded_at` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `listening_submissions_access_code_unique` ON `listening_submissions` (`access_code`);