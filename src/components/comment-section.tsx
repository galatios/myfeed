'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send } from 'lucide-react';

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
    <div className="space-y-4 pt-4 border-t">
      <div className="space-y-3">
        {comments.map((comment) => (
          <div key={comment.id} className="flex items-start space-x-3 animate-in fade-in-0 duration-300">
            <Avatar className="h-8 w-8">
              <AvatarImage src={`https://placehold.co/32x32.png?text=U`} data-ai-hint="user avatar" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex-1 rounded-lg bg-secondary px-3 py-2 text-sm">
              <p>{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
        <Input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" size="icon" aria-label="Submit comment">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
