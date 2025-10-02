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

  const getActiveTab = (url: string) => {
    return pathname === url ? "tab-active" : "";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: motionDelay }}
      className="tabs tabs-boxed justify-center"
    >
      {links
        ? links.map((link, index) => {
            const id = `${dataTinaField}.links.${index}`;
            return link.url ? (
              <Link
                key={id}
                href={link.url}
                className={`tab ${getActiveTab(link.url)}`}
                data-tina-field={id}
              >
                {link.label}
              </Link>
            ) : null;
          })
        : "Añade enlaces de navegación"}
    </motion.div>
  );
}
