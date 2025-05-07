ALTER TABLE `properties` ADD `private_payment_date` text;--> statement-breakpoint
ALTER TABLE `properties` DROP COLUMN `private_payment_date_from`;--> statement-breakpoint
ALTER TABLE `properties` DROP COLUMN `private_payment_date_to`;