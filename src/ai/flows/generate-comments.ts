'use server';

/**
 * @fileOverview AI-powered comment generation for news articles.
 *
 * - generateComments - A function that generates user-like comments for a news article.
 * - GenerateCommentsInput - The input type for the generateComments function.
 * - GenerateCommentsOutput - The return type for the generateComments function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateCommentsInputSchema = z.object({
  articleTitle: z.string().describe('The title of the news article.'),
  articleContent: z.string().describe('The content of the news article to comment on.'),
});
export type GenerateCommentsInput = z.infer<typeof GenerateCommentsInputSchema>;

const CommentSchema = z.object({
  username: z.string().describe("A fictional user's name for the comment (e.g., 'CryptoKing', 'MarketMaven', 'ValueInvestor')."),
  commentText: z.string().describe('The text of the generated comment.'),
});

const GenerateCommentsOutputSchema = z.object({
  comments: z.array(CommentSchema).length(2).describe('An array of 2 generated comments.'),
});
export type GenerateCommentsOutput = z.infer<typeof GenerateCommentsOutputSchema>;

export async function generateComments(input: GenerateCommentsInput): Promise<GenerateCommentsOutput> {
  return generateCommentsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCommentsPrompt',
  input: { schema: GenerateCommentsInputSchema },
  output: { schema: GenerateCommentsOutputSchema },
  prompt: `You are an expert in financial markets and social media. Your task is to generate 2 realistic, user-like comments for a news article.

The comments should reflect different perspectives (e.g., one bullish, one bearish; one analytical, one skeptical; one focused on short-term impact, one on long-term). They should be concise and sound like something a real person would write on a financial news forum.

Generate comments for the following article:
Title: {{{articleTitle}}}
Content: {{{articleContent}}}
`,
});

const generateCommentsFlow = ai.defineFlow(
  {
    name: 'generateCommentsFlow',
    inputSchema: GenerateCommentsInputSchema,
    outputSchema: GenerateCommentsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
