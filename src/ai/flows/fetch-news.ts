'use server';

/**
 * @fileOverview A flow for fetching news articles.
 *
 * - fetchNews - A function that fetches news articles.
 * - FetchNewsOutput - The return type for the fetchNews function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { mockNewsArticles } from '@/lib/mock-news';

// Define the schema for a single news article
const NewsArticleSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  link: z.string(),
  source: z.string(),
  timestamp: z.string().datetime(),
});

const FetchNewsOutputSchema = z.object({
  articles: z.array(NewsArticleSchema),
});
export type FetchNewsOutput = z.infer<typeof FetchNewsOutputSchema>;

export async function fetchNews(): Promise<FetchNewsOutput> {
  return fetchNewsFlow();
}

const fetchNewsFlow = ai.defineFlow(
  {
    name: 'fetchNewsFlow',
    outputSchema: FetchNewsOutputSchema,
  },
  async () => {
    // In a real application, you would fetch this data from an external API.
    // For this example, we are using mock data.
    return {
      articles: mockNewsArticles.map((article) => ({
        ...article,
        timestamp: article.timestamp.toISOString(),
      })),
    };
  }
);
