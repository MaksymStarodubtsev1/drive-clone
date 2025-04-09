"use client"

import type React from "react"

import { useState } from "react"
import { File, FileText, Folder, Grid, List, MoreVertical, Plus, Search, Settings } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileUploadDialog } from "@/components/file-upload-dialog"
import { FilePreviewDialog } from "@/components/file-preview-dialog"

// Mock data for files and folders
const mockData = {
  rootFolders: [
    { id: "f1", name: "Documents", items: 15, updatedAt: "2023-04-01T10:30:00Z" },
    { id: "f2", name: "Images", items: 24, updatedAt: "2023-04-05T14:20:00Z" },
    { id: "f3", name: "Projects", items: 7, updatedAt: "2023-04-10T09:15:00Z" },
    { id: "f4", name: "Backups", items: 3, updatedAt: "2023-03-28T11:45:00Z" },
  ],
  rootFiles: [
    {
      id: "1",
      name: "Project Proposal.docx",
      type: "document",
      size: "2.4 MB",
      updatedAt: "2023-04-12T15:30:00Z",
      content: "This is a project proposal document with important details.",
    },
    {
      id: "2",
      name: "Budget 2023.xlsx",
      type: "spreadsheet",
      size: "1.8 MB",
      updatedAt: "2023-04-11T09:45:00Z",
      content: "Annual budget spreadsheet with quarterly breakdowns.",
    },
    {
      id: "3",
      name: "Presentation.pptx",
      type: "presentation",
      size: "5.2 MB",
      updatedAt: "2023-04-10T14:20:00Z",
      content: "Company presentation with slides and graphics.",
    },
    {
      id: "4",
      name: "Notes.txt",
      type: "text",
      size: "12 KB",
      updatedAt: "2023-04-09T11:10:00Z",
      content:
        "Meeting notes from the last team gathering. We discussed the upcoming product launch and assigned tasks to team members. Next meeting scheduled for next Friday.",
    },
    {
      id: "5",
      name: "Logo.png",
      type: "image",
      size: "1.1 MB",
      updatedAt: "2023-04-08T16:35:00Z",
      content: "Company logo in PNG format.",
    },
  ],
  folderContents: {
    f1: {
      // Documents folder
      folders: [
        { id: "f1-1", name: "Work", items: 5, updatedAt: "2023-04-02T10:30:00Z" },
        { id: "f1-2", name: "Personal", items: 3, updatedAt: "2023-04-03T14:20:00Z" },
      ],
      files: [
        {
          id: "f1-file1",
          name: "Resume.pdf",
          type: "document",
          size: "1.2 MB",
          updatedAt: "2023-04-01T10:35:00Z",
          content: "My professional resume with work history and skills.",
        },
        {
          id: "f1-file2",
          name: "Contract.docx",
          type: "document",
          size: "0.8 MB",
          updatedAt: "2023-03-28T09:15:00Z",
          content: "Employment contract with terms and conditions.",
        },
      ],
    },
    f2: {
      // Images folder
      folders: [
        { id: "f2-1", name: "Vacation", items: 12, updatedAt: "2023-04-06T10:30:00Z" },
        { id: "f2-2", name: "Family", items: 8, updatedAt: "2023-04-04T14:20:00Z" },
      ],
      files: [
        {
          id: "f2-file1",
          name: "Profile.jpg",
          type: "image",
          size: "2.5 MB",
          updatedAt: "2023-04-05T10:35:00Z",
          content: "Professional profile picture for work.",
        },
        {
          id: "f2-file2",
          name: "Banner.png",
          type: "image",
          size: "3.2 MB",
          updatedAt: "2023-04-03T09:15:00Z",
          content: "Website banner image with company logo.",
        },
      ],
    },
    f3: {
      // Projects folder
      folders: [{ id: "f3-1", name: "Website Redesign", items: 4, updatedAt: "2023-04-11T10:30:00Z" }],
      files: [
        {
          id: "f3-file1",
          name: "Timeline.xlsx",
          type: "spreadsheet",
          size: "0.7 MB",
          updatedAt: "2023-04-10T10:35:00Z",
          content: "Project timeline with milestones and deadlines.",
        },
        {
          id: "f3-file2",
          name: "Requirements.docx",
          type: "document",
          size: "1.1 MB",
          updatedAt: "2023-04-09T09:15:00Z",
          content: "Project requirements document with specifications.",
        },
      ],
    },
    f4: {
      // Backups folder
      folders: [],
      files: [
        {
          id: "f4-file1",
          name: "Backup_2023-03-27.zip",
          type: "archive",
          size: "105 MB",
          updatedAt: "2023-03-27T10:35:00Z",
          content: "Weekly backup archive of important files.",
        },
        {
          id: "f4-file2",
          name: "Backup_2023-03-20.zip",
          type: "archive",
          size: "98 MB",
          updatedAt: "2023-03-20T09:15:00Z",
          content: "Weekly backup archive of important files.",
        },
      ],
    },
    "f1-1": {
      // Work subfolder
      folders: [],
      files: [
        {
          id: "f1-1-file1",
          name: "Project Plan.docx",
          type: "document",
          size: "0.9 MB",
          updatedAt: "2023-04-02T11:35:00Z",
          content: "Detailed project plan with tasks and assignments.",
        },
      ],
    },
    "f1-2": {
      // Personal subfolder
      folders: [],
      files: [
        {
          id: "f1-2-file1",
          name: "Budget.xlsx",
          type: "spreadsheet",
          size: "0.5 MB",
          updatedAt: "2023-04-03T15:35:00Z",
          content: "Personal budget spreadsheet with expenses and income.",
        },
      ],
    },
    "f2-1": {
      // Vacation subfolder
      folders: [],
      files: [
        {
          id: "f2-1-file1",
          name: "Beach.jpg",
          type: "image",
          size: "4.2 MB",
          updatedAt: "2023-04-06T11:35:00Z",
          content: "Beach photo from summer vacation.",
        },
      ],
    },
    "f2-2": {
      // Family subfolder
      folders: [],
      files: [
        {
          id: "f2-2-file1",
          name: "Family Reunion.jpg",
          type: "image",
          size: "3.8 MB",
          updatedAt: "2023-04-04T15:35:00Z",
          content: "Family reunion photo from last Christmas.",
        },
      ],
    },
    "f3-1": {
      // Website Redesign subfolder
      folders: [],
      files: [
        {
          id: "f3-1-file1",
          name: "Mockups.psd",
          type: "image",
          size: "15.2 MB",
          updatedAt: "2023-04-11T11:35:00Z",
          content: "Website redesign mockups with new layout and colors.",
        },
      ],
    },
  },
  storage: {
    used: 5.4,
    total: 15,
    percentage: 36,
  },
}

export function Drive() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [currentPath, setCurrentPath] = useState<string[]>([])
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null)

  const getCurrentFolders = () => {
    if (!currentFolderId) {
      return mockData.rootFolders
    }
    return mockData.folderContents[currentFolderId]?.folders || []
  }

  const getCurrentFiles = () => {
    if (!currentFolderId) {
      return mockData.rootFiles
    }
    return mockData.folderContents[currentFolderId]?.files || []
  }

  const filteredFolders = getCurrentFolders().filter((folder) =>
    folder.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredFiles = getCurrentFiles().filter((file) => file.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  const handleFolderClick = (folderId: string, folderName: string) => {
    setCurrentPath([...currentPath, folderName])
    setCurrentFolderId(folderId)
  }

  const handleBreadcrumbClick = (index: number) => {
    const newPath = currentPath.slice(0, index + 1)
    setCurrentPath(newPath)

    if (index === -1) {
      // Root folder
      setCurrentFolderId(null)
    } else {
      // Find the folder ID for this path level
      const folderIds = [null, ...getFolderIdsFromPath()]
      setCurrentFolderId(folderIds[index + 1])
    }
  }

  const getFolderIdsFromPath = () => {
    let folders = mockData.rootFolders
    const folderIds: string[] = []

    for (const pathSegment of currentPath) {
      const folder = folders.find((f) => f.name === pathSegment)
      if (folder) {
        folderIds.push(folder.id)
        folders = mockData.folderContents[folder.id]?.folders || []
      }
    }

    return folderIds
  }

  const handleFileClick = (file: any) => {
    setSelectedFile(file)
  }

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <header className="flex h-16 items-center border-b px-6">
        <div className="flex items-center gap-2 font-semibold">
          <File className="h-6 w-6 text-blue-500" />
          <span className="text-xl">Drive</span>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search in Drive"
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
          <Avatar>
            <AvatarImage src="/placeholder-user.jpg" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-background p-4">
          <div className="mb-8">
            <Button className="w-full justify-start gap-2" onClick={() => setIsUploadDialogOpen(true)}>
              <Plus className="h-4 w-4" />
              New
            </Button>
          </div>
          <nav className="grid gap-1">
            <Button variant="ghost" className="justify-start gap-2">
              <File className="h-4 w-4" />
              My Drive
            </Button>
            <Button variant="ghost" className="justify-start gap-2">
              <FileText className="h-4 w-4" />
              Shared with me
            </Button>
            <Button variant="ghost" className="justify-start gap-2">
              <Clock className="h-4 w-4" />
              Recent
            </Button>
            <Button variant="ghost" className="justify-start gap-2">
              <Star className="h-4 w-4" />
              Starred
            </Button>
            <Button variant="ghost" className="justify-start gap-2">
              <Trash className="h-4 w-4" />
              Trash
            </Button>
          </nav>
          <Separator className="my-4" />
          <div className="space-y-4">
            <div className="text-sm font-medium">Storage</div>
            <div className="text-sm text-muted-foreground">
              {mockData.storage.used} GB of {mockData.storage.total} GB used
            </div>
            <Progress value={mockData.storage.percentage} className="h-2" />
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-6">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center">
            <Button
              variant="ghost"
              className="font-medium"
              onClick={() => {
                setCurrentPath([])
                setCurrentFolderId(null)
              }}
            >
              My Drive
            </Button>
            {currentPath.map((path, index) => (
              <div key={index} className="flex items-center">
                <span className="mx-2 text-muted-foreground">/</span>
                <Button variant="ghost" className="font-medium" onClick={() => handleBreadcrumbClick(index)}>
                  {path}
                </Button>
              </div>
            ))}
          </div>

          {/* View controls */}
          <div className="mb-6 flex items-center justify-between">
            <div className="text-lg font-semibold">
              {currentPath.length > 0 ? currentPath[currentPath.length - 1] : "My Drive"}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="all" className="mb-6">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="folders">Folders</TabsTrigger>
              <TabsTrigger value="files">Files</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              {/* Folders */}
              {filteredFolders.length > 0 && (
                <>
                  <h2 className="mb-4 text-sm font-medium text-muted-foreground">Folders</h2>
                  {viewMode === "grid" ? (
                    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                      {filteredFolders.map((folder) => (
                        <div
                          key={folder.id}
                          className="group cursor-pointer rounded-lg border p-3 hover:bg-accent"
                          onClick={() => handleFolderClick(folder.id, folder.name)}
                        >
                          <div className="mb-2 flex items-center gap-2">
                            <Folder className="h-10 w-10 text-blue-500" />
                            <div className="flex-1 truncate font-medium">{folder.name}</div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Rename</DropdownMenuItem>
                                <DropdownMenuItem>Share</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {folder.items} items • Updated {formatDate(folder.updatedAt)}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="mb-8 rounded-lg border">
                      <div className="grid grid-cols-[1fr_auto_auto] gap-4 p-3 font-medium text-muted-foreground">
                        <div>Name</div>
                        <div>Items</div>
                        <div>Last modified</div>
                      </div>
                      {filteredFolders.map((folder) => (
                        <div
                          key={folder.id}
                          className="grid cursor-pointer grid-cols-[1fr_auto_auto] items-center gap-4 border-t p-3 hover:bg-accent"
                          onClick={() => handleFolderClick(folder.id, folder.name)}
                        >
                          <div className="flex items-center gap-2">
                            <Folder className="h-5 w-5 text-blue-500" />
                            <span className="font-medium">{folder.name}</span>
                          </div>
                          <div className="text-sm text-muted-foreground">{folder.items}</div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">{formatDate(folder.updatedAt)}</span>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Rename</DropdownMenuItem>
                                <DropdownMenuItem>Share</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Files */}
                  {filteredFiles.length > 0 && (
                    <>
                      <h2 className="mb-4 text-sm font-medium text-muted-foreground">Files</h2>
                      {viewMode === "grid" ? (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                          {filteredFiles.map((file) => (
                            <div
                              key={file.id}
                              className="group cursor-pointer rounded-lg border p-3 hover:bg-accent"
                              onClick={() => handleFileClick(file)}
                            >
                              <div className="mb-2 flex items-center gap-2">
                                <FileIcon type={file.type} />
                                <div className="flex-1 truncate font-medium">{file.name}</div>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                    <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Download</DropdownMenuItem>
                                    <DropdownMenuItem>Rename</DropdownMenuItem>
                                    <DropdownMenuItem>Share</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {file.size} • Updated {formatDate(file.updatedAt)}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="rounded-lg border">
                          <div className="grid grid-cols-[1fr_auto_auto] gap-4 p-3 font-medium text-muted-foreground">
                            <div>Name</div>
                            <div>Size</div>
                            <div>Last modified</div>
                          </div>
                          {filteredFiles.map((file) => (
                            <div
                              key={file.id}
                              className="grid cursor-pointer grid-cols-[1fr_auto_auto] items-center gap-4 border-t p-3 hover:bg-accent"
                              onClick={() => handleFileClick(file)}
                            >
                              <div className="flex items-center gap-2">
                                <FileIcon type={file.type} />
                                <span className="font-medium">{file.name}</span>
                              </div>
                              <div className="text-sm text-muted-foreground">{file.size}</div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">{formatDate(file.updatedAt)}</span>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                    <Button variant="ghost" size="icon">
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Download</DropdownMenuItem>
                                    <DropdownMenuItem>Rename</DropdownMenuItem>
                                    <DropdownMenuItem>Share</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </TabsContent>
            <TabsContent value="folders">
              {filteredFolders.length > 0 ? (
                viewMode === "grid" ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {filteredFolders.map((folder) => (
                      <div
                        key={folder.id}
                        className="group cursor-pointer rounded-lg border p-3 hover:bg-accent"
                        onClick={() => handleFolderClick(folder.id, folder.name)}
                      >
                        <div className="mb-2 flex items-center gap-2">
                          <Folder className="h-10 w-10 text-blue-500" />
                          <div className="flex-1 truncate font-medium">{folder.name}</div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                              <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Rename</DropdownMenuItem>
                              <DropdownMenuItem>Share</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {folder.items} items • Updated {formatDate(folder.updatedAt)}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg border">
                    <div className="grid grid-cols-[1fr_auto_auto] gap-4 p-3 font-medium text-muted-foreground">
                      <div>Name</div>
                      <div>Items</div>
                      <div>Last modified</div>
                    </div>
                    {filteredFolders.map((folder) => (
                      <div
                        key={folder.id}
                        className="grid cursor-pointer grid-cols-[1fr_auto_auto] items-center gap-4 border-t p-3 hover:bg-accent"
                        onClick={() => handleFolderClick(folder.id, folder.name)}
                      >
                        <div className="flex items-center gap-2">
                          <Folder className="h-5 w-5 text-blue-500" />
                          <span className="font-medium">{folder.name}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">{folder.items}</div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">{formatDate(folder.updatedAt)}</span>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Rename</DropdownMenuItem>
                              <DropdownMenuItem>Share</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                <div className="flex h-40 items-center justify-center text-muted-foreground">No folders found</div>
              )}
            </TabsContent>
            <TabsContent value="files">
              {filteredFiles.length > 0 ? (
                viewMode === "grid" ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {filteredFiles.map((file) => (
                      <div
                        key={file.id}
                        className="group cursor-pointer rounded-lg border p-3 hover:bg-accent"
                        onClick={() => handleFileClick(file)}
                      >
                        <div className="mb-2 flex items-center gap-2">
                          <FileIcon type={file.type} />
                          <div className="flex-1 truncate font-medium">{file.name}</div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                              <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Download</DropdownMenuItem>
                              <DropdownMenuItem>Rename</DropdownMenuItem>
                              <DropdownMenuItem>Share</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {file.size} • Updated {formatDate(file.updatedAt)}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg border">
                    <div className="grid grid-cols-[1fr_auto_auto] gap-4 p-3 font-medium text-muted-foreground">
                      <div>Name</div>
                      <div>Size</div>
                      <div>Last modified</div>
                    </div>
                    {filteredFiles.map((file) => (
                      <div
                        key={file.id}
                        className="grid cursor-pointer grid-cols-[1fr_auto_auto] items-center gap-4 border-t p-3 hover:bg-accent"
                        onClick={() => handleFileClick(file)}
                      >
                        <div className="flex items-center gap-2">
                          <FileIcon type={file.type} />
                          <span className="font-medium">{file.name}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">{file.size}</div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">{formatDate(file.updatedAt)}</span>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Download</DropdownMenuItem>
                              <DropdownMenuItem>Rename</DropdownMenuItem>
                              <DropdownMenuItem>Share</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                <div className="flex h-40 items-center justify-center text-muted-foreground">No files found</div>
              )}
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* Upload Dialog */}
      <FileUploadDialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen} />

      {/* File Preview Dialog */}
      <FilePreviewDialog
        file={selectedFile}
        open={!!selectedFile}
        onOpenChange={(open) => !open && setSelectedFile(null)}
      />
    </div>
  )
}

function FileIcon({ type }: { type: string }) {
  switch (type) {
    case "document":
      return <FileText className="h-10 w-10 text-blue-500" />
    case "spreadsheet":
      return <FileSpreadsheet className="h-10 w-10 text-green-500" />
    case "presentation":
      return <FilePresentation className="h-10 w-10 text-yellow-500" />
    case "image":
      return <FileImage className="h-10 w-10 text-purple-500" />
    case "text":
      return <FileText className="h-10 w-10 text-gray-500" />
    default:
      return <File className="h-10 w-10 text-gray-500" />
  }
}

function Clock(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function FileImage(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <circle cx="10" cy="13" r="2" />
      <path d="m20 17-1.09-1.09a2 2 0 0 0-2.82 0L10 22" />
    </svg>
  )
}

function FilePresentation(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M9 15v-4" />
      <path d="M12 15v-2" />
      <path d="M15 15v-6" />
    </svg>
  )
}

function FileSpreadsheet(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M8 13h2" />
      <path d="M8 17h2" />
      <path d="M14 13h2" />
      <path d="M14 17h2" />
    </svg>
  )
}

function Star(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

function Trash(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}
