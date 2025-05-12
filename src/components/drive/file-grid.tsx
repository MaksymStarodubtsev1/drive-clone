import type { DriveItem } from "@/lib/types"
import { FileItem } from "./file-item"

export enum ViewType {
    Grid = "grid",
    List = "list",
}

interface FileGridProps {
  items: DriveItem[]
  view: "grid" | "list"
}

export function FileGrid({ items, view }: FileGridProps) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <p>This folder is empty</p>
      </div>
    )
  }

  if (view === "grid") {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {items.map((item) => (
          <FileItem key={item.id} item={item} view={view} />
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col divide-y">
      {items.map((item) => (
        <FileItem key={item.id} item={item} view={view} />
      ))}
    </div>
  )
}
