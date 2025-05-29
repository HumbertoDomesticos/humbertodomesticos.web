import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ProdutoProvider } from "./context/ProdutosContext";
// import { AuthProvider } from "./context/AuthContext";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "HumbertoDomésticos",
  description: "Trabalho de criação de empresas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <main>
          {/* <AuthProvider> */}
            <ProdutoProvider>
              {children}
            </ProdutoProvider>
          {/* </AuthProvider> */}
        </main>
      </body>
    </html>
  );
}
