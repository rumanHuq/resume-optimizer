import { db } from '@/api/db';
import type { ResumeAnalyzerformSchema } from '@/schemas/schemas';
import pdf2md from '@opendocsg/pdf2md';
import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

export const defaultFormValues: ResumeAnalyzerformSchema = { resumePDF: new File([], ''), linkedJobUrl: '' };

export async function fileToBase64(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

export const onPdfUpload = createServerFn({ method: 'POST' })
  .inputValidator((input: FormData) => {
    const form = z.instanceof(FormData).parse(input);
    const resumePDF = form.get('resumePDF');
    return z.file().parse(resumePDF);
  })
  .handler(async (request) => {
    const resumePDF = request.data;
    const resumePdfBase64 = await fileToBase64(resumePDF);
    const resumeMarkDown = await pdf2md(resumePdfBase64);
    db.resumeMarkDown = resumeMarkDown;
    return new Response(resumeMarkDown);
  });

export const onPdfRemove = createServerFn({ method: 'POST' }).handler(() => {
  db.resumeMarkDown = '';
  return new Response('file removed');
});
