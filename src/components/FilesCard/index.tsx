export default async function FilesCard() {
    return(
        <div className="file-card bg-white rounded-lg shadow-md p-4 pinned">
         <div className="flex justify-between">
          <div className="flex items-start">
            <div className="text-2xl text-blue-600 mr-4">
                <i className="fas fa-file-pdf"></i>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Relatório Anual 2023.pdf</h3>
              <p className="text-sm text-gray-600 mt-1">Relatório financeiro anual da empresa</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Documentos</span>
                <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">Financeiro</span>
                <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">14/12/2023</span>
               </div>
            </div>
           </div>
          </div>
        </div>
    )
}