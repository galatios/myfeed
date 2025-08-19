'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Smile, Info, Lightbulb, TrendingUp, Briefcase, Meh, Frown } from 'lucide-react';
import type { AIComment, AnalysisResult } from '@/lib/types';
import { Skeleton } from './ui/skeleton';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface Comment {
  id: number;
  username: string;
  text: string;
}

interface CommentSectionProps {
  analysis: AnalysisResult | null;
  loading: boolean;
}

function CommentSkeleton() {
  return (
    <div className="flex items-start space-x-2 animate-pulse pt-2">
      <Skeleton className="h-8 w-8 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
}

const emojis = ['😀', '😂', '😍', '🤔', '👍', '👎', '🔥', '🚀', '📈', '📉', '💰', '🤯'];

const sentimentIcons = {
    Positive: <Smile className="h-4 w-4" />,
    Negative: <Frown className="h-4 w-4" />,
    Neutral: <Meh className="h-4 w-4" />,
};

const sentimentColors = {
    Positive: 'text-green-500 bg-green-500/20',
    Negative: 'text-red-500 bg-red-500/20',
    Neutral: 'text-yellow-500 bg-yellow-500/20',
}

export function CommentSection({ analysis, loading }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  const getAvatarText = (name: string) => {
    const words = name.split(' ');
    if (words.length > 1) {
      return words.map(w => w[0]).join('').substring(0,2).toUpperCase();
    }
    return name.substring(0,2).toUpperCase();
  }

  const handleEmojiClick = (emoji: string) => {
    setNewComment(newComment + emoji);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([
        ...comments,
        { id: Date.now(), username: 'You', text: newComment.trim() },
      ]);
      setNewComment('');
    }
  };

  return (
    <div className="space-y-2 pt-2">
      <div className="space-y-4">
        {loading && <CommentSkeleton />}
        {!loading && analysis && (
          <div className="space-y-4 animate-in fade-in-0 duration-300">
             {analysis.summary && (
              <div className="flex items-start space-x-2">
                <Avatar className="h-8 w-8 bg-primary/20 text-primary">
                    <AvatarFallback><Info className="h-4 w-4"/></AvatarFallback>
                </Avatar>
                <div className="flex-1 rounded-2xl bg-secondary px-3 py-2 text-sm">
                  <p className="font-semibold text-primary">AI Summary</p>
                  <p>{analysis.summary}</p>
                </div>
              </div>
            )}
            {analysis.keyTakeaways && analysis.keyTakeaways.length > 0 && (
              <div className="flex items-start space-x-2">
                <Avatar className="h-8 w-8 bg-accent/20 text-accent-foreground">
                    <AvatarFallback><Lightbulb className="h-4 w-4"/></AvatarFallback>
                </Avatar>
                <div className="flex-1 rounded-2xl bg-secondary px-3 py-2 text-sm">
                    <p className="font-semibold text-accent-foreground">Key Takeaways</p>
                    <ul className="list-disc pl-4 space-y-1 mt-1">
                      {analysis.keyTakeaways.map((item, index) => <li key={index}>{item}</li>)}
                    </ul>
                </div>
              </div>
            )}
             {analysis.tickers && analysis.tickers.length > 0 && (
              <div className="flex items-start space-x-2">
                <Avatar className="h-8 w-8 bg-green-500/20 text-green-500">
                    <AvatarFallback><TrendingUp className="h-4 w-4"/></AvatarFallback>
                </Avatar>
                <div className="flex-1 rounded-2xl bg-secondary px-3 py-2 text-sm">
                    <p className="font-semibold text-green-500">Stock Tickers</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {analysis.tickers.map(ticker => (
                            <div key={ticker.symbol} className="bg-background border rounded-full px-3 py-1 text-xs">
                                <span className="font-bold">{ticker.symbol}:</span> ${ticker.price.toFixed(2)}
                            </div>
                        ))}
                    </div>
                </div>
              </div>
            )}
            {analysis.topic && (
              <div className="flex items-start space-x-2">
                <Avatar className="h-8 w-8 bg-purple-500/20 text-purple-500">
                    <AvatarFallback><Briefcase className="h-4 w-4"/></AvatarFallback>
                </Avatar>
                <div className="flex-1 rounded-2xl bg-secondary px-3 py-2 text-sm">
                    <p className="font-semibold text-purple-500">Topic</p>
                    <p>{analysis.topic}</p>
                </div>
              </div>
            )}
            {analysis.sentiment && (
                <div className="flex items-start space-x-2">
                     <Avatar className={cn("h-8 w-8", sentimentColors[analysis.sentiment])}>
                        <AvatarFallback>{sentimentIcons[analysis.sentiment]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 rounded-2xl bg-secondary px-3 py-2 text-sm">
                        <p className={cn("font-semibold", sentimentColors[analysis.sentiment].split(' ')[0])}>Sentiment</p>
                        <p>{analysis.sentiment}</p>
                    </div>
                </div>
            )}
          </div>
        )}
        {comments.map((comment) => (
          <div key={comment.id} className="flex items-start space-x-2 animate-in fade-in-0 duration-300">
            <Avatar className="h-8 w-8">
              <AvatarImage src={`https://placehold.co/32x32.png?text=U`} data-ai-hint="user avatar" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex-1 rounded-2xl bg-secondary px-3 py-2 text-sm">
              <p className="font-semibold">{comment.username}</p>
              <p>{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2 pt-2">
        <Avatar className="h-8 w-8">
            <AvatarImage src={`https://placehold.co/32x32.png?text=U`} data-ai-hint="user avatar" />
            <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="rounded-full bg-secondary pr-16"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-muted-foreground"><Smile className="h-4 w-4" /></Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto border-none bg-transparent shadow-none">
                <div className="grid grid-cols-6 gap-2 rounded-lg border bg-card p-2 shadow-sm">
                  {emojis.map((emoji) => (
                    <Button
                      key={emoji}
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-md text-xl"
                      onClick={() => handleEmojiClick(emoji)}
                    >
                      {emoji}
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <Button type="submit" size="icon" aria-label="Submit comment" className="h-8 w-8" disabled={!newComment.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
