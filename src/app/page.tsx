'use client';
import { useState, useEffect, useRef } from 'react';
import { Header } from '@/components/header';
import { NewsCard } from '@/components/news-card';
import { type NewsArticle, mockNewsArticles } from '@/lib/mock-news';

export default function Home() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const articleIndex = useRef(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Initial load of 5 articles
    const initialArticles = mockNewsArticles.slice(0, 5);
    articleIndex.current = 5;
    setNews(initialArticles.reverse());
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const interval = setInterval(() => {
      if (articleIndex.current < mockNewsArticles.length) {
        const nextArticle = mockNewsArticles[articleIndex.current];
        setNews(prevNews => [nextArticle, ...prevNews]);
        articleIndex.current += 1;
      } else {
        // Optional: loop back for continuous feed
        articleIndex.current = 0;
      }
    }, 5000); // New article every 5 seconds

    return () => clearInterval(interval);
  }, [isMounted]);

  if (!isMounted) {
    return null; // or a loading skeleton
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto max-w-2xl py-8">
          <div className="space-y-6">
            {news.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
