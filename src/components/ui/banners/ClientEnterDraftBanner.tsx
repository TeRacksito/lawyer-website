"use client";

import { usePathname } from "next/navigation";
import { useEditState } from "tinacms/dist/react";
import DraftToast from "./DraftToast";

export default function ClientEnterDraftBanner({
  draftIsEnabled,
}: {
  draftIsEnabled: boolean;
}) {
  const pathname = usePathname();
  const { edit } = useEditState();

  // Only show when edit mode is enabled
  if (!edit && !draftIsEnabled) {
    return null;
  }

  const enterUrl = `/api/draft/enter?slug=${encodeURIComponent(
    pathname || ""
  )}`;

  const exitUrl = `/api/draft/exit?slug=${encodeURIComponent(pathname || "")}`;

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

  const exitIcon = (
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
        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
      />
    </svg>
  );

  return draftIsEnabled ? (
    <DraftToast
      type="exit"
      url={exitUrl}
      title="Modo de Edición Desactivado"
      shortTitle="Edición"
      description="El modo de previsualización está desactivado. No podrás editar páginas en borrador."
      buttonText="Salir"
      icon={exitIcon}
    />
  ) : (
    <DraftToast
      type="enter"
      url={enterUrl}
      title="Modo de Edición Disponible"
      shortTitle="Edición"
      description="Activa el modo de previsualización para ver y editar páginas en borrador. Podrás modificar contenido y ver cambios antes de publicar."
      buttonText="Entrar"
      icon={enterIcon}
      isVisible={edit}
    />
  );
}
