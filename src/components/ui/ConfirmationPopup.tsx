import React, { useState } from "react";
import { createPortal } from "react-dom";
import { IoClose, IoAlertCircle, IoChevronDown, IoChevronUp } from "react-icons/io5";

interface ConfirmationPopupProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  showCostWarning?: boolean;
}

export const ConfirmationPopup: React.FC<ConfirmationPopupProps> = ({
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Aceptar",
  cancelText = "Cancelar",
  showCostWarning = false,
}) => {
  const [showExplanation, setShowExplanation] = useState(false);

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 animate-in zoom-in-95 duration-200">
        <div className="flex items-start justify-between p-5 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <IoAlertCircle className="w-6 h-6 text-amber-500 flex-shrink-0" />
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Cerrar"
          >
            <IoClose className="w-6 h-6" />
          </button>
        </div>

        <div className="p-5">
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            {message}
          </p>

          {showCostWarning && (
            <div className="mt-4">
              <button
                type="button"
                onClick={() => setShowExplanation(!showExplanation)}
                className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                <span>¿Por qué es un problema?</span>
                {showExplanation ? (
                  <IoChevronUp className="w-4 h-4" />
                ) : (
                  <IoChevronDown className="w-4 h-4" />
                )}
              </button>

              {showExplanation && (
                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-md animate-in fade-in slide-in-from-top-2 duration-200">
                  <p className="text-xs text-gray-700 leading-relaxed">
                    El generador de SEO utiliza inteligencia artificial, lo que tiene un costo monetario por cada uso. 
                    Cuando el contenido de la página es escaso, los metadatos generados pueden no ser óptimos y 
                    probablemente necesitarás regenerarlos más adelante, duplicando el costo.
                    <br /><br />
                    <strong>Recomendación:</strong> Completa el contenido de la página primero y luego genera los metadatos SEO 
                    para obtener mejores resultados y optimizar los costos.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 p-5 bg-gray-50 rounded-b-lg border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors shadow-sm"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
