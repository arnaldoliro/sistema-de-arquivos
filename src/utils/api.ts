import Filters from "@/types/filters"

export async function uploadFile(payload: {
  nome: string
  descricao: string
  categoria: string
  lotacao: string
  conteudo: string
  originalFileName: string
  mimeType: string
  isPinned: boolean
}) {
  try {
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
  } catch (error: unknown) {
    console.error('Erro ao enviar arquivo:', error)
    throw error
  }
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
    const skip = (filters.page - 1) * (filters.limit || 10)
    url.searchParams.append("skip", skip.toString())
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

export async function downloadArquivo(id: number): Promise<void> {
  try {
    const response = await fetch(`http://localhost:3000/files/${id}/download`);

    if (!response.ok) {
      throw new Error('Erro ao baixar o arquivo');
    }


    const disposition = response.headers.get('Content-Disposition');
    let fileName = 'arquivo';

    console.log('Headers:', [...response.headers.entries()]);

    if (disposition) {
      const match = disposition.match(/filename\*=UTF-8''([^;]+)|filename="?([^";]+)"?/);
      if (match) {
        fileName = decodeURIComponent(match[1] || match[2]);
      }
    }

    console.log(fileName)

    const blob = await response.blob();

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();

    URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error('Erro ao baixar arquivo:', error);
  }
}

export async function fixFiles(id: number, isPinned: boolean) {
  const response = await fetch(`http://localhost:3000/files/${id}/fix`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ isPinned }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erro ao fixar');
  }

  return await response.json();
}