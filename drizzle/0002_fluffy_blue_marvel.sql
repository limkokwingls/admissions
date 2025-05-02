PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_properties` (
	`id` text PRIMARY KEY NOT NULL,
	`acceptance_fee` real NOT NULL,
	`acceptance_deadline` integer NOT NULL,
	`registration_date` integer NOT NULL,
	`orientation_date` integer NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_properties`("id", "acceptance_fee", "acceptance_deadline", "registration_date", "orientation_date") SELECT "id", "acceptance_fee", "acceptance_deadline", "registration_date", "orientation_date" FROM `properties`;--> statement-breakpoint
DROP TABLE `properties`;--> statement-breakpoint
ALTER TABLE `__new_properties` RENAME TO `properties`;--> statement-breakpoint
PRAGMA foreign_keys=ON;