"use client"
import { useModal } from "@/context/ModalContext"

export default function Header() {
    return (
        <div className="container mx-auto px-4 py-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Sistema de Arquivos</h1>
            </div>
        </div>
    )
}