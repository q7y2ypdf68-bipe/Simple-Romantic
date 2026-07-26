CREATE TABLE `analytics_daily` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`day` text NOT NULL,
	`path` text NOT NULL,
	`source` text DEFAULT 'Direto' NOT NULL,
	`views` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `analytics_daily_day_path_source_unique` ON `analytics_daily` (`day`,`path`,`source`);