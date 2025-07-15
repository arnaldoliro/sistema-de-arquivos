"use client"
import DropdownProps from "@/types/dropdown"
import { motion, AnimatePresence } from 'framer-motion'
import { fixFiles } from "@/utils/api"
import { useState } from "react"


export default function Dropdown({ isPinned, onTogglePin, onDownload, open, fileId }: DropdownProps & { fileId: number }) {
  const [loading, setLoading] = useState(false);

  const handleTogglePin = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setLoading(true);
    try {
      await fixFiles(fileId, !isPinned);
      onTogglePin();
    } catch (err) {
      // Pode adicionar um toast ou alerta de erro aqui
      console.error("Erro ao fixar/desafixar", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div 
         initial={{ opacity: 0, y: -10 }}
         animate={{ opacity: 1, y: 0 }}
         exit={{ opacity: 0, y: -10 }}
         transition={{ duration: 0.2 }}
         className="relative inline-block">
          <div className={`
            absolute right-0 mt-2 w-40 z-50 bg-white shadow-md rounded-lg border border-[#ececec] transition-all duration-200 
            ${open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}
          `}>
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-t-lg flex items-center gap-2"
              onClick={(e) => {
                e.stopPropagation();
                onDownload();
              }}
              disabled={loading}
            >
              <i className="fas fa-download text-blue-600"></i> Baixar
            </button>
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer flex rounded-b-lg items-center gap-2"
              onClick={handleTogglePin}
              disabled={loading}
            >
              <i className="fas fa-thumbtack text-blue-600"></i> {isPinned ? "Desafixar" : "Fixar"}
              {loading && <span className="ml-2 animate-spin">⏳</span>}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
