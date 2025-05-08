CREATE TABLE `student_history` (
	`id` text PRIMARY KEY NOT NULL,
	`student_id` text NOT NULL,
	`action` text NOT NULL,
	`old_value` text,
	`new_value` text,
	`performed_by` text NOT NULL,
	`performed_at` integer DEFAULT (unixepoch()),
	FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `student_history_student_id_idx` ON `student_history` (`student_id`);--> statement-breakpoint
CREATE INDEX `student_history_action_idx` ON `student_history` (`action`);