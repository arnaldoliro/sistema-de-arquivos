import FileItem from "@/types/files"

const files: FileItem[] = [
  {
    id: 1,
    title: "Relatório Anual 2023.pdf",
    description: "Relatório financeiro anual da empresa",
    tags: ["Financeiro"],
    category: "Documentos",
    date: "14/12/2023",
    type: "pdf",
    isPinned: true,
  },
  {
    id: 2,
    title: "Plano Estratégico 2024.pdf",
    description: "Documento estratégico confidencial",
    tags: ["Estratégia"],
    category: "Documentos",
    date: "10/01/2024",
    type: "pdf",
    isPinned: false,
  }
]

export default files
