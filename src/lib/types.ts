import type { FileType } from "@/components/file-preview";

export interface BaseItem {
  id: string
  name: string
  parentId: string | null // `null` = root level
  createdAt: string // ISO date string
}

export interface File extends BaseItem {
  type: "file" | FileType
  extension: string // e.g., 'pdf', 'docx'
  size: number // in KB
  url?: string // URL to the file
}

export interface Folder extends BaseItem {
  type: "folder"
  childrenCount: number
  itemsCount?: number
}

export type DriveItem = File | Folder
