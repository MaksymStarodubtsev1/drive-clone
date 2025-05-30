import type { File, Folder} from "@/lib/types"
import {FileItem, FolderItem} from "./file-item"

export enum ViewType {
    Grid = "grid",
    List = "list",
}

interface FileGridProps {
  folders: Folder[]
  files: File[]
  view: ViewType
}

export function FileGrid({ files, folders, view }: FileGridProps) {
  if (files.length === 0 || folders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <p>This folder is empty</p>
      </div>
    )
  }

  if (view === ViewType.Grid) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {folders.map((item) => (
          <FolderItem key={item.id} folder={item} view={view} />
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col divide-y">
      {files.map((item) => (
        <FileItem key={item.id} file={item} view={view} />
      ))}
    </div>
  )
}
