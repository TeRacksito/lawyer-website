/**
 * SEO Generator Analytics and Telemetry
 * Tracks API usage, costs, and cache performance
 */

export interface SEOGenerationMetrics {
  timestamp: string;
  pageUri: string;
  success: boolean;
  tokensUsed?: {
    prompt: number;
    completion: number;
    cached?: number;
    total: number;
  };
  cost?: {
    prompt: number;
    completion: number;
    cached: number;
    total: number;
  };
  latency?: number;
  error?: string;
  cacheHit?: boolean;
}

/**
 * Cost calculation for GPT-4o-mini (as of 2024-2025)
 * Input: $0.150 per 1M tokens
 * Output: $0.600 per 1M tokens
 * Cached Input: $0.075 per 1M tokens (50% discount)
 */
const PRICING = {
  INPUT_PER_1M: 0.15,
  OUTPUT_PER_1M: 0.6,
  CACHED_INPUT_PER_1M: 0.075, // 50% discount
};

export function calculateCost(tokens: {
  prompt: number;
  completion: number;
  cached?: number;
}): {
  prompt: number;
  completion: number;
  cached: number;
  total: number;
} {
  const cachedTokens = tokens.cached || 0;
  const uncachedPromptTokens = tokens.prompt - cachedTokens;

  const promptCost = (uncachedPromptTokens / 1_000_000) * PRICING.INPUT_PER_1M;
  const cachedCost = (cachedTokens / 1_000_000) * PRICING.CACHED_INPUT_PER_1M;
  const completionCost =
    (tokens.completion / 1_000_000) * PRICING.OUTPUT_PER_1M;

  return {
    prompt: promptCost,
    cached: cachedCost,
    completion: completionCost,
    total: promptCost + cachedCost + completionCost,
  };
}

export function logSEOGeneration(metrics: SEOGenerationMetrics): void {
  const logData = {
    timestamp: metrics.timestamp,
    page: metrics.pageUri,
    success: metrics.success,
    ...(metrics.tokensUsed && {
      tokens: metrics.tokensUsed,
    }),
    ...(metrics.cost && {
      cost: {
        ...metrics.cost,
        total: `$${metrics.cost.total.toFixed(6)}`,
      },
    }),
    ...(metrics.latency && {
      latency: `${metrics.latency}ms`,
    }),
    ...(metrics.cacheHit !== undefined && {
      cacheHit: metrics.cacheHit,
    }),
    ...(metrics.error && {
      error: metrics.error,
    }),
  };

  console.log("[SEO Generator]", JSON.stringify(logData, null, 2));

  // In production, you might want to send this to an analytics service
  // Example: sendToAnalytics(logData);
}

export function extractTokenUsage(openAIResponse: any): {
  prompt: number;
  completion: number;
  cached: number;
  total: number;
} | null {
  try {
    const usage = openAIResponse.usage;
    if (!usage) return null;

    return {
      prompt: usage.prompt_tokens || 0,
      completion: usage.completion_tokens || 0,
      cached: usage.prompt_tokens_details?.cached_tokens || 0,
      total: usage.total_tokens || 0,
    };
  } catch (error) {
    console.error("[SEO Generator] Failed to extract token usage:", error);
    return null;
  }
}

export function getCacheSavings(tokens: {
  prompt: number;
  completion: number;
  cached: number;
}): {
  savedTokens: number;
  savedCost: number;
  savingsPercentage: number;
} {
  const savedTokens = tokens.cached;
  const fullCost = (savedTokens / 1_000_000) * PRICING.INPUT_PER_1M;
  const cachedCost = (savedTokens / 1_000_000) * PRICING.CACHED_INPUT_PER_1M;
  const savedCost = fullCost - cachedCost;

  const totalPromptCost =
    (tokens.prompt / 1_000_000) * PRICING.INPUT_PER_1M +
    (tokens.completion / 1_000_000) * PRICING.OUTPUT_PER_1M;
  const savingsPercentage =
    totalPromptCost > 0 ? (savedCost / totalPromptCost) * 100 : 0;

  return {
    savedTokens,
    savedCost,
    savingsPercentage,
  };
}
