"use client"

import { useState } from "react"
import { Breadcrumb } from "@/components/drive/breadcrumb"
import { ViewToggle } from "@/components/drive/view-toggle"
import {FileGrid, ViewType} from "@/components/drive/file-grid"
import { getFolderContents, getBreadcrumbPath } from "@/lib/utils"

export default function DrivePage() {
  const [view, setView] = useState<ViewType>(ViewType.List)
  const {folders: folderItems, files: filesItems} = getFolderContents(null)
  const breadcrumbPath = getBreadcrumbPath(1)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Drive</h1>
        <ViewToggle view={view} setViewAction={setView} />
      </div>

      <Breadcrumb path={breadcrumbPath} />

      <div className="bg-white rounded-lg shadow p-4">
        <FileGrid folders={folderItems} files={filesItems} view={view} />
      </div>
    </div>
  )
}
