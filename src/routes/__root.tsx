import { createRootRoute } from '@tanstack/react-router';

import { Html } from '@/containers/Html';
import { Provider } from '@/integrations/tanstack-query/root-provider';
import '@mantine/core/styles.css';
import { createServerFn } from '@tanstack/react-start';

const getNodeEnv = createServerFn({ method: 'GET' }).handler(() => {
  return process.env.NODE_ENV ?? 'test';
});

const RootComponent = () => {
  return <Html env={Route.useLoaderData()} />;
};

export const Route = createRootRoute({
  loader: async () => await getNodeEnv(),
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Cv Analyzer' },
    ],
  }),
  component: () => {
    return (
      <Provider>
        <RootComponent />
      </Provider>
    );
  },
  notFoundComponent: (props) => {
    return <div>Oh shit, this does not look good</div>;
  },
});
