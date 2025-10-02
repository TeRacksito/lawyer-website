import Link from "next/link";

interface INavLinksProps {
  layout?: "horizontal" | "vertical";
  showButton?: boolean;
  onLinkClick?: () => void;
}

export default function NavLinks({
  layout = "horizontal",
  showButton = true,
  onLinkClick,
}: INavLinksProps) {
  const baseStyle = "text-base transition hover:opacity-75";
  const linkContainerClass =
    layout === "horizontal"
      ? "flex items-center gap-6"
      : "flex flex-col items-center gap-4 py-4";

  const handleLinkClick = () => {
    if (onLinkClick) {
      onLinkClick();
    }
  };

  return (
    <nav className={linkContainerClass}>
      <Link
        href="/old/services"
        className={baseStyle}
        onClick={handleLinkClick}
      >
        Servicios
      </Link>
      <Link href="/old/about" className={baseStyle} onClick={handleLinkClick}>
        Quiénes somos
      </Link>
      <Link href="/old/blog" className={baseStyle} onClick={handleLinkClick}>
        Blog
      </Link>

      {showButton && (
        <Link
          href="/old/contact"
          className="btn btn-neutral shadow-md"
          onClick={handleLinkClick}
        >
          Consulta Gratuita
        </Link>
      )}
    </nav>
  );
}
