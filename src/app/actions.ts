'use server';

import { summarizeArticle } from '@/ai/flows/summarize-article';
import { fetchNews } from '@/ai/flows/fetch-news';
import { analyzeArticle } from '@/ai/flows/analyze-article';
import type { NewsArticle, AnalysisResult } from '@/lib/types';
import { getPublisherLogo } from '@/lib/publishers';

export async function fetchNewsAction(
  searchTerm?: string
): Promise<NewsArticle[]> {
  const result = await fetchNews();
  let articles = result.articles.map(article => ({
      ...article,
      sourceLogoUrl: getPublisherLogo(article.source),
  }));

  if (searchTerm) {
    const lowercasedTerm = searchTerm.toLowerCase();
    articles = articles.filter(
      (article) =>
        article.title.toLowerCase().includes(lowercasedTerm)
    );
  }
  
  return articles;
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
    // Step 1: Summarize the article to get its content.
    const summaryResult = await summarizeArticle({ articleUrl });
    if (!summaryResult?.summary) {
      return { analysis: null, error: 'Could not retrieve article content for analysis.' };
    }

    // Step 2: Analyze the summarized content.
    const analysisResult = await analyzeArticle({ articleContent: summaryResult.summary });
    if (analysisResult) {
      return { analysis: { ...analysisResult, summary: summaryResult.summary }, error: null };
    }
    
    return { analysis: null, error: 'Analysis failed to return a result.' };
  } catch (e) {
    console.error('Error in analyzeArticleAction:', e);
    const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
    return {
      analysis: null,
      error: `Failed to analyze article. The AI may have been unable to access or process the content from the source URL. Details: ${errorMessage}`,
    };
  }
}
