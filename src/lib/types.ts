import type {files, folders} from "@/server/db/schema";

export interface BaseItem {
  id: number
  name: string
  parentId: number | null // `null` = root level
  createdAt: string // ISO date string
}

export type File = typeof files.$inferSelect
export type Folder = typeof folders.$inferSelect

export type DriveMockData = {files: File[], folders: Folder[]}

export type DriveItem = File | Folder
