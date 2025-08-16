import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ExitPreviewBanner from "@/components/ui/banners/ExitPreviewBanner";

export const metadata: Metadata = {
  title: "CGC Abogados",
  description: "Consultas Gratuitas Cruz - Abogados",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="font-serif antialiased md:subpixel-antialiased">
        <ExitPreviewBanner />
        {children}
      </body>
    </html>
  );
}
