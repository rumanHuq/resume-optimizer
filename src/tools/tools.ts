import { tool } from 'ai';
import z from 'zod';

export const tools = {
  getLinkedInJobDescriptionAsMarkdown: tool({
    description: 'Get LinkedIn Job Description as Markdown from a Linkedin URL',
    inputSchema: z.any(),
  }),
};
