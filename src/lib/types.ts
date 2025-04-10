export interface File {
  id: string
  name: string
  type: "document" | "image" | "video" | "audio" | "other"
  size: number
  modifiedAt: string
  url?: string
  thumbnail?: string
}

export interface Folder {
  id: string
  name: string
  modifiedAt: string
  parentId?: string
}
