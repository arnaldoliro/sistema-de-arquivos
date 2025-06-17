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

export async function getFiles() {
  const res = await fetch("http://localhost:3000/files") // ou /list dependendo da rota
  if (!res.ok) throw new Error("Erro ao buscar arquivos")
  return res.json()
}
