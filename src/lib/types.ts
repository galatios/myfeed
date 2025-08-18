export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  link: string;
  source: string;
  timestamp: string;
  imageUrl?: string;
}

export interface AIComment {
  username: string;
  commentText: string;
}
