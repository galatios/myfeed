
import Parser from 'rss-parser';
import { NewsArticle } from '@/lib/types';
import { getPublisherLogo, getPublisherFromLink } from '@/lib/publishers';

const YAHOO_FINANCE_STORIES_RSS_URL = 'https://finance.yahoo.com/rss/topstories';
const YAHOO_FINANCE_VIDEOS_RSS_URL = 'https://finance.yahoo.com/rss/videos';
const IBD_NEWS_RSS_URL = 'http://feeds.investors.com/ivd/xml/rss/news.xml';


const parser = new Parser({
  customFields: {
    item: [
        ['media:content', 'mediaContent', { keepArray: false }],
        ['dc:creator', 'creator'],
    ],
  },
});

async function fetchNewsFeed(url: string, isVideo: boolean = false): Promise<NewsArticle[]> {
    try {
        const feed = await parser.parseURL(url);
        
        return feed.items.map((item) => {
          const link = item.link || '';
          const source = getPublisherFromLink(link) || item.creator || 'Unknown Source';
          
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
    const yahooArticlePromise = fetchNewsFeed(YAHOO_FINANCE_STORIES_RSS_URL, false);
    const videoPromise = fetchNewsFeed(YAHOO_FINANCE_VIDEOS_RSS_URL, true);
    const ibdPromise = fetchNewsFeed(IBD_NEWS_RSS_URL, false);


    const [yahooArticles, videos, ibdArticles] = await Promise.all([yahooArticlePromise, videoPromise, ibdPromise]);
    
    const combinedArticles = [...yahooArticles, ...ibdArticles];
    const articleTitles = new Set(combinedArticles.map(a => a.title));
    const uniqueVideos = videos.filter(v => !articleTitles.has(v.title));

    const allItems = [...combinedArticles, ...uniqueVideos];
    return allItems.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}
