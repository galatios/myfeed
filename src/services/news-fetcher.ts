import Parser from 'rss-parser';
import { NewsArticle } from '@/lib/types';
import DOMPurify from 'isomorphic-dompurify';

const YAHOO_FINANCE_STORIES_RSS_URL = 'https://finance.yahoo.com/rss/topstories';
const YAHOO_FINANCE_VIDEOS_RSS_URL = 'https://finance.yahoo.com/rss/videos';


const parser = new Parser({
  customFields: {
    item: [['media:content', 'mediaContent', { keepArray: false }]],
  },
});

async function fetchFeed(url: string, isVideo: boolean = false): Promise<NewsArticle[]> {
    try {
        const feed = await parser.parseURL(url);
        
        return feed.items.map((item) => {
          const sanitizedContent = DOMPurify.sanitize(item.content || '');
          const textContent = sanitizedContent.replace(/<[^>]*>/g, '');
    
          return {
            id: item.guid || item.link || '',
            title: item.title || 'No title',
            content: textContent,
            link: item.link || '',
            source: 'Yahoo Finance',
            timestamp: item.isoDate || new Date().toISOString(),
            imageUrl: item.mediaContent?.$?.url,
            isVideo,
          };
        }).filter(item => item.id);
    
      } catch (error) {
        console.error(`Error fetching or parsing RSS feed from ${url}:`, error);
        return [];
      }
}

export async function fetchYahooFinanceNews(): Promise<NewsArticle[]> {
    const articlePromise = fetchFeed(YAHOO_FINANCE_STORIES_RSS_URL, false);
    const videoPromise = fetchFeed(YAHOO_FINANCE_VIDEOS_RSS_URL, true);

    const [articles, videos] = await Promise.all([articlePromise, videoPromise]);

    return [...articles, ...videos];
}
