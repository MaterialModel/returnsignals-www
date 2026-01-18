# @returnsignals/www

Marketing website for Return Signals. Built with Astro 5 + Tailwind CSS for optimal performance.

## Tech Stack

- **Framework**: Astro 5 with TypeScript
- **Styling**: Tailwind CSS 3 (extends `@returnsignals/tailwind-config`)
- **Content**: MDX for blog posts and legal pages
- **Analytics**: Google Analytics 4, PostHog

## Development

```bash
# From monorepo root
pnpm dev:www              # Start dev server (http://localhost:4321)

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
├── components/
│   ├── analytics/        # Dashboard mockup components
│   ├── blog/             # Blog components (card, grid, header)
│   ├── calculator/       # ROI calculator
│   ├── icons/            # Icon components
│   ├── sections/         # Page sections (Hero, FAQ, CTA, etc.)
│   ├── shared/           # Shared components (Header, Footer, SEO)
│   └── ui/               # UI primitives (accordion, mockups)
├── content/
│   └── blog/             # Blog posts (MDX)
├── data/                 # Static data (FAQ content)
├── layouts/              # Page layouts
├── pages/                # Routes
├── styles/               # Additional styles
├── types.ts              # TypeScript types
└── utils/                # Utility functions

public/
├── images/               # Static images
├── icons/                # SVG icons
└── blog/                 # Blog assets
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, features, and CTA |
| `/blog` | Blog listing page |
| `/blog/[slug]` | Individual blog posts |
| `/roi` | ROI calculator |
| `/privacy` | Privacy policy (MDX) |
| `/terms` | Terms of service (MDX) |
| `/security` | Security page (MDX) |

## Environment Variables

All client-side variables must start with `PUBLIC_`:

| Variable | Description |
|----------|-------------|
| `PUBLIC_GA_ID` | Google Analytics 4 measurement ID |
| `PUBLIC_POSTHOG_KEY` | PostHog project API key |
| `PUBLIC_BUILD_VERSION` | Git commit SHA (set by CI) |
| `SITE_URL` | Site URL for sitemap generation |

## Build Output

- Static HTML files in `dist/`
- Assets fingerprinted for cache busting
- Sitemap generated at `/sitemap-index.xml`
- RSS feed at `/blog/rss.xml`

## Content Workflow

### Adding Blog Posts

1. Create MDX file in `src/content/blog/`
2. Add frontmatter (title, description, date, tags, author)
3. Run `pnpm build` to generate markdown version in `public/blog/`

### Updating Legal Pages

1. Edit MDX files in `src/pages/` (privacy.mdx, terms.mdx, security.mdx)
2. Run `pnpm build` to generate markdown versions in `public/`

## Styling

Uses shared design system from `@returnsignals/tailwind-config` and `@returnsignals/styles`.

See [DESIGN_SYSTEM.md](../../DESIGN_SYSTEM.md) for:
- Semantic color tokens
- Typography utilities
- Component classes
