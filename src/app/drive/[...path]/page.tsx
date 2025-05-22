"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Breadcrumb } from "@/components/drive/breadcrumb"
import { ViewToggle } from "@/components/drive/view-toggle"
import {FileGrid, ViewType} from "@/components/drive/file-grid"
import { getFolderContents, getBreadcrumbPath, getFolderById } from "@/lib/utils"

export default function FolderPage() {
  const params = useParams()
  const [view, setView] = useState<ViewType>(ViewType.List)
    
  const pathArray = Array.isArray(params.path) ? params.path : [params.path]
  const folderId = pathArray[pathArray.length - 1]  ?? ''

  const folder = getFolderById(Number(folderId))
  const folderItems = getFolderContents(Number(folderId))
  const breadcrumbPath = getBreadcrumbPath(Number(folderId))

  if (!folder) {
    return <div className="container mx-auto px-4 py-8">Folder not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{folder.name}</h1>
        <ViewToggle view={view} setViewAction={setView} />
      </div>

      <Breadcrumb path={breadcrumbPath} />

      <div className="bg-white rounded-lg shadow p-4">
        <FileGrid items={folderItems} view={view} />
      </div>
    </div>
  )
}
