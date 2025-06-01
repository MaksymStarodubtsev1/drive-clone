import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import type {DriveItem, DriveMockData, Folder} from "./types"
import { mockData } from "./mock-data"

export function getFolderContents(folderId: number): DriveMockData {
  const files = mockData.files.filter((item) => item.parentId === folderId)
  const folders = mockData.folders.filter((item) => item.parentId === folderId)
  return { files, folders}
}

export function getFolderById(folderId: number): Folder | undefined {
  return mockData.folders.find((folder) => folder.id === folderId)
}

export function getBreadcrumbPath(folderId: number): DriveItem[] {
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
