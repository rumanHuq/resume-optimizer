import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { HeadContent, Outlet, Scripts } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import TanStackQueryDevtools from '../integrations/tanstack-query/devtools';

export const Html = ({ env }: { env: string }) => {
  console.log(JSON.stringify({ env }, null, 2));
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
        {env === 'development' && (
          <TanStackDevtools
            config={{ position: 'bottom-right' }}
            plugins={[
              { name: 'Tanstack Router', render: <TanStackRouterDevtoolsPanel /> },
              TanStackQueryDevtools,
            ]}
          />
        )}
        <Scripts />
      </body>
    </html>
  );
};
