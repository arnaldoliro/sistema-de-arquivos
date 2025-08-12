"use client"
import { useState, useRef, useEffect } from "react"
import Option from "@/types/option"


export default function SearchSelect({
  selected,
  onSelect,
}: {
  selected: string
  onSelect: (val: string) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const options: Option[] = [
    { label: "Todas as categorias", value: "" },
    { label: "Documentos", value: "Documento" },
    { label: "Imagens", value: "Imagem" },
    { label: "Planilhas", value: "Planilha" },
    { label: "Apresentações", value: "Apresentação" },
    { label: "Outros", value: "Outros" },
  ]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const selectedLabel = options.find((o) => o.value === selected)?.label ?? "Todas as categorias"

  return (
    <div ref={ref} className="relative w-64">
      <button
        onClick={() => setOpen(!open)}
        className="w-full border border-gray-300 rounded-2xl text-sm md:text-md text-center py-1 px-5 md:py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 cursor-pointer"
      >
        {selectedLabel}
      </button>

      {open && (
        <ul className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow">
          {options.map((option) => (
            <li
              key={option.value}
              className={`px-1 py-2 text-center border-b-1 border-[#eee] sm:border-0 hover:bg-blue-100 cursor-pointer text-sm ${(option.value === 'Outros') ? "border-b-1" : "border-0"}`}
              onClick={() => {
                onSelect(option.value)
                setOpen(false)
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
