import FilesCard from "../FilesCard";

export default async function PinnedFiles() {
    return(
        <div className="mb-8">
          <h1 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <i className="fas fa-thumbtack text-blue-600 mr-2"></i> Arquivos Fixados
          </h1>
            <div id="pinnedFilesList" className="grid grid-cols-1 gap-4">
              <FilesCard />
            </div>
        </div>
    )
}