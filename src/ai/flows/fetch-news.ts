'use server';

/**
 * @fileOverview A flow for fetching news articles.
 *
 * - fetchNews - A function that fetches news articles.
 * - FetchNewsOutput - The return type for the fetchNews function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { fetchYahooFinanceNews } from '@/services/news-fetcher';

// Define the schema for a single news article
const NewsArticleSchema = z.object({
  id: z.string(),
  title: z.string(),
  link: z.string(),
  source: z.string(),
  timestamp: z.string().datetime(),
  imageUrl: z.string().url().optional(),
  isVideo: z.boolean(),
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
    const articles = await fetchYahooFinanceNews();
    return {
      articles: articles.map((article) => ({
        id: article.id,
        title: article.title,
        link: article.link,
        source: article.source,
        timestamp: article.timestamp,
        imageUrl: article.imageUrl,
        isVideo: article.isVideo,
      })),
    };
  }
);
