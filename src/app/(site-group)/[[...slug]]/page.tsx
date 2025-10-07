import { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { client } from "../../../../tina/__generated__/client";
import PageWrapper from "./PageWrapper";

interface DynamicPageProps {
  params: Promise<{
    slug?: string[];
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  try {
    const pages = await client.queries.pagesConnection({
      filter: { draft: { eq: false } },
    });

    if (!pages.data.pagesConnection.edges) {
      return [];
    }

    const params = pages.data.pagesConnection.edges
      .map((page) => {
        const relativePath = page?.node?._sys.relativePath;
        if (!relativePath) return null;

        if (relativePath === "page.mdx") {
          return { slug: [] };
        }

        const pathParts = relativePath.split("/");
        const slugParts = pathParts.slice(0, -1);

        return {
          slug: slugParts,
        };
      })
      .filter((param): param is { slug: string[] } => param !== null);

    return params;
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: DynamicPageProps): Promise<Metadata> {
  const { slug } = await params;
  const slugArray = slug || [];
  const path =
    slugArray.length > 0 ? `${slugArray.join("/")}/page.mdx` : "page.mdx";

  try {
    const page = await client.queries.pages({ relativePath: path });
    const pageData = page.data.pages;

    return {
      title: pageData.seo?.metaTitle || pageData.title,
      description: pageData.seo?.metaDescription,
      ...(pageData.seo?.canonicalUrl && {
        alternates: {
          canonical: pageData.seo.canonicalUrl,
        },
      }),
    };
  } catch (error) {
    return {
      title: "Page Not Found",
      description: "The requested page could not be found.",
    };
  }
}

export default async function DynamicPage({ params }: DynamicPageProps) {
  const { slug } = await params;
  const slugArray = slug || [];
  const path =
    slugArray.length > 0 ? `${slugArray.join("/")}/page.mdx` : "page.mdx";

  const isDraftMode = (await draftMode()).isEnabled;

  try {
    const page = await client.queries.pages({ relativePath: path });

    if (!page.data.pages && !isDraftMode) {
      notFound();
    }

    if (!isDraftMode && page.data.pages?.draft) {
      notFound();
    }

    return (
      <PageWrapper
        query={page.query}
        variables={page.variables}
        data={page.data}
      />
    );
  } catch (error) {
    console.error("Error loading page:", error);
    notFound();
  }
}
