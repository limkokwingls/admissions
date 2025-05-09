CREATE TABLE `calls` (
	`id` text PRIMARY KEY NOT NULL,
	`student_id` text NOT NULL,
	`call_count` integer DEFAULT 1 NOT NULL,
	`called_by` text NOT NULL,
	`last_call_at` integer DEFAULT (unixepoch()),
	`created_at` integer DEFAULT (unixepoch()),
	FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`called_by`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `calls_student_id_idx` ON `calls` (`student_id`);