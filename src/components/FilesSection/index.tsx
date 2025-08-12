"use client"
import { useEffect, useRef, useState } from "react"
import FilesCard from "../FilesCard"
import { getFiles } from "@/utils/api"
import Filters from "@/types/filters"
import Spinner from "../Spinner"
import FileItem from "@/types/files"

export default function SectionFiles({ filters }: { filters: Filters }) {
  const [files, setFiles] = useState<FileItem[]>([])
  const [error, setError] = useState("")
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [retryCountdown, setRetryCountdown] = useState<number | null>(null)

  const observerRef = useRef(null) 
  const initialLoadRef = useRef(true)

  const resetFilesList = () => {
    setPage(1)
    setFiles([])
    setHasMore(true)
    initialLoadRef.current = true
    setRetryCountdown(null)
  }

  useEffect(() => {
    resetFilesList()
  }, [filters])

  useEffect(() => {
    if (!hasMore || isLoading) return

    const fetchFiles = async () => {
      setIsLoading(true)
      const startTime = Date.now()

      try {
        const data = await getFiles(
          { ...filters, page },
          5,
          5000,
          (seconds) => setRetryCountdown(seconds)
        )

        const formatted: FileItem[] = data.map((file: any) => ({
          id: file.id,
          title: file.nome,
          description: file.descricao,
          category: file.categoria,
          date: new Date(file.criadoEm).toLocaleDateString("pt-BR"),
          tags: [file.lotacao],
          isPinned: file.fixado ?? false,
        }))

        setFiles((prev) => {
          if (initialLoadRef.current) {
            initialLoadRef.current = false
            return formatted
          }
          const uniqueNew = formatted.filter(
            (newFile) => !prev.some((prevFile) => prevFile.id === newFile.id)
          )
          return [...prev, ...uniqueNew]
        })

        setHasMore(data.length === 12)
        setRetryCountdown(null)
        setError("")
      } catch (err: any) {
        console.error("[SectionFiles] Erro ao buscar arquivos:", err)
        setError(err.message || "Erro desconhecido")
      }

      const elapsed = Date.now() - startTime
      const MIN_LOADING_TIME = 1000
      if (elapsed < MIN_LOADING_TIME) {
        await new Promise((res) => setTimeout(res, MIN_LOADING_TIME - elapsed))
      }

      setIsLoading(false)
    }

    fetchFiles()
  }, [filters, page])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !isLoading) {
        setPage((prev) => prev + 1)
      }
    })

    if (observerRef.current) observer.observe(observerRef.current)

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current)
    }
  }, [hasMore, isLoading])

  const pinnedFiles = files.filter((file) => file.isPinned)
  const unpinnedFiles = files.filter((file) => !file.isPinned)

  return (
    <div>
      {error && (
        <div className="mb-4 p-4 rounded-xl bg-red-100 text-red-700 font-medium shadow">
          Erro ao buscar arquivos: {error}
        </div>
      )}

      {retryCountdown !== null && (
        <div className="mb-4 p-2 rounded-xl bg-yellow-100 text-yellow-800 font-medium shadow">
          Próxima tentativa em: {retryCountdown}s
        </div>
      )}

      {pinnedFiles.length > 0 && (
        <div className="mb-8">
          <h1 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <i className="fas fa-thumbtack text-blue-600 mr-2"></i> Arquivos Fixados
          </h1>
          <div className="grid grid-cols-1 gap-4">
            {pinnedFiles.map((file, index) => (
              <FilesCard
                key={`${file.id}-${index}`}
                file={file}
              />
            ))}
          </div>
        </div>
      )}

      <div className="mb-5">
        <h1 className="text-xl font-semibold text-gray-800 mb-4">Todos os Arquivos</h1>
        <div className="grid grid-cols-1 gap-4">
          {unpinnedFiles.map((file, index) => (
            <FilesCard
              key={`${file.id}-${index}`}
              file={file}
            />
          ))}
        </div>
      </div>

      {isLoading && <Spinner />}
      <div ref={observerRef} className="h-1" />
    </div>
  )
}
