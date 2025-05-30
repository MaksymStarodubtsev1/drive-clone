ALTER TABLE `files_table` RENAME TO `drive-store_files_table`;--> statement-breakpoint
ALTER TABLE `folders_table` RENAME TO `drive-store_folders_table`;--> statement-breakpoint

ALTER TABLE `drive-store_files_table` ADD COLUMN `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `drive-store_folders_table` ADD COLUMN `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP;--> statement-breakpoint

CREATE TABLE `__new_drive-store_files_table`