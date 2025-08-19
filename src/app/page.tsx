'use client';
import { useState, useEffect, useCallback, useContext } from 'react';
import { NewsCard } from '@/components/news-card';
import { type NewsArticle } from '@/lib/types';
import { fetchNewsAction } from '@/app/actions';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { NewsSidebar } from '@/components/news-sidebar';
import { SearchContext } from '@/components/header-provider';

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
  const { searchTerm } = useContext(SearchContext);
  const [likedArticles, setLikedArticles] = useState<Set<string>>(new Set());

  const toggleLike = (articleId: string) => {
    setLikedArticles(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(articleId)) {
        newLiked.delete(articleId);
      } else {
        newLiked.add(articleId);
      }
      return newLiked;
    });
  };

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
    <main className="flex-1">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] gap-8 py-6">
        <NewsSidebar articles={news} likedArticles={likedArticles} onToggleLike={toggleLike} loading={loading} />
        <div className="max-w-lg mx-auto w-full">
          <div className="space-y-4">
            {loading ? (
              <NewsSkeleton />
            ) : (
              news.map((article, index) => (
                <NewsCard 
                  key={`${article.id}-${index}`} 
                  article={article}
                  isLiked={likedArticles.has(article.id)}
                  onToggleLike={() => toggleLike(article.id)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
