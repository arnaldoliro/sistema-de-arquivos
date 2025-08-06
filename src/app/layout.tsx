import type { Metadata } from "next";
import { ModalProvider } from "@/context/ModalContext"
import "./globals.css";
import Header from "@/components/Header";
// import Modal from "@/components/UploadModal";

export const metadata: Metadata = {
  title: "Sistemas de Arquivos"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="pt-br">
      <head>
        <link  rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <ModalProvider>
          <header className="bg-white shadow-md">
            <Header />
          </header>
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </ModalProvider>
      </body>
    </html>
  );
}
