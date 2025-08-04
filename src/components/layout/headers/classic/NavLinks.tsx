import Link from 'next/link';

interface INavLinksProps {
  layout?: 'horizontal' | 'vertical';
  showButton?: boolean;
  onLinkClick?: () => void;
}

export default function NavLinks({ layout = 'horizontal', showButton = true, onLinkClick }: INavLinksProps) {
  const baseStyle = 'text-base transition';
  const linkContainerClass =
    layout === 'horizontal'
      ? 'flex items-center gap-6'
      : 'flex flex-col items-center gap-4 py-4';

  const handleLinkClick = () => {
    if (onLinkClick) {
      onLinkClick();
    }
  };

  return (
    <nav className={linkContainerClass}>
      <Link href="/services" className={baseStyle} onClick={handleLinkClick}>
        Servicios
      </Link>
      <Link href="/about" className={baseStyle} onClick={handleLinkClick}>
        Quiénes somos
      </Link>
      <Link href="/blog" className={baseStyle} onClick={handleLinkClick}>
        Blog
      </Link>

      {showButton && (
        <Link
          href="/contact"
          className="btn btn-neutral shadow-md"
          onClick={handleLinkClick}
        >
          Consulta Gratuita
        </Link>
      )}
    </nav>
  );
}
