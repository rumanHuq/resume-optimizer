import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/api/mock-error')({
  server: {
    handlers: {
      GET() {
        return new Response('Useless error', { status: 401, statusText: 'bullcrap' });
      },
    },
  },
});
