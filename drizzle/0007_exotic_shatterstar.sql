DROP INDEX "users_email_unique";--> statement-breakpoint
DROP INDEX "surname_idx";--> statement-breakpoint
DROP INDEX "names_idx";--> statement-breakpoint
DROP INDEX "candidate_no_idx";--> statement-breakpoint
DROP INDEX "phone_number_idx";--> statement-breakpoint
ALTER TABLE `programs` ALTER COLUMN "level" TO "level" text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE INDEX `surname_idx` ON `students` (`surname`);--> statement-breakpoint
CREATE INDEX `names_idx` ON `students` (`names`);--> statement-breakpoint
CREATE INDEX `candidate_no_idx` ON `students` (`candidate_no`);--> statement-breakpoint
CREATE INDEX `phone_number_idx` ON `students` (`phone_number`);