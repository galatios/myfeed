'use server';

/**
 * @fileOverview An AI flow for analyzing news articles to extract stock tickers,
 * key takeaways, and the main topic.
 *
 * - analyzeArticle - A function that analyzes a news article.
 * - AnalyzeArticleInput - The input type for the analyzeArticle function.
 * - AnalyzeArticleOutput - The return type for the analyzeArticle function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { getMockStockPrice } from '@/services/stock-fetcher';

// Define the schema for a stock ticker
const TickerSchema = z.object({
  symbol: z.string().describe('The stock ticker symbol, without the `$` prefix.'),
  price: z.number().describe('The current price of the stock.'),
});

// Input schema for the analysis flow
const AnalyzeArticleInputSchema = z.object({
  articleContent: z
    .string()
    .describe('The content of the news article to analyze.'),
});
export type AnalyzeArticleInput = z.infer<typeof AnalyzeArticleInputSchema>;

// Output schema for the analysis flow
const AnalyzeArticleOutputSchema = z.object({
  tickers: z.array(TickerSchema).describe('An array of stock tickers found in the article.'),
  keyTakeaways: z.array(z.string()).describe('A list of key takeaways from the article.'),
  topic: z.string().describe('The main topic of the article (e.g., Technology, Finance, Healthcare).'),
  sentiment: z.enum(['Positive', 'Negative', 'Neutral']).describe('The overall sentiment of the article.'),
});
export type AnalyzeArticleOutput = z.infer<typeof AnalyzeArticleOutputSchema>;

// Tool to get stock price
const getStockPrice = ai.defineTool(
  {
    name: 'getStockPrice',
    description: 'Returns the current market value of a stock.',
    inputSchema: z.object({
      ticker: z.string().describe('The ticker symbol of the stock.'),
    }),
    outputSchema: z.number(),
  },
  async (input) => {
    return getMockStockPrice(input.ticker);
  }
);

// Prompt for article analysis
const analyzeArticlePrompt = ai.definePrompt({
  name: 'analyzeArticlePrompt',
  input: { schema: AnalyzeArticleInputSchema },
  output: { schema: AnalyzeArticleOutputSchema },
  tools: [getStockPrice],
  prompt: `Analyze the following news article. Your task is to:
1.  Identify all stock tickers mentioned (e.g., $GOOG, $AAPL). For each ticker, use the getStockPrice tool to find its current price.
2.  Generate a list of 3-5 key takeaways or bullet points.
3.  Determine the main topic of the article from one of the following categories: Technology, Finance, Geopolitics, Economy, Healthcare, Energy, General.
4.  Analyze the overall sentiment of the article and classify it as Positive, Negative, or Neutral.

Article Content:
{{{articleContent}}}
`,
});

// The main flow function
const analyzeArticleFlow = ai.defineFlow(
  {
    name: 'analyzeArticleFlow',
    inputSchema: AnalyzeArticleInputSchema,
    outputSchema: AnalyzeArticleOutputSchema,
  },
  async (input) => {
    const { output } = await analyzeArticlePrompt(input);
    return output!;
  }
);

export async function analyzeArticle(input: AnalyzeArticleInput): Promise<AnalyzeArticleOutput> {
  return analyzeArticleFlow(input);
}
