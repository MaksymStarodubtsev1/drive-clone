import DriveLayout from "@/components/drive-layout"
import { getMockData } from "@/lib/mock-data"

export default function Home() {
  const { files, folders } = getMockData()

  return <DriveLayout files={files} folders={folders} currentPath="/" />
}
