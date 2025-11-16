import ExitDraftBanner from "@/components/ui/banners/ExitPreviewBanner";
import type { Metadata } from "next";
import "./globals.css";
import { Lora } from "next/font/google";

export const metadata: Metadata = {
  title: "CLG Abogados",
  description: "Consulta Legal Gratuita - Luis Cruz",
};

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-lora",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="font-lora antialiased md:subpixel-antialiased">
        <ExitDraftBanner />
        {children}
      </body>
    </html>
  );
}
