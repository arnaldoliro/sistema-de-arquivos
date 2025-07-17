"use client"
import { useModal } from "@/context/ModalContext"
import { useEffect, useState } from "react"
import { uploadFile } from "@/utils/api"
import { motion } from "framer-motion"
import getAcceptByCategory from "@/utils/categoryModalFilter"

export default function Modal({ onUploadSuccess }: { onUploadSuccess?: () => void }) {
    const { isOpen, closeModal } = useModal()
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    // Captura dos dados
    const [nome, setNome] = useState('')
    const [descricao, setDescricao] = useState('')
    const [categoria, setCategoria] = useState('Documento')
    const [lotacao, setLotacao] = useState('')
    const [arquivo, setArquivo] = useState<File | null>(null)
    const [originalFileName, setOriginalFileName] = useState('');
    const [mimeType, setMimeType] = useState('');
    const [isPinned, setIsPinned] = useState(false)
    const [mensagem, setMensagem] = useState('')
    const [success, setSuccess] = useState(false)
    
    const resetForm = () => {
      setNome('')
      setDescricao('')
      setCategoria('Documento')
      setLotacao('')
      setArquivo(null)
      setMensagem('')
    }


    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!arquivo) {
      setMensagem('Selecione um arquivo.')
      return
    }

    setLoading(true)
    setMensagem('')
    setError(false)

    const fileBuffer = await arquivo.arrayBuffer()
    const base64 = Buffer.from(fileBuffer).toString('base64')

    try {
      await uploadFile({ nome, descricao, categoria, lotacao, conteudo: base64, originalFileName, mimeType, isPinned })
      setLoading(false)
      setSuccess(true)
      // Aguarda 800ms antes de atualizar a lista para garantir que o backend já processou
      setTimeout(() => {
        if (onUploadSuccess) onUploadSuccess();
      }, 500);
      setTimeout(() => {
        closeModal()
        setSuccess(false)
        resetForm()
      }, 2000)
    } catch (err: any) {
        setLoading(false)
        setError(true)
        setMensagem(`Erro: ${err.message}`)
        
        setTimeout(() => {
            setError(false)
            resetForm()
        }, 2000)

    }
  }

    // Função para abrir, fechar e animar o form
    useEffect(() => {
     if (isOpen) {
      setShow(true)
     } else {
    
      const timeout = setTimeout(() => setShow(false), 100)
      return () => clearTimeout(timeout)
     }
    }, [isOpen])


    if (!isOpen && !show) return null

    if (loading) {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center flex flex-col items-center gap-3">
                <div className="loader border-4 border-blue-500 border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
                <p className="text-gray-700">Enviando arquivo...</p>
            </div>
        </div>
    )
    }

    if (error) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="bg-white rounded-lg shadow-xl p-6 text-center"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 10 }}
                        className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center mx-auto"
                    >
                        <i className="fas fa-times text-white text-2xl"></i>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mt-4 text-red-700 font-semibold"
                    >
                        {mensagem}
                    </motion.p>
                </motion.div>
            </motion.div>
        )
    }

    return (
        
        <div className={`fixed inset-0 bg-[#00000079] items-center flex justify-center z-50 tion-opacity duration-500 ${isOpen ? "bg-black/50 opacity-100" : "opacity-0 pointer-events-none"}`}>
         {!success && (
          <div className={`bg-white rounded-lg shadow-xl w-full max-w-md p-6 transform transition-all duration-500 ${isOpen ? "scale-85 opacity-100 translate-y-0" : "scale-50 opacity-0 translate-y-4"}`}>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Enviar Novo Arquivo</h3>
                <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 cursor-pointer">
                    <i className="fas fa-times"></i>
                </button>
            </div>
             <form className="space-y-4" onSubmit={handleSubmit}>
                <div>                   
                    <label className="block text-gray-700 mb-2">Nome do Arquivo</label>
                    <input value={nome} onChange={e => setNome(e.target.value)} type="text" required className="duration-300 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">Descrição</label>
                    <textarea value={descricao} onChange={e => setDescricao(e.target.value)} className="duration-300 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">Categoria</label>
                    <select value={categoria} onChange={e => setCategoria(e.target.value)} required className="cursor-pointer duration-300 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Selecione uma categoria</option>
                        <option value="Documento">Documentos</option>
                        <option value="Imagem">Imagens</option>
                        <option value="Planilha">Planilhas</option>
                        <option value="Apresentação">Apresentações</option>
                        <option value="Outros">Outros</option>
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700 mb-2" >Lotação</label>
                    <input value={lotacao} onChange={e => setLotacao(e.target.value)} type="text" required className="duration-300 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">Arquivo</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <input id="file-upload" type="file" className="hidden" accept={getAcceptByCategory(categoria)}
                            onChange={async (e) => {
                                const file = e.target.files?.[0] || null;
                                setArquivo(file);

                                if (file) {
                                  setOriginalFileName(file.name);
                                  setMimeType(file.type)
                                  const arrayBuffer = await file.arrayBuffer();
                                  const base64 = Buffer.from(arrayBuffer).toString("base64");
                                  console.log("Tipo de Arquivo", file.type)
                                  console.log("📂 Arquivo selecionado:", file.name);
                                  console.log("📦 Base64 gerado (cortado):", base64.slice(0, 100) + "...");
                                }
                            }}
                        />
                        <label htmlFor="file-upload" className="cursor-pointer">
                            <i className="fas fa-cloud-upload-alt text-4xl text-blue-500 mb-2"></i>
                            <p className="text-gray-700">Clique para selecionar ou arraste um arquivo</p>
                            <p className="text-sm text-blue-600 mt-2"></p>
                        </label>
                        {arquivo && (
                            <div className="mt-4">
                                <p className="text-sm text-gray-600">Arquivo selecionado:</p>
                                <p className="text-blue-600 font-medium break-all">{arquivo.name}</p>
                            </div>
                        )}                        
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <input className="cursor-pointer" type="checkbox" checked={isPinned} onChange={(e) => setIsPinned(e.target.checked)}/>
                    <label>Fixar Arquivo</label>
                </div>
                <div className="flex justify-end">
                    <button type="button" onClick={closeModal} className="px-4 py-2 text-gray-700 font-medium mr-2 cursor-pointer">Cancelar</button>
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg cursor-pointer duration-300">Enviar</button>
                </div>
            </form>
          </div>
         )}
         <div>
            {success && (
                <div className="bg-white rounded-lg flex flex-col justify-center items-center text-center shadow-xl w-full max-w-md p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-gray-800">Enviar Novo Arquivo</h3>
                    </div>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{
                            duration: 0.8,
                            type: "spring",
                            stiffness: 300,
                            damping: 15
                        }}
                        className="items-center text-center justify-center h-24"
                    >
                        <div className="w-16 h-16 rounded-full bg-green-500 flex items-center text-center mx-auto mt-3 justify-center">
                            <i className="fas fa-check text-white text-2xl"></i>
                        </div>
                    </motion.div>
                </div>
            )}
         </div>
        </div>
              
    )
}
