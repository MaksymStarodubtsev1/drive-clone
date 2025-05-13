import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import type { DriveItem } from "./types"
import { mockData } from "./mock-data"

export function getFolderContents(folderId: string): DriveItem[] {
  return mockData.filter((item) => item.parentId === folderId)
}

export function getFolderById(folderId: string): DriveItem | undefined {
  return mockData.find((item) => item.id === folderId && item.type === "folder")
}

export function getBreadcrumbPath(folderId: string): DriveItem[] {
  const path: DriveItem[] = []
  let currentFolder = getFolderById(folderId)

  while (currentFolder) {
    path.unshift(currentFolder)
    if (currentFolder.parentId === null) break
    currentFolder = getFolderById(currentFolder.parentId)
  }

  return path
}

export function formatFileSize(sizeInKB: number): string {
  if (sizeInKB < 1024) {
    return `${sizeInKB} KB`
  } else {
    return `${(sizeInKB / 1024).toFixed(2)} MB`
  }
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
