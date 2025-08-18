'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Smile, Camera, Sticker } from 'lucide-react';

interface Comment {
  id: number;
  text: string;
}

export function CommentSection() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([
        ...comments,
        { id: Date.now(), text: newComment.trim() },
      ]);
      setNewComment('');
    }
  };

  return (
    <div className="space-y-2 pt-2">
      <div className="space-y-2">
        {comments.map((comment) => (
          <div key={comment.id} className="flex items-start space-x-2 animate-in fade-in-0 duration-300">
            <Avatar className="h-8 w-8">
              <AvatarImage src={`https://placehold.co/32x32.png?text=U`} data-ai-hint="user avatar" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex-1 rounded-2xl bg-secondary px-3 py-2 text-sm">
              <p className="font-semibold">You</p>
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
            className="rounded-full bg-secondary pr-28"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-muted-foreground"><Smile className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-muted-foreground"><Camera className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-muted-foreground"><Sticker className="h-4 w-4" /></Button>
          </div>
        </div>

        <Button type="submit" size="icon" aria-label="Submit comment" className="h-8 w-8" disabled={!newComment.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
