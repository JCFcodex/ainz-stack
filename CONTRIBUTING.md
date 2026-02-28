# Contributing to AinzStack

Thanks for your interest in contributing.

## Local Setup

1. Fork the repository and clone your fork.
2. Install dependencies:

```bash
pnpm install
```

3. Create local environment variables:

```bash
cp .env.example .env.local
```

4. Start the development server:

```bash
pnpm dev
```

## Development Workflow

- Package manager: `pnpm` only.
- Type safety: strict TypeScript is required.
- Formatting and linting:

```bash
pnpm format
pnpm lint
pnpm typecheck
```

- Testing:

```bash
pnpm test:unit
pnpm test:e2e
```

## Component and UI Rules

- Styling uses Tailwind CSS v4 utilities and project design tokens.
- Use `lucide-react` for icons.
- Follow existing patterns in `src/components/ui`.
- Prefer Server Components by default in App Router.
- Use `"use client"` only when component state, effects, or browser APIs are required.

## Branching and Pull Requests

1. Create a focused branch from `main`:
   - `feat/<short-name>`
   - `fix/<short-name>`
   - `docs/<short-name>`
2. Keep pull requests small and scoped.
3. Include:
   - What changed
   - Why it changed
   - How you validated it
4. If UI changed, include screenshots or short recordings.
5. Ensure all checks pass before requesting review.
