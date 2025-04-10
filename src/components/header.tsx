import { Search, HelpCircle, Settings, Menu, Grid, LayoutList } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="flex items-center justify-between px-4 h-16">
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <Menu className="w-6 h-6 text-gray-500 cursor-pointer" />
            <div className="ml-4 flex items-center">
              <img src="/placeholder.svg?height=24&width=24" alt="Google Drive" className="h-6 w-6" />
              <span className="ml-2 text-gray-700 text-xl">Drive</span>
            </div>
          </div>

          <div className="relative max-w-3xl w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="search"
              placeholder="Search in Drive"
              className="pl-10 py-2 bg-gray-100 border-none focus:bg-white focus:ring-2 focus:ring-blue-500 rounded-lg w-full"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <LayoutList className="w-6 h-6 text-gray-500 cursor-pointer" />
            <Grid className="w-6 h-6 text-gray-500 cursor-pointer" />
          </div>
          <HelpCircle className="w-6 h-6 text-gray-500 cursor-pointer" />
          <Settings className="w-6 h-6 text-gray-500 cursor-pointer" />
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white cursor-pointer">
            A
          </div>
        </div>
      </div>
    </header>
  )
}
