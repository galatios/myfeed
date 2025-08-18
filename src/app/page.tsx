'use client';
import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { NewsCard } from '@/components/news-card';
import { type NewsArticle } from '@/lib/mock-news';
import { fetchNewsAction } from '@/app/actions';
import { Skeleton } from '@/components/ui/skeleton';

function NewsSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-32 w-full" />
    </div>
  );
}

export default function Home() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getNews = async () => {
      setLoading(true);
      const fetchedNews = await fetchNewsAction();
      // sort by date descending to show newest first
      fetchedNews.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      setNews(fetchedNews);
      setLoading(false);
    };
    getNews();
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto max-w-2xl py-8">
          <div className="space-y-6">
            {loading ? (
              <NewsSkeleton />
            ) : (
              news.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
