import { HomePage } from '@/containers/HomePage/HomePage';
import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';

const getNodeEnv = createServerFn().handler(() => process.env.NODE_ENV ?? 'test');

export const Route = createFileRoute('/')({
  component: async () => {
    const env = await getNodeEnv();
    return <HomePage env={env} />;
  },
});
