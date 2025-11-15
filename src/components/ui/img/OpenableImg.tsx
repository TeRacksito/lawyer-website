"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface OpenableImgProps {
  src: string;
  alt: string;
  footer?: string;
  author?: string;
  dataTinaField?: string;
  dataTinaFieldFooter?: string;
  dataTinaFieldAuthor?: string;
}

/**
 * A clickable image component that opens in a full-screen modal popup.
 * Supports closing via X button, clicking outside, or pressing Escape.
 * Displays optional footer and author information below the image.
 */
export default function OpenableImg({
  src,
  alt,
  footer,
  author,
  dataTinaField,
  dataTinaFieldFooter,
  dataTinaFieldAuthor,
}: OpenableImgProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      {/* Image Container */}
      <div className="space-y-4">
        <figure
          className="group relative w-full rounded-xl overflow-hidden bg-base-200 aspect-video cursor-pointer ring-2 ring-offset-0 ring-transparent transition-all duration-300 hover:ring-primary hover:ring-offset-2 shadow-md hover:shadow-lg"
          onClick={() => setIsOpen(true)}
          data-tina-field={dataTinaField}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setIsOpen(true);
            }
          }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-base-900/70 p-3 rounded-full backdrop-blur-sm">
                <ZoomIn className="w-6 h-6 text-base-100" />
              </div>
            </div>
          </div>
        </figure>

        {/* Footer and Author Info */}
        {(footer || author) && (
          <div className="flex flex-col gap-2 text-sm text-base-content/70 px-1">
            {footer && (
              <p
                className="leading-relaxed"
                data-tina-field={dataTinaFieldFooter}
              >
                {footer}
              </p>
            )}
            {author && (
              <p
                className="text-xs font-semibold uppercase tracking-wide text-base-content/50"
                data-tina-field={dataTinaFieldAuthor}
              >
                © {author}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Full-screen Modal Popup */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/90 z-40 backdrop-blur-md"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* Modal Content */}
            <motion.div
              data-theme="dark"
              className="fixed inset-0 z-50 flex flex-col items-center justify-center px-4 py-8 md:px-6 md:py-12 overflow-y-auto"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="relative w-full max-w-6xl flex flex-col bg-base-900/50 rounded-2xl overflow-y-auto backdrop-blur-xl shadow-2xl"
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{ maxHeight: "90vh" }}
              >
                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-base-100 hover:text-error transition-all duration-200 backdrop-blur-sm hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
                  aria-label="Close image viewer"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Image Container */}
                <motion.div
                  className="relative w-full bg-black/50 flex items-center justify-center flex-shrink-0"
                  style={{
                    minHeight: "500px",
                    maxHeight: "calc(70vh - 150px)",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-base-900/50 z-10">
                      <div className="loading loading-spinner loading-lg text-primary" />
                    </div>
                  )}
                  <div className="relative w-full h-full">
                    <Image
                      src={src}
                      alt={alt}
                      fill
                      className="object-contain"
                      priority
                      onLoadingComplete={() => setIsLoading(false)}
                    />
                  </div>
                </motion.div>

                {/* Footer and Author Info in Modal */}
                {(footer || author) && (
                  <div className="p-6 md:p-8 flex flex-col gap-3 flex-shrink-0">
                    {footer && (
                      <p
                        className="text-sm md:text-base leading-relaxed text-base-content/90"
                        data-tina-field={dataTinaFieldFooter}
                      >
                        {footer}
                      </p>
                    )}
                    {author && (
                      <p
                        className="text-xs md:text-sm font-semibold uppercase tracking-wider text-base-content/60"
                        data-tina-field={dataTinaFieldAuthor}
                      >
                        © {author}
                      </p>
                    )}
                  </div>
                )}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
