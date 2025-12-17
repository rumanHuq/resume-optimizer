import { db } from '@/api/db';
import { linkedinJobUrlSchema } from '@/schemas/schemas';
import { aiResponse, getLinkedInJobMarkDown } from '@/utils/utils';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/api/resume-optimizer')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { linkedInUrl }: { linkedInUrl: string } = await request.json();

          const linkedInJobUrl = linkedinJobUrlSchema.parse(linkedInUrl);
          const linkedInJobPageMarkdown = await getLinkedInJobMarkDown(linkedInJobUrl);
          if (linkedInJobPageMarkdown.length === 0 || db.resumeMarkDown.length === 0) {
            return new Response('Done');
          }
          return aiResponse(linkedInJobPageMarkdown, db.resumeMarkDown);
        } catch (error) {
          console.log(error);
          return new Response('Oh no');
        }
      },
    },
  },
});
