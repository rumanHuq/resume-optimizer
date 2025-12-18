import netlify from '@netlify/vite-plugin-tanstack-start';
import { devtools } from '@tanstack/devtools-vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import viteTsConfigPaths from 'vite-tsconfig-paths';

const config = defineConfig({
  server: { port: 8080 },
  plugins: [
    devtools(),
    netlify({
      dev: {
        edgeFunctions: { enabled: false },
        // See https://www.npmjs.com/package/@netlify/vite-plugin.
      },
    }),
    viteTsConfigPaths({ projects: ['./tsconfig.json'] }),
    tanstackStart(),
    viteReact(),
  ],
});

export default config;
