"use client"

import { ChevronRight, Home } from "lucide-react"

interface BreadcrumbProps {
  path: string
  onNavigate: () => void
}

export default function Breadcrumb({ path, onNavigate }: BreadcrumbProps) {
  const pathParts = path.split("/").filter(Boolean)

  return (
    <div className="flex items-center text-sm text-gray-600 mb-4">
      <button onClick={onNavigate} className="flex items-center hover:text-blue-600 transition-colors">
        <Home className="w-4 h-4 mr-1" />
        <span>My Drive</span>
      </button>

      {pathParts.map((part, index) => (
        <div key={index} className="flex items-center">
          <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />
          <span className="hover:text-blue-600 cursor-pointer transition-colors">{part}</span>
        </div>
      ))}
    </div>
  )
}
