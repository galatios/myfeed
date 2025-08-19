'use client';
import { ThumbsUp } from 'lucide-react';
import type { NewsArticle } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardContent } from './ui/card';
import { Skeleton } from './ui/skeleton';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';

interface NewsSidebarProps {
  articles: NewsArticle[];
  likedArticles: Set<string>;
  onToggleLike: (articleId: string) => void;
  loading: boolean;
}

function SidebarSkeleton() {
    return (
        <div className="space-y-2">
            {[...Array(10)].map((_, i) => (
                 <div key={i} className="flex items-center space-x-2 rounded-lg p-2">
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-5/6" />
                        <Skeleton className="h-3 w-1/4" />
                    </div>
                </div>
            ))}
        </div>
    )
}

export function NewsSidebar({ articles, likedArticles, onToggleLike, loading }: NewsSidebarProps) {
  return (
    <Card className="sticky top-20 h-[calc(100vh-6rem)] hidden md:block">
      <CardHeader>
        <h2 className="text-lg font-bold">Trending News</h2>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-12rem)] pr-4">
            <div className="space-y-1">
            {loading ? <SidebarSkeleton /> : articles.map((article, index) => (
                <div key={`${article.id}-${index}`} className="group relative rounded-lg hover:bg-secondary/50 p-2">
                    <a href={article.link} target="_blank" rel="noopener noreferrer" className="block">
                        <p className="text-sm font-semibold line-clamp-2">{article.title}</p>
                        <p className="text-xs text-muted-foreground">{article.source}</p>
                    </a>
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className={cn(
                            "absolute top-1/2 -translate-y-1/2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity",
                            { "opacity-100 text-primary": likedArticles.has(article.id) }
                        )}
                        onClick={() => onToggleLike(article.id)}
                    >
                        <ThumbsUp className={cn("h-4 w-4", { "fill-current": likedArticles.has(article.id) })} />
                    </Button>
                </div>
            ))}
            </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
