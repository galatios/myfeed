'use client';
import type { NewsArticle } from '@/lib/types';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CommentSection } from './comment-section';
import { ThumbsUp, MessageSquare } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from './ui/separator';

interface NewsCardProps {
  article: NewsArticle;
}

export function NewsCard({ article }: NewsCardProps) {
  
  const getAvatarText = (source: string) => {
    const words = source.split(' ');
    if (words.length > 1) {
      return words.map(w => w[0]).join('').substring(0,2).toUpperCase();
    }
    return source.substring(0,2).toUpperCase();
  }

  return (
    <Card className="animate-in fade-in-0 duration-500 ease-out">
      <CardHeader className="p-3">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={`https://placehold.co/40x40.png?text=${getAvatarText(article.source)}`} data-ai-hint="source logo" />
            <AvatarFallback>{getAvatarText(article.source)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(article.timestamp), { addSuffix: true })}
            </p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        {!article.imageUrl && (
          <p className="text-sm px-3 pb-3">
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline font-semibold"
              >
                {article.title}
              </a>
          </p>
        )}

        {article.imageUrl && (
          <div className="relative w-full aspect-video">
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              className="object-cover"
              data-ai-hint="article image"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-0 left-0 p-3 w-full"
            >
              <h2 className="text-lg font-bold text-white hover:underline">{article.title}</h2>
            </a>
          </div>
        )}
      </CardContent>
      
      <div className='px-3 pt-2 pb-1'>
        <Separator />
      </div>
      
      <div className="px-1 pb-1 flex justify-around">
          <Button variant="ghost" className="w-full text-muted-foreground font-semibold">
            <ThumbsUp className="mr-2 h-5 w-5" />
            Like
          </Button>
          <Button variant="ghost" className="w-full text-muted-foreground font-semibold">
            <MessageSquare className="mr-2 h-5 w-5" />
            Comment
          </Button>
      </div>

      <div className='px-3 pb-2'>
        <Separator />
        <CommentSection />
      </div>
    </Card>
  );
}
