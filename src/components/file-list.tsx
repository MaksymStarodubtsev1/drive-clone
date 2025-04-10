"use client"

import { useState } from "react"
import type { File, Folder } from "@/lib/types"
import { FileIcon, FolderIcon, MoreVertical, ImageIcon, FileText, Film, Music } from "lucide-react"
import { formatFileSize, formatDate } from "@/lib/utils"

interface FileListProps {
  files: File[]
  folders: Folder[]
  onItemSelect: (item: File | Folder) => void
  onItemPreview: (file: File) => void
  selectedItem: File | Folder | null
}

export default function FileList({ files, folders, onItemSelect, onItemPreview, selectedItem }: FileListProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case "image":
        return <ImageIcon className="w-5 h-5 text-green-500" />
      case "document":
        return <FileText className="w-5 h-5 text-blue-500" />
      case "video":
        return <Film className="w-5 h-5 text-red-500" />
      case "audio":
        return <Music className="w-5 h-5 text-purple-500" />
      default:
        return <FileIcon className="w-5 h-5 text-gray-500" />
    }
  }

  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
        {folders.map((folder) => (
          <div
            key={folder.id}
            onClick={() => onItemSelect(folder)}
            className={`p-4 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${
              selectedItem?.id === folder.id ? "bg-blue-50 border-blue-200" : ""
            }`}
          >
            <div className="flex flex-col items-center">
              <FolderIcon className="w-12 h-12 text-gray-400" />
              <span className="mt-2 text-sm font-medium text-center truncate w-full">{folder.name}</span>
            </div>
          </div>
        ))}

        {files.map((file) => (
          <div
            key={file.id}
            onClick={() => onItemSelect(file)}
            onDoubleClick={() => onItemPreview(file)}
            className={`p-4 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${
              selectedItem?.id === file.id ? "bg-blue-50 border-blue-200" : ""
            }`}
          >
            <div className="flex flex-col items-center">
              {file.type === "image" ? (
                <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                  <img
                    src={file.thumbnail ?? "/placeholder.svg?height=48&width=48"}
                    alt={file.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 flex items-center justify-center">{getFileIcon(file.type)}</div>
              )}
              <span className="mt-2 text-sm font-medium text-center truncate w-full">{file.name}</span>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="mt-4">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last modified
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              File size
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {folders.map((folder) => (
            <tr
              key={folder.id}
              onClick={() => onItemSelect(folder)}
              className={`cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedItem?.id === folder.id ? "bg-blue-50" : ""
              }`}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <FolderIcon className="flex-shrink-0 h-5 w-5 text-gray-400" />
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{folder.name}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">Me</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{formatDate(folder.modifiedAt)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">—</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <MoreVertical className="h-5 w-5 text-gray-400 cursor-pointer" />
              </td>
            </tr>
          ))}

          {files.map((file) => (
            <tr
              key={file.id}
              onClick={() => onItemSelect(file)}
              onDoubleClick={() => onItemPreview(file)}
              className={`cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedItem?.id === file.id ? "bg-blue-50" : ""
              }`}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  {getFileIcon(file.type)}
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{file.name}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">Me</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{formatDate(file.modifiedAt)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{formatFileSize(file.size)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <MoreVertical className="h-5 w-5 text-gray-400 cursor-pointer" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
