"use client";
import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export function Particles({
  className,
  quantity = 15,
}: {
  className?: string;
  quantity?: number;
}) {
  const [circles, setCircles] = useState<
    {
      left: string;
      size: string;
      animationDelay: string;
      animationDuration: string;
    }[]
  >([]);

  useEffect(() => {
    const newCircles = Array.from({ length: quantity }).map(() => ({
      left: `${Math.floor(Math.random() * 100)}%`,
      size: `${Math.floor(Math.random() * 2) + 1}px`,
      animationDelay: `${Math.floor(Math.random() * 10)}s`,
      animationDuration: `${Math.floor(Math.random() * 5) + 3}s`,
    }));
    setCircles(newCircles);
  }, [quantity]);

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {circles.map((circle, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white/70"
          style={{
            left: circle.left,
            width: circle.size,
            height: circle.size,
            animationName: 'fall',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            animationDelay: circle.animationDelay,
            animationDuration: circle.animationDuration,
          }}
        ></div>
      ))}
    </div>
  );
}
