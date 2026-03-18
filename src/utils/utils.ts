import * as cheerio from 'cheerio';
import TurndownService from 'turndown';

export function getJobId(link: string) {
  try {
    const parsedUrl = new URL(link);

    // Strict host check
    if (!parsedUrl.hostname.endsWith('linkedin.com')) {
      return null;
    }

    // Case 1: jobId is in the query parameters (e.g., currentJobId=...)
    const currentJobId = parsedUrl.searchParams.get('currentJobId');
    if (currentJobId !== null) return currentJobId;

    // Case 2: jobId is in the path (e.g., /jobs/view/4386729468/)
    const pathSegments = parsedUrl.pathname.split('/');
    const viewIndex = pathSegments.indexOf('view');

    if (viewIndex !== -1 && pathSegments[viewIndex + 1].length > 0) {
      return pathSegments[viewIndex + 1];
    }

    return null;
  } catch {
    return null;
  }
}

function getLinkedInApiLink(link: string) {
  const jobId = getJobId(link);
  if (typeof jobId !== 'string' || jobId.length === 0) return null;
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
  if (linkedInJobUrl.length === 0) return;
  const turndownService = new TurndownService();
  const linkedInAPILink = getLinkedInApiLink(linkedInJobUrl);
  if (linkedInAPILink === null) return 'No html found';

  const linkedInJobPageHtml = await parseLinkedinJobPostToMarkdown(linkedInAPILink);
  if (linkedInJobPageHtml === null) return 'No html found';

  const linkedInJobPageMarkdown: string = turndownService.turndown(linkedInJobPageHtml);

  return linkedInJobPageMarkdown;
}
