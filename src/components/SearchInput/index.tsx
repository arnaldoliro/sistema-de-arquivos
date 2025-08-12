"use client"
import { useEffect } from "react"

export default function SearchInput({
  value,
  onChange,
  onDebouncedSearch,
}: {
  value: string
  onChange: (val: string) => void
  onDebouncedSearch: (val: string) => void
}) {
  useEffect(() => {
  const timeout = setTimeout(() => {
    onDebouncedSearch(value)
  }, 600)

  return () => clearTimeout(timeout)
}, [value, onDebouncedSearch])


  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Buscar arquivos..."
        className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-2xl duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="absolute left-3 top-2.5 text-gray-400">
        <i className="fas fa-search"></i>
      </div>
    </div>
  )
}
