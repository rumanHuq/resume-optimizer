# Architecture

## Overview

AST Scorer is a fullstack React application for CV/job-fit analysis. Users upload a CV (PDF or markdown), provide a job description (via LinkedIn URL or pasted text), and receive an AI-powered suitability score with detailed breakdown.

Built with **TanStack React Start** (SSR framework on Vite), deployed on **Netlify**.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Bun |
| Framework | TanStack React Start + Vite |
| UI | Mantine v8 + Tabler Icons |
| Routing | TanStack Router (file-based) |
| Server State | TanStack Query |
| Forms | TanStack Form + Zod |
| AI | Vercel AI SDK + OpenRouter |
| Validation | Zod |
| Deployment | Netlify |

## Route Structure

```
src/routes/
├── __root.tsx              Root layout (loader, meta, Provider wrapper)
├── index.tsx               Home — ATS scoring page (/)
├── resume-builder.tsx      Resume builder (/resume-builder)
└── api/
    └── ast-scorer.ts       POST /api/ast-scorer — AI scoring endpoint
```

Routes are file-based. After adding a route, regenerate the tree:

```
bunx tanstack-start generate
```

## Data Flow

```
User Browser
    │
    ├── Loads "/"  →  SSR renders HomePage
    │
    ├── Uploads PDF
    │   └── createServerFn("onPdfUpload")
    │       ├── @opendocsg/pdf2md → markdown
    │       └── Stored in in-memory db (db.cvMarkDown)
    │
    ├── Submits job (URL or description)
    │   └── POST /api/ast-scorer
    │       ├── LinkedIn URL → cheerio scrape + turndown → markdown
    │       └── Calls AI (OpenRouter/Ollama) via streamObject
    │           └── Returns structured JSON stream:
    │               ├── overallScore (0-100)
    │               ├── matchingCriteria[]
    │               ├── missingKeywords[]
    │               └── ...
    │
    └── Client receives stream via useObject hook
        └── Renders in SuitabilityResult (ring chart + criteria lists)
```

## Key Modules

### API Routes (`src/routes/api/ast-scorer.ts`)

Server-only HTTP handler. Receives either a LinkedIn URL (scrapes job posting) or raw job description + CV markdown. Calls AI model with a system prompt and structured output schema. Streams response back as JSON chunks.

### Server Functions (`src/containers/HomePage/utils.ts`)

`createServerFn` wrappers for server-only operations:
- `onPdfUpload` — converts PDF to markdown via `@opendocsg/pdf2md`, stores in memory
- `onPdfRemove` — clears stored CV

### AI Integration (`src/utils/server-only-utils.ts`)

Server-only module. Uses `streamObject` from the Vercel AI SDK with a Zod schema for structured output. Supports two providers:
- **OpenRouter** (primary) — configured via `OPEN_ROUTER_SDK_KEY` env var
- **Ollama** (fallback) — local, uses `qwen2.5-coder:7b-instruct`

In dev mode, logs scores and job descriptions to `logs/`.

### LinkedIn Scraper (`src/utils/utils.ts`)

Extracts job ID from LinkedIn URL, fetches page HTML, converts to clean markdown with `cheerio` + `turndown`.

### In-Memory DB (`src/api/db.ts`)

Minimal singleton holding the current CV markdown string. Reset on each new upload.

## Component Architecture

```
Html.tsx (shell: MantineProvider, devtools, QueryClient)
└── Router (TanStack Router)
    ├── HomePage.tsx
    │   ├── CvUploadForm.tsx (file upload, URL/desc input, model selector)
    │   └── SuitabilityResult.tsx (ring scores, criteria, insights)
    └── ResumeBuilderPage.tsx (drag-resize A4 canvas)
```

### HomePage

Two-column layout:
- **Left**: Form — PDF file input, job source toggle (URL vs description), AI model selector (dev only), submit
- **Right**: Results — ring progress chart, matched/unmatched criteria, missing keywords, ATS issues, recruiter/candidate insights

### ResumeBuilderPage

WIP. Drag-resizable A4 canvas with contentEditable sections for education, experience, etc. Uses `react-rnd`.

## AI Scoring Schema

The AI returns a structured object matching `jobSuitabilitySchema`:

```typescript
{
  overallScore: number           // 0-100
  matchingCriteria: Array<{
    label: string
    score: number
    summary: string
  }>
  missingKeywords: string[]
  matchingKeywords: string[]
  recruiterInsight: string
  candidateInsight: string
  recruiterSuggestion: string
  candidateSuggestion: string
  atsIssues: Array<{
    type: string
    severity: "low" | "medium" | "high"
    summary: string
  }>
}
```

## State Management

- **TanStack Query** — server state (CV data, AI results)
- **TanStack Form** — form state with Zod validation
- **Local state** — UI state (toggles, selections)

## Configuration

| File | Purpose |
|------|---------|
| `vite.config.ts` | Build config, port 8080, plugins |
| `tsconfig.json` | TypeScript strict mode, path aliases |
| `eslint.config.js` | Flat ESLint config (strict) |
| `prettier.config.js` | Formatting rules |
| `postcss.config.cjs` | Mantine PostCSS processing |
| `netlify.toml` | Netlify build settings |

## Future Concerns

- **Testing**: Vitest + Testing Library are installed but unused. Tests should be added per-module.
- **Database**: Currently in-memory only. For persistence, add a database adapter.
- **Auth**: No authentication layer. Add if multi-user support is needed.
- **Rate limiting**: API route has no rate limiting — consider adding for production.
