import Link from "next/link";
import { tinaField } from "tinacms/dist/react";

interface NavigationItem {
  label?: string | null;
  href?: string | null;
  isExternal?: boolean | null;
}

interface CTAButton {
  text?: string | null;
  href?: string | null;
  show?: boolean | null;
}

interface IHeaderNavLinksProps {
  navigation?: NavigationItem[] | null;
  ctaButton?: CTAButton | null;
  layout?: "horizontal" | "vertical";
  onLinkClick?: () => void;
  data?: any;
  isScrolled?: boolean;
}

export default function HeaderNavLinks({
  navigation,
  ctaButton,
  layout = "horizontal",
  onLinkClick,
  data,
  isScrolled = true,
}: IHeaderNavLinksProps) {
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
      {navigation &&
        navigation.map((item, index) => {
          if (!item.label || !item.href) return null;

          if (item.isExternal) {
            return (
              <a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={baseStyle}
                onClick={handleLinkClick}
                data-tina-field={
                  data ? tinaField(data, `navigation.${index}`) : undefined
                }
              >
                {item.label}
              </a>
            );
          }

          return (
            <Link
              key={index}
              href={item.href}
              className={baseStyle}
              onClick={handleLinkClick}
              data-tina-field={
                data ? tinaField(data, `navigation.${index}`) : undefined
              }
            >
              {item.label}
            </Link>
          );
        })}

      {ctaButton?.show && ctaButton.text && ctaButton.href && (
        <Link
          href={ctaButton.href}
          className={`btn btn-neutral shadow-md transition-all ${
            isScrolled ? "btn-md" : "btn-lg"
          }`}
          onClick={handleLinkClick}
          data-tina-field={data ? tinaField(data, "ctaButton") : undefined}
        >
          {ctaButton.text}
        </Link>
      )}
    </nav>
  );
}
