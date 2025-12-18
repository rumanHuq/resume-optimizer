/* eslint-disable react-refresh/only-export-components */

import { HomePage } from '@/containers/HomePage/HomePage';
import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';

export const getNodeEnv = createServerFn({ method: 'GET' }).handler(() => {
  return process.env.NODE_ENV ?? 'test';
});

const HomePageWithInitialData = () => {
  const env = Route.useLoaderData();
  return <HomePage env={env} />;
};

export const Route = createFileRoute('/')({
  component: HomePageWithInitialData,
  loader: async () => await getNodeEnv(),
});
