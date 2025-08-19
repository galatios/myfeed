import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-article.ts';
import '@/ai/flows/fetch-news.ts';
import '@/ai/flows/analyze-article.ts';
