import {int, text, singlestoreTableCreator, index} from "drizzle-orm/singlestore-core";

const createTable = singlestoreTableCreator((tableName) => `drive-store_${tableName}`)

export const files = createTable("files_table", {
    id: int("id").primaryKey().autoincrement(),
    name: text("name").notNull(),
    parentId: int("parent_id").notNull(),
    url: text("url").notNull(),
    size: int("size").notNull(),
}, (table) => {
    return [index("parent_index").on(table.parentId)]
})

export const folders = createTable("folders_table", {
    id: int("id").primaryKey().autoincrement(),
    name: text("name").notNull(),
    parentId: int("parent_id"),
}, (table) => {
    return [index("parent_index").on(table.parentId)]
})