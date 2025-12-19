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
          const linkedInPageMarkdownFail =
            linkedInJobPageMarkdown === undefined ||
            linkedInJobPageMarkdown.length === 0 ||
            db.resumeMarkDown.length === 0;
          if (linkedInPageMarkdownFail) {
            return new Response('Linked In Job page markdown failed');
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
