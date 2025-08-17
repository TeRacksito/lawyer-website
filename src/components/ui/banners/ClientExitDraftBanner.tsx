"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const DraftToast = dynamic(() => import("./DraftToast"), { ssr: false });

export default function ClientExitDraftBanner() {
  const pathname = usePathname();

  const exitUrl = `/api/draft/exit?slug=${encodeURIComponent(pathname || "")}`;

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

  // For exit banner, we want to show the full-width warning banner as before
  // But also add the toast for consistency when minimized
  return (
    <>
      {/* <div
        data-theme="dark"
        className="sticky top-0 w-full z-50 h-5 hover:h-auto transition-all group/global"
      >
        <div
          className="relative h-full bg-warning overflow-hidden hover:py-2 transition-all"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent 0px,
              transparent 4px,
              rgba(0, 0, 0, 0.1) 4px,
              rgba(0, 0, 0, 0.1) 8px
            )`,
          }}
        >
          <div className="relative flex items-center justify-between h-full px-2 sm:px-3">
            <div className="flex items-center space-x-1.5">
              <div className="w-1.5 h-1.5 bg-error rounded-full"></div>
              <span className="text-base-300 font-medium text-xs">
                Modo de previsualización
              </span>
              <span className="text-base-300 font-medium text-xs opacity-0 group-hover/global:opacity-100 transition-opacity">
                - Se muestran páginas que no están publicadas. Es decir, que
                están en modo borrador.
              </span>
            </div>

            <a
              href={exitUrl}
              className="btn btn-ghost btn-xs gap-2 rounded font-medium flex items-center group
                         text-base-300 hover:text-warning transition-colors duration-150"
            >
              <span>Salir</span>
              <svg
                className="w-2.5 h-2.5 group-hover:rotate-90 transition-transform duration-150"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </a>
          </div>
        </div>
      </div> */}

      {/* Toast version for alternative minimized experience */}
      <DraftToast
        type="exit"
        url={exitUrl}
        title="Modo de Borrador Activo"
        shortTitle="Borrador"
        description="Estás viendo páginas en modo borrador. Se muestran contenidos que no están publicados. Sal del modo de borrador para ver la versión pública."
        buttonText="Salir"
        icon={exitIcon}
      />
    </>
  );
}
