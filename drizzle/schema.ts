import { singlestoreTable, singlestoreSchema, AnySingleStoreColumn, primaryKey, bigint, text, int, varchar, timestamp } from "drizzle-orm/singlestore-core"
import { sql } from "drizzle-orm"

export const driveStoreFilesTable = singlestoreTable("drive-store_files_table", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	name: text().notNull(),
	url: text().notNull(),
	size: int().notNull(),
	parentId: bigint("parent_id", { mode: "number", unsigned: true }).notNull(),
	extension: varchar({ length: 10 }).default('txt').notNull(),
	type: varchar({ length: 20 }).default('file').notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "drive-store_files_table_id"}),
]);

export const driveStoreFoldersTable = singlestoreTable("drive-store_folders_table", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	name: text().notNull(),
	parentId: bigint("parent_id", { mode: "number", unsigned: true }).notNull(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "drive-store_folders_table_id"}),
]);
