import { SYSTEM_PROMPT } from '@/constants/constants';
import { jobSuitabilitySchema } from '@/schemas/schemas';
import { streamObject } from 'ai';
import * as cheerio from 'cheerio';
import { ollama } from 'ollama-ai-provider-v2';
import TurndownService from 'turndown';

const ALLOWED_HOSTS = new Set(['www.linkedin.com', 'linkedin.com']);

export function getJobId(link: string) {
  const url = new URL(link);

  if (url.protocol !== 'https:') return null;
  if (!ALLOWED_HOSTS.has(url.hostname)) return null;

  const jobId = url.searchParams.get('currentJobId');
  return jobId;
}

function getLinkedInApiLink(link: string) {
  const jobId = getJobId(link)!;
  return `https://www.linkedin.com/jobs-guest/jobs/api/jobPosting/${jobId}`;
}

async function parseLinkedinJobPostToMarkdown(linkedInLink: string) {
  const html = await fetch(linkedInLink, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    },
  }).then((d) => d.text());

  const $ = cheerio.load(html);
  const jobTitle = $('.top-card-layout__title').html();
  const jobDescription = $('.show-more-less-html').html();
  if (jobTitle === null || jobDescription === null) return null;
  return `<h2>${jobTitle}</h2>`.concat(jobDescription);
}

export async function getLinkedInJobMarkDown(linkedInJobUrl: string) {
  const turndownService = new TurndownService();
  const linkedInAPILink = getLinkedInApiLink(linkedInJobUrl);
  const linkedInJobPageHtml = await parseLinkedinJobPostToMarkdown(linkedInAPILink);
  if (linkedInJobPageHtml === null) return 'No html found';

  const linkedInJobPageMarkdown: string = turndownService.turndown(linkedInJobPageHtml);

  return linkedInJobPageMarkdown;
}

export const aiResponse = (linkedInJobPageMarkdown: string, resumeMarkDown: string) => {
  const userPrompt = `Job Advertisement: ${linkedInJobPageMarkdown}.
Candidate CV: ${resumeMarkDown}.`;

  const resp = streamObject({
    model: ollama('qwen3:8b'),
    schema: jobSuitabilitySchema,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: userPrompt },
    ],
  });

  return resp.toTextStreamResponse();
};
