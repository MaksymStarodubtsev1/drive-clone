"use client"

import { useState } from "react"
import type { File, Folder } from "@/lib/types"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import FileList from "@/components/file-list"
import FilePreview from "@/components/file-preview"
import Breadcrumb from "@/components/breadcrumb"
import { getMockData } from "@/lib/mock-data"

interface DriveLayoutProps {
  files: File[]
  folders: Folder[]
  currentPath: string
}

export default function DriveLayout({
  files: initialFiles,
  folders: initialFolders,
  currentPath: initialPath,
}: DriveLayoutProps) {
  const [currentPath, setCurrentPath] = useState<string>(initialPath)
  const [selectedItem, setSelectedItem] = useState<File | null>(null)
  const [showPreview, setShowPreview] = useState<boolean>(false)
  const [files, setFiles] = useState<File[]>(initialFiles)
  const [folders, setFolders] = useState<Folder[]>(initialFolders)

  const navigateToFolder = (folderId: string) => {
    const { files: newFiles, folders: newFolders } = getMockData(folderId)
    setFiles(newFiles)
    setFolders(newFolders)

    // Update path based on folder name
    const targetFolder = initialFolders.find((f) => f.id === folderId)
    if (targetFolder) {
      setCurrentPath(currentPath === "/" ? `/${targetFolder.name}` : `${currentPath}/${targetFolder.name}`)
    }

    setSelectedItem(null)
    setShowPreview(false)
  }

  const navigateUp = () => {
    if (currentPath === "/") return

    const pathParts = currentPath.split("/")
    pathParts.pop()
    const newPath = pathParts.join("/") || "/"
    setCurrentPath(newPath)

    const { files: newFiles, folders: newFolders } = getMockData()
    setFiles(newFiles)
    setFolders(newFolders)
  }

  const handleItemSelect = (item: File | Folder) => {
    if ("type" in item) {
      // It's a file
      setSelectedItem(item)
    } else {
      // It's a folder
      navigateToFolder(item.id)
    }
  }

  const handlePreview = (file: File) => {
    setSelectedItem(file)
    setShowPreview(true)
  }

  const closePreview = () => {
    setShowPreview(false)
  }

  return (
    <div className="flex h-screen bg-white">
      <Sidebar currentPath={currentPath} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <div className="flex-1 overflow-auto">
          <div className="p-4">
            <Breadcrumb path={currentPath} onNavigate={navigateUp} />
            <FileList
              files={files}
              folders={folders}
              onItemSelect={handleItemSelect}
              onItemPreview={handlePreview}
              selectedItem={selectedItem}
            />
          </div>
        </div>
      </div>

      {showPreview && selectedItem && <FilePreview file={selectedItem} onClose={closePreview} />}
    </div>
  )
}
