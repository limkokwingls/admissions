DROP INDEX "users_email_unique";--> statement-breakpoint
DROP INDEX "surname_idx";--> statement-breakpoint
DROP INDEX "names_idx";--> statement-breakpoint
DROP INDEX "candidate_no_idx";--> statement-breakpoint
DROP INDEX "phone_number_idx";--> statement-breakpoint
ALTER TABLE `properties` ALTER COLUMN "acceptance_deadline" TO "acceptance_deadline" text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE INDEX `surname_idx` ON `students` (`surname`);--> statement-breakpoint
CREATE INDEX `names_idx` ON `students` (`names`);--> statement-breakpoint
CREATE INDEX `candidate_no_idx` ON `students` (`candidate_no`);--> statement-breakpoint
CREATE INDEX `phone_number_idx` ON `students` (`phone_number`);--> statement-breakpoint
ALTER TABLE `properties` ALTER COLUMN "registration_date" TO "registration_date" text NOT NULL;--> statement-breakpoint
ALTER TABLE `properties` ALTER COLUMN "orientation_date" TO "orientation_date" text NOT NULL;--> statement-breakpoint
ALTER TABLE `properties` ADD `private_payment_date_from` text;--> statement-breakpoint
ALTER TABLE `properties` ADD `private_payment_date_to` text;