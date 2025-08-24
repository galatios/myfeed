
import Parser from 'rss-parser';
import { NewsArticle } from '@/lib/types';
import { getPublisherLogo, getPublisherFromLink } from '@/lib/publishers';

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

async function fetchYahooFeed(url: string, isVideo: boolean = false): Promise<NewsArticle[]> {
    try {
        const feed = await parser.parseURL(url);
        
        return feed.items.map((item) => {
          const link = item.link || '';
          const source = getPublisherFromLink(link) || item.creator || 'Yahoo Finance';
          
          return {
            id: item.guid || link,
            title: item.title || 'No title',
            link: link,
            source: source,
            sourceLogoUrl: getPublisherLogo(source),
            timestamp: item.isoDate || new Date().toISOString(),
            imageUrl: item.mediaContent?.$?.url,
            isVideo,
          };
        }).filter(item => item.id && item.link);
    
      } catch (error) {
        console.error(`Error fetching or parsing RSS feed from ${url}:`, error);
        return [];
      }
}

export async function fetchHomeNews(): Promise<NewsArticle[]> {
    const yahooArticlePromise = fetchYahooFeed(YAHOO_FINANCE_STORIES_RSS_URL, false);
    const videoPromise = fetchYahooFeed(YAHOO_FINANCE_VIDEOS_RSS_URL, true);

    const [yahooArticles, videos] = await Promise.all([yahooArticlePromise, videoPromise]);
    
    const articleTitles = new Set(yahooArticles.map(a => a.title));
    const uniqueVideos = videos.filter(v => !articleTitles.has(v.title));

    const combined = [...yahooArticles, ...uniqueVideos];
    return combined.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}
