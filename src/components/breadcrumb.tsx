"use client"

import { ChevronRight, Home } from "lucide-react"

interface BreadcrumbProps {
  path: string
  onNavigateAction: () => void
}

export default function Breadcrumb({ path, onNavigateAction }: BreadcrumbProps) {
  const pathParts = path.split("/").filter(Boolean)

  return (
    <div className="flex items-center text-sm text-gray-600 mb-4">
      <button onClick={onNavigateAction} className="flex items-center hover:text-blue-600 transition-colors">
        <Home className="w-4 h-4 mr-1" />
        <span>My Drive</span>
      </button>

      {pathParts.map((part: string, index: number) => (
        <div key={index} className="flex items-center">
          <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />
          <span className="hover:text-blue-600 cursor-pointer transition-colors">{part}</span>
        </div>
      ))}
    </div>
  )
}
