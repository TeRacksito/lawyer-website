"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEditState } from "tinacms/dist/react";

const DraftToast = dynamic(() => import("./DraftToast"), { ssr: false });

export default function ClientEnterDraftBanner() {
  const pathname = usePathname();
  const { edit } = useEditState();

  const enterUrl = `/api/draft/enter?slug=${encodeURIComponent(
    pathname || ""
  )}`;

  const enterIcon = (
    <svg
      className="w-3.5 h-3.5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 7l5 5m0 0l-5 5m5-5H6"
      />
    </svg>
  );

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
