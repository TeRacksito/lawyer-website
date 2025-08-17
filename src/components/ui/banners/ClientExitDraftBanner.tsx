"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { HiArrowRightOnRectangle } from "react-icons/hi2";

const DraftToast = dynamic(() => import("./DraftToast"), { ssr: false });

export default function ClientExitDraftBanner() {
  const pathname = usePathname();

  const exitUrl = `/api/draft/exit?slug=${encodeURIComponent(pathname || "")}`;

  const exitIcon = <HiArrowRightOnRectangle className="w-3.5 h-3.5" />;

  return (
    <DraftToast
      type="exit"
      url={exitUrl}
      title="Modo de Borrador Activo"
      shortTitle="Borrador"
      description="Estás viendo páginas en modo borrador. Se muestran contenidos que no están publicados. Sal del modo de borrador para ver la versión pública."
      buttonText="Salir"
      icon={exitIcon}
    />
  );
}
