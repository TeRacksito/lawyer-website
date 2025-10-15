import React, { useState, useEffect } from "react";
import { Template } from "tinacms";
import {
  IoSparkles,
  IoCheckmarkCircle,
  IoAlertCircle,
  IoInformationCircle,
  IoSaveOutline,
} from "react-icons/io5";
import { ConfirmationPopup } from "@/components/ui/ConfirmationPopup";

React;

interface GeneratedSEO {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogType: "website" | "article" | "profile";
  twitterCard: "summary" | "summary_large_image" | "app" | "player";
}

const generateSEOContent = async (
  pageTitle: string,
  blocks: any[],
  pageUri: string
): Promise<GeneratedSEO> => {
  const token = (() => {
    try {
      if (typeof window === "undefined") return undefined;
      const raw = localStorage.getItem("tinacms-auth");
      if (!raw) return undefined;
      const parsed = JSON.parse(raw);
      return parsed?.id_token;
    } catch {
      return undefined;
    }
  })();

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token && process.env.NODE_ENV !== "development") {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch("/api/generate-seo", {
    method: "POST",
    headers,
    body: JSON.stringify({
      pageTitle,
      blocks,
      pageUri,
    }),
  });

  if (!response.ok) {
    const error: any = await response.json();
    throw new Error(error.error || "Error al generar SEO");
  }

  const generatedContent: GeneratedSEO = await response.json();
  return generatedContent;
};

export const getSEOGeneratorField = (): Template["fields"][number] => {
  return {
    type: "string",
    name: "_seoGenerator",
    searchable: false,
    ui: {
      component: ({ tinaForm }: any) => {
        const [isGenerating, setIsGenerating] = useState(false);
        const [error, setError] = useState<string | null>(null);
        const [success, setSuccess] = useState(false);
        const [showSaveReminder, setShowSaveReminder] = useState(false);
        const [showConfirmation, setShowConfirmation] = useState(false);
        const [showCostWarning, setShowCostWarning] = useState(false);
        const [confirmationMessage, setConfirmationMessage] = useState({
          title: "",
          message: "",
        });

        useEffect(() => {
          if (!tinaForm?.finalForm) return;

          const unsubscribe = tinaForm.finalForm.subscribe(
            (state: any) => {
              if (state.dirty === false && showSaveReminder) {
                setShowSaveReminder(false);
              }
            },
            { dirty: true }
          );

          return () => {
            unsubscribe();
          };
        }, [tinaForm, showSaveReminder]);

        const hasExistingSEOData = (): boolean => {
          const seo = tinaForm.values.seo;
          if (!seo) return false;

          const hasMetaTitle = seo.metaTitle && seo.metaTitle.trim() !== "";
          const hasMetaDescription =
            seo.metaDescription && seo.metaDescription.trim() !== "";
          const hasKeywords = seo.keywords && seo.keywords.length > 0;

          return hasMetaTitle || hasMetaDescription || hasKeywords;
        };

        const hasMinimalContent = (): boolean => {
          const blocks = tinaForm.values.blocks || [];

          if (blocks.length === 0) {
            return true;
          }

          if (blocks.length === 1) {
            return true;
          }

          const extractAllText = (obj: any): string => {
            if (!obj) return "";

            if (typeof obj === "string") {
              return obj;
            }

            if (Array.isArray(obj)) {
              return obj.map(extractAllText).join(" ");
            }

            if (typeof obj === "object") {
              return Object.values(obj).map(extractAllText).join(" ");
            }

            return "";
          };

          const allText = extractAllText(blocks);
          const textWithoutWhitespace = allText.replace(/\s+/g, " ").trim();
          const wordCount = textWithoutWhitespace
            .split(" ")
            .filter((word) => word.length > 0).length;

          return wordCount < 100;
        };

        const performGeneration = async () => {
          setIsGenerating(true);
          setError(null);
          setSuccess(false);
          setShowConfirmation(false);

          try {
            const pageTitle = tinaForm.values.title || "Página sin título";
            const blocks = tinaForm.values.blocks || [];

            const extractUriFromPath = (path: string): string => {
              const match = path.match(/content\/pages\/(.+)\/page\.mdx$/);
              if (match && match[1]) {
                return `/${match[1]}`;
              }
              const rootMatch = path.match(/content\/pages\/page\.mdx$/);
              if (rootMatch) {
                return "/";
              }
              return "/";
            };

            const pageUri = tinaForm.path
              ? extractUriFromPath(tinaForm.path)
              : "/";

            if (blocks.length === 0) {
              throw new Error(
                "No hay contenido en la página. Agrega bloques antes de generar SEO."
              );
            }

            const generatedSEO = await generateSEOContent(
              pageTitle,
              blocks,
              pageUri
            );

            tinaForm.change("seo.metaTitle", generatedSEO.metaTitle);
            tinaForm.change(
              "seo.metaDescription",
              generatedSEO.metaDescription
            );
            tinaForm.change("seo.keywords", generatedSEO.keywords);
            tinaForm.change("seo.social.ogType", generatedSEO.ogType);
            tinaForm.change("seo.social.twitterCard", generatedSEO.twitterCard);

            setSuccess(true);
            setShowSaveReminder(true);
            setTimeout(() => setSuccess(false), 3000);
          } catch (err) {
            setError(err instanceof Error ? err.message : "Error desconocido");
          } finally {
            setIsGenerating(false);
          }
        };

        const handleGenerate = () => {
          const hasExistingData = hasExistingSEOData();
          const hasMinimal = hasMinimalContent();

          let title = "";
          let message = "";
          let warnings: string[] = [];

          if (hasExistingData) {
            warnings.push(
              "⚠️ Ya existen datos SEO en esta página que serán sobrescritos."
            );
          }

          if (hasMinimal) {
            warnings.push(
              "⚠️ La página tiene poco contenido. Los metadatos generados pueden no ser óptimos."
            );
          }

          if (warnings.length > 0) {
            title = "Confirmar generación de SEO";
            message = warnings.join("\n\n") + "\n\n¿Deseas continuar?";

            setConfirmationMessage({ title, message });
            setShowCostWarning(hasMinimal);
            setShowConfirmation(true);
          } else {
            performGeneration();
          }
        };

        return (
          <div className="mb-4">
            {showConfirmation && (
              <ConfirmationPopup
                title={confirmationMessage.title}
                message={confirmationMessage.message}
                onConfirm={performGeneration}
                onCancel={() => setShowConfirmation(false)}
                confirmText="Continuar"
                cancelText="Cancelar"
                showCostWarning={showCostWarning}
              />
            )}

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-5 shadow-sm">
              <div className="flex items-start gap-3 mb-3">
                <div className="flex-shrink-0 mt-0.5">
                  <IoSparkles className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-blue-900 mb-1">
                    Generador de SEO con IA
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                    Genera automáticamente metadatos SEO optimizados basados en
                    el contenido de la página usando inteligencia artificial.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating}
                className={`
                  flex items-center justify-center gap-2 w-full
                  px-4 py-2.5 rounded-md font-medium text-sm
                  transition-all duration-200 transform
                  ${
                    isGenerating
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 active:scale-[0.98] shadow-md hover:shadow-lg"
                  }
                  text-white
                `}
              >
                <IoSparkles
                  className={`w-4 h-4 transition-all duration-300 ${
                    isGenerating
                      ? "animate-[pulse_1.5s_ease-in-out_infinite,spin_3s_linear_infinite] scale-110"
                      : ""
                  }`}
                  style={
                    isGenerating
                      ? {
                          filter:
                            "drop-shadow(0 0 3px rgba(255, 255, 255, 0.6))",
                        }
                      : undefined
                  }
                />
                <span>
                  {isGenerating ? "Generando metadatos..." : "Generar SEO"}
                </span>
              </button>

              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                  <div className="flex items-start gap-2">
                    <IoAlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-red-800 font-medium mb-1">
                        Error
                      </p>
                      <p className="text-sm text-red-700 whitespace-pre-line leading-relaxed">
                        {error}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {success && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="flex items-start gap-2">
                    <IoCheckmarkCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-green-800 font-medium mb-1">
                        ¡Éxito!
                      </p>
                      <p className="text-sm text-green-700 whitespace-pre-line leading-relaxed">
                        Los metadatos SEO se han generado correctamente.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {showSaveReminder && !success && (
                <div className="mt-4 p-3 bg-amber-50 border border-amber-300 rounded-md animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="flex items-start gap-2">
                    <IoSaveOutline className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-amber-800 font-medium mb-1">
                        No olvides guardar los cambios
                      </p>
                      <p className="text-sm text-amber-700 whitespace-pre-line leading-relaxed">
                        Los metadatos SEO se han actualizado en el formulario.
                        Haz clic en el botón de guardar de TinaCMS para aplicar
                        los cambios permanentemente.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-4 pt-3 border-t border-blue-200">
                <div className="flex items-start gap-2">
                  <IoInformationCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-600 italic whitespace-pre-line leading-relaxed">
                    Tip: Revisa y ajusta los valores generados según tus
                    necesidades específicas antes de guardar los cambios.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      },
    },
  };
};
