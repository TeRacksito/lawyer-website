"use client";

import { TinaMarkdownRenderer } from "@/components/utils/TinaMarkdownRenderer";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Download, Scan, X, ZoomIn, ZoomOut } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface OpenableImgProps {
  src: string;
  alt: string;
  footer?: any;
  author?: any;
  dataTinaField?: string;
  dataTinaFieldFooter?: string;
  dataTinaFieldAuthor?: string;
}

/**
 * A clickable image component that opens in a full-screen modal popup.
 * Supports closing via X button, clicking outside, or pressing Escape.
 * Interactive features: zoom in/out, pan, reset view, copy, and download.
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
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [copied, setCopied] = useState(false);
  const [canCopy, setCanCopy] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [lastTouchDistance, setLastTouchDistance] = useState<number | null>(
    null
  );

  const MIN_SCALE = 0.5;
  const MAX_SCALE = 5;
  const ZOOM_STEP = 0.3;

  const snapZoomValue = (value: number): number => {
    if (value <= 1) {
      const snapPoints = [0.25, 0.5, 0.75, 1];
      return snapPoints.reduce((prev, curr) =>
        Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
      );
    } else {
      const snapPoints = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
      return snapPoints.reduce((prev, curr) =>
        Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
      );
    }
  };

  const handleZoomIn = () => {
    setScale((prev) => {
      const newScale = Math.min(prev + ZOOM_STEP, MAX_SCALE);
      return snapZoomValue(newScale);
    });
  };

  const handleZoomOut = () => {
    setScale((prev) => {
      const newScale = Math.max(prev - ZOOM_STEP, MIN_SCALE);
      return snapZoomValue(newScale);
    });
  };

  const handleResetView = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    const delta = e.deltaY * -0.001;
    setScale((prev) => Math.max(MIN_SCALE, Math.min(MAX_SCALE, prev + delta)));
  };

  const getTouchDistance = (touches: React.TouchList) => {
    if (touches.length < 2) return null;
    const touch1 = touches[0];
    const touch2 = touches[1];
    return Math.hypot(
      touch2.clientX - touch1.clientX,
      touch2.clientY - touch1.clientY
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const distance = getTouchDistance(e.touches);
      setLastTouchDistance(distance);
    } else if (e.touches.length === 1 && scale > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const distance = getTouchDistance(e.touches);
      if (lastTouchDistance && distance) {
        const delta = (distance - lastTouchDistance) * 0.01;
        setScale((prev) =>
          Math.max(MIN_SCALE, Math.min(MAX_SCALE, prev + delta))
        );
        setLastTouchDistance(distance);
      }
    } else if (e.touches.length === 1 && isDragging && scale > 1) {
      setPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setLastTouchDistance(null);
  };

  const handleCopyImage = async () => {
    try {
      const response = await fetch(src);
      const blob = await response.blob();

      // Try to copy with original MIME type first
      try {
        await navigator.clipboard.write([
          new ClipboardItem({ [blob.type]: blob }),
        ]);
      } catch {
        // Fallback: convert to PNG if original format is not supported
        const canvas = document.createElement("canvas");
        const img = new (window as any).Image();
        img.crossOrigin = "anonymous";
        img.src = src;

        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });

        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          canvas.toBlob(async (canvasBlob) => {
            if (canvasBlob) {
              await navigator.clipboard.write([
                new ClipboardItem({ "image/png": canvasBlob }),
              ]);
            }
          }, "image/png");
        }
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy image:", err);
      setCopied(false);
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = src;
    link.download = alt || "image";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    const handleNativeWheel = (e: WheelEvent) => {
      if (imageContainerRef.current?.contains(e.target as Node)) {
        e.preventDefault();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";

      // Add wheel listener with passive:false to prevent scrolling
      const container = imageContainerRef.current;
      if (container) {
        container.addEventListener("wheel", handleNativeWheel, {
          passive: false,
        });
      }
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";

      const container = imageContainerRef.current;
      if (container) {
        container.removeEventListener("wheel", handleNativeWheel);
      }
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
      setIsLoading(true);
    }
  }, [isOpen]);

  useEffect(() => {
    // Check if clipboard API is available
    setCanCopy(
      typeof navigator !== "undefined" &&
        !!navigator.clipboard &&
        !!navigator.clipboard.write
    );
  }, []);

  return (
    <>
      {/* Image Container */}
      <div className="space-y-2">
        <figure
          className="group relative w-full rounded-xl overflow-hidden bg-base-200 aspect-video cursor-pointer ring-2 ring-offset-0 ring-transparent transition-all duration-300 hover:ring-primary hover:ring-offset-2 shadow-md hover:shadow-lg"
          onClick={() => setIsOpen(true)}
          data-tina-field={dataTinaField}
          role="button"
          tabIndex={0}
          aria-label={`Open ${alt} in full screen viewer`}
          title="Click to view full size image"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
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
          <div className="flex flex-col gap-1 text-sm text-base-content/70 px-1">
            {footer && (
              <div className="leading-4" data-tina-field={dataTinaFieldFooter}>
                <TinaMarkdownRenderer content={footer} />
              </div>
            )}
            {author && (
              <div
                className="text-xs font-semibold uppercase tracking-wide text-base-content/50"
                data-tina-field={dataTinaFieldAuthor}
              >
                <span className="float-left mr-1">©</span>{" "}
                <TinaMarkdownRenderer content={author} className="float-left" />
              </div>
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
              role="presentation"
              aria-label="Close image viewer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* Modal Content */}
            <motion.div
              data-theme="dark"
              className="fixed inset-0 z-50 flex flex-col items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="relative w-full max-w-[96vw] h-auto min-h-0 my-auto flex flex-col bg-base-900/50 rounded-2xl backdrop-blur-xl shadow-2xl"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="image-viewer-title"
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {/* Toolbar */}
                <div
                  className="absolute top-2 left-2 right-2 sm:top-4 sm:left-4 sm:right-4 z-10 flex items-start justify-between gap-2"
                  role="toolbar"
                  aria-label="Image viewer controls"
                  id="image-viewer-title"
                >
                  <div className="flex gap-1.5 sm:gap-2 flex-col sm:flex-row">
                    <div
                      className="font-mono px-2 py-2 sm:px-3 sm:py-2.5 rounded-full bg-base-100 backdrop-blur-sm text-xs sm:text-sm font-medium flex items-center justify-center min-w-[3rem] sm:min-w-[3.5rem] shrink-0"
                      role="status"
                      aria-live="polite"
                      aria-label={`Current zoom level: ${Math.round(
                        scale * 100
                      )} percent`}
                    >
                      {Math.round(scale * 100)}%
                    </div>
                    <button
                      onClick={handleZoomIn}
                      className="p-2 sm:p-2.5 rounded-full bg-base-100 hover:bg-base-200 active:scale-95 transition-all duration-200 backdrop-blur-sm sm:hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation flex items-center justify-center"
                      aria-label="Zoom in"
                      title="Zoom in"
                      disabled={scale >= MAX_SCALE}
                      type="button"
                    >
                      <ZoomIn
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        aria-hidden="true"
                      />
                    </button>
                    <button
                      onClick={handleZoomOut}
                      className="p-2 sm:p-2.5 rounded-full bg-base-100 hover:bg-base-200 active:scale-95 transition-all duration-200 backdrop-blur-sm sm:hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation flex items-center justify-center"
                      aria-label="Zoom out"
                      title="Zoom out"
                      disabled={scale <= MIN_SCALE}
                      type="button"
                    >
                      <ZoomOut
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        aria-hidden="true"
                      />
                    </button>
                    <button
                      onClick={handleResetView}
                      className="p-2 sm:p-2.5 rounded-full bg-base-100 hover:bg-base-200 active:scale-95 transition-all duration-200 backdrop-blur-sm sm:hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation flex items-center justify-center"
                      aria-label="Reset view to original size and position"
                      title="Reset view"
                      disabled={
                        scale === 1 && position.x === 0 && position.y === 0
                      }
                      type="button"
                    >
                      <Scan
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        aria-hidden="true"
                      />
                    </button>
                  </div>

                  <div className="flex gap-1.5 sm:gap-2 flex-col sm:flex-row">
                    {canCopy && (
                      <button
                        onClick={handleCopyImage}
                        className="p-2 sm:p-2.5 rounded-full bg-base-100 hover:bg-base-200 active:scale-95 transition-all duration-200 backdrop-blur-sm sm:hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50 touch-manipulation flex items-center justify-center"
                        aria-label={
                          copied
                            ? "Image copied to clipboard"
                            : "Copy image to clipboard"
                        }
                        title={copied ? "Copied!" : "Copy image"}
                        type="button"
                      >
                        {copied ? (
                          <Check
                            className="text-success w-4 h-4 sm:w-5 sm:h-5"
                            aria-hidden="true"
                          />
                        ) : (
                          <Copy
                            className="w-4 h-4 sm:w-5 sm:h-5"
                            aria-hidden="true"
                          />
                        )}
                      </button>
                    )}
                    <button
                      onClick={handleDownload}
                      className="p-2 sm:p-2.5 rounded-full bg-base-100 hover:bg-base-200 active:scale-95 transition-all duration-200 backdrop-blur-sm sm:hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50 touch-manipulation flex items-center justify-center"
                      aria-label={`Download image: ${alt}`}
                      title="Download image"
                      type="button"
                    >
                      <Download
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        aria-hidden="true"
                      />
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-2 sm:p-2.5 rounded-full bg-base-100 hover:text-error active:scale-95 transition-all duration-200 backdrop-blur-sm sm:hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer touch-manipulation flex items-center justify-center"
                      aria-label="Close image viewer"
                      title="Close (Esc)"
                      type="button"
                    >
                      <X className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                {/* Image Container */}
                <motion.div
                  ref={imageContainerRef}
                  className="relative w-full bg-black/50 flex items-center justify-center overflow-hidden select-none touch-none rounded-t-2xl"
                  style={{
                    height: footer || author ? "calc(92vh - 200px)" : "92vh",
                    minHeight: "400px",
                    cursor:
                      scale > 1
                        ? isDragging
                          ? "grabbing"
                          : "grab"
                        : "default",
                  }}
                  role="img"
                  aria-label={alt}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onWheel={handleWheel}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-base-900/50 z-10">
                      <div className="loading loading-spinner loading-lg text-primary" />
                    </div>
                  )}
                  <div
                    className="relative w-full h-full"
                    style={{
                      transform: `scale(${scale}) translate(${
                        position.x / scale
                      }px, ${position.y / scale}px)`,
                      willChange: isDragging ? "transform" : "auto",
                    }}
                  >
                    <Image
                      src={src}
                      alt={alt}
                      fill
                      className="object-contain pointer-events-none select-none"
                      priority
                      onLoadingComplete={() => setIsLoading(false)}
                      draggable={false}
                    />
                  </div>
                </motion.div>

                {/* Footer and Author Info in Modal */}
                {(footer || author) && (
                  <div className="p-4 sm:p-6 md:p-8 flex flex-col gap-3 border-t border-base-content/10 rounded-b-2xl">
                    {footer && (
                      <div
                        className="text-sm md:text-base leading-relaxed text-base-content/90"
                        data-tina-field={dataTinaFieldFooter}
                      >
                        <TinaMarkdownRenderer content={footer} />
                      </div>
                    )}
                    {author && (
                      <div
                        className="text-xs md:text-sm font-semibold uppercase tracking-wider text-base-content/60"
                        data-tina-field={dataTinaFieldAuthor}
                      >
                        <span className="float-left mr-1">©</span>
                        <TinaMarkdownRenderer
                          content={author}
                          className="float-left"
                        />
                      </div>
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
