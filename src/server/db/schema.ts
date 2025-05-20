import {int, text, singlestoreTable, index} from "drizzle-orm/singlestore-core";

export const files = singlestoreTable("files_table", {
    id: int("id").primaryKey().autoincrement(),
    name: text("name").notNull(),
    parentId: int("parent_id").notNull(),
    url: text("url").notNull(),
    size: int("size").notNull(),
}, (table) => {
    return [index("parent_index").on(table.parentId)]
})

export const folders = singlestoreTable("folders_table", {
    id: int("id").primaryKey().autoincrement(),
    name: text("name").notNull(),
    parentId: int("parent_id"),
}, (table) => {
    return [index("parent_index").on(table.parentId)]
})