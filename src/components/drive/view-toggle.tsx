"use client"

import { Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import {ViewType} from "@/components/drive/file-grid";

interface ViewToggleProps {
  view: ViewType
  setViewAction: (view: ViewType) => void
}

export function ViewToggle({ view, setViewAction }: ViewToggleProps) {
  return (
    <div className="flex items-center space-x-2">
      <Button
        variant={view === ViewType.Grid ? "default" : "outline"}
        size="sm"
        onClick={() => setViewAction(ViewType.Grid)}
        className="h-8 w-8 p-0"
      >
        <Grid className="h-4 w-4" />
        <span className="sr-only">Grid view</span>
      </Button>
      <Button
        variant={view === ViewType.List ? "default" : "outline"}
        size="sm"
        onClick={() => setViewAction(ViewType.List)}
        className="h-8 w-8 p-0"
      >
        <List className="h-4 w-4" />
        <span className="sr-only">List view</span>
      </Button>
    </div>
  )
}
