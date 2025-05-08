CREATE TABLE `letter_downloads` (
	`id` text PRIMARY KEY NOT NULL,
	`student_id` text NOT NULL,
	`download_count` integer DEFAULT 1 NOT NULL,
	`last_downloaded_at` integer DEFAULT (unixepoch()),
	`created_at` integer DEFAULT (unixepoch()),
	FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `letter_downloads_student_id_idx` ON `letter_downloads` (`student_id`);--> statement-breakpoint
CREATE TABLE `page_visits` (
	`id` text PRIMARY KEY NOT NULL,
	`student_id` text NOT NULL,
	`visit_count` integer DEFAULT 1 NOT NULL,
	`last_visited_at` integer DEFAULT (unixepoch()),
	`created_at` integer DEFAULT (unixepoch()),
	FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `page_visits_student_id_idx` ON `page_visits` (`student_id`);