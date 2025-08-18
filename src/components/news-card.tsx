'use client';
import { useState } from 'react';
import type { NewsArticle } from '@/lib/mock-news';
import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CommentSection } from './comment-section';
import { getSummaryAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Lightbulb, Loader2, ThumbsUp, MessageSquare, Share2, MoreHorizontal } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from './ui/separator';

interface NewsCardProps {
  article: NewsArticle;
}

export function NewsCard({ article }: NewsCardProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSummarize = async () => {
    setIsLoading(true);
    const result = await getSummaryAction(article.content);
    setIsLoading(false);
    if (result.error) {
      toast({
        variant: 'destructive',
        title: 'Summarization Failed',
        description: result.error,
      });
    } else {
      setSummary(result.summary);
    }
  };
  
  const getAvatarText = (source: string) => {
    const words = source.split(' ');
    if (words.length > 1) {
      return words.map(w => w[0]).join('').substring(0,2).toUpperCase();
    }
    return source.substring(0,2).toUpperCase();
  }


  return (
    <Card className="animate-in fade-in-0 duration-500 ease-out shadow-sm">
      <CardHeader className="p-3">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={`https://placehold.co/40x40.png?text=${getAvatarText(article.source)}`} data-ai-hint="source logo" />
            <AvatarFallback>{getAvatarText(article.source)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-semibold text-sm">
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {article.source}
              </a>
            </p>
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(article.timestamp), { addSuffix: true })}
            </p>
          </div>
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full">
            <MoreHorizontal className='h-5 w-5 text-muted-foreground'/>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-3 pt-0 space-y-4">
        <p className="text-sm">
          <a
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary hover:underline"
          >
            {article.title}
          </a>
        </p>

        {summary && (
          <Alert className="bg-primary/5 border-primary/20">
            <Lightbulb className="h-4 w-4 text-primary" />
            <AlertTitle className="text-primary font-semibold">AI Summary</AlertTitle>
            <AlertDescription>{summary}</AlertDescription>
          </Alert>
        )}
      </CardContent>
       <div className='px-3 pb-2'>
        <Separator />
       </div>
      <div className="px-3 pb-2 flex justify-around">
          <Button variant="ghost" className="w-full text-muted-foreground font-semibold">
            <ThumbsUp className="mr-2 h-5 w-5" />
            Like
          </Button>
          <Button variant="ghost" className="w-full text-muted-foreground font-semibold">
            <MessageSquare className="mr-2 h-5 w-5" />
            Comment
          </Button>
          <Button variant="ghost" className="w-full text-muted-foreground font-semibold">
            <Share2 className="mr-2 h-5 w-5" />
            Share
          </Button>
      </div>
      <div className='px-3 pb-2'>
        <Separator />
        <CommentSection />
      </div>

      {!summary && (
          <div className='p-3 border-t'>
            <Button
              variant="outline"
              onClick={handleSummarize}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Lightbulb className="mr-2 h-4 w-4" />
              )}
              {isLoading ? 'Summarizing...' : 'Summarize with AI'}
            </Button>
          </div>
        )}
    </Card>
  );
}
