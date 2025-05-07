ALTER TABLE `properties` RENAME COLUMN "registration_date" TO "registration_date_from";--> statement-breakpoint
ALTER TABLE `properties` ADD `registration_date_to` text NOT NULL;--> statement-breakpoint
ALTER TABLE `properties` DROP COLUMN `orientation_date`;