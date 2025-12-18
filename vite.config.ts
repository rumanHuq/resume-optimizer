import netlify from '@netlify/vite-plugin-tanstack-start';
import { devtools } from '@tanstack/devtools-vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import viteTsConfigPaths from 'vite-tsconfig-paths';

export const isDev = process.env.NODE_ENV !== 'production';
const developmentPlugins = () => [devtools()];
const productionPlugins = () => [netlify()];

const config = defineConfig({
  server: { port: 8080 },
  plugins: [
    viteTsConfigPaths({ projects: ['./tsconfig.json'] }),
    tanstackStart(),
    viteReact(),
    ...(isDev ? developmentPlugins() : productionPlugins()),
  ],
});

export default config;
