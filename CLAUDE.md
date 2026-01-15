# Return Signals - AI Assistant Context

## Project Overview

This is the marketing website for Return Signals (returnsignals.com), built with Astro 5 and Tailwind CSS. It's a static site optimized for performance and SEO, deployed on Google Cloud Platform using shared infrastructure with Material Model.

## Tech Stack

- **Frontend Framework**: Astro 5.16+ with TypeScript
- **Styling**: Tailwind CSS 3 with Typography plugin
- **Infrastructure**: GCP (Cloud Storage + CDN + HTTPS Load Balancer)
- **Infrastructure as Code**: Terraform (managed via materialmodel-terraform submodule)
- **Analytics**: Google Analytics 4, PostHog (via reverse proxy at ph.returnsignals.com)
- **CI/CD**: GitHub Actions → GCS bucket deployment
- **Node Version**: 24.x (strictly enforced)

## Project Structure

```
src/
├── components/
│   └── shared/        # Reusable components (SEO, PostHog)
├── layouts/           # Page templates (BaseLayout)
├── pages/             # Route pages (SSG)
├── styles/            # Global CSS (Tailwind setup)
├── utils/             # Utilities (analytics)
└── types.ts           # Shared TypeScript types (e.g., Message)

public/                  # Static assets, robots.txt
materialmodel-terraform/ # Infrastructure
```

## Key Commands

```bash
# Local development
npm run dev                 # Start dev server (http://localhost:4321)
npm run build               # Build for production
npm run preview             # Preview production build
npm run lint                # Check for linting issues with ESLint
npm run lint:fix            # Auto-fix linting issues
npm run format              # Format code with Prettier
```

## Environment Variables

All client-side environment variables must start with `PUBLIC_`:

- `PUBLIC_GA_ID` - Google Analytics 4 measurement ID
- `PUBLIC_POSTHOG_KEY` - PostHog project API key for analytics
- `PUBLIC_BUILD_VERSION` - Git commit SHA

Optional (if enabled in deployment workflows): Datadog RUM variables are described in README.

## Architecture Patterns

### Component Organization

- **Shared components**: Located in `components/shared/`, reusable across pages
- **Layouts**: Page structure templates that wrap content
- Keep components small and focused

### Data Flow

- Static site generation (no client-side state management)
- Analytics via GA4 and PostHog
- No backend API or database

### Performance Considerations

- All pages are statically generated at build time
- Assets cached with immutable headers (1 year)
- HTML served with short cache (5 minutes)
- Index.html with no-cache for immediate updates
- Tailwind CSS purged for minimal bundle size

## Deployment Process

1. Push to `main` branch triggers GitHub Actions
2. Action builds the site with Node 24.x
3. Fetches analytics secrets from Google Secret Manager
4. Uploads static files to GCS bucket (`materialmodel-prod-returnsignals-www`)
5. Sets cache headers per file type
6. Invalidates CDN cache for immediate updates
7. Served via HTTPS Load Balancer at www.returnsignals.com

**PR Deployments:**

- Pull requests deploy to `test-www.returnsignals.com`
- Separate test bucket: `materialmodel-prod-test-returnsignals-www`
- Preview URL commented on PR

## Development Guidelines

### Code Style

- TypeScript strict mode enabled
- ESLint with eslint-plugin-astro for code quality
- Prettier with prettier-plugin-astro for formatting
- Components: PascalCase naming
- Files: kebab-case naming
- Path aliases: `@components`, `@layouts`, `@utils`, `@data`
- No console.log in production code (enforced by ESLint)
- Prefer const over let (enforced by ESLint)

### CSS/Styling

📖 **See [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for complete theme documentation**

- Use Tailwind utility classes with semantic design tokens
- **CRITICAL**: Never use hardcoded color values (gray-_, slate-_, blue-\*, etc.)
- Always use semantic tokens defined in `tailwind.config.mjs`:
  - **Text**: `text-primary`, `text-secondary`, `text-tertiary`, `text-caption`, `text-inverse`
  - **Surface**: `bg-surface-base`, `bg-surface-subtle`, `bg-surface-elevated`, `bg-surface-dark`
  - **Border**: `border`, `border-subtle`, `border-hover`
  - **Accent**: `text-accent-primary`, `bg-accent-primary`, `accent-hover`, `accent-secondary`
  - **Success**: `accent-success`, `accent-success-text`, `accent-success-bg`, `accent-success-border`
  - **Error**: `accent-error`, `accent-error-text`, `accent-error-bg`, `accent-error-border`
- Typography utilities in `src/styles/global.css`:
  - `.eyebrow` - Small uppercase labels
  - `.section-title` - Large section headings
  - `.section-description` - Section descriptions
  - `.page-title` - Page H1 titles
- Button utilities:
  - `.btn` - Base button styles
  - `.btn-primary` - Dark filled button
  - `.btn-secondary` - Outlined button
  - `.btn-lg` / `.btn-sm` - Size variants
  - Segmented toggles: `.segmented`, `.segmented-btn` (defined globally)
- Container utilities:
  - `.container-lg` - Max-width 7xl with responsive padding
  - `.container-narrow` - Max-width 4xl with responsive padding
  - `.section` - Full section with container-lg + vertical padding
  - Card utility: `.card` (rounded, bordered surface with padding)
- Avoid inline styles
- Responsive design: mobile-first approach

### Git Workflow

- Feature branches from `main`
- Descriptive commit messages
- PR required before merge
- Auto-deploy on merge to `main`

## Important Notes

1. **Terraform**: Infrastructure is managed via materialmodel-terraform submodule - never edit directly
2. **Shared Infrastructure**: Uses same GCP project (materialmodel-prod) as Material Model sites
3. **Cache Headers**: HTML (5min cache), assets (1 year immutable)
4. **Production URL**: www.returnsignals.com (apex redirects to www)
5. **Node Version**: Must use Node 24.x (enforced in package.json)
6. **Build Output**: Static files in `dist/` directory
7. **Color Standardization**: All colors use semantic tokens - never hardcode color values
8. **PostHog Analytics**: Uses reverse proxy at ph.returnsignals.com (CNAME to 7e1195b4988eb9687b7d.proxy-us.posthog.com) for improved privacy and ad-blocker resistance

## Security Considerations

- HTTPS-only via managed SSL certificate
- Secrets stored in Google Secret Manager with CMEK encryption
- No user data stored locally
- Regular dependency updates
- GitHub Actions uses Workload Identity Federation (no service account keys)

## AI Assistant Best Practices

When working with this codebase:

1. **Review DESIGN_SYSTEM.md** - Check theme tokens and component patterns before making changes
2. Always check existing patterns before creating new components
3. Prefer editing existing files over creating new ones
4. Follow the established directory structure
5. Maintain consistency with existing code style
6. **NEVER use hardcoded colors** - always use semantic tokens
7. Run `npm run lint` and `npm run format` before committing
8. Test changes locally with `npm run build && npm run preview`
9. Consider performance impact of changes
10. Ensure accessibility compliance
11. Use path aliases for imports (@components, @layouts, @utils)
12. Keep the design minimal and professional
13. **When adding or modifying pages**:
    - Create a markdown version in `public/` directory (e.g., `public/roi.md`)
    - Add the new page to `public/llms.txt` in the Docs section
    - For MDX pages, add them to `scripts/generate-llms-md.ts` to auto-generate markdown versions
14. **NEVER use unicode characters in public/*.md files** - Use plain ASCII characters for maximum compatibility and portability for md files that are directly served on the website. Unicode is ok for readme.md and similar.
