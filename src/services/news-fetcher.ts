
import Parser from 'rss-parser';
import { NewsArticle } from '@/lib/types';
import { getPublisherLogo, getPublisherFromLink } from '@/lib/publishers';

const YAHOO_FINANCE_STORIES_RSS_URL = 'https://finance.yahoo.com/rss/topstories';
const YAHOO_FINANCE_VIDEOS_RSS_URL = 'https://finance.yahoo.com/rss/videos';
const IBD_NEWS_RSS_URL = 'http://feeds.investors.com/ivd/xml/rss/news.xml';
const INVESTING_COM_NEWS_RSS_URL = 'https://www.investing.com/rss/news.rss';


const parser = new Parser({
  customFields: {
    item: [
        ['media:content', 'mediaContent', { keepArray: false }],
        ['dc:creator', 'creator'],
    ],
  },
});

function extractImageUrl(item: Parser.Item): string | undefined {
    let imageUrl: string | undefined = undefined;
    // Case 1: Standard media:content tag (used by Yahoo)
    if (item.mediaContent?.$?.url) {
        imageUrl = item.mediaContent.$.url;
    }

    // Case 2: Image URL inside an enclosure tag (used by IBD)
    else if (item.enclosure?.url && item.enclosure.type?.startsWith('image/')) {
        imageUrl = item.enclosure.url;
    }

    // Case 3: Image URL inside an <img /> tag in the content (used by Investing.com)
    else if (item.content) {
        const match = item.content.match(/<img[^>]+src="([^">]+)"/);
        if (match && match[1]) {
            imageUrl = match[1];
        }
    }

    // Ensure URL is https
    if (imageUrl && imageUrl.startsWith('http://')) {
        return imageUrl.replace('http://', 'https://');
    }

    return imageUrl;
}


async function fetchNewsFeed(url: string, isVideo: boolean = false): Promise<NewsArticle[]> {
    try {
        const feed = await parser.parseURL(url);
        
        const articles = feed.items
          .map((item) => {
            const link = item.link || '';
            const source = getPublisherFromLink(link) || item.creator || 'Unknown Source';
            
            return {
              id: item.guid || link,
              title: item.title || 'No title',
              link: link,
              source: source,
              sourceLogoUrl: getPublisherLogo(source),
              timestamp: item.isoDate || new Date().toISOString(),
              imageUrl: extractImageUrl(item),
              isVideo,
            };
          })
          .filter(item => item.id && item.link && item.imageUrl); // Filter for valid items that have an image URL

        return articles;
    
      } catch (error) {
        console.error(`Error fetching or parsing RSS feed from ${url}:`, error);
        return [];
      }
}

export async function fetchHomeNews(): Promise<NewsArticle[]> {
    const yahooArticlePromise = fetchNewsFeed(YAHOO_FINANCE_STORIES_RSS_URL, false);
    const videoPromise = fetchNewsFeed(YAHOO_FINANCE_VIDEOS_RSS_URL, true);
    const ibdPromise = fetchNewsFeed(IBD_NEWS_RSS_URL, false);
    const investingPromise = fetchNewsFeed(INVESTING_COM_NEWS_RSS_URL, false);


    const [yahooArticles, videos, ibdArticles, investingArticles] = await Promise.all([yahooArticlePromise, videoPromise, ibdPromise, investingPromise]);
    
    const combinedArticles = [...yahooArticles, ...ibdArticles, ...investingArticles];
    const articleTitles = new Set(combinedArticles.map(a => a.title));
    const uniqueVideos = videos.filter(v => !articleTitles.has(v.title));

    const allItems = [...combinedArticles, ...uniqueVideos];
    return allItems.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

export async function fetchAllNews(): Promise<NewsArticle[]> {
  return fetchHomeNews();
}
