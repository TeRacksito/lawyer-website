import { tinaField } from "tinacms/dist/react";
import Link from "next/link";

interface FooterBlockProps {
  data: {
    copyright?: string | null;
    links?: Array<{
      label?: string | null;
      href?: string | null;
      isExternal?: boolean | null;
    }> | null;
    socialLinks?: Array<{
      platform?: string | null;
      url?: string | null;
    }> | null;
    theme?: string | null;
  };
}

export default function FooterBlock({ data }: FooterBlockProps) {
  const { copyright, links, socialLinks, theme = "dark" } = data;

  const getThemeClasses = () => {
    switch (theme) {
      case "light":
        return "bg-gray-100 text-gray-900 border-t border-gray-200";
      default:
        return "bg-gray-900 text-white";
    }
  };

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case "facebook":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
          </svg>
        );
      case "twitter":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
          </svg>
        );
      case "linkedin":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" clipRule="evenodd" />
          </svg>
        );
      case "instagram":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M12.017 0C8.396 0 7.989.013 7.041.072 6.094.131 5.42.332 4.836.629c-.611.317-1.13.74-1.648 1.258-.518.518-.941 1.037-1.258 1.648-.297.584-.498 1.258-.557 2.205C.975 7.989.96 8.396.96 12.017c0 3.621.013 4.028.072 4.976.059.947.26 1.621.557 2.205.317.611.74 1.13 1.258 1.648.518.518 1.037.941 1.648 1.258.584.297 1.258.498 2.205.557.948.059 1.355.072 4.976.072 3.621 0 4.028-.013 4.976-.072.947-.059 1.621-.26 2.205-.557.611-.317 1.13-.74 1.648-1.258.518-.518.941-1.037 1.258-1.648.297-.584.498-1.258.557-2.205.059-.948.072-1.355.072-4.976 0-3.621-.013-4.028-.072-4.976-.059-.947-.26-1.621-.557-2.205C22.458 4.836 22.035 4.317 21.517 3.799c-.518-.518-1.037-.941-1.648-1.258C19.285.332 18.611.131 17.664.072 16.716.013 16.309 0 12.688 0h-.67zm-.117 5.4c-3.688 0-6.677 2.989-6.677 6.677s2.989 6.677 6.677 6.677 6.677-2.989 6.677-6.677S15.588 5.4 11.9 5.4zm0 11.01c-2.392 0-4.333-1.941-4.333-4.333s1.941-4.333 4.333-4.333 4.333 1.941 4.333 4.333-1.941 4.333-4.333 4.333zM18.538 4.662c-.86 0-1.558.698-1.558 1.558s.698 1.558 1.558 1.558 1.558-.698 1.558-1.558-.698-1.558-1.558-1.558z" clipRule="evenodd" />
          </svg>
        );
      case "youtube":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <footer className={`py-8 px-4 ${getThemeClasses()}`}>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Links Section */}
          {links && links.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2" data-tina-field={tinaField(data, "links")}>
                {links.map((link, index) => {
                  if (!link.label || !link.href) return null;
                  
                  if (link.isExternal) {
                    return (
                      <li key={index}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:opacity-75 transition-opacity"
                        >
                          {link.label}
                        </a>
                      </li>
                    );
                  }

                  return (
                    <li key={index}>
                      <Link href={link.href} className="hover:opacity-75 transition-opacity">
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/* Social Links */}
          {socialLinks && socialLinks.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4" data-tina-field={tinaField(data, "socialLinks")}>
                {socialLinks.map((social, index) => {
                  if (!social.platform || !social.url) return null;
                  
                  return (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-75 transition-opacity"
                      aria-label={social.platform}
                    >
                      {getSocialIcon(social.platform)}
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          {/* Copyright */}
          {copyright && (
            <div className="md:text-right">
              <p className="text-sm opacity-75" data-tina-field={tinaField(data, "copyright")}>
                {copyright}
              </p>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
