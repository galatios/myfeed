import { CandlestickChart } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex items-center space-x-3">
          <CandlestickChart className="h-7 w-7 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            MarketWatch Live
          </h1>
        </div>
      </div>
    </header>
  );
}
