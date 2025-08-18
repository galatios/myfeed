import Parser from 'rss-parser';
import { NewsArticle } from '@/lib/types';
import DOMPurify from 'isomorphic-dompurify';

const YAHOO_FINANCE_RSS_URL = 'https://finance.yahoo.com/rss/topstories';

const parser = new Parser({
  customFields: {
    item: [['media:content', 'mediaContent', { keepArray: false }]],
  },
});

export async function fetchYahooFinanceNews(): Promise<NewsArticle[]> {
  try {
    const feed = await parser.parseURL(YAHOO_FINANCE_RSS_URL);
    
    return feed.items.map((item) => {
      // Sanitize HTML content from the feed
      const sanitizedContent = DOMPurify.sanitize(item.content || '');
      // Create a temporary div to parse the HTML and extract the text
      const textContent = sanitizedContent.replace(/<[^>]*>/g, '');

      return {
        id: item.guid || item.link || '',
        title: item.title || 'No title',
        content: textContent,
        link: item.link || '',
        source: 'Yahoo Finance',
        timestamp: item.isoDate || new Date().toISOString(),
        imageUrl: item.mediaContent?.$?.url,
      };
    }).filter(item => item.id); // Ensure items have an ID

  } catch (error) {
    console.error('Error fetching or parsing Yahoo Finance RSS feed:', error);
    return [];
  }
}
