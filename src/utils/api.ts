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
