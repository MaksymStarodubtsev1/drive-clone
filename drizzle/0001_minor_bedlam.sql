CREATE TABLE \`__new_drive-store_folders_table\` (
	\`id\` bigint unsigned AUTO_INCREMENT NOT NULL,
	\`name\` text NOT NULL,
	\`parent_id\` bigint unsigned,
	\`children_count\` int NOT NULL DEFAULT 0,
	\`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	\`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT \`drive-store_folders_table_id\` PRIMARY KEY(\`id\`)
);--> statement-breakpoint
INSERT INTO \`__new_drive-store_folders_table\`(\`id\`, \`name\`, \`parent_id\`) SELECT \`id\`, \`name\`, \`parent_id\` FROM \`drive-store_folders_table\`;--> statement-breakpoint
DROP TABLE \`drive-store_folders_table\`;--> statement-breakpoint
ALTER TABLE \`__new_drive-store_folders_table\` RENAME TO \`drive-store_folders_table\`;--> statement-breakpoint
CREATE INDEX \`parent_index\` ON \`drive-store_folders_table\` (\`parent_id\`);