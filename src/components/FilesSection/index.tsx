"use client"
import { useState} from "react"
import FilesCard from "../FilesCard"
import filesMock from "@/data/filesmock"

export default function SectionFiles() {
  const [files, setFiles] = useState(filesMock)

  const handleTogglePin = (id: number) => {
    setFiles(prev =>
      prev.map(file =>
        file.id === id ? { ...file, isPinned: !file.isPinned } : file
      )
    )
  }

  const pinnedFiles = files.filter(file => file.isPinned)
  const unpinnedFiles = files.filter(file => !file.isPinned)

  return (
    <div>
      {pinnedFiles.length > 0 && (
        <div className="mb-8">
          <h1 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <i className="fas fa-thumbtack text-blue-600 mr-2"></i> Arquivos Fixados
          </h1>
          <div className="grid grid-cols-1 gap-4">
            {pinnedFiles.map(file => (
              <FilesCard key={file.id} file={file} onTogglePin={() => handleTogglePin(file.id)} />
            ))}
          </div>
        </div>
      )}

      <div>
        <h1 className="text-xl font-semibold text-gray-800 mb-4">Todos os Arquivos</h1>
        <div className="grid grid-cols-1 gap-4">
          {unpinnedFiles.map(file => (
            <FilesCard key={file.id} file={file} onTogglePin={() => handleTogglePin(file.id)} />
          ))}
        </div>
      </div>
    </div>
  )
}
