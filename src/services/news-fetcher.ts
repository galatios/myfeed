import Parser from 'rss-parser';
import { NewsArticle } from '@/lib/types';
import { getPublisherLogo } from '@/lib/publishers';

const YAHOO_FINANCE_STORIES_RSS_URL = 'https://finance.yahoo.com/rss/topstories';
const YAHOO_FINANCE_VIDEOS_RSS_URL = 'https://finance.yahoo.com/rss/videos';

const parser = new Parser({
  customFields: {
    item: [
        ['media:content', 'mediaContent', { keepArray: false }],
        ['dc:creator', 'creator'],
    ],
  },
});

async function fetchFeed(url: string, isVideo: boolean = false): Promise<NewsArticle[]> {
    try {
        const feed = await parser.parseURL(url);
        
        return feed.items.map((item) => {
          const source = item.creator || 'Yahoo Finance';
          return {
            id: item.guid || item.link || '',
            title: item.title || 'No title',
            link: item.link || '',
            source: source,
            sourceLogoUrl: getPublisherLogo(source),
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

    const articleTitles = new Set(articles.map(a => a.title));
    const uniqueVideos = videos.filter(v => !articleTitles.has(v.title));

    return [...articles, ...uniqueVideos];
}
