import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { TanStackDevtools } from '@tanstack/react-devtools';
import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import type { ReactNode } from 'react';
import TanStackQueryDevtools from '../integrations/tanstack-query/devtools';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      { title: 'Resume Analyzer' },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (<RootDocument><Outlet /></RootDocument>)
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html {...mantineHtmlProps}>
      <head>
        <HeadContent />
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body>
        <MantineProvider>{children}</MantineProvider>
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
