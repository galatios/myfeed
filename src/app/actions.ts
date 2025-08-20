'use server';

import { summarizeArticle } from '@/ai/flows/summarize-article';
import { fetchNews } from '@/ai/flows/fetch-news';
import { analyzeArticle } from '@/ai/flows/analyze-article';
import type { NewsArticle, AnalysisResult } from '@/lib/types';

export async function getSummaryAction(
  articleUrl: string
): Promise<{ summary: string | null; error: string | null }> {
  if (!articleUrl) {
    return {
      summary: null,
      error: 'Article URL is missing.',
    };
  }

  try {
    const result = await summarizeArticle({ articleUrl });

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

  // Analyze articles to get their topics
  const analyzedArticles = await Promise.all(articles.map(async (article) => {
    try {
      if (article.link && !article.isVideo) {
        const analysis = await analyzeArticle({ articleUrl: article.link });
        return { ...article, topic: analysis.topic || 'General', isVideo: article.link.includes('video.yahoo.com') };
      }
      return { ...article, topic: 'General', isVideo: article.link.includes('video.yahoo.com') };
    } catch (e) {
      console.error(`Failed to analyze article ${article.id}`, e);
      return { ...article, topic: 'General', isVideo: article.link.includes('video.yahoo.com') }; // Default topic on error
    }
  }));

  return analyzedArticles;
}

export async function analyzeArticleAction(
  articleUrl: string
): Promise<{ analysis: AnalysisResult | null; error: string | null }> {
  if (!articleUrl) {
    return {
      analysis: null,
      error: 'Article URL is missing.',
    };
  }

  try {
    const result = await analyzeArticle({ articleUrl });
    if (result) {
      const summaryRes = await summarizeArticle({ articleUrl });
      return { analysis: { ...result, summary: summaryRes.summary }, error: null };
    }
    return { analysis: null, error: 'Analysis failed to return a result.' };
  } catch (e) {
    console.error('Error in analyzeArticleAction:', e);
    const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
    return {
      analysis: null,
      error: `Failed to analyze article. The AI may have been unable to access or process the content from the source URL. Error: ${errorMessage}`,
    };
  }
}
