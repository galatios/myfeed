import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { Particles } from '@/components/particles';

export const metadata: Metadata = {
  title: 'MarketWatch Live',
  description: 'A live news feed wall for financial news.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased h-full">
        <Particles className="fixed inset-0 -z-10" />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
