CREATE TABLE `account` (
	`user_id` text NOT NULL,
	`type` text NOT NULL,
	`provider` text NOT NULL,
	`provider_account_id` text NOT NULL,
	`refresh_token` text,
	`access_token` text,
	`expires_at` integer,
	`token_type` text,
	`scope` text,
	`id_token` text,
	`session_state` text,
	PRIMARY KEY(`provider`, `provider_account_id`),
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `session` (
	`session_token` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`email` text,
	`email_verified` integer,
	`image` text,
	`role` text DEFAULT 'user' NOT NULL,
	`created_at` integer DEFAULT (unixepoch()),
	`updated_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE TABLE `student_info` (
	`id` text PRIMARY KEY NOT NULL,
	`student_id` text NOT NULL,
	`national_id` text NOT NULL,
	`reference` text,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone1` text NOT NULL,
	`phone2` text,
	`religion` text NOT NULL,
	`date_of_birth` integer NOT NULL,
	`gender` text NOT NULL,
	`marital_status` text NOT NULL,
	`birth_place` text NOT NULL,
	`home_town` text NOT NULL,
	`high_school` text NOT NULL,
	`next_of_kin_name` text NOT NULL,
	`next_of_kin_phone` text NOT NULL,
	`next_of_kin_relationship` text NOT NULL,
	`paid` integer DEFAULT false NOT NULL,
	`created_at` integer DEFAULT (unixepoch()),
	`updated_at` integer,
	FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `student_info_email_unique` ON `student_info` (`email`);--> statement-breakpoint
CREATE INDEX `student_email_idx` ON `student_info` (`email`);--> statement-breakpoint
CREATE INDEX `student_national_id_idx` ON `student_info` (`national_id`);--> statement-breakpoint
CREATE INDEX `student_name_idx` ON `student_info` (`name`);--> statement-breakpoint
CREATE TABLE `students` (
	`id` text PRIMARY KEY NOT NULL,
	`no` integer DEFAULT 0 NOT NULL,
	`surname` text NOT NULL,
	`names` text NOT NULL,
	`candidate_no` text,
	`receipt_no` text,
	`sponsor` text,
	`phone_number` text NOT NULL,
	`status` text NOT NULL,
	`accepted` integer DEFAULT false NOT NULL,
	`program_id` integer NOT NULL,
	`created_at` integer DEFAULT (unixepoch()),
	`updated_at` integer,
	FOREIGN KEY (`program_id`) REFERENCES `programs`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `surname_idx` ON `students` (`surname`);--> statement-breakpoint
CREATE INDEX `names_idx` ON `students` (`names`);--> statement-breakpoint
CREATE INDEX `candidate_no_idx` ON `students` (`candidate_no`);--> statement-breakpoint
CREATE INDEX `receipt_no_idx` ON `students` (`receipt_no`);--> statement-breakpoint
CREATE INDEX `phone_number_idx` ON `students` (`phone_number`);--> statement-breakpoint
CREATE TABLE `faculties` (
	`id` integer PRIMARY KEY NOT NULL,
	`code` text NOT NULL,
	`name` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()),
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `programs` (
	`id` integer PRIMARY KEY NOT NULL,
	`code` text NOT NULL,
	`name` text NOT NULL,
	`level` text NOT NULL,
	`faculty_id` integer NOT NULL,
	`created_at` integer DEFAULT (unixepoch()),
	`updated_at` integer,
	FOREIGN KEY (`faculty_id`) REFERENCES `faculties`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `properties` (
	`id` text PRIMARY KEY NOT NULL,
	`acceptance_fee` real NOT NULL,
	`acceptance_deadline` text NOT NULL,
	`registration_date_from` text NOT NULL,
	`registration_date_to` text NOT NULL,
	`private_payment_date` text
);
--> statement-breakpoint
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
CREATE INDEX `page_visits_student_id_idx` ON `page_visits` (`student_id`);--> statement-breakpoint
CREATE TABLE `student_history` (
	`id` text PRIMARY KEY NOT NULL,
	`student_id` text NOT NULL,
	`action` text NOT NULL,
	`old_value` text,
	`new_value` text,
	`performed_by` text NOT NULL,
	`performed_at` integer DEFAULT (unixepoch()),
	FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`performed_by`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `student_history_student_id_idx` ON `student_history` (`student_id`);--> statement-breakpoint
CREATE INDEX `student_history_action_idx` ON `student_history` (`action`);--> statement-breakpoint
CREATE TABLE `calls` (
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
CREATE INDEX `calls_student_id_idx` ON `calls` (`student_id`);--> statement-breakpoint
CREATE TABLE `name_changes` (
	`id` text PRIMARY KEY NOT NULL,
	`student_id` text NOT NULL,
	`old_name` text,
	`new_name` text,
	`changed_at` integer DEFAULT (unixepoch()),
	FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON UPDATE no action ON DELETE cascade
);
