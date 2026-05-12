# AGENTS.md

## Key Commands

| Command | Purpose |
|---------|---------|
| `bun run dev` | Start dev server (port **8080**, not typical 5173) |
| `bun run build` | Build for production |
| `bun run serve` | Preview production build locally |
| `bun run deploy` | Deploy to Netlify |
| `bunx eslint .` | Run linter (no dedicated lint script) |

## Tech Stack

- **Runtime**: Bun (always use `bun` not `npm`)
- **Framework**: TanStack React Start + Vite
- **Deployment**: Netlify (uses `@netlify/vite-plugin-tanstack-start`)
- **UI**: Mantine v8
- **AI**: Vercel AI SDK + OpenRouter
- **Testing**: Vitest installed but no tests exist yet

## Architecture Notes

- **Entry point**: `src/routes/__root.tsx` (TanStack Start convention)
- **Generated routes**: `src/routeTree.gen.ts` - regenerate with `bunx tanstack-start generate` after adding routes
- **API routes**: `src/routes/api/*` - server-side endpoints
- **Client routes**: `src/routes/*.tsx` and `src/routes/**/index.tsx`

## Linting Rules (Strict)

ESLint config enforces:
- `prefer-const` everywhere
- `react/jsx-boolean-value`: `never` (use `<Component />` not `<Component={true} />`)
- Strict TypeScript: no `any`, no `{}`, prefer `Record<string, unknown>`
- Arrow function components required (`const Foo = () => ...`)

## Environment

- `.env` contains required API keys (not committed to git - check `.gitignore`)
- Dev server runs on **port 8080** (see `vite.config.ts:13`)

## Adding New Routes

1. Create route file in `src/routes/`
2. Run `bunx tanstack-start generate` to update `routeTree.gen.ts`
3. Restart dev server if needed