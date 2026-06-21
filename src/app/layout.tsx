import type { Metadata } from "next";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import FloatingCartBar from "@/components/FloatingCartBar";

export const metadata: Metadata = {
  metadataBase: new URL('https://kepido.vercel.app'),
  title: "Kepido — Pide comida en Jamay",
  description: "Directorio y menú digital de Tacos, Hamburguesas, Pizzas y más en Jamay. Ordena directamente al WhatsApp del negocio o mandaditos.",
  openGraph: {
    title: "Kepido — Pide comida en Jamay",
    description: "Directorio y menú digital de Tacos, Hamburguesas, Pizzas y más en Jamay. Ordena directamente al WhatsApp del negocio o mandaditos.",
    url: "https://kepido.vercel.app",
    siteName: "Kepido Jamay",
    images: [
      {
        url: "/KEPIDO LOGO.webp",
        width: 800,
        height: 800,
        alt: "Kepido Logo",
      }
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kepido — Pide comida en Jamay",
    description: "Directorio y menú digital de Tacos, Hamburguesas, Pizzas y más en Jamay. Ordena directamente al WhatsApp del negocio o mandaditos.",
    images: ["/KEPIDO LOGO.webp"],
  }
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
