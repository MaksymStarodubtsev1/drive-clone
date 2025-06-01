import type { File, Folder} from "./types"

export const mockDataFolder: Folder[] = [
  {
    id: 1,
    name: "My Drive",
    parentId: null,
    createdAt: new Date().toISOString(),
    childrenCount: 3,
  },
  {
    id: 2,
    name: "Documents",
    parentId: 1,
    createdAt: new Date().toISOString(),
    childrenCount: 2,
  },
  {
    id: 3,
    name: "Images",
    parentId: 1,
    createdAt: new Date().toISOString(),
    childrenCount: 2,
  },
  {
    id: 4,
    name: "Projects",
    parentId: 1,
    createdAt: new Date().toISOString(),
    childrenCount: 1,
  },
  {
    id: 5,
    name: "Web Development",
    parentId: 4,
    createdAt: new Date().toISOString(),
    childrenCount: 2,
  },
]

export const mockDataFile: File[] = [
  {
    id: 1,
    name: "Project Plan",
    parentId: 2,
    type: "file",
    extension: "pdf",
    size: 250,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Meeting Notes",
    parentId: 2,
    extension: "docx",
    size: 125,
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Vacation Photo",
    parentId: 3,
    extension: "jpg",
    size: 1024,
    createdAt: new Date().toISOString(),
  },
  {
    id: 4,
    name: "Profile Picture",
    parentId: 3,
    extension: "png",
    size: 512,
    createdAt: new Date().toISOString(),
  },
  {
    id: 5,
    name: "React Notes",
    parentId: 5,
    extension: "md",
    size: 45,
    createdAt: new Date().toISOString(),
  },
  {
    id: 6,
    name: "TypeScript Cheatsheet",
    parentId: 5,
    extension: "pdf",
    size: 320,
    createdAt: new Date().toISOString(),
  },
]

export const mockData: {files: File[], folders: Folder[]} = {
  folders: mockDataFolder,
  files: mockDataFile,
}
