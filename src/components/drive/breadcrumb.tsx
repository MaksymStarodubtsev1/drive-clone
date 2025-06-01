"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import type { DriveItem } from "@/lib/types"

interface BreadcrumbProps {
  path: DriveItem[]
}

export function Breadcrumb({ path }: BreadcrumbProps) {
  return (
    <nav className="flex items-center text-sm text-gray-600 mb-4">
      {path.map((item, index) => (
        <div key={item.id} className="flex items-center">
          {index > 0 && <ChevronRight className="h-4 w-4 mx-1 text-gray-400" />}
          <Link
            href={item.id <= 1 ? "/drive" : `/drive/${item.id}`}
            className="hover:text-gray-900 hover:underline"
          >
            {item.name}
          </Link>
        </div>
      ))}
    </nav>
  )
}
