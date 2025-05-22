import {int, text, singlestoreTableCreator, index, bigint} from "drizzle-orm/singlestore-core";

const createTable = singlestoreTableCreator((tableName) => `drive-store_${tableName}`)

export const files = createTable("files_table", {
    id: bigint("id", {mode: "bigint", unsigned: true}).primaryKey().autoincrement(),
    name: text("name").notNull(),
    url: text("url").notNull(),
    size: int("size").notNull(),
    parentId: bigint("parent_id", {mode: "bigint", unsigned: true}).notNull(),
}, (table) => {
    return [index("parent_index").on(table.parentId)]
})

export const folders = createTable("folders_table", {
    id: bigint("id", {mode: "bigint", unsigned: true}).primaryKey().autoincrement(),
    name: text("name").notNull(),
    parentId: bigint("parent_id", {mode: "bigint", unsigned: true}).notNull(),
}, (table) => {
    return [index("parent_index").on(table.parentId)]
})