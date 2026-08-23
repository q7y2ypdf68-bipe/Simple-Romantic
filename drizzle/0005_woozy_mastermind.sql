ALTER TABLE `listening_submissions` ADD `consent_version` text;--> statement-breakpoint
ALTER TABLE `listening_submissions` ADD `consent_at` text;--> statement-breakpoint
ALTER TABLE `listening_submissions` ADD `expires_at` text;--> statement-breakpoint
UPDATE `listening_submissions`
SET `consent_version` = 'legacy-2026-08-01',
    `consent_at` = `created_at`,
    `expires_at` = strftime('%Y-%m-%dT%H:%M:%fZ', `created_at`, '+180 days')
WHERE `expires_at` IS NULL;
