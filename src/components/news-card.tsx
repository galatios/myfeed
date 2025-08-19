'use client';
import { useState, useCallback } from 'react';
import type { NewsArticle, AIComment } from '@/lib/types';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CommentSection } from './comment-section';
import { ThumbsUp, MessageSquare, PlayCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from './ui/separator';
import { getSummaryAction } from '@/app/actions';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface NewsCardProps {
  article: NewsArticle;
  isLiked: boolean;
  onToggleLike: () => void;
}

function VideoPlayer({ url }: { url:string }) {
    // Transform Yahoo Finance video page URL to embeddable URL
    const videoId = url.split('/').pop()?.split('.html')[0];
    if (!videoId) return null;
    const embedUrl = `https://www.yahoo.com/embed/video/${videoId}?format=embed&player_autoplay=false`;
  
    return (
      <div className="aspect-video w-full">
        <iframe
          src={embedUrl}
          width="100%"
          height="100%"
          allow="autoplay; fullscreen"
          allowFullScreen
          className="border-0"
        ></iframe>
      </div>
    );
  }

export function NewsCard({ article, isLiked, onToggleLike }: NewsCardProps) {
  const [aiComments, setAiComments] = useState<AIComment[]>([]);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [summaryFetched, setSummaryFetched] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const { toast } = useToast();

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

  const fetchSummary = useCallback(async () => {
    if (summaryFetched || loadingSummary) return;
    
    if (article.content) {
      setLoadingSummary(true);
      const result = await getSummaryAction(article.content);
      if(result.summary) {
        setAiComments([{
            username: 'MarketWatch AI',
            commentText: result.summary,
        }]);
      } else if (result.error) {
        toast({
            variant: "destructive",
            title: "Summarization Error",
            description: result.error,
        })
      }
      setLoadingSummary(false);
      setSummaryFetched(true);
    }
  }, [article.content, summaryFetched, loadingSummary, toast]);

  const handleCommentClick = () => {
    setShowComments((prev) => !prev);
    if (!summaryFetched) {
      fetchSummary();
    }
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
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:underline"
            >
              {article.title}
            </a>
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(article.timestamp), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {article.isVideo ? (
            <VideoPlayer url={article.link} />
        ) : (
            <>
            {!article.imageUrl && (
              <p className="px-3 pb-3 text-sm">{article.content}</p>
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
              </div>
            )}
          </>
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
          <CommentSection 
            aiComments={aiComments} 
            loading={loadingSummary} 
          />
        </div>
      )}
    </Card>
  );
}
