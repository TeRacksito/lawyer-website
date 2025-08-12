"use client";

import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import HeroBlock from "../../components/blocks/HeroBlock";
import ContentBlock from "../../components/blocks/ContentBlock";

interface TinaPageWrapperProps {
  query: string;
  variables: object;
  data: any;
}

export default function TinaPageWrapper({ query, variables, data }: TinaPageWrapperProps) {
  const { data: tinaData } = useTina({
    query,
    variables,
    data,
  });

  const pageData = tinaData.pages;

  return (
    <div className="page-container">
      {/* Render blocks */}
      {pageData.blocks?.map((block: any, index: number) => {
        switch (block?.__typename) {
          case "PagesBlocksHero":
            return <HeroBlock key={index} data={block} />;
          case "PagesBlocksContent":
            return <ContentBlock key={index} data={block} />;
          default:
            return null;
        }
      })}
      
      {/* Render markdown content if no blocks are present */}
      {(!pageData.blocks || pageData.blocks.length === 0) && (
        <div className="prose max-w-none p-8">
          <h1>{pageData.title}</h1>
          {pageData.description && <p>{pageData.description}</p>}
          <p>This page has no content blocks configured. Please add some blocks using the Tina CMS.</p>
        </div>
      )}
    </div>
  );
}
