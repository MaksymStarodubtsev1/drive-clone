import type { File, Folder } from "./types"

// Generate a random ID
const generateId = () => Math.random().toString(36).substring(2, 10)

// Generate mock files
const generateMockFiles = (folderId?: string): File[] => {
  const baseFiles: File[] = [
    {
      id: generateId(),
      name: "Project Proposal.docx",
      type: "document",
      size: 1024 * 1024 * 2.3, // 2.3 MB
      modifiedAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString(), // 2 days ago
    },
    {
      id: generateId(),
      name: "Presentation.pptx",
      type: "document",
      size: 1024 * 1024 * 5.7, // 5.7 MB
      modifiedAt: new Date(Date.now() - 3600000 * 24 * 5).toISOString(), // 5 days ago
    },
    {
      id: generateId(),
      name: "Budget.xlsx",
      type: "document",
      size: 1024 * 1024 * 1.2, // 1.2 MB
      modifiedAt: new Date(Date.now() - 3600000 * 24 * 1).toISOString(), // 1 day ago
    },
    {
      id: generateId(),
      name: "Team Photo.jpg",
      type: "image",
      size: 1024 * 1024 * 3.5, // 3.5 MB
      modifiedAt: new Date(Date.now() - 3600000 * 24 * 7).toISOString(), // 7 days ago
      thumbnail: "/placeholder.svg?height=100&width=100",
    },
    {
      id: generateId(),
      name: "Product Demo.mp4",
      type: "video",
      size: 1024 * 1024 * 15.8, // 15.8 MB
      modifiedAt: new Date(Date.now() - 3600000 * 24 * 3).toISOString(), // 3 days ago
    },
  ]

  // If a folder ID is provided, return a different set of files
  if (folderId) {
    return [
      {
        id: generateId(),
        name: "Document 1.docx",
        type: "document",
        size: 1024 * 1024 * 1.1, // 1.1 MB
        modifiedAt: new Date(Date.now() - 3600000 * 24 * 1).toISOString(), // 1 day ago
      },
      {
        id: generateId(),
        name: "Image 1.png",
        type: "image",
        size: 1024 * 1024 * 2.2, // 2.2 MB
        modifiedAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString(), // 2 days ago
        thumbnail: "/placeholder.svg?height=100&width=100",
      },
      {
        id: generateId(),
        name: "Notes.txt",
        type: "document",
        size: 1024 * 10, // 10 KB
        modifiedAt: new Date(Date.now() - 3600000 * 24 * 3).toISOString(), // 3 days ago
      },
    ]
  }

  return baseFiles
}

// Generate mock folders
const generateMockFolders = (parentId?: string): Folder[] => {
  const baseFolders: Folder[] = [
    {
      id: "folder1",
      name: "Projects",
      modifiedAt: new Date(Date.now() - 3600000 * 24 * 1).toISOString(), // 1 day ago
    },
    {
      id: "folder2",
      name: "Documents",
      modifiedAt: new Date(Date.now() - 3600000 * 24 * 3).toISOString(), // 3 days ago
    },
    {
      id: "folder3",
      name: "Images",
      modifiedAt: new Date(Date.now() - 3600000 * 24 * 5).toISOString(), // 5 days ago
    },
  ]

  // If a parent ID is provided, return a different set of folders
  if (parentId) {
    return [
      {
        id: generateId(),
        name: "Subfolder 1",
        modifiedAt: new Date(Date.now() - 3600000 * 24 * 1).toISOString(), // 1 day ago
        parentId,
      },
      {
        id: generateId(),
        name: "Subfolder 2",
        modifiedAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString(), // 2 days ago
        parentId,
      },
    ]
  }

  return baseFolders
}

export const getMockData = (folderId?: string) => {
  return {
    files: generateMockFiles(folderId),
    folders: generateMockFolders(folderId),
  }
}
