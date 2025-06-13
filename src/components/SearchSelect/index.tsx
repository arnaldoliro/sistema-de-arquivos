"use client"
import { useState, useRef, useEffect } from "react"

export default function SearchSelect() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState("Todas as categorias")
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open])

  const options = [
    "Todas as categorias",
    "Documentos",
    "Imagens",
    "Planilhas",
    "Apresentações",
    "Outros",
  ]

  return (
    <div ref={ref} className="relative w-64">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full border border-gray-300 rounded-2xl px-4 py-2 bg-white text-left focus:outline-none focus:ring-2 focus:ring-blue-500 duration-200 cursor-pointer"
      >
        {selected}
      </button>

      <ul
        className={`absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow transition-all duration-200 overflow-hidden ${
          open ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {options.map((option) => (
          <li
            key={option}
            className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-sm"
            onClick={() => {
              setSelected(option)
              setOpen(false)
            }}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  )
}
