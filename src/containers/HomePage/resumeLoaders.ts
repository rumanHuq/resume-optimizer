import { Buffer } from 'node:buffer';
import TurndownService from 'turndown';

import { resumeAnalyzerformSchema } from '@/schemas/schemas';
import { getLinkedInApiLink, parseLinkedinJobPostToMarkdown } from '@/utils/utils';
import pdf2md from '@opendocsg/pdf2md';
import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

async function fileToBase64(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

const turndownService = new TurndownService();
export const analyzeResumeServerFn = createServerFn({ method: 'POST' })
  .inputValidator((r) => {
    const formData = z.instanceof(FormData).parse(r);
    return resumeAnalyzerformSchema.parse({
      resumePDF: formData.get('resumePDF'),
      linkedJobUrl: formData.get('linkedJobUrl'),
    });
  })
  .handler(async ({ data }) => {
    const resumePdfBase64 = await fileToBase64(data.resumePDF);
    const resumeMarkdown = await pdf2md(resumePdfBase64);

    const linkedInAPILink = getLinkedInApiLink(data.linkedJobUrl);
    const linkedInJobPageHtml = await parseLinkedinJobPostToMarkdown(linkedInAPILink);
    if (linkedInJobPageHtml === null) return 'No html found';
    const linkedInJobPageMarkdown: string = turndownService.turndown(linkedInJobPageHtml);

    return { resumeMarkdown, linkedInJobPageMarkdown };
  });
