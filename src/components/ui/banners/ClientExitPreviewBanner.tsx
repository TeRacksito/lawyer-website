"use client";

import { usePathname } from "next/navigation";

export default function ClientExitPreviewBanner() {
  const pathname = usePathname();

  const exitUrl = `/api/draft/exit?slug=${encodeURIComponent(pathname || "")}`;

  return (
    <div
      data-theme="dark"
      className="sticky top-0 w-full z-50 h-5 hover:h-auto transition-all group/global"
    >
      {/* Subtle construction stripe pattern */}
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
        {/* Content container */}
        <div className="relative flex items-center justify-between h-full px-2 sm:px-3">
          {/* Minimal preview indicator */}
          <div className="flex items-center space-x-1.5">
            <div className="w-1.5 h-1.5 bg-error rounded-full"></div>
            <span className="text-base-300 font-medium text-xs">
              Modo de previsualización
            </span>
            <span className="text-base-300 font-medium text-xs opacity-0 group-hover/global:opacity-100 transition-opacity">
              - Se muestran páginas que no están publicadas. Es decir, que están
              en modo borrador.
            </span>
          </div>

          {/* Minimal exit button */}
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
    </div>
  );
}
