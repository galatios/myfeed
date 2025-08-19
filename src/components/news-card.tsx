'use client';
import { useState, useCallback } from 'react';
import type { NewsArticle, AIComment } from '@/lib/types';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CommentSection } from './comment-section';
import { ThumbsUp, MessageSquare } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from './ui/separator';
import { generateCommentsAction } from '@/app/actions';
import { cn } from '@/lib/utils';

interface NewsCardProps {
  article: NewsArticle;
  isLiked: boolean;
  onToggleLike: () => void;
}

export function NewsCard({ article, isLiked, onToggleLike }: NewsCardProps) {
  const [aiComments, setAiComments] = useState<AIComment[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [commentsFetched, setCommentsFetched] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const getAvatarText = (source: string) => {
    const words = source.split(' ');
    if (words.length > 1) {
      return words
        .map((w) => w[0])
        .join('')
        .substring(0, 2)
        .toUpperCase();
    }
    return source.substring(0, 2).toUpperCase();
  };

  const fetchComments = useCallback(async () => {
    if (article.title && article.content) {
      setLoadingComments(true);
      const comments = await generateCommentsAction(
        article.title,
        article.content
      );
      setAiComments(comments);
      setLoadingComments(false);
      setCommentsFetched(true);
    }
  }, [article.title, article.content]);

  const handleCommentClick = () => {
    if (!commentsFetched) {
      fetchComments();
    }
    setShowComments(!showComments);
  };

  return (
    <Card className="animate-in fade-in-0 duration-500 ease-out">
      <CardHeader className="p-3">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage
              src={`https://placehold.co/40x40.png?text=${getAvatarText(
                article.source
              )}`}
              data-ai-hint="source logo"
            />
            <AvatarFallback>{getAvatarText(article.source)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(article.timestamp), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {!article.imageUrl && (
          <p className="px-3 pb-3 text-sm">
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:underline"
            >
              {article.title}
            </a>
          </p>
        )}

        {article.imageUrl && (
          <div className="relative aspect-video w-full">
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
              className="absolute bottom-0 left-0 w-full p-3"
            >
              <h2 className="text-lg font-bold text-white hover:underline">
                {article.title}
              </h2>
            </a>
          </div>
        )}
      </CardContent>

      <div className="px-3 pb-1 pt-2">
        <Separator />
      </div>

      <div className="flex justify-around px-1 pb-1">
        <Button
          variant="ghost"
          className={cn('w-full font-semibold', {
            'text-primary': isLiked,
            'text-muted-foreground': !isLiked,
          })}
          onClick={onToggleLike}
        >
          <ThumbsUp
            className={cn('mr-2 h-5 w-5', {
              'fill-current': isLiked,
            })}
          />
          Like
        </Button>
        <Button
          variant="ghost"
          className="w-full font-semibold text-muted-foreground"
          onClick={handleCommentClick}
        >
          <MessageSquare className="mr-2 h-5 w-5" />
          Comment
        </Button>
      </div>
      {showComments && (
        <div className="px-3 pb-2">
          <Separator />
          <CommentSection aiComments={aiComments} loading={loadingComments} />
        </div>
      )}
    </Card>
  );
}
