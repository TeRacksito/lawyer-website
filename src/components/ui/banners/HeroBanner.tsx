import NextImage from "next/image";
import { useState, useEffect } from "react";

export interface IHeroBannerProps {
  resourceUrl: string;
  fullScreen?: true;
  children?: React.ReactNode;
  yShift?: number; // New prop to control vertical shift
}

export default function HeroBanner(props: IHeroBannerProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const heightClass = props.fullScreen ? "h-screen" : "h-48 md:h-64";

  // Clamp yShift between 0% and 100% to prevent image from going out of bounds
  const clampedYShift =
    props.yShift !== undefined ? Math.max(0, Math.min(100, props.yShift)) : 50; // Default to center (50%)

  // Load image programmatically after hydration
  // useEffect(() => {
  //   setIsImageLoaded(false);
  //   setImageSrc(null);

  //   const img = new Image();
  //   img.onload = () => {
  //     console.log("Image loaded successfully");
  //     setImageSrc(props.resourceUrl);
  //     // Small delay to ensure the image is rendered before animation
  //     setTimeout(() => {
  //       setIsImageLoaded(true);
  //     }, 100);
  //   };
  //   img.onerror = () => {
  //     console.error("Failed to load image:", props.resourceUrl);
  //     // Still show something even if image fails
  //     setImageSrc(props.resourceUrl);
  //     setIsImageLoaded(true);
  //   };
  //   img.src = props.resourceUrl;
  // }, [props.resourceUrl]);

  return (
    <section
      data-theme="dark"
      className={`relative w-full ${heightClass} flex items-center justify-center text-center px-4 md:px-6 overflow-hidden`}
    >
      {/* Loading state - solid black background */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-1000 ease-out ${
          isImageLoaded ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Image element with smooth reveal - only render when src is ready */}
      {imageSrc && (
        <NextImage
          placeholder="blur"
          src={props.resourceUrl}
          alt="Hero background"
          onLoadingComplete={() => setIsImageLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-out ${
            isImageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
          style={{
            objectPosition: `center ${clampedYShift}%`,
          }}
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative z-10 px-4 md:px-6 max-w-3xl md:max-w-4xl">
        {props.children ? props.children : ""}
      </div>
    </section>
  );
}
