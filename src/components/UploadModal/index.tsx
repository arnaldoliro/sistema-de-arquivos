"use client"
import { useModal } from "@/context/ModalContext"

export default function Modal() {
    const { isOpen, closeModal } = useModal()

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-[#00000079] items-center flex justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Enviar Novo Arquivo</h3>
                <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 cursor-pointer">
                    <i className="fas fa-times"></i>
                </button>
            </div>
            <form className="space-y-4">
                <div>                   
                    <label className="block text-gray-700 mb-2">Nome do Arquivo</label>
                    <input type="text" required className="duration-300 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">Descrição</label>
                    <textarea className="duration-300 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">Categoria</label>
                    <select required className="duration-300 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Selecione uma categoria</option>
                        <option value="Documentos">Documentos</option>
                        <option value="Imagens">Imagens</option>
                        <option value="Planilhas">Planilhas</option>
                        <option value="Apresentações">Apresentações</option>
                        <option value="Outros">Outros</option>
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700 mb-2" >Lotação</label>
                    <input type="text" required className="duration-300 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">Arquivo</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <input type="file"  className="hidden" />
                        <label className="cursor-pointer">
                            <i className="fas fa-cloud-upload-alt text-4xl text-blue-500 mb-2"></i>
                            <p className="text-gray-700">Clique para selecionar ou arraste um arquivo</p>
                            <p className="text-sm text-blue-600 mt-2"></p>
                        </label>
                    </div>
                </div>
                <div className="flex justify-end">
                    <button type="button" onClick={closeModal} className="px-4 py-2 text-gray-700 font-medium mr-2 cursor-pointer">Cancelar</button>
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg cursor-pointer duration-300">Enviar</button>
                </div>
            </form>
        </div>
    </div>  
    )
}