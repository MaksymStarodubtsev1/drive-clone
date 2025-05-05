import type { File, Folder } from "./types"

// Generate a random ID
const generateId = () => Math.random().toString(36).substring(2, 10)

// Generate mock files
const generateMockFiles = (folderId: Folder['parentId']): File[] => {
  const baseFiles: File[] = []

  // If a folder ID is provided, return a different set of files
  if (folderId) {
    return [
      {
        id: generateId(),
        name: "Project Proposal.docx",
        type: "document",
        size: 1024 * 1024 * 2.3, // 2.3 MB
        modifiedAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString(), // 2 days ago
        parentId: folderId,
        url: "/path/to/project-proposal.docx",
      },
      {
        id: generateId(),
        name: "Presentation.pptx",
        type: "document",
        size: 1024 * 1024 * 5.7, // 5.7 MB
        modifiedAt: new Date(Date.now() - 3600000 * 24 * 5).toISOString(), // 5 days ago
        parentId: folderId,
        url: "/path/to/project-proposal.docx",
      },
    ]
  }

  return baseFiles
}

// Generate mock folders
const generateMockFolders = (parentId: Folder['parentId']): Folder[] => {
  const baseFolders: Folder[] = [
    {
      id: generateId(),
      name: "Subfolder 1",
      modifiedAt: new Date(Date.now() - 3600000 * 24 * 1).toISOString(), // 1 day ago
      parentId: null,
    },
  ]
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

export const getMockData = (folderId: Folder['parentId']) => {
  return {
    files: generateMockFiles(folderId),
    folders: generateMockFolders(folderId),
  }
}
