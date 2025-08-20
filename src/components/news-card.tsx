'use client';
import { useState, useCallback } from 'react';
import type { NewsArticle, AnalysisResult } from '@/lib/types';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CommentSection } from './comment-section';
import { ThumbsUp, Bot } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from './ui/separator';
import { analyzeArticleAction } from '@/app/actions';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface NewsCardProps {
  article: NewsArticle;
  isLiked: boolean;
  onToggleLike: () => void;
}

function VideoPlayer({ url }: { url:string }) {
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
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);
  const [analysisFetched, setAnalysisFetched] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
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

  const fetchAnalysis = useCallback(async () => {
    if (analysisFetched || loadingAnalysis || !article.link || article.isVideo) return;
    
    setLoadingAnalysis(true);
    try {
      const analysisRes = await analyzeArticleAction(article.link);

      if (analysisRes.analysis) {
        setAnalysisResult(analysisRes.analysis);
      } else if (analysisRes.error) {
         toast({
            variant: "destructive",
            title: "Analysis Error",
            description: analysisRes.error,
        });
      }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
        console.error('Failed to fetch analysis:', error);
        toast({
            variant: "destructive",
            title: "Analysis Error",
            description: `An unexpected error occurred while fetching the analysis. Details: ${errorMessage}`,
        });
    } finally {
        setLoadingAnalysis(false);
        setAnalysisFetched(true);
    }
  }, [article.link, article.isVideo, analysisFetched, loadingAnalysis, toast]);

  const handleAnalyzeClick = () => {
    setShowAnalysis((prev) => !prev);
    if (!analysisFetched) {
      fetchAnalysis();
    }
  };

  return (
    <Card className="animate-in fade-in-0 duration-500 ease-out">
      <CardHeader className="p-3">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage
              src={article.sourceLogoUrl}
              alt={`${article.source} Logo`}
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
              {article.source} &middot; {formatDistanceToNow(new Date(article.timestamp), {
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
          onClick={handleAnalyzeClick}
          disabled={article.isVideo || !article.link || article.link.includes('video.yahoo.com') || article.link.includes('embed/video')}
        >
          <Bot className="mr-2 h-5 w-5" />
          Analyze
        </Button>
      </div>
      {showAnalysis && (
        <div className="px-3 pb-2">
          <Separator />
          <CommentSection 
            analysis={analysisResult} 
            loading={loadingAnalysis} 
          />
        </div>
      )}
    </Card>
  );
}
