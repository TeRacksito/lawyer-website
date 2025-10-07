import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import Link from "next/link";

interface FooterBlockProps {
  data: {
    dataTheme?: string | null;
    firmInfo?: {
      name?: string | null;
      title?: string | null;
      address?: string | null;
      phone?: string | null;
      email?: string | null;
    } | null;
    practiceAreas?: {
      title?: string | null;
      areas?: Array<{
        name?: string | null;
        href?: string | null;
      }> | null;
    } | null;
    quickLinks?: {
      title?: string | null;
      links?: Array<{
        label?: string | null;
        href?: string | null;
      }> | null;
    } | null;
    legalInfo?: {
      title?: string | null;
      college?: string | null;
      license?: string | null;
      hours?: string | null;
      consultationButtonText?: string | null;
      consultationButtonHref?: string | null;
    } | null;
    legalNotice?: {
      title?: string | null;
      disclaimers?: any | null;
    } | null;
    legalLinks?: Array<{
      label?: string | null;
      href?: string | null;
    }> | null;
    copyright?: {
      text?: string | null;
    } | null;
  };
}

export default function FooterBlock({ data }: FooterBlockProps) {
  const {
    dataTheme,
    firmInfo,
    practiceAreas,
    quickLinks,
    legalInfo,
    legalNotice,
    legalLinks,
    copyright,
  } = data;

  return (
    <footer
      className="bg-base-200 border-t border-base-300"
      {...(dataTheme ? { "data-theme": dataTheme } : {})}
    >
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            className="space-y-4"
            data-tina-field={tinaField(data, "firmInfo")}
          >
            {firmInfo?.name && (
              <h3
                className="text-2xl font-bold font-serif text-primary"
                data-tina-field={tinaField(firmInfo, "name")}
              >
                {firmInfo.name}
              </h3>
            )}
            {firmInfo?.title && (
              <p
                className="text-sm text-base-content/80 font-medium"
                data-tina-field={tinaField(firmInfo, "title")}
              >
                {firmInfo.title}
              </p>
            )}
            <div className="space-y-2 text-sm">
              {firmInfo?.address && (
                <p className="flex items-start gap-2">
                  <span className="font-medium">Dirección:</span>
                  <span
                    className="text-base-content/80"
                    data-tina-field={tinaField(firmInfo, "address")}
                  >
                    {firmInfo.address
                      .split("\n")
                      .map((line: string, lineIndex: number) => (
                        <span key={lineIndex}>
                          {line}
                          {lineIndex <
                            firmInfo.address!.split("\n").length - 1 && <br />}
                        </span>
                      ))}
                  </span>
                </p>
              )}
              {firmInfo?.phone && (
                <p className="flex items-center gap-2">
                  <span className="font-medium">Teléfono:</span>
                  <a
                    href={`tel:${firmInfo.phone.replace(/\s/g, "")}`}
                    className="text-primary hover:underline"
                    data-tina-field={tinaField(firmInfo, "phone")}
                  >
                    {firmInfo.phone}
                  </a>
                </p>
              )}
              {firmInfo?.email && (
                <p className="flex items-center gap-2">
                  <span className="font-medium">Email:</span>
                  <a
                    href={`mailto:${firmInfo.email}`}
                    className="text-primary hover:underline"
                    data-tina-field={tinaField(firmInfo, "email")}
                  >
                    {firmInfo.email}
                  </a>
                </p>
              )}
            </div>
          </div>

          <div
            className="space-y-4"
            data-tina-field={tinaField(data, "practiceAreas")}
          >
            {practiceAreas?.title && (
              <h4
                className="text-lg font-semibold text-base-content"
                data-tina-field={tinaField(practiceAreas, "title")}
              >
                {practiceAreas.title}
              </h4>
            )}
            {practiceAreas?.areas && practiceAreas.areas.length > 0 && (
              <ul className="space-y-2 text-sm">
                {practiceAreas.areas.map(
                  (area, areaIndex: number) =>
                    area.name &&
                    area.href && (
                      <li
                        key={areaIndex}
                        data-tina-field={tinaField(
                          practiceAreas,
                          "areas",
                          areaIndex
                        )}
                      >
                        <Link
                          href={area.href}
                          className="text-base-content/80 hover:text-primary transition-colors"
                        >
                          {area.name}
                        </Link>
                      </li>
                    )
                )}
              </ul>
            )}
          </div>

          <div
            className="space-y-4"
            data-tina-field={tinaField(data, "quickLinks")}
          >
            {quickLinks?.title && (
              <h4
                className="text-lg font-semibold text-base-content"
                data-tina-field={tinaField(quickLinks, "title")}
              >
                {quickLinks.title}
              </h4>
            )}
            {quickLinks?.links && quickLinks.links.length > 0 && (
              <ul className="space-y-2 text-sm">
                {quickLinks.links.map(
                  (link, linkIndex: number) =>
                    link.label &&
                    link.href && (
                      <li
                        key={linkIndex}
                        data-tina-field={tinaField(
                          quickLinks,
                          "links",
                          linkIndex
                        )}
                      >
                        <Link
                          href={link.href}
                          className="text-base-content/80 hover:text-primary transition-colors"
                        >
                          {link.label}
                        </Link>
                      </li>
                    )
                )}
              </ul>
            )}
          </div>

          <div
            className="space-y-4"
            data-tina-field={tinaField(data, "legalInfo")}
          >
            {legalInfo?.title && (
              <h4
                className="text-lg font-semibold text-base-content"
                data-tina-field={tinaField(legalInfo, "title")}
              >
                {legalInfo.title}
              </h4>
            )}
            <div className="space-y-2 text-sm text-base-content/80">
              {legalInfo?.college && (
                <p>
                  <span className="font-medium">Colegio:</span>
                  <br />
                  <span data-tina-field={tinaField(legalInfo, "college")}>
                    {legalInfo.college}
                  </span>
                </p>
              )}
              {legalInfo?.license && (
                <p>
                  <span className="font-medium">Carné:</span>{" "}
                  <span data-tina-field={tinaField(legalInfo, "license")}>
                    {legalInfo.license}
                  </span>
                </p>
              )}
              {legalInfo?.hours && (
                <p>
                  <span className="font-medium">Horarios:</span>
                  <br />
                  <span data-tina-field={tinaField(legalInfo, "hours")}>
                    {legalInfo.hours
                      .split("\n")
                      .map((line: string, lineIndex: number) => (
                        <span key={lineIndex}>
                          {line}
                          {lineIndex <
                            legalInfo.hours!.split("\n").length - 1 && <br />}
                        </span>
                      ))}
                  </span>
                </p>
              )}
            </div>
            {legalInfo?.consultationButtonText &&
              legalInfo?.consultationButtonHref && (
                <div className="pt-2">
                  <Link
                    href={legalInfo.consultationButtonHref}
                    className="btn btn-primary btn-sm"
                    data-tina-field={tinaField(
                      legalInfo,
                      "consultationButtonText"
                    )}
                  >
                    {legalInfo.consultationButtonText}
                  </Link>
                </div>
              )}
          </div>
        </div>
      </div>

      {legalNotice && (legalNotice.title || legalNotice.disclaimers) && (
        <div className="border-t border-base-300 bg-base-300">
          <div className="container mx-auto px-6 py-6">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 text-xs text-base-content/70">
              <div
                className="space-y-2 max-w-3xl"
                data-tina-field={tinaField(data, "legalNotice")}
              >
                {legalNotice.title && (
                  <p
                    className="font-medium text-base-content/90"
                    data-tina-field={tinaField(legalNotice, "title")}
                  >
                    {legalNotice.title}
                  </p>
                )}
                {legalNotice.disclaimers && (
                  <div
                    data-tina-field={tinaField(legalNotice, "disclaimers")}
                    className="prose prose-sm text-xs max-w-none"
                  >
                    <TinaMarkdown content={legalNotice.disclaimers} />
                  </div>
                )}
              </div>

              {legalLinks && legalLinks.length > 0 && (
                <div className="flex flex-col lg:flex-row gap-4 text-xs whitespace-nowrap">
                  {legalLinks.map(
                    (link, index: number) =>
                      link.label &&
                      link.href && (
                        <Link
                          key={index}
                          href={link.href}
                          className="hover:text-primary transition-colors"
                          data-tina-field={tinaField(data, "legalLinks", index)}
                        >
                          {link.label}
                        </Link>
                      )
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="border-t border-base-300 bg-base-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-sm text-base-content/80">
            <p>
              &copy; {new Date().getFullYear()}
              {copyright && (
                <span data-tina-field={tinaField(copyright, "text")}>
                  {" "}
                  {copyright.text}
                </span>
              )}
            </p>
            <p>
              <Link
                href="/admin/index.html"
                className="opacity-40 hover:opacity-100 focus:opacity-100 transition-opacity"
              >
                Panel de administrador
              </Link>
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
