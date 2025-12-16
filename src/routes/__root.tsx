import '@mantine/core/styles.css';
import type { ReactNode } from 'react'
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from '@tanstack/react-router'
import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';

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
        <Scripts />
      </body>
    </html>
  )
}
