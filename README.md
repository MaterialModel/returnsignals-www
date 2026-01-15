# Return Signals

Marketing website for Return Signals. Built with Astro 5 + Tailwind CSS for optimal performance and deployed on Google Cloud Platform.

## 🛠 Tech Stack

- **Framework**: Astro 5 + TypeScript
- **Styling**: Tailwind CSS 3
- **Infrastructure**: GCP (Cloud Storage + CDN + HTTPS LB)
- **IaC**: Terraform (via materialmodel-terraform submodule)
- **Analytics**: Google Analytics 4, PostHog, Datadog RUM
- **CI/CD**: GitHub Actions

## 🏃‍♂️ Quick Start

### Prerequisites

- Node.js 24.x (enforced via `engines`)
- npm 11.x

### Local Development

```bash
# Install dependencies
npm ci

# Start dev server (http://localhost:4321)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Format code
npm run format

# Lint code
npm run lint        # Check for linting issues
npm run lint:fix    # Auto-fix linting issues
```

### Environment Variables

Environment variables are fetched from Google Secret Manager during GitHub Actions builds:

- `PUBLIC_GA_ID` - Google Analytics 4 measurement ID
- `PUBLIC_POSTHOG_KEY` - PostHog project API key
- `PUBLIC_DATADOG_APPLICATION_ID` - Datadog RUM application ID
- `PUBLIC_DATADOG_CLIENT_TOKEN` - Datadog RUM client token
- `PUBLIC_DATADOG_SITE` - Datadog site (us3.datadoghog.com)
- `PUBLIC_DATADOG_SERVICE` - Service name (returnsignals-www)
- `PUBLIC_DATADOG_ENV` - Environment (production/test)
- `PUBLIC_BUILD_VERSION` - Git commit SHA

## 🎨 Design System

The site uses a **semantic design token system** with clean, minimal aesthetics.

📖 **See [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for complete documentation**

### Quick Reference

**Color Tokens** (never use hardcoded Tailwind colors):

```
Text:    text-primary, text-secondary, text-tertiary, text-inverse
Surface: bg-surface-base, bg-surface-subtle, bg-surface-elevated, bg-surface-dark
Border:  border, border-subtle, border-hover
Accent:  text-accent-primary, accent-hover, accent-secondary, accent-success
```

**Typography Utilities:**
- `.section-title`, `.section-description`, `.eyebrow`, `.page-title`

**Button Utilities:**
- `.btn .btn-primary`, `.btn .btn-secondary`, `.btn-lg`, `.btn-sm`

**Container Utilities:**
- `.container-lg`, `.container-narrow`, `.section`

**Common UI Utilities:**
- Segmented toggles: `.segmented`, `.segmented-btn` (shared styles in `src/styles/global.css`)
- Card: `.card` (rounded, bordered surface with padded content)

## 🚢 Deployment

### Production

- **URL**: https://www.returnsignals.com
- **Bucket**: materialmodel-prod-returnsignals-www
- **Trigger**: Push to `main` branch

### Test/Preview

- **URL**: https://test-www.returnsignals.com
- **Bucket**: materialmodel-prod-test-returnsignals-www
- **Trigger**: Pull request creation/updates

### Infrastructure

- Managed via `materialmodel-terraform` submodule
- Static hosting on GCP Cloud Storage
- Global CDN via Cloud CDN
- HTTPS Load Balancer with managed SSL
- Shared infrastructure with Material Model sites

### Cache Strategy

- HTML: 5 minutes, must-revalidate
- index.html: no-cache
- Assets (JS/CSS/images): 1 year, immutable

## 🔒 Security

- HTTPS-only via Google-managed SSL certificate
- Secrets in Google Secret Manager with CMEK encryption
- GitHub Actions uses Workload Identity Federation
- Cloud Armor DDoS protection
- No user data collection beyond analytics

## 🤝 Contributing

1. Create feature branch from `main`
2. Make changes and test locally
3. Run `npm run lint` and `npm run format`
4. Build and preview: `npm run build && npm run preview`
5. Create PR for review
6. Merge triggers automatic deployment

## 📚 Documentation

- `DESIGN_SYSTEM.md` - Theme tokens, components, and standards
- `CLAUDE.md` - Comprehensive context for AI assistants
- `materialmodel-terraform/` - Infrastructure documentation

## 📄 License

Proprietary - Material Model, Inc.
