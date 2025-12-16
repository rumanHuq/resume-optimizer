import * as cheerio from 'cheerio';

const ALLOWED_HOSTS = new Set(['www.linkedin.com', 'linkedin.com']);

export function getJobId(link: string) {
  const url = new URL(link);

  if (url.protocol !== 'https:') return null;
  if (!ALLOWED_HOSTS.has(url.hostname)) return null;

  const jobId = url.searchParams.get('currentJobId');
  return jobId;
}

export function getLinkedInApiLink(link: string) {
  const jobId = getJobId(link)!;
  return `https://www.linkedin.com/jobs-guest/jobs/api/jobPosting/${jobId}`;
}

export async function parseLinkedinJobPostToMarkdown(linkedInLink: string) {
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
