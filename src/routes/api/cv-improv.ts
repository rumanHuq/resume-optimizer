import { db } from '@/api/db';
import type { AiModel } from '@/constants/constants';
import { aiModels } from '@/constants/constants';
import { linkedinJobUrlSchema } from '@/schemas/schemas';
import { aiResponse, getLinkedInJobMarkDown } from '@/utils/utils';
import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

export const Route = createFileRoute('/api/cv-improv')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { linkedInUrl, aiModel }: { linkedInUrl: string; aiModel: AiModel } = await request.json();
          z.enum(aiModels).parse(aiModel);

          const linkedInJobUrl = linkedinJobUrlSchema.parse(linkedInUrl);
          const linkedInJobPageMarkdown = await getLinkedInJobMarkDown(linkedInJobUrl);
          if (db.cvMarkDown.length === 0) {
            return new Response('Please reupload the pdf and try again', { status: 500 });
          }
          const linkedInPageMarkdownFail =
            linkedInJobPageMarkdown === undefined || linkedInJobPageMarkdown.length === 0;

          if (linkedInPageMarkdownFail) {
            return new Response('Linked In Job page markdown failed', { status: 500 });
          }
          return aiResponse(aiModel, linkedInJobPageMarkdown, db.cvMarkDown);
        } catch (error) {
          console.log(error);
          return new Response('Oh no', { status: 500 });
        }
      },
    },
  },
});
