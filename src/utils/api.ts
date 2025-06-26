import Filters from "@/types/filters"

export async function uploadFile(payload: {
  nome: string
  descricao: string
  categoria: string
  lotacao: string
  conteudo: string
}) {
  const response = await fetch('http://localhost:3000/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Erro ao enviar arquivo')
  }

  return await response.json()
}

export async function getFiles(filters: Filters & { page: number; limit?: number}) {
  const url = new URL("http://localhost:3000/files")

  if (filters.search?.trim()) {
    url.searchParams.append("search", filters.search.trim())
  }

  if (filters.category && filters.category !== "" && filters.category !== "Todas as categorias") {
    url.searchParams.append("category", filters.category)
  }

  if (filters.date && !isNaN(Date.parse(filters.date))) {
    url.searchParams.append("date", filters.date)
  }
    if (filters.page) {
    url.searchParams.append("page", filters.page.toString())
  }
  
  url.searchParams.append("limit", (filters.limit || 10).toString())

  console.log("[getFiles] URL final:", url.toString())

  try {
    const res = await fetch(url.toString())
    if (!res.ok) throw new Error("Erro ao buscar arquivos")
    return await res.json()
  } catch (err) {
    console.error("[getFiles] Erro ao buscar arquivos:", err)
    throw err
  }
}
