import Link from 'next/link';

interface INavLinksProps {
  layout?: 'horizontal' | 'vertical';
  showButton?: boolean;
}

export default function NavLinks({ layout = 'horizontal', showButton = true }: INavLinksProps) {
  const baseStyle = 'text-base transition';
  const linkContainerClass =
    layout === 'horizontal'
      ? 'flex items-center gap-6'
      : 'flex flex-col items-center gap-4 py-4';

  return (
    <nav className={linkContainerClass}>
      <Link href="/services" className={baseStyle}>
        Servicios
      </Link>
      <Link href="/about" className={baseStyle}>
        Quiénes somos
      </Link>
      <Link href="/contact" className={baseStyle}>
        Contacto
      </Link>
      <Link href="/blog" className={baseStyle}>
        Blog
      </Link>

      {showButton && (
        <Link
          href="/consultation"
          className="btn btn-neutral shadow-md"
        >
          Consulta gratuita
        </Link>
      )}
    </nav>
  );
}
