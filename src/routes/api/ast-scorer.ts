import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

import { db } from '@/api/db';
import type { AiModel } from '@/constants/constants';
import { aiModels } from '@/constants/constants';
import { linkedinJobUrlSchema } from '@/schemas/schemas';
import { aiResponse } from '@/utils/server-only-utils';
import { getLinkedInJobMarkDown } from '@/utils/utils';

export const Route = createFileRoute('/api/ast-scorer')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const {
            linkedInUrl,
            jobDescription,
            aiModel,
          }: { linkedInUrl: string; jobDescription?: string; aiModel: AiModel } = await request.json();
          z.enum(aiModels).parse(aiModel);

          const hasLinkedInUrl = linkedInUrl !== '';
          const hasJobDescription = jobDescription !== undefined && jobDescription !== '';
          if (hasLinkedInUrl === hasJobDescription) {
            return new Response('Provide either LinkedIn URL or Job Description, not both', { status: 400 });
          }

          let jobContent: string;
          if (hasLinkedInUrl) {
            const linkedInJobUrl = linkedinJobUrlSchema.parse(linkedInUrl);
            const fetchedContent = await getLinkedInJobMarkDown(linkedInJobUrl);
            if (db.cvMarkDown.length === 0) {
              return new Response('Please reupload the pdf and try again', { status: 500 });
            }
            if (fetchedContent === undefined || fetchedContent === '') {
              return new Response('Linked In Job page markdown failed', { status: 500 });
            }
            jobContent = fetchedContent;
          } else {
            const raw = jobDescription!.trim();
            if (raw === '') {
              return new Response('Job description is required', { status: 400 });
            }
            jobContent = raw.replace(/<[^>]*>/g, '').replace(/[<>"'&]/g, '');
          }
          const resp = aiResponse(aiModel, jobContent, db.cvMarkDown);
          const headers = new Headers(resp.headers);
          headers.set('X-Job-Description', btoa(encodeURIComponent(jobContent)));
          return new Response(resp.body, { status: resp.status, statusText: resp.statusText, headers });
        } catch (error) {
          console.log(error);
          return new Response('Oh no', { status: 500 });
        }
      },
    },
  },
});
