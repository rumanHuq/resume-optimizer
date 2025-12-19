import { db } from '@/api/db';
import type { CvAnalyzerformSchema } from '@/schemas/schemas';
import pdf2md from '@opendocsg/pdf2md';
import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

export const defaultFormValues: CvAnalyzerformSchema = { cvPDF: new File([], ''), linkedJobUrl: '' };

export async function fileToBase64(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

export const onPdfUpload = createServerFn({ method: 'POST' })
  .inputValidator((input: FormData) => {
    const form = z.instanceof(FormData).parse(input);
    const cvPDF = form.get('cvPDF');
    return z.file().parse(cvPDF);
  })
  .handler(async (request) => {
    const cvPDF = request.data;
    const cvPdfBase64 = await fileToBase64(cvPDF);
    const cvMarkDown = await pdf2md(cvPdfBase64);
    db.cvMarkDown = cvMarkDown;
    return new Response(cvMarkDown);
  });

export const onPdfRemove = createServerFn({ method: 'POST' }).handler(() => {
  db.cvMarkDown = '';
  return new Response('file removed');
});
