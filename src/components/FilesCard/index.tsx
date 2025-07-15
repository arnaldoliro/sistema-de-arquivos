"use client"
import { useEffect, useRef, useState } from "react";
import Dropdown from "../FilesDropdown"
import { downloadArquivo } from '@/utils/api';

export default function FilesCard({ file, onTogglePin }: any) {
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)  
  
  const handleDownload = () => {
    downloadArquivo(file.id);
    setOpen(false)
  };

  const handleTogglePin = () => {
    onTogglePin();
    setOpen(false);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if(ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open])

  useEffect(() => {
  let timeout: NodeJS.Timeout;

  if (open) {
    setVisible(true);
  } else {
    timeout = setTimeout(() => {
      setVisible(false);
    }, 200);
  }

  return () => clearTimeout(timeout);
}, [open]);
  return (
     <div
       ref={ref}
       onClick={() => setOpen((prev) => !prev)}
       className={`bg-white rounded-lg shadow-md p-4 relative transition-all duration-300 transform hover:scale-105 hover:shadow-lg cursor-pointer ${
         file.isPinned ? "border-l-4 border-blue-500" : ""
       }`}
     >
      <div className="flex justify-between">
        <div className="flex items-start">
          <div className="text-2xl text-blue-600 mr-4">
            <i className={`fas fa-file-${file.type === "pdf" ? "pdf" : "alt"}`}></i>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{file.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{file.description}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">{file.category}</span>
              {file.tags.map((tag: string, idx: number) => (
                <span key={idx} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))}
              <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">{file.date}</span>
            </div>
          </div>
        </div>
        <div>
          <button
            className="text-gray-500 hover:bg-gray-300 w-6 rounded-full transition-all duration-300 hover:text-gray-700 cursor-pointer">
            <i className="fas fa-ellipsis-v text-lg"></i>
          </button>
          {visible && (
            <Dropdown
              isPinned={file.isPinned}
              onTogglePin={handleTogglePin}
              onDownload={handleDownload}
              open={open}
              fileId={file.id}
            />
          )}
        </div>
      </div>
    </div>
  )
}

