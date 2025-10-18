import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

  const isActive = (url: string) => pathname === url;

  const containerClassBase = "tabs tabs-boxed p-2 overflow-hidden";

  const containerClass =
    flexDirection === "column"
      ? `${containerClassBase} flex flex-col items-center gap-2 w-full max-w-md mx-auto`
      : `${containerClassBase} flex flex-row flex-wrap justify-center gap-2`;

  const tabBaseClass =
    flexDirection === "column"
      ? "text-center justify-center px-4 py-2.5 text-sm sm:text-base font-medium break-words leading-snug transition-colors duration-200"
      : "px-3 py-2 sm:px-4 sm:py-2.5 text-sm sm:text-base font-medium break-words leading-snug transition-colors duration-200";

  return (
    <div className={containerClass}>
      {links && links.length > 0 ? (
        links.map((link, index) => {
          const id = `${dataTinaField}.links.${index}`;
          const active = isActive(link.url);

          return link.url ? (
            <motion.div
              key={id}
              whileTap={{ scale: 0.95 }}
              initial={{
                opacity: 0,
                ...(flexDirection === "column" ? { y: 20 } : { x: 20 }),
              }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 0.6, delay: motionDelay + index * 0.1 }}
              tabIndex={-1}
              role="presentation"
            >
              <Link
                href={link.url}
                className={`${
                  active
                    ? "!text-primary-content"
                    : "text-base-content/70 hover:text-base-content hover:bg-base-300/30"
                } tab relative ${tabBaseClass} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1`}
                data-tina-field={id}
                aria-current={active ? "page" : undefined}
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

                <span className="relative z-10">{link.label}</span>
              </Link>
            </motion.div>
          ) : null;
        })
      ) : (
        <span className="text-base-content/50 text-sm px-4 py-2">
          Añade enlaces de navegación
        </span>
      )}
    </div>
  );
}
