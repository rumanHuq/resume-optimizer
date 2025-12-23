import { ErrorComponent, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

export function getRouter() {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
  });

  return router;
}
