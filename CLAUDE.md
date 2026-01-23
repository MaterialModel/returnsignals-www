# Return Signals Frontend - AI Assistant Context

## Project Overview

pnpm workspaces monorepo for Return Signals frontend applications:

| App | Package | Description | Port |
|-----|---------|-------------|------|
| www | `@returnsignals/www` | Astro marketing site (static, SEO-optimized) | 4321 |
| app | `@returnsignals/app` | Vite + React Router SPA (authenticated dashboard) | 5173 |

Both apps share styling via `@returnsignals/tailwind-config` and `@returnsignals/styles`, deployed on GCP.

## Tech Stack

- **Package Manager**: pnpm 9 with workspaces
- **www (Marketing Site)**: Astro 5.16+ with TypeScript
- **app (SPA)**: Vite 6 + React 18 + React Router
- **Styling**: Tailwind CSS 3 with shared configuration
- **Infrastructure**: GCP (Cloud Storage + CDN + HTTPS Load Balancer)
- **Infrastructure as Code**: Terraform (managed via materialmodel-terraform submodule)
- **Analytics**: Google Analytics 4, PostHog
- **CI/CD**: GitHub Actions with change detection
- **Node Version**: 24.x (strictly enforced)

## Project Structure

```
returnsignals-frontend/
├── pnpm-workspace.yaml           # Workspace configuration
├── package.json                  # Root workspace package.json
├── apps/
│   ├── www/                      # Astro marketing site
│   │   ├── package.json          # @returnsignals/www
│   │   ├── astro.config.mjs
│   │   ├── tailwind.config.mjs   # Extends shared config
│   │   └── src/
│   │       ├── components/
│   │       ├── layouts/
│   │       ├── pages/
│   │       └── styles/
│   └── app/                      # Vite React SPA
│       ├── package.json          # @returnsignals/app
│       ├── vite.config.ts
│       ├── tailwind.config.js    # Extends shared config
│       └── src/
│           ├── App.tsx
│           ├── routes/
│           └── components/
├── packages/
│   ├── tailwind-config/          # @returnsignals/tailwind-config
│   │   ├── package.json
│   │   └── index.js              # Shared Tailwind preset
│   └── styles/                   # @returnsignals/styles
│       ├── package.json
│       └── global.css            # Shared global CSS
└── materialmodel-terraform/      # Infrastructure submodule
```

## Key Commands

```bash
# Install dependencies (from root)
pnpm install

# Development
pnpm dev                          # Run all apps in parallel
pnpm dev:www                      # Run www only (http://localhost:4321)
pnpm dev:app                      # Run app only (http://localhost:5173)

# Build
pnpm build                        # Build all apps
pnpm build:www                    # Build www only
pnpm build:app                    # Build app only

# Linting and formatting
pnpm lint                         # Lint all apps
pnpm format                       # Format all apps

# Run commands in specific workspace
pnpm --filter @returnsignals/www <command>
pnpm --filter @returnsignals/app <command>
```

## Backend API

The app connects to a backend API:
- **Development**: `http://localhost:8000`
- **Production**: `https://api.returnsignals.com`

To view API documentation:
```bash
# Get API description/overview
curl -s http://localhost:8000/openapi.json | jq '.info.description'

# List all endpoints
curl -s http://localhost:8000/openapi.json | jq '.paths | keys'

# Get details for a specific endpoint
curl -s http://localhost:8000/openapi.json | jq '.paths["/auth/login"]'

# Get all schemas/types
curl -s http://localhost:8000/openapi.json | jq '.components.schemas | keys'
```

## Environment Variables

### www (Astro)
All client-side variables must start with `PUBLIC_`:
- `PUBLIC_GA_ID` - Google Analytics 4 measurement ID
- `PUBLIC_POSTHOG_KEY` - PostHog project API key
- `PUBLIC_BUILD_VERSION` - Git commit SHA

### app (Vite)
All client-side variables must start with `VITE_`:
- `VITE_API_URL` - Backend API URL
- `VITE_BUILD_VERSION` - Git commit SHA

## Shared Packages

### @returnsignals/tailwind-config
Shared Tailwind CSS preset with semantic design tokens:
- **Colors**: Brand, surface, border, accent colors
- **Typography**: Font families, sizes
- **Spacing**: Consistent spacing scale
- **Shadows**: Elevation system

Both apps extend this config:
```javascript
import baseConfig from '@returnsignals/tailwind-config'
export default {
  ...baseConfig,
  content: ['./src/**/*.{astro,tsx,jsx}']
}
```

### @returnsignals/styles
Shared global CSS with utilities:
- `.btn`, `.btn-primary`, `.btn-secondary` - Button styles
- `.card` - Card container
- `.section`, `.container-lg` - Layout utilities
- `.eyebrow`, `.section-title` - Typography utilities

Import in entry files:
```typescript
import '@returnsignals/styles/global.css'
```

## Deployment Process

GitHub Actions automatically deploys on push to main with change detection:

### www (Marketing Site)
1. Detects changes in `apps/www/` or `packages/`
2. Builds with `pnpm --filter @returnsignals/www build`
3. Deploys to `materialmodel-prod-returnsignals-www` bucket
4. Served at www.returnsignals.com

### app (SPA)
1. Detects changes in `apps/app/` or `packages/`
2. Builds with `pnpm --filter @returnsignals/app build`
3. Deploys to `materialmodel-prod-returnsignals-app` bucket
4. Served at app.returnsignals.com

### PR Deployments
- www: test-www.returnsignals.com
- app: test-app.returnsignals.com
- Preview URLs commented on PR

## Development Guidelines

### Code Style

- TypeScript strict mode in both apps
- ESLint for code quality
- Prettier for formatting
- Components: PascalCase naming
- Files: kebab-case naming
- No console.log in production code

### CSS/Styling

**See [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for complete theme documentation**

- Use Tailwind utility classes with semantic design tokens
- **CRITICAL**: Never use hardcoded color values (gray-*, slate-*, blue-*, etc.)
- Always use semantic tokens:
  - **Text**: `text-primary`, `text-secondary`, `text-tertiary`
  - **Surface**: `bg-surface-base`, `bg-surface-subtle`, `bg-surface-elevated`
  - **Border**: `border`, `border-subtle`, `border-hover`
  - **Accent**: `text-accent-primary`, `bg-accent-primary`
- Responsive design: mobile-first approach

### Git Workflow

- Feature branches from `main`
- Descriptive commit messages
- PR required before merge
- Auto-deploy on merge to `main`

## Important Notes

1. **Monorepo**: Use pnpm workspaces; run commands from root
2. **Shared Styling**: Both apps use the same Tailwind config and global CSS
3. **Terraform**: Infrastructure managed via submodule - never edit directly
4. **Cache Headers**: HTML (5min), assets (1 year immutable)
5. **Node Version**: Must use Node 24.x
6. **Build Output**: `apps/www/dist/` and `apps/app/dist/`
7. **Color Standardization**: All colors use semantic tokens

## URLs

| Environment | www | app |
|-------------|-----|-----|
| Production | www.returnsignals.com | app.returnsignals.com |
| Test (PR) | test-www.returnsignals.com | test-app.returnsignals.com |

## Security Considerations

- HTTPS-only via managed SSL certificate
- Secrets stored in Google Secret Manager with CMEK encryption
- GitHub Actions uses Workload Identity Federation (no service account keys)
- SPA uses secure cookie-based authentication

## AI Assistant Best Practices

When working with this codebase:

1. **Review DESIGN_SYSTEM.md** for theme tokens and patterns
2. Use pnpm commands from the root directory
3. Prefer editing existing files over creating new ones
4. **NEVER use hardcoded colors** - always use semantic tokens
5. Run `pnpm lint` and `pnpm format` before committing
6. Test changes with `pnpm build` before pushing
7. When modifying shared packages, test both apps
8. Keep styling consistent across both applications
9. For www pages, create markdown versions in `apps/www/public/`

## App-Specific Documentation

- **www**: See `apps/www/README.md` for Astro-specific patterns
- **app**: See `apps/app/README.md` for React/Vite patterns
