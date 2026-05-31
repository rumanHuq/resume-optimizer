# Contributing

## Prerequisites

- [Bun](https://bun.sh) (JavaScript runtime & package manager)
- Node.js 24+ (via `nvm` — see `bootstrap.sh`)
- An [OpenRouter](https://openrouter.ai) API key (set in `.env` as `OPEN_ROUTER_SDK_KEY`)

## Setup

```bash
git clone <repo-url>
cd ast-scorer
bun install
```

Copy `.env` from `.env.example` (if it exists) or create one:

```
OPEN_ROUTER_SDK_KEY=sk-or-v1-...
```

## Development

```bash
bun run dev
```

Starts the dev server on **port 8080** (not 5173). The app is served with HMR via Vite + TanStack Start.

## Project Scripts

| Command | Purpose |
|---------|---------|
| `bun run dev` | Start dev server (port 8080) |
| `bun run build` | Production build |
| `bun run serve` | Preview production build locally |
| `bun run deploy` | Build + deploy to Netlify |
| `bunx eslint .` | Lint all source files |
| `bunx tanstack-start generate` | Regenerate route tree after adding routes |

## Code Standards

### Linting

ESLint with flat config enforces strict rules. Run before committing:

```bash
bunx eslint .
```

Key enforced rules:
- `prefer-const` everywhere (including destructuring)
- No `any`, no `{}`, no `Function` — use proper TypeScript types
- Arrow function components only (`const Foo = () => ...`)
- `<Component />` not `<Component={true} />`
- `consistent-type-imports` — use `import type` for type-only imports
- `strict-boolean-expressions` — no loose truthiness checks
- `prefer-nullish-coalescing` and `prefer-optional-chain`
- No unused variables (prefix with `_` to ignore)
- Prettier formatting enforced as ESLint errors

### Formatting

Prettier is configured in `prettier.config.js`:
- Single quotes
- Trailing commas (all)
- Print width 110

### TypeScript

- `strict: true` in `tsconfig.json`
- No `any` — model all data with proper types/interfaces
- No unused locals/parameters
- Path alias `@/*` maps to `./src/*`

### Architecture Patterns

- **One component per file** (enforced by `react/no-multi-comp`)
- **Server functions** via `createServerFn` for server-only logic
- **API routes** in `src/routes/api/*.ts` for HTTP endpoints
- **Client routes** in `src/routes/*.tsx`
- **Zod schemas** in `src/schemas/` for all validation
- **Constants** in `src/constants/`
- **Containers** in `src/containers/<PageName>/` — page-level components only

## Adding a New Route

1. Create the route file in `src/routes/` (e.g., `src/routes/about.tsx`)
2. Run `bunx tanstack-start generate` to update `src/routeTree.gen.ts`
3. Restart the dev server

For API routes, define the handler in `src/routes/api/*.ts` using the `server.handlers` object.

## Testing

Vitest and Testing Library are installed but no tests exist yet. When adding tests:

- Place test files next to the module they test (`Component.test.tsx`)
- Use `describe`/`it`/`expect` from vitest
- Use `@testing-library/react` for component tests

## Pull Request Process

1. Ensure lint passes (`bunx eslint .`)
2. Ensure build succeeds (`bun run build`)
3. Keep PRs focused on a single concern
4. Write clear commit messages following conventional commits

## Project Structure

```
src/
├── @types/            # Shared TypeScript types
├── api/               # Server-side data layer (in-memory db)
├── constants/         # App-wide constants
├── containers/        # Page-level components
│   ├── HomePage/       # ATS scoring page
│   └── ResumeBuilderPage/  # Resume editor
├── hooks/             # Custom React hooks
├── integrations/      # Third-party integrations (TanStack Query)
├── routes/            # File-based routes (TanStack Start)
│   └── api/           # Server-side API endpoints
├── schemas/           # Zod validation schemas
├── tools/             # AI tool definitions
└── utils/             # Utility functions
```
