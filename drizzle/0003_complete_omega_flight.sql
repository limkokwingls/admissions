PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_students` (
	`id` text PRIMARY KEY NOT NULL,
	`no` integer NOT NULL,
	`surname` text NOT NULL,
	`names` text NOT NULL,
	`candidate_no` text,
	`phone_number` text NOT NULL,
	`status` text NOT NULL,
	`program_id` integer NOT NULL,
	`created_at` integer DEFAULT (unixepoch()),
	`updated_at` integer,
	FOREIGN KEY (`program_id`) REFERENCES `programs`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_students`("id", "no", "surname", "names", "candidate_no", "phone_number", "status", "program_id", "created_at", "updated_at") SELECT "id", "no", "surname", "names", "candidate_no", "phone_number", "status", "program_id", "created_at", "updated_at" FROM `students`;--> statement-breakpoint
DROP TABLE `students`;--> statement-breakpoint
ALTER TABLE `__new_students` RENAME TO `students`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE INDEX `surname_idx` ON `students` (`surname`);--> statement-breakpoint
CREATE INDEX `names_idx` ON `students` (`names`);--> statement-breakpoint
CREATE INDEX `candidate_no_idx` ON `students` (`candidate_no`);--> statement-breakpoint
CREATE INDEX `phone_number_idx` ON `students` (`phone_number`);