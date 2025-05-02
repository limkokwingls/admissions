CREATE TABLE `properties` (
	`id` text PRIMARY KEY DEFAULT '2025' NOT NULL,
	`acceptance_fee` real NOT NULL,
	`acceptance_deadline` integer NOT NULL,
	`registration_date` integer NOT NULL,
	`orientation_date` integer NOT NULL
);
--> statement-breakpoint
DROP INDEX "users_email_unique";--> statement-breakpoint
ALTER TABLE `students` ALTER COLUMN "candidate_no" TO "candidate_no" text;--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);