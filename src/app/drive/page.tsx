"use client"

import { useState } from "react"
import { Breadcrumb } from "@/components/drive/breadcrumb"
import { ViewToggle } from "@/components/drive/view-toggle"
import { FileGrid } from "@/components/drive/file-grid"
import { getFolderContents, getBreadcrumbPath } from "@/lib/utils"

export default function DrivePage() {
  const [view, setView] = useState<"grid" | "list">("list")
  const rootItems = getFolderContents("root")
  const breadcrumbPath = getBreadcrumbPath("root")

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Drive</h1>
        <ViewToggle view={view} setViewAction={setView} />
      </div>

      <Breadcrumb path={breadcrumbPath} />

      <div className="bg-white rounded-lg shadow p-4">
        <FileGrid items={rootItems} view={view} />
      </div>
    </div>
  )
}
