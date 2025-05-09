PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_calls` (
	`id` text PRIMARY KEY NOT NULL,
	`student_id` text NOT NULL,
	`call_count` integer,
	`called_by` text,
	`status` text DEFAULT 'pending' NOT NULL,
	`last_call_at` integer,
	`created_at` integer DEFAULT (unixepoch()),
	FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`called_by`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_calls`("id", "student_id", "call_count", "called_by", "status", "last_call_at", "created_at") SELECT "id", "student_id", "call_count", "called_by", "status", "last_call_at", "created_at" FROM `calls`;--> statement-breakpoint
DROP TABLE `calls`;--> statement-breakpoint
ALTER TABLE `__new_calls` RENAME TO `calls`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE INDEX `calls_student_id_idx` ON `calls` (`student_id`);