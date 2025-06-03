import { singlestoreTableCreator, bigint, text, int, index, timestamp, varchar } from "drizzle-orm/singlestore-core";

const createTable = singlestoreTableCreator((tableName) => `drive-store_${tableName}`)

export const files = createTable("files_table", {
    id: bigint("id", {mode: "number", unsigned: true}).autoincrement().notNull().primaryKey(),
    name: text("name").notNull(),
    url: text("url").notNull(),
    extension: varchar("extension", { length: 10 }).notNull(),
    type: varchar("type", { length: 20 }).notNull().default("file"),
    size: int("size").notNull(),
    parentId: bigint("parent_id", {mode: "number", unsigned: true}).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
}, (table) => {
    return [index("parent_index").on(table.parentId)]
})

export const folders = createTable("folders_table", {
    id: bigint("id", {mode: "number", unsigned: true}).autoincrement().notNull().primaryKey(),
    name: text("name").notNull(),
    parentId: bigint("parent_id", {mode: "number", unsigned: true}),
    childrenCount: int("children_count").notNull().default(0),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
}, (table) => {
    return [index("parent_index").on(table.parentId)]
}); 