import type { Metadata } from "next";
import Header from "@/components/Header";
import "./globals.css";

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
      <body className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <header className="bg-white shadow-md">
          <Header />
        </header>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        <footer>
          
        </footer>
      </body>
    </html>
  );
}
