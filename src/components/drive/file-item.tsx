"use client"

import Link from "next/link"
import { Folder, File } from "lucide-react"
import { formatFileSize } from "@/lib/utils"
import {ViewType} from "@/components/drive/items-view";
import type { Folder as FolderType, File as FileType} from "@/lib/types"

interface FileItemProps {
  file: FileType
  view: ViewType
}

interface FolderItemProps {
  folder: FolderType
  view: ViewType
}

export function FolderItem({ folder, view }: FolderItemProps) {
  const getFileIcon = () => {
    return <Folder className="h-10 w-10 text-blue-500" />
  }

  const itemUrl =  `/drive/${folder.id}`

  if (view === ViewType.Grid) {
    return (
        <Link
            href={itemUrl}
            className="group flex flex-col items-center p-4 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {getFileIcon()}
          <span className="mt-2 text-sm font-medium text-center truncate max-w-full">{folder.name}</span>
        </Link>
    )
  }
  return (
    <Link href={itemUrl} className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors">
      <div className="mr-3">{getFileIcon()}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{folder.name}</p>
      </div>
    </Link>
  )
}

export function FileItem({ file, view }: FileItemProps) {
  const getFileIcon = () => {
    return <File className="h-10 w-10 text-gray-500" />
    // switch () {
      // case "pdf":
      //   return <FilePdf className="h-10 w-10 text-red-500" />
      // case "jpg":
      // case "png":
      // case "gif":
      //   return <FileImage className="h-10 w-10 text-green-500" />
      // case "md":
      // case "js":
      // case "ts":
      // case "tsx":
      //   return <FileCode className="h-10 w-10 text-purple-500" />
      // case "docx":
      // case "txt":
      //   return <FileText className="h-10 w-10 text-blue-400" />
      // default:
    //     return <File className="h-10 w-10 text-gray-500" />
    // }
  }

  const itemUrl =  "#" // In a real app, this would link to file preview

  if (view === ViewType.Grid) {
    return (
      <Link
        href={itemUrl}
        className="group flex flex-col items-center p-4 rounded-lg hover:bg-gray-100 transition-colors"
      >
        {getFileIcon()}
        <span className="mt-2 text-sm font-medium text-center truncate max-w-full">{file.name}</span>
        <span className="text-xs text-gray-500 mt-1">{formatFileSize(file.size)}</span>
      </Link>
    )
  }

  const ItemContent = (
    <div className="flex items-center justify-between">
      <span className="text-xs text-gray-500">{formatFileSize(file.size)}</span>
    </div>
  )

  return (
    <Link href={itemUrl} className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors">
      <div className="mr-3">{getFileIcon()}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
      </div>
      {ItemContent}
    </Link>
  )
}
