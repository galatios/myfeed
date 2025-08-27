export interface NewsArticle {
  id: string;
  title: string;
  link: string;
  source: string;
  sourceLogoUrl?: string;
  timestamp: string;
  imageUrl?: string;
  isVideo: boolean;
  isHotlinkProtected?: boolean;
  topic?: string;
}

export interface AIComment {
  username: string;
  commentText: string;
}

export interface AnalysisResult {
  summary: string | null;
  tickers: {
    symbol: string;
  }[];
  keyTakeaways: string[];
  topic: string;
  sentiment: 'Positive' | 'Negative' | 'Neutral';
}
