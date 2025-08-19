'use client';
import { useState, useEffect, useCallback } from 'react';
import { Header } from '@/components/header';
import { NewsCard } from '@/components/news-card';
import { type NewsArticle } from '@/lib/types';
import { fetchNewsAction } from '@/app/actions';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

function NewsSkeleton() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-11/12 mb-2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="aspect-video w-full mt-4" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-11/12 mb-2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="aspect-video w-full mt-4" />
        </CardContent>
      </Card>
    </div>
  );
}

export default function Home() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const getNews = useCallback(async (term: string) => {
    setLoading(true);
    const fetchedNews = await fetchNewsAction(term);
    fetchedNews.sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    setNews(fetchedNews);
    setLoading(false);
  }, []);

  useEffect(() => {
    getNews(searchTerm);
  }, [searchTerm, getNews]);


  return (
    <div className="flex min-h-screen flex-col bg-transparent">
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <main className="flex-1">
        <div className="container mx-auto max-w-lg py-6">
          <div className="space-y-4">
            {loading ? (
              <NewsSkeleton />
            ) : (
              news.map((article, index) => (
                <NewsCard key={`${article.id}-${index}`} article={article} />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
