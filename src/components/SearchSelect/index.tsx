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
        className="w-full border border-gray-300 rounded-2xl px-4 py-2 bg-white text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {selectedLabel}
      </button>

      {open && (
        <ul className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow">
          {options.map((option) => (
            <li
              key={option.value}
              className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-sm"
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
