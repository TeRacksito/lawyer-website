import { tinaField } from "tinacms/dist/react";
import { useState, useEffect } from "react";
import HeroTitleVariant from "./HeroTitleVariant";
import LandingPageVariant from "./LandingPageVariant";
import { formatTitle } from "./FormatTitle";
import { formatSubtitle } from "./formatSubtitle";

interface HeroBlockProps {
  data: {
    variant?: string | null;
    backgroundImage?: string | null;
    fullScreen?: boolean | null;
    yShift?: number | null;
    title?: string | null;
    subtitle?: string | null;
    authorName?: string | null;
    primaryButton?: {
      text?: string | null;
      href?: string | null;
    } | null;
    secondaryButton?: {
      text?: string | null;
      href?: string | null;
      hiddenText?: string | null;
    } | null;
  };
}

export default function HeroBlock({ data }: HeroBlockProps) {
  const {
    variant = "heroTitle",
    backgroundImage,
    fullScreen,
    yShift,
    title,
    subtitle,
    authorName,
    primaryButton,
    secondaryButton,
  } = data;

  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const heightClass = fullScreen ? "h-screen" : "h-48 md:h-64";

  // Clamp yShift between 0% and 100% to prevent image from going out of bounds
  const clampedYShift =
    yShift !== undefined && yShift !== null
      ? Math.max(0, Math.min(100, yShift))
      : 50; // Default to center (50%)

  // Load image programmatically after hydration
  useEffect(() => {
    if (!backgroundImage) return;

    setIsImageLoaded(false);
    setImageSrc(null);

    const img = new Image();
    img.onload = () => {
      setImageSrc(backgroundImage);
      // Small delay to ensure the image is rendered before animation
      setTimeout(() => {
        setIsImageLoaded(true);
      }, 100);
    };
    img.onerror = () => {
      console.error("Failed to load image:", backgroundImage);
      // Still show something even if image fails
      setImageSrc(backgroundImage);
      setIsImageLoaded(true);
    };
    img.src = backgroundImage;
  }, [backgroundImage]);

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
        <img
          src={imageSrc}
          alt="Hero background"
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-out ${
            isImageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
          style={{
            objectPosition: `center ${clampedYShift}%`,
          }}
          data-tina-field={tinaField(data, "backgroundImage")}
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      <div
        className="relative z-10 px-4 md:px-6 max-w-3xl md:max-w-5xl"
        data-tina-field={tinaField(data, "variant")}
      >
        {variant === "heroTitle" ? (
          <HeroTitleVariant data={data} />
        ) : variant === "landingPage" ? (
          <LandingPageVariant data={data} />
        ) : (
          // Fallback - show title and subtitle as simple text
          <div>
            {title && (
              <h1
                className="text-4xl lg:text-6xl font-bold mb-6"
                data-tina-field={tinaField(data, "title")}
              >
                {formatTitle(title)}
              </h1>
            )}
            {subtitle && (
              <p
                className="text-xl lg:text-2xl mb-8 text-gray-200"
                data-tina-field={tinaField(data, "subtitle")}
              >
                {formatSubtitle(
                  subtitle,
                  authorName,
                  tinaField(data, "subtitle")
                )}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
