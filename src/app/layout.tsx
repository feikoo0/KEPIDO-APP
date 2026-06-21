import type { Metadata } from "next";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import FloatingCartBar from "@/components/FloatingCartBar";

export const metadata: Metadata = {
  title: "Kepido — Pide comida en Jamay",
  description: "Directorio y menú digital de Tacos, Hamburguesas, Pizzas y más en Jamay. Ordena directamente al WhatsApp del negocio o mandaditos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="antialiased">
      <head>
        <link rel="stylesheet" href="/Poppins/stylesheet.css" />
        <link rel="stylesheet" href="/Urbanist font/stylesheet.css" />
      </head>
      <body className="bg-slate-100">
        {children}
        <FloatingCartBar />
        <BottomNav />
      </body>
    </html>
  );
}
