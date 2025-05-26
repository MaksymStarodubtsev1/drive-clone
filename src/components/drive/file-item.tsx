"use client"

import Link from "next/link"
import { File, FileText, FileImage, FileIcon as FilePdf, FileCode, Folder } from "lucide-react"
import type { DriveItem } from "@/lib/types"
import { formatFileSize, formatDate } from "@/lib/utils"
import {ViewType} from "@/components/drive/file-grid";

interface FileItemProps {
  item: DriveItem
  view: ViewType
}

export function FileItem({ item, view }: FileItemProps) {
  const getFileIcon = () => {
    if (item.type === "folder") {
      return <Folder className="h-10 w-10 text-blue-500" />
    }

    switch (item.extension) {
      case "pdf":
        return <FilePdf className="h-10 w-10 text-red-500" />
      case "jpg":
      case "png":
      case "gif":
        return <FileImage className="h-10 w-10 text-green-500" />
      case "md":
      case "js":
      case "ts":
      case "tsx":
        return <FileCode className="h-10 w-10 text-purple-500" />
      case "docx":
      case "txt":
        return <FileText className="h-10 w-10 text-blue-400" />
      default:
        return <File className="h-10 w-10 text-gray-500" />
    }
  }

  const itemUrl = item.type === "folder" ? `/drive/${item.id}` : "#" // In a real app, this would link to file preview

  if (view === "grid") {
    return (
      <Link
        href={itemUrl}
        className="group flex flex-col items-center p-4 rounded-lg hover:bg-gray-100 transition-colors"
      >
        {getFileIcon()}
        <span className="mt-2 text-sm font-medium text-center truncate max-w-full">{item.name}</span>
        {item.type === "file" && <span className="text-xs text-gray-500 mt-1">{formatFileSize(item.size)}</span>}
      </Link>
    )
  }

  const ItemContent = (
    <div className="flex items-center justify-between">
      {item.type === "file" && <span className="text-xs text-gray-500">{formatFileSize(item.size)}</span>}
      {item.type === "folder" && <span className="text-xs text-gray-500">{item?.itemsCount} items</span>}
    </div>
  )

  return (
    <Link href={itemUrl} className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors">
      <div className="mr-3">{getFileIcon()}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
        <p className="text-xs text-gray-500 truncate">{formatDate(item.createdAt)}</p>
      </div>
      {ItemContent}
    </Link>
  )
}
