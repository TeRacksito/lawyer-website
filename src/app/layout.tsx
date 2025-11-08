import ExitDraftBanner from "@/components/ui/banners/ExitPreviewBanner";
import type { Metadata } from "next";
import "./globals.css";

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
        <ExitDraftBanner />
        {children}
      </body>
    </html>
  );
}
