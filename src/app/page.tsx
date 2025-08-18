'use client';
import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { NewsCard } from '@/components/news-card';
import { type NewsArticle } from '@/lib/mock-news';
import { fetchNewsAction } from '@/app/actions';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Video, Image as ImageIcon, Smile } from 'lucide-react';

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

function CreatePost() {
  return (
    <Card>
      <CardHeader className='pb-3'>
        <div className="flex items-start space-x-3">
          <Avatar>
            <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="user avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <Textarea
            placeholder="What's on your mind?"
            className="flex-1 resize-none border-none focus-visible:ring-0 shadow-none bg-secondary text-base"
          />
        </div>
      </CardHeader>
      <Separator />
      <CardContent className='p-3'>
        <div className='flex justify-between'>
          <div className="flex space-x-1">
            <Button variant="ghost" className="text-muted-foreground text-sm">
              <Video className="h-5 w-5 text-red-500" />
              <span className='ml-2'>Live video</span>
            </Button>
            <Button variant="ghost" className="text-muted-foreground text-sm">
              <ImageIcon className="h-5 w-5 text-green-500" />
              <span className='ml-2'>Photo/video</span>
            </Button>
            <Button variant="ghost" className="text-muted-foreground text-sm">
              <Smile className="h-5 w-5 text-yellow-500" />
              <span className='ml-2'>Feeling/activity</span>
            </Button>
          </div>
          <Button size="sm">Post</Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function Home() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getNews = async () => {
      setLoading(true);
      const fetchedNews = await fetchNewsAction();
      fetchedNews.sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      setNews(fetchedNews);
      setLoading(false);
    };
    getNews();
  }, []);

  const filteredNews = news.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.content.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div className="flex min-h-screen flex-col bg-secondary/70">
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <main className="flex-1">
        <div className="container mx-auto max-w-lg py-6">
          <div className="space-y-4">
            <CreatePost />
            {loading ? (
              <NewsSkeleton />
            ) : (
              filteredNews.map((article, index) => (
                <NewsCard key={`${article.id}-${index}`} article={article} />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
