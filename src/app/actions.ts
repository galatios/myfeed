'use server';

import { summarizeArticle } from '@/ai/flows/summarize-article';
import { fetchNews } from '@/ai/flows/fetch-news';
import type { NewsArticle, AIComment } from '@/lib/types';

export async function getSummaryAction(
  content: string
): Promise<{ summary: string | null; error: string | null }> {
  if (!content || content.trim().length < 100) {
    return {
      summary: null,
      error: 'Article content is too short to provide a useful summary.',
    };
  }

  try {
    const result = await summarizeArticle({ articleContent: content });

    if (result.summary && result.summary.split(' ').length > 10) {
      return { summary: result.summary, error: null };
    } else {
      return {
        summary: null,
        error: 'The generated summary was not substantial enough to be useful.',
      };
    }
  } catch (e) {
    console.error('Error in getSummaryAction:', e);
    return {
      summary: null,
      error: 'Failed to generate summary due to an unexpected error.',
    };
  }
}

export async function fetchNewsAction(
  searchTerm?: string
): Promise<NewsArticle[]> {
  const result = await fetchNews();
  let articles = result.articles;

  if (searchTerm) {
    const lowercasedTerm = searchTerm.toLowerCase();
    articles = articles.filter(
      (article) =>
        article.title.toLowerCase().includes(lowercasedTerm)
    );
  }
  // Add isVideo property
  return articles.map(article => ({ ...article, isVideo: article.link.includes('video.yahoo.com')}));
}
