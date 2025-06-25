"use client"
import { useEffect, useState } from "react"
import FilesCard from "../FilesCard"
import { getFiles } from "@/utils/api"
import Filters from "@/types/filters"

export default function SectionFiles({ filters }: { filters: Filters }) {
  const [files, setFiles] = useState<any[]>([])
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        console.log("[SectionFiles] Chamando getFiles com:", filters)
        const data = await getFiles(filters)
        console.log("[SectionFiles] Arquivos recebidos:", data)

        const formatted = data.map((file: any) => ({
          id: file.id,
          title: file.nome,
          description: file.descricao,
          category: file.categoria,
          date: new Date(file.criadoEm).toLocaleDateString("pt-BR"),
          tags: [file.lotacao],
          type: "pdf",
          isPinned: false,
        }))
        setFiles(formatted)
      } catch (err: any) {
        setError(err.message)
      }
    }

    fetchFiles()
  }, [filters])

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
