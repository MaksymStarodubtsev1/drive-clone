"use client"

import { X } from "lucide-react"
import type { File } from "@/lib/types"

export enum FileType {
    Image = "image",
    Document = "document",
    Video = "video",
}

interface FilePreviewProps {
  file: File
  onCloseAction: () => void
}

export default function FilePreview({ file, onCloseAction }: FilePreviewProps) {
  const renderPreview = () => {
    switch (file.type) {
      case FileType.Image:
        return (
          <div className="flex items-center justify-center h-full">
            <img
              src={file.url ?? "/placeholder.svg?height=400&width=600"}
              alt={file.name}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        )
      case FileType.Document:
        return (
          <div className="bg-white p-8 max-w-2xl mx-auto h-full overflow-auto">
            <h1 className="text-2xl font-bold mb-4">Document Preview</h1>
            <p className="mb-4">This is a preview of the document: {file.name}</p>
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc
              nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc
              nisl aliquet nunc, quis aliquam nisl nunc quis nisl.
            </p>
          </div>
        )
      case FileType.Video:
        return (
          <div className="flex items-center justify-center h-full">
            <video
              controls
              className="max-w-full max-h-full"
              src={file.url ?? "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        )
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-8">
              <p className="text-xl mb-2">Preview not available</p>
              <p className="text-gray-500">No preview is available for this file type.</p>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-medium">{file.name}</h3>
          <button onClick={onCloseAction} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="flex-1 overflow-auto">{renderPreview()}</div>
      </div>
    </div>
  )
}
