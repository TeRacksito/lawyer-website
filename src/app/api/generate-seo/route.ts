import { NextRequest, NextResponse } from "next/server";
import { isUserAuthorized } from "@tinacms/auth";
import { getSystemMessageWithContext } from "@/lib/seo-generator-context";
import {
  logSEOGeneration,
  extractTokenUsage,
  calculateCost,
  getCacheSavings,
} from "@/lib/seo-generator-telemetry";

interface GeneratedSEO {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogType: "website" | "article" | "profile";
  twitterCard: "summary" | "summary_large_image" | "app" | "player";
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  let pageUri = "unknown";

  try {
    const authHeader = request.headers.get("authorization");
    const clientID = process.env.NEXT_PUBLIC_TINA_CLIENT_ID;

    if (process.env.NODE_ENV !== "development") {
      if (!authHeader || !clientID) {
        return NextResponse.json(
          { error: "Unauthorized - Missing authentication" },
          { status: 401 }
        );
      }

      const isAuthorized = await isUserAuthorized({
        token: authHeader,
        clientID: clientID,
      });

      if (!isAuthorized) {
        return NextResponse.json(
          { error: "Unauthorized - Invalid token" },
          { status: 401 }
        );
      }
    }

    const body = await request.json();
    const {
      pageTitle,
      blocks,
      pageUri: uri,
    } = body as {
      pageTitle: string;
      blocks: any[];
      pageUri: string;
    };

    pageUri = uri; // Store for telemetry

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "OpenAI API key not configured on server" },
        { status: 500 }
      );
    }

    if (!blocks || blocks.length === 0) {
      return NextResponse.json(
        {
          error:
            "No hay contenido en la página. Agrega bloques antes de generar SEO.",
        },
        { status: 400 }
      );
    }

    const blocksContent = JSON.stringify(blocks, null, 2);

    const systemMessage = getSystemMessageWithContext();

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: systemMessage,
          },
          {
            role: "user",
            content: `Genera metadatos SEO optimizados para esta página específica:

Título de la página: ${pageTitle}
URL/Ruta de la página: ${pageUri}

Contenido de la página (bloques):
${blocksContent}

Requisitos específicos:
- El metaTitle debe ser conciso (50-60 caracteres), atractivo y optimizado para SEO
- La metaDescription debe ser descriptiva (150-160 caracteres) y contener llamadas a la acción
- Genera 5-8 keywords relevantes en español
- Determina el ogType más apropiado (website, article, o profile)
- Selecciona el twitterCard más adecuado (summary o summary_large_image)
- Ten en cuenta la URL/ruta de la página para entender el contexto y la sección del sitio
- Aplica el contexto del bufete CLG proporcionado en el mensaje del sistema`,
          },
        ],
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "seo_metadata",
            strict: true,
            schema: {
              type: "object",
              properties: {
                metaTitle: {
                  type: "string",
                  description:
                    "Meta título optimizado para SEO (50-60 caracteres)",
                },
                metaDescription: {
                  type: "string",
                  description:
                    "Meta descripción optimizada para SEO (150-160 caracteres)",
                },
                keywords: {
                  type: "array",
                  items: { type: "string" },
                  description: "Array de palabras clave relevantes",
                },
                ogType: {
                  type: "string",
                  enum: ["website", "article", "profile"],
                  description: "Tipo de contenido Open Graph",
                },
                twitterCard: {
                  type: "string",
                  enum: ["summary", "summary_large_image", "app", "player"],
                  description: "Tipo de tarjeta de Twitter",
                },
              },
              required: [
                "metaTitle",
                "metaDescription",
                "keywords",
                "ogType",
                "twitterCard",
              ],
              additionalProperties: false,
            },
          },
        },
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const error: any = await response.json();
      const errorMessage = `OpenAI API error: ${
        error.error?.message || "Unknown error"
      }`;

      logSEOGeneration({
        timestamp: new Date().toISOString(),
        pageUri,
        success: false,
        latency: Date.now() - startTime,
        error: errorMessage,
      });

      return NextResponse.json(
        { error: errorMessage },
        { status: response.status }
      );
    }

    const data: any = await response.json();
    const generatedContent: GeneratedSEO = JSON.parse(
      data.choices[0].message.content
    );

    const tokensUsed = extractTokenUsage(data);
    const latency = Date.now() - startTime;

    if (tokensUsed) {
      const cost = calculateCost(tokensUsed);
      const cacheHit = tokensUsed.cached > 0;

      logSEOGeneration({
        timestamp: new Date().toISOString(),
        pageUri,
        success: true,
        tokensUsed,
        cost,
        latency,
        cacheHit,
      });

      if (cacheHit) {
        const savings = getCacheSavings(tokensUsed);
        console.log(
          `[SEO Generator] Cache hit! Saved ${
            savings.savedTokens
          } tokens ($${savings.savedCost.toFixed(
            6
          )}, ${savings.savingsPercentage.toFixed(1)}% savings)`
        );
      }
    } else {
      logSEOGeneration({
        timestamp: new Date().toISOString(),
        pageUri,
        success: true,
        latency,
      });
    }

    return NextResponse.json(generatedContent);
  } catch (error) {
    console.error("Error generating SEO:", error);

    logSEOGeneration({
      timestamp: new Date().toISOString(),
      pageUri,
      success: false,
      latency: Date.now() - startTime,
      error:
        error instanceof Error
          ? error.message
          : "Error desconocido al generar SEO",
    });

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Error desconocido al generar SEO",
      },
      { status: 500 }
    );
  }
}
