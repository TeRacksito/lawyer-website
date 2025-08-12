import { tinaField } from "tinacms/dist/react";
import Link from "next/link";
import Image from "next/image";

interface HeaderBlockProps {
  data: {
    logo?: string | null;
    logoImage?: string | null;
    navigation?: Array<{
      label?: string | null;
      href?: string | null;
      isExternal?: boolean | null;
    }> | null;
    theme?: string | null;
  };
}

export default function HeaderBlock({ data }: HeaderBlockProps) {
  const { logo, logoImage, navigation, theme = "light" } = data;

  const getThemeClasses = () => {
    switch (theme) {
      case "dark":
        return "bg-gray-900 text-white";
      case "transparent":
        return "bg-transparent text-white absolute top-0 left-0 right-0 z-50";
      default:
        return "bg-white text-gray-900 shadow-sm";
    }
  };

  return (
    <header className={`py-4 px-4 ${getThemeClasses()}`}>
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center" data-tina-field={tinaField(data, "logo")}>
            <Link href="/" className="flex items-center space-x-2">
              {logoImage && (
                <div data-tina-field={tinaField(data, "logoImage")}>
                  <Image
                    src={logoImage}
                    alt={logo || "Logo"}
                    width={40}
                    height={40}
                    className="w-10 h-10"
                  />
                </div>
              )}
              {logo && (
                <span className="text-xl font-bold">{logo}</span>
              )}
            </Link>
          </div>

          {/* Navigation */}
          {navigation && navigation.length > 0 && (
            <nav className="hidden md:flex items-center space-x-6" data-tina-field={tinaField(data, "navigation")}>
              {navigation.map((item, index) => {
                if (!item.label || !item.href) return null;
                
                if (item.isExternal) {
                  return (
                    <a
                      key={index}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-75 transition-opacity"
                    >
                      {item.label}
                    </a>
                  );
                }

                return (
                  <Link
                    key={index}
                    href={item.href}
                    className="hover:opacity-75 transition-opacity"
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          )}

          {/* Mobile menu button */}
          <button className="md:hidden p-2" aria-label="Menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
