"use client"
import { useEffect, useRef, useState } from "react"
import FilesCard from "../FilesCard"
import { getFiles } from "@/utils/api"
import Filters from "@/types/filters"

export default function SectionFiles({ filters }: { filters: Filters }) {
  const [files, setFiles] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const observerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setFiles([])
    setPage(1)
    setHasMore(true)
  }, [filters])

  useEffect(() => {
    const fetchFiles = async () => {
      if (!hasMore) return

      setIsLoading(true)
      try {
        const data = await getFiles(filters, page, 10)
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
        setFiles(prev => [...prev, ...formatted])
        if (data.length < 10) setHasMore(false)
      } catch (err) {
        console.error("[SectionFiles] Erro ao buscar arquivos:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFiles()
  }, [page, filters])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setPage(prev => prev + 1)
        }
      },
      { threshold: 1.0 }
    )

    const el = observerRef.current
    if (el) observer.observe(el)

    return () => {
      if (el) observer.unobserve(el)
    }
  }, [hasMore, isLoading])

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

        {isLoading && (
          <div className="flex justify-center py-4">
            <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <div ref={observerRef} className="h-1" />
      </div>
    </div>
  )
}
