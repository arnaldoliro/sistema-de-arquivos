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
      <body>
        <header className="bg-white shadow-md">
          <Header />
        </header>
        <main>
          {children}
        </main>
        <footer>
          
        </footer>
      </body>
    </html>
  );
}
