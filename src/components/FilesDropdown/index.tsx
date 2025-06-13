"use client"
import { useState, useRef, useEffect } from "react"
import DropdownProps from "@/types/dropdown"

export default function Dropdown({ isPinned, onTogglePin, onDownload }: DropdownProps) {
  const [open, setOpen] = useState(false)
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

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="text-gray-500 hover:text-gray-700 cursor-pointer"
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="Abrir menu"
      >
        <i className="fas fa-ellipsis-v text-lg"></i>
      </button>

      <div className={`
        absolute right-0 mt-2 w-40 z-50 bg-white shadow-md rounded-lg border border-[#ececec] transition-all duration-200
        ${open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}
      `}>
        <button
          className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-t-lg flex items-center gap-2"
          onClick={onDownload}
        >
          <i className="fas fa-download text-blue-600"></i> Baixar
        </button>
        <button
          className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer flex rounded-b-lg items-center gap-2"
          onClick={() => {
            onTogglePin()
            setOpen(false)
          }}
        >
          <i className="fas fa-thumbtack text-blue-600"></i> {isPinned ? "Desafixar" : "Fixar"}
        </button>
      </div>
    </div>
  )
}
