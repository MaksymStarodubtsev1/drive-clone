"use client"

import { Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ViewToggleProps {
  view: "grid" | "list"
  setViewAction: (view: "grid" | "list") => void
}

export function ViewToggle({ view, setViewAction }: ViewToggleProps) {
  return (
    <div className="flex items-center space-x-2">
      <Button
        variant={view === "grid" ? "default" : "outline"}
        size="sm"
        onClick={() => setViewAction("grid")}
        className="h-8 w-8 p-0"
      >
        <Grid className="h-4 w-4" />
        <span className="sr-only">Grid view</span>
      </Button>
      <Button
        variant={view === "list" ? "default" : "outline"}
        size="sm"
        onClick={() => setViewAction("list")}
        className="h-8 w-8 p-0"
      >
        <List className="h-4 w-4" />
        <span className="sr-only">List view</span>
      </Button>
    </div>
  )
}
