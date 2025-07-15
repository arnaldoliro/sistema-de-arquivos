// Importar o icon

export default async function Header() {
    return (
        <div className="container mx-auto px-4 py-6">
            <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800">Sistema de Arquivos</h1>
                    <button className="bg-blue-600 transform transition duration-500 ease-in-out hover:scale-105 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-xl shadow-md flex items-center cursor-pointer">
                        <i className="fas fa-upload mr-2"></i> Enviar Arquivo
                    </button>
                </div>
        </div>
    )
}