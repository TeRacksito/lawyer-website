import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface LocalNavigationProps {
  data: {
    flexDirection?: "row" | "column";
    links?: { label: string; url: string }[] | null;
  };
  dataTinaField?: string;
  motionDelay?: number;
}

export default function LocalNavigation({
  data,
  dataTinaField,
  motionDelay = 0,
}: LocalNavigationProps) {
  const { flexDirection = "row", links = [] } = data;
  const pathname = usePathname();
  const [hoveredUrl, setHoveredUrl] = useState<string | null>(null);

  const isActive = (url: string) => pathname === url;

  const containerClassBase = "tabs tabs-boxed p-2 overflow-hidden";

  const containerClass =
    flexDirection === "column"
      ? `${containerClassBase} flex flex-col items-stretch gap-2 w-full max-w-md mx-auto`
      : `${containerClassBase} flex flex-row flex-wrap justify-center gap-2`;

  const tabBaseClass =
    flexDirection === "column"
      ? "w-full text-left justify-start px-4 py-3 text-sm sm:text-base font-medium break-words leading-snug transition-colors duration-200"
      : "px-3 py-2 sm:px-4 sm:py-2.5 text-sm sm:text-base font-medium break-words leading-snug transition-colors duration-200";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: motionDelay }}
      className={containerClass}
      onMouseLeave={() => setHoveredUrl(null)}
    >
      {links && links.length > 0 ? (
        links.map((link, index) => {
          const id = `${dataTinaField}.links.${index}`;
          const active = isActive(link.url);
          const isHovered = hoveredUrl === link.url;

          return link.url ? (
            <Link
              key={id}
              href={link.url}
              className={`${
                active
                  ? "!text-primary-content"
                  : "text-base-content/70 hover:text-base-content hover:bg-base-300/30"
              } tab relative ${tabBaseClass} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 z-30`}
              data-tina-field={id}
              aria-current={active ? "page" : undefined}
              onMouseEnter={() => setHoveredUrl(link.url)}
            >
              {active && (
                <motion.div
                  layoutId={`active-tab-${dataTinaField}`}
                  className="absolute inset-0 bg-primary rounded-lg shadow-md z-0"
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 25,
                  }}
                />
              )}
              {!active && isHovered && (
                <motion.div
                  layoutId={`hover-tab-${dataTinaField}`}
                  className="absolute inset-0 bg-base-300 blur-xs rounded-lg -z-20"
                  transition={{
                    type: "spring",
                    stiffness: 450,
                    damping: 35,
                  }}
                />
              )}

              <span className="relative z-10">{link.label}</span>
            </Link>
          ) : null;
        })
      ) : (
        <span className="text-base-content/50 text-sm px-4 py-2">
          Añade enlaces de navegación
        </span>
      )}
    </motion.div>
  );
}
