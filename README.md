# Return Signals Frontend

Monorepo for Return Signals frontend applications, built with pnpm workspaces and deployed on Google Cloud Platform.

## Applications

| App | Description | URL | Tech Stack |
|-----|-------------|-----|------------|
| **www** | Marketing website | www.returnsignals.com | Astro 5 + Tailwind |
| **app** | Customer dashboard | app.returnsignals.com | Vite + React + React Router |

## Tech Stack

- **Package Manager**: pnpm 9 with workspaces
- **Node Version**: 24.x (enforced via `.nvmrc` and `engines`)
- **Styling**: Tailwind CSS 3 with shared semantic tokens
- **Infrastructure**: GCP (Cloud Storage + CDN + HTTPS LB)
- **IaC**: Terraform (via materialmodel-terraform submodule)
- **CI/CD**: GitHub Actions with change detection

## Quick Start

### Prerequisites

- Node.js 24.x (use `nvm use` to auto-switch)
- pnpm 9.x (`corepack enable && corepack prepare pnpm@9 --activate`)

### Development

```bash
# Install dependencies
pnpm install

# Start all apps in parallel
pnpm dev

# Start individual apps
pnpm dev:www          # http://localhost:4321
pnpm dev:app          # http://localhost:5173

# Build
pnpm build            # Build all apps
pnpm build:www        # Build www only
pnpm build:app        # Build app only

# Linting and formatting
pnpm lint             # Lint all apps
pnpm format           # Format all apps
pnpm typecheck        # Type check all apps

# Run commands in specific workspace
pnpm --filter @returnsignals/www <command>
pnpm --filter @returnsignals/app <command>
```

## Project Structure

```
returnsignals-frontend/
├── apps/
│   ├── www/                      # Astro marketing site (@returnsignals/www)
│   └── app/                      # Vite React SPA (@returnsignals/app)
├── packages/
│   ├── tailwind-config/          # Shared Tailwind preset (@returnsignals/tailwind-config)
│   └── styles/                   # Shared global CSS (@returnsignals/styles)
├── materialmodel-terraform/      # Infrastructure (submodule)
├── pnpm-workspace.yaml
└── package.json
```

## Shared Packages

### @returnsignals/tailwind-config
Shared Tailwind CSS preset with semantic design tokens (colors, typography, spacing).

### @returnsignals/styles
Shared global CSS utilities (`.btn`, `.card`, `.section`, typography classes).

Both apps extend these packages - see [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for complete documentation.

## Deployment

GitHub Actions automatically deploys on push to main with change detection:

| Environment | www | app |
|-------------|-----|-----|
| Production | www.returnsignals.com | app.returnsignals.com |
| PR Preview | test-www.returnsignals.com | test-app.returnsignals.com |

### Cache Strategy
- HTML: 5 minutes, must-revalidate
- index.html: no-cache
- Assets (JS/CSS/images): 1 year, immutable

## Security

- HTTPS-only via Google-managed SSL certificate
- Secrets in Google Secret Manager with CMEK encryption
- GitHub Actions uses Workload Identity Federation (no service account keys)
- Cloud Armor DDoS protection

## Documentation

- [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) - Theme tokens, components, and styling standards
- [CLAUDE.md](./CLAUDE.md) - AI assistant context and guidelines
- [apps/www/README.md](./apps/www/README.md) - Marketing site documentation
- [apps/app/README.md](./apps/app/README.md) - Dashboard app documentation

## License

Proprietary - Material Model, Inc.
