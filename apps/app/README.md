# @returnsignals/app

Customer dashboard SPA for Return Signals. Built with Vite + React + React Router.

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Bundler**: Vite 6
- **Routing**: React Router 6
- **Styling**: Tailwind CSS 3 (extends `@returnsignals/tailwind-config`)

## Development

```bash
# From monorepo root
pnpm dev:app              # Start dev server (http://localhost:5173)

# Or from this directory
pnpm dev

# Build
pnpm build

# Preview production build
pnpm preview

# Type checking
pnpm typecheck

# Linting
pnpm lint
pnpm lint:fix
```

## Project Structure

```
src/
├── App.tsx               # Root component with router
├── main.tsx              # Entry point
├── index.css             # App-specific styles
├── routes/               # Route components
│   └── Home.tsx
└── components/           # Shared components (to be added)
```

## Environment Variables

All client-side variables must start with `VITE_`:

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend API URL |
| `VITE_BUILD_VERSION` | Git commit SHA (set by CI) |

## Path Aliases

The `@/` alias maps to `./src/`:

```typescript
import { Component } from '@/components/Component'
```

## Build Output

- SPA bundle in `dist/`
- Assets fingerprinted for cache busting
- `index.html` configured for client-side routing

## Styling

Uses shared design system from `@returnsignals/tailwind-config` and `@returnsignals/styles`.

```typescript
// Shared styles imported in main.tsx
import '@returnsignals/styles/global.css'
```

See [DESIGN_SYSTEM.md](../../DESIGN_SYSTEM.md) for:
- Semantic color tokens
- Typography utilities
- Component classes
