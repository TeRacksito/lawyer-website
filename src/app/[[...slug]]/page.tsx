import { client } from "../../../tina/__generated__/client";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ClientPageWrapper from "./ClientPageWrapper";
import { draftMode } from "next/headers";

interface DynamicPageProps {
  params: Promise<{
    slug?: string[];
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Generate static paths for all pages
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

        // Extract slug from relativePath: about/page.mdx -> ["about"]
        // For root page: page.mdx -> []
        if (relativePath === "page.mdx") {
          return { slug: [] }; // Root page
        }

        const pathParts = relativePath.split("/");
        const slugParts = pathParts.slice(0, -1); // Remove 'page.mdx' from the end

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

// Generate metadata for SEO
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

export default async function DynamicPage({
  params,
  searchParams,
}: DynamicPageProps) {
  const { slug } = await params;
  const searchParamsData = await searchParams;
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

    // Always use client-side wrapper for contextual editing support
    return (
      <ClientPageWrapper
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
