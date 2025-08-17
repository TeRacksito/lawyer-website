"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEditState } from "tinacms/dist/react";
import { HiArrowRight } from "react-icons/hi2";

const DraftToast = dynamic(() => import("./DraftToast"), { ssr: false });

export default function ClientEnterDraftBanner() {
  const pathname = usePathname();
  const { edit } = useEditState();

  const enterUrl = `/api/draft/enter?slug=${encodeURIComponent(
    pathname || ""
  )}`;

  const enterIcon = <HiArrowRight className="w-3.5 h-3.5" />;

  return (
    <DraftToast
      type="enter"
      url={enterUrl}
      title="Modo de Borrador Disponible"
      shortTitle="Borrador"
      description='Activa el modo de previsualización para ver y editar páginas en borrador. Podrás modificar contenido y ver cambios de páginas marcadas como "borrador", no disponibles al público.'
      buttonText="Entrar"
      icon={enterIcon}
      isVisible={edit}
    />
  );
}
