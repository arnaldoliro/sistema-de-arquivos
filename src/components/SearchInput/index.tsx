export default async function SearchInput() {
    return (
        <div className="relative">
            <input type="text" id="searchInput" placeholder="Buscar arquivos..." className="w-full pl-3 pr-4 py-2 border border-gray-300 rounded-2xl duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <div className="absolute left-3 top-2.5 text-gray-400">
                <i className="fas fa-search"></i>
            </div>
        </div>
    )
}