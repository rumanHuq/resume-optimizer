import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import TanStackQueryDevtools from '../integrations/tanstack-query/devtools';

import '@mantine/core/styles.css';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Resume Analyzer' },
    ],
  }),
  component: () => {
    return (
      <html {...mantineHtmlProps}>
        <head>
          <HeadContent />
          <ColorSchemeScript defaultColorScheme='auto' />
        </head>
        <body>
          <MantineProvider>
            <Outlet />
          </MantineProvider>
          <TanStackDevtools
            config={{ position: 'bottom-right' }}
            plugins={[
              { name: 'Tanstack Router', render: <TanStackRouterDevtoolsPanel /> },
              TanStackQueryDevtools,
            ]}
          />
          <Scripts />
        </body>
      </html>
    );
  },
});
