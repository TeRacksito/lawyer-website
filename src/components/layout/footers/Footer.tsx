import Link from "next/link";

export interface IFooterProps {
  dataTheme?: string;
}

export default function Footer(props: IFooterProps) {
  return (
    <footer
      className="bg-base-200 border-t border-base-300"
      {...(props.dataTheme ? { "data-theme": props.dataTheme } : {})}
    >
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Firm Information */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold font-serif text-primary">
              Luis Cruz
            </h3>
            <p className="text-sm text-base-content/80 font-medium">
              Abogado Colegiado
            </p>
            <div className="space-y-2 text-sm">
              <p className="flex items-start gap-2">
                <span className="font-medium">Dirección:</span>
                <span className="text-base-content/80">
                  Calle Principal #123
                  <br />
                  Dirección
                </span>
              </p>
              <p className="flex items-center gap-2">
                <span className="font-medium">Teléfono:</span>
                <a
                  href="tel:+32123456789"
                  className="text-primary hover:underline"
                >
                  +34 123 45 67 89
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span className="font-medium">Email:</span>
                <a
                  href="mailto:info@cgc-abogados.es"
                  className="text-primary hover:underline"
                >
                  info@cgc-abogados.es
                </a>
              </p>
            </div>
          </div>

          {/* Practice Areas */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-base-content">
              Áreas de Práctica
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/old/services#penal"
                  className="text-base-content/80 hover:text-primary transition-colors"
                >
                  Derecho Penal
                </Link>
              </li>
              <li>
                <Link
                  href="/old/services#civil"
                  className="text-base-content/80 hover:text-primary transition-colors"
                >
                  Derecho Civil
                </Link>
              </li>
              <li>
                <Link
                  href="/old/services#familia"
                  className="text-base-content/80 hover:text-primary transition-colors"
                >
                  Derecho de Familia
                </Link>
              </li>
              <li>
                <Link
                  href="/old/services#laboral"
                  className="text-base-content/80 hover:text-primary transition-colors"
                >
                  Derecho Laboral
                </Link>
              </li>
              <li>
                <Link
                  href="/old/services"
                  className="text-base-content/80 hover:text-primary transition-colors"
                >
                  + Ver más
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-base-content">
              Enlaces Rápidos
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/old/about"
                  className="text-base-content/80 hover:text-primary transition-colors"
                >
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="/old/services"
                  className="text-base-content/80 hover:text-primary transition-colors"
                >
                  Servicios
                </Link>
              </li>
              <li>
                <Link
                  href="/old/contact"
                  className="text-base-content/80 hover:text-primary transition-colors"
                >
                  Contacto
                </Link>
              </li>
              <li>
                <Link
                  href="/old/blogs"
                  className="text-base-content/80 hover:text-primary transition-colors"
                >
                  Blog Jurídico
                </Link>
              </li>
              <li>
                <Link
                  href="/old/emergency"
                  className="text-base-content/80 hover:text-primary transition-colors"
                >
                  Contacto de Emergencia
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-base-content">
              Información Legal
            </h4>
            <div className="space-y-2 text-sm text-base-content/80">
              <p>
                <span className="font-medium">Colegio:</span>
                <br />
                Colegio de Abogados y Abogadas de Barcelona
              </p>
              <p>
                <span className="font-medium">Carné:</span> 12345
              </p>
              <p>
                <span className="font-medium">Horarios:</span>
                <br />
                Lunes a Viernes: 8:00 AM - 6:00 PM
                <br />
                Sábados: 9:00 AM - 1:00 PM
              </p>
            </div>
            <div className="pt-2">
              <Link href="/old/contact" className="btn btn-primary btn-sm">
                Consulta Gratuita
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Legal Notice Section */}
      <div className="border-t border-base-300 bg-base-300">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 text-xs text-base-content/70">
            {/* Legal Disclaimers */}
            <div className="space-y-2 max-w-3xl">
              <p className="font-medium text-base-content/90">
                Aviso Legal y Descargo de Responsabilidad:
              </p>
              <p>
                La información contenida en este sitio web es de carácter
                general y no constituye asesoramiento legal específico. La
                comunicación a través de este sitio web no establece una
                relación abogado-cliente. Para obtener asesoramiento legal
                específico sobre su situación particular, debe consultar
                directamente con un abogado calificado.
              </p>
              <p>
                Este sitio web puede contener enlaces a sitios web de terceros.
                No nos hacemos responsables del contenido, políticas de
                privacidad o prácticas de dichos sitios web externos.
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex flex-col lg:flex-row gap-4 text-xs whitespace-nowrap">
              <Link
                href="/old/privacy"
                className="hover:text-primary transition-colors"
              >
                Política de Privacidad
              </Link>
              <Link
                href="/old/terms"
                className="hover:text-primary transition-colors"
              >
                Términos de Uso
              </Link>
              <Link
                href="/old/cookies"
                className="hover:text-primary transition-colors"
              >
                Política de Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-base-300 bg-base-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-sm text-base-content/80">
            <p>
              &copy; {new Date().getFullYear()} Luis Cruz - Abogado. Todos los
              derechos reservados.
            </p>
            <p className="text-xs">
              Sitio web desarrollado y diseñado por{" "}
              <Link
                href="https://angelkrasimirov.es"
                className="text-primary hover:underline"
              >
                Angel Krasimirov
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
