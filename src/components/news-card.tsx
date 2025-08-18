'use client';
import { useState } from 'react';
import type { NewsArticle } from '@/lib/mock-news';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CommentSection } from './comment-section';
import { getSummaryAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Lightbulb, Loader2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

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

  return (
    <Card className="animate-in fade-in-0 slide-in-from-top-4 duration-500 ease-out">
      <CardHeader>
        <CardTitle>
          <a
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary hover:underline"
          >
            {article.title}
          </a>
        </CardTitle>
        <CardDescription>
          {article.source} &middot;{' '}
          {formatDistanceToNow(new Date(article.timestamp), { addSuffix: true })}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {summary && (
          <Alert className="bg-primary/5 border-primary/20">
            <Lightbulb className="h-4 w-4 text-primary" />
            <AlertTitle className="text-primary font-semibold">AI Summary</AlertTitle>
            <AlertDescription>{summary}</AlertDescription>
          </Alert>
        )}
        <CommentSection />
      </CardContent>
      <CardFooter>
        {!summary && (
          <Button
            variant="outline"
            onClick={handleSummarize}
            disabled={isLoading}
            className="bg-transparent"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Lightbulb className="mr-2 h-4 w-4" />
            )}
            {isLoading ? 'Summarizing...' : 'Summarize with AI'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
