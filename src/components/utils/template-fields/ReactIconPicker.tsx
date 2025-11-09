"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import * as FaIcons from "react-icons/fa6";

React;

interface ReactIconPickerProps {
  input: {
    name: string;
    value: string;
    onChange: (value: string) => void;
    onBlur: () => void;
    onFocus: () => void;
  };
  field?: {
    label?: string;
    description?: string;
  };
}

/**
 * Custom Tina field component for selecting React Icons from FA6 (Font Awesome 6).
 * Provides a searchable dropdown interface for icon selection with live preview.
 */
export default function ReactIconPicker({
  input,
  field,
}: ReactIconPickerProps) {
  const [showPicker, setShowPicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pickerRef = useRef<HTMLDivElement>(null);

  const allIcons = useMemo(() => {
    return Object.keys(FaIcons)
      .filter((key) => key.startsWith("Fa") && key !== "FaIconBase")
      .sort();
  }, []);

  const filteredIcons = useMemo(() => {
    if (!searchQuery) return allIcons;

    const query = searchQuery.toLowerCase();
    return allIcons.filter((iconName) =>
      iconName.toLowerCase().includes(query)
    );
  }, [searchQuery, allIcons]);

  const handleIconSelect = (iconName: string) => {
    input.onChange(iconName);
    setShowPicker(false);
    setSearchQuery("");
  };

  const handleClear = () => {
    input.onChange("");
    setSearchQuery("");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setShowPicker(false);
        setSearchQuery("");
      }
    };

    if (showPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPicker]);

  const SelectedIcon = input.value
    ? (FaIcons as Record<string, React.ComponentType<{ className?: string }>>)[
        input.value
      ]
    : null;

  return (
    <div
      ref={pickerRef}
      className="flex flex-col gap-4 bg-gradient-to-br from-base-50 to-base-100 p-6 rounded-xl border border-base-200 shadow-sm"
    >
      {(field?.label || field?.description) && (
        <div className="pb-4 border-b border-base-300/50">
          {field?.label && (
            <h3 className="text-sm font-semibold text-base-content mb-1">
              {field.label}
            </h3>
          )}
          {field?.description && (
            <p className="text-xs text-base-content/70 leading-relaxed whitespace-pre-line">
              {field.description}
            </p>
          )}
        </div>
      )}

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => setShowPicker(!showPicker)}
          className={`flex-shrink-0 w-24 h-24 rounded-xl border-2 transition-all duration-200 flex items-center justify-center ${
            showPicker
              ? "border-primary bg-primary/10 ring-2 ring-primary ring-offset-2"
              : "border-base-300 bg-base-100 hover:border-primary hover:bg-primary/5"
          }`}
        >
          {SelectedIcon ? (
            <SelectedIcon className="w-12 h-12 text-primary" />
          ) : (
            <div className="flex flex-col items-center gap-1">
              <FaIcons.FaPlus className="w-8 h-8 text-base-content/40" />
              <span className="text-xs text-base-content/40 font-medium">
                Seleccionar
              </span>
            </div>
          )}
        </button>

        <div className="flex-1 min-w-0">
          {SelectedIcon ? (
            <div>
              <h4 className="text-sm font-semibold text-base-content mb-1">
                Nombre: {input.value.replace("Fa", "")}
              </h4>
              <p className="text-xs text-base-content/60 font-mono mb-3 break-all">
                Nombre Completo: {input.value}
              </p>
              <button
                type="button"
                onClick={handleClear}
                className="btn btn-sm btn-ghost gap-1 text-error hover:bg-error/10 flex items-center"
              >
                <FaIcons.FaXmark className="w-6 h-6" />
                <span>Limpiar</span>
              </button>
            </div>
          ) : (
            <div>
              <h4 className="text-sm font-semibold text-base-content/60 mb-1">
                Sin icono
              </h4>
              <p className="text-xs text-base-content/40 leading-relaxed whitespace-pre-line">
                Explora la galería de iconos Font Awesome 6. Los nombres de los
                iconos se encuentra en <b>inglés</b>. Consulta la{" "}
                <a
                  href="https://react-icons.github.io/react-icons/icons/fa6/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-focus font-medium hover:underline transition-colors"
                >
                  galería completa
                </a>{" "}
                para más opciones.
              </p>
            </div>
          )}
        </div>
      </div>

      {showPicker && (
        <div className="space-y-4 pt-4 border-t border-base-300">
          <div className="space-y-2">
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40 pointer-events-none"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar iconos... (ej: 'home', 'user', 'arrow')"
                className="input input-bordered input-sm w-full pl-10 pr-4"
                autoFocus
              />
            </div>
            <div className="flex items-center justify-between px-1">
              <p className="text-xs text-base-content/60">
                <span className="font-semibold text-primary">
                  {filteredIcons.length}
                </span>{" "}
                icono{filteredIcons.length !== 1 ? "s" : ""} disponible
                {filteredIcons.length !== 1 ? "s" : ""}
              </p>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-xs text-primary hover:text-primary-focus font-medium transition-colors"
                >
                  Limpiar
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-6 sm:grid-cols-8 gap-2 max-h-72 overflow-y-auto p-3 rounded-lg bg-base-200/30">
            {filteredIcons.length > 0 ? (
              filteredIcons.map((iconName) => {
                const IconComponent = (
                  FaIcons as Record<
                    string,
                    React.ComponentType<{ className?: string }>
                  >
                )[iconName];
                const isSelected = input.value === iconName;

                return (
                  <button
                    key={iconName}
                    type="button"
                    onClick={() => handleIconSelect(iconName)}
                    className={`group relative flex flex-col items-center justify-center p-1 rounded transition-all duration-200 ${
                      isSelected
                        ? "text-primary-content shadow-md scale-105 ring-2 ring-primary ring-offset-2"
                        : "bg-base-100 hover:bg-base-200 hover:shadow-md hover:scale-110"
                    }`}
                    title={iconName}
                  >
                    <IconComponent
                      className={`w-7 h-7 transition-transform ${
                        isSelected ? "" : "group-hover:rotate-12"
                      }`}
                    />
                    <span
                      className={`text-[10px] mt-2 truncate w-full text-center font-medium line-clamp-2 ${
                        isSelected ? "" : "text-base-content/70"
                      }`}
                    >
                      {iconName.replace("Fa", "")}
                    </span>
                    {isSelected && (
                      <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-success rounded-full flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-3 h-3 text-white"
                        >
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                        </svg>
                      </div>
                    )}
                  </button>
                );
              })
            ) : (
              <div className="col-span-6 sm:col-span-8 text-center py-8">
                <div className="flex flex-col items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="w-8 h-8 text-base-content/30"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <p className="text-xs font-medium text-base-content/60">
                      No se encontraron iconos
                    </p>
                    <p className="text-xs text-base-content/40">
                      Intenta con otro término
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
