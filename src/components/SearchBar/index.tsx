import SearchInput from "../SearchInput";
import SearchSelect from "../SearchSelect";

export default async function SearchBar() {
    return(
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-grow">
                        <SearchInput />
                    </div>
                    <div className="flex gap-4">
                        <SearchSelect />
                        <input type="date" id="dateFilter" className="border border-gray-300 rounded-2xl px-4 py-2 duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer" />
                        <button id="clearFilters" className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer">Limpar filtros</button>
                    </div>
                </div>
            </div>
    )
}