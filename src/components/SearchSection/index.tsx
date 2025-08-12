"use client"
import SearchInput from "../SearchInput"
import SearchSelect from "../SearchSelect"
import { useState, useEffect } from "react"
import Filters from "@/types/filters"

type SearchBarProps = {
  onSearch: (filters: Filters) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("Todas as categorias")
  const [date, setDate] = useState("")

  useEffect(() => {
    onSearch({
      search: search.trim() || undefined,
      category: category !== "Todas as categorias" ? category : undefined,
      date: date || undefined,
    })
  }, [search, category, date, onSearch])

  const clearFilters = () => {
    setSearch("")
    setCategory("Todas as categorias")
    setDate("")
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-grow">
          <SearchInput
            value={search}
            onChange={setSearch}  
            onDebouncedSearch={setSearch}
          />
        </div>
        <div className="flex gap-4 items-center">
          <SearchSelect selected={category} onSelect={setCategory} />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-gray-300 rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={clearFilters}
            className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
          >
            Limpar filtros
          </button>
        </div>
      </div>
    </div>
  )
}
