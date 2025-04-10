import { FolderIcon, StarIcon, ClockIcon, CloudIcon, TrashIcon, UsersIcon } from "lucide-react"

interface SidebarProps {
  currentPath: string
}

export default function Sidebar({ currentPath }: SidebarProps) {
  const sidebarItems = [
    { name: "My Drive", icon: <FolderIcon className="w-5 h-5" />, active: currentPath === "/" },
    { name: "Shared with me", icon: <UsersIcon className="w-5 h-5" /> },
    { name: "Starred", icon: <StarIcon className="w-5 h-5" /> },
    { name: "Recent", icon: <ClockIcon className="w-5 h-5" /> },
    { name: "Trash", icon: <TrashIcon className="w-5 h-5" /> },
    { name: "Storage", icon: <CloudIcon className="w-5 h-5" /> },
  ]

  return (
    <div className="w-64 h-full border-r border-gray-200 bg-white">
      <div className="p-4">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4.16797 12.0001L10.0013 17.8334L19.8346 8.00008"
              stroke="#4285F4"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-medium text-gray-700">New</span>
        </div>
      </div>

      <nav className="mt-2">
        {sidebarItems.map((item, index) => (
          <div
            key={index}
            className={`flex items-center gap-3 px-6 py-2 cursor-pointer transition-colors ${
              item.active ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span className={item.active ? "text-blue-600" : "text-gray-500"}>{item.icon}</span>
            <span className="text-sm font-medium">{item.name}</span>
          </div>
        ))}
      </nav>

      <div className="px-6 mt-6">
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div className="bg-blue-600 h-1.5 rounded-full w-1/4"></div>
        </div>
        <p className="text-xs text-gray-500 mt-2">2.5 GB of 15 GB used</p>
      </div>
    </div>
  )
}
