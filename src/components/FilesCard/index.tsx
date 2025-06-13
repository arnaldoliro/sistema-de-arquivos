"use client"
import Dropdown from "../FilesDropdown"

export default function FilesCard({ file, onTogglePin }: any) {
  return (
    <div
      className={`bg-white rounded-lg shadow-md p-4 relative transition-all ${
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
        <Dropdown isPinned={file.isPinned} onTogglePin={onTogglePin} />
      </div>
    </div>
  )
}
