# Return Signals Design System

**Status:** Active | **Last Updated:** 2026-01-12

This document defines the design system for returnsignals.com, including color tokens, typography, spacing, and component standards. All code should follow these patterns.

---

## Table of Contents

1. [Colors](#colors)
2. [Typography](#typography)
3. [Spacing](#spacing)
4. [Components](#components)
5. [Known Issues](#known-issues)

---

## Colors

### Semantic Color Tokens

**CRITICAL:** Never use hardcoded color values (gray-*, slate-*, blue-*, etc.). Always use semantic tokens.

### Text Colors

| Token | Value | Usage |
|-------|-------|-------|
| `text-primary` | `#000000` | Headings, primary text (pure black) |
| `text-secondary` | `rgb(71, 85, 105)` | Body text, descriptions |
| `text-tertiary` | `rgb(148, 163, 184)` | Muted text, metadata |
| `text-caption` | `rgb(100, 116, 139)` | Captions, meta text (slate-500) |
| `text-inverse` | `#ffffff` | Text on dark backgrounds |

```tsx
// ✅ Good
<h1 className="text-primary">Heading</h1>
<p className="text-secondary">Description</p>

// ❌ Bad
<h1 className="text-slate-900">Heading</h1>
<p className="text-gray-600">Description</p>
```

### Surface Colors

| Token | Value | Usage |
|-------|-------|-------|
| `bg-surface-base` | `#ffffff` | Main page background |
| `bg-surface-subtle` | `#fafafa` | Hover states, subtle backgrounds |
| `bg-surface-elevated` | `#f5f5f5` | Progress bars, badges, cards |
| `bg-surface-dark` | `rgb(15, 23, 42)` | Dark sections, navigation |

```tsx
// ✅ Good
<div className="bg-surface-base">
  <button className="hover:bg-surface-subtle">Click me</button>
</div>

// ❌ Bad
<div className="bg-white">
  <button className="hover:bg-gray-50">Click me</button>
</div>
```

### Border Colors

| Token | Value | Usage |
|-------|-------|-------|
| `border` (DEFAULT) | `rgb(226, 232, 240)` | Standard borders |
| `border-subtle` | `rgba(226, 232, 240, 0.5)` | Subtle dividers |
| `border-hover` | `rgb(203, 213, 225)` | Hover states |

```tsx
// ✅ Good
<div className="border border-border rounded">Card</div>

// ❌ Bad
<div className="border border-gray-200 rounded">Card</div>
```

### Accent Colors

| Token | Value | Usage |
|-------|-------|-------|
| `text-accent-primary` | `rgb(15, 23, 42)` | Links, primary actions |
| `accent-hover` | `rgb(30, 41, 59)` | Hover states |
| `accent-secondary` | `rgb(71, 85, 105)` | Secondary highlights |
| `accent-muted` | `rgba(15, 23, 42, 0.1)` | Muted accent backgrounds |

### Success State Colors

| Token | Value | Usage |
|-------|-------|-------|
| `accent-success` | `rgb(34, 197, 94)` | Success icons, borders |
| `accent-success-subtle` | `rgba(34, 197, 94, 0.1)` | Success badge backgrounds |
| `accent-success-text` | `rgb(22, 101, 52)` | Success text (dark green) |
| `accent-success-border` | `rgb(134, 239, 172)` | Success borders (light green) |
| `accent-success-bg` | `rgb(240, 253, 244)` | Success backgrounds |
| `accent-success-bg-dark` | `rgb(220, 252, 231)` | Success gradient end |

### Error State Colors

| Token | Value | Usage |
|-------|-------|-------|
| `accent-error` | `rgb(185, 28, 28)` | Error icons |
| `accent-error-text` | `rgb(153, 27, 27)` | Error text (dark red) |
| `accent-error-border` | `rgb(252, 165, 165)` | Error borders |
| `accent-error-bg` | `rgb(254, 242, 242)` | Error backgrounds |
| `accent-error-subtle` | `rgb(254, 226, 226)` | Error gradient end |

### Info/Warning Colors

| Token | Value | Usage |
|-------|-------|-------|
| `accent-info` | `rgb(37, 99, 235)` | Info states (blue) |
| `accent-warning` | `rgb(161, 98, 7)` | Warning states (amber) |

```tsx
// ✅ Good
<a className="text-accent-primary hover:underline">Learn more</a>
<span className="bg-accent-success-bg text-accent-success-text">Saved</span>
<span className="bg-accent-error-bg text-accent-error-text">Failed</span>

// ❌ Bad
<a className="text-blue-600 hover:underline">Learn more</a>
<span className="bg-green-50 text-green-800">Saved</span>
```

---

## Typography

### Hierarchy

All typography uses semantic utility classes defined in `src/styles/global.css`.

### Headings

| Class | Usage | Example |
|-------|-------|---------|
| `.page-title` | H1 on pages | 4xl-5xl responsive |
| `.section-title` | H2 section headers | 3xl-5xl responsive |
| `.eyebrow` | Small uppercase labels | Uppercase, tracking-wider |

```tsx
// ✅ Good
<h1 className="page-title">Welcome</h1>
<h2 className="section-title">Features</h2>
<span className="eyebrow">New Feature</span>

// ❌ Bad
<h1 className="text-5xl font-bold">Welcome</h1>
```

### Body Text

| Class | Usage | Example |
|-------|-------|---------|
| `.section-description` | Section intro text | lg responsive, secondary color |
| `.hero-headline` | Hero primary text | 3xl-5xl, medium weight |
| `.hero-tagline` | Hero secondary text | lg-xl, primary color |
| `.hero-detail` | Hero detail text | sm-base, secondary color |

### Font Family

**Primary:** Karla (400-800 weight range)
- Defined in `tailwind.config.mjs`
- Loaded from Google Fonts in `BaseLayout.astro`

---

## Spacing

### Containers

| Class | Max Width | Padding | Usage |
|-------|-----------|---------|-------|
| `.container-lg` | `7xl` | `px-6 sm:px-8 lg:px-12` | Primary container |
| `.container-narrow` | `4xl` | `px-6 sm:px-8` | Narrow content |

### Sections

| Class | Padding | Usage |
|-------|---------|-------|
| `.section` | `py-20 sm:py-32` | Full-width sections with container-lg |
| `.section-narrow` | `py-20 sm:py-32` | Narrow sections with container-narrow |

```tsx
// ✅ Good
<section className="section">
  <h2 className="section-title">Features</h2>
</section>

// ❌ Bad
<section className="max-w-7xl mx-auto px-6 py-20">
  <h2 className="text-4xl font-bold">Features</h2>
</section>
```

### Custom Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `h-18` / `spacing-18` | `72px` | Custom height/spacing |
| `h-20` / `spacing-20` | `80px` | Custom height/spacing |

---

## Components

### Buttons

Base button styles use the `.btn` utility with variants.

#### Classes

| Class | Appearance | Usage |
|-------|------------|-------|
| `.btn` | Base styles | Always include |
| `.btn-primary` | Dark filled | Primary actions |
| `.btn-secondary` | Outlined | Secondary actions |
| `.btn-text` | Text only | Tertiary actions |
| `.btn-lg` | Large size | Hero CTAs |
| `.btn-sm` | Small size | Compact spaces |

```tsx
// ✅ Good
<a href="/demo" className="btn btn-primary btn-lg">
  Book a Demo
</a>

// ❌ Bad
<a href="/demo" className="px-8 py-4 bg-slate-900 text-white rounded">
  Book a Demo
</a>
```

#### Button Structure

```tsx
// Primary button
<button className="btn btn-primary">Click me</button>

// Secondary button
<button className="btn btn-secondary">Learn more</button>

// Large primary button
<button className="btn btn-primary btn-lg">Get Started</button>
```

### Cards

Simple card wrapper with consistent styling.

```tsx
// ✅ Good
<div className="card">
  <h3 className="text-primary">Card title</h3>
  <p className="text-secondary">Card content</p>
</div>

// ❌ Bad
<div className="rounded-lg border border-gray-200 bg-white p-6">
  <h3>Card title</h3>
  <p>Card content</p>
</div>
```

### Other Utilities

| Class | Usage |
|-------|-------|
| `.divider` | Border-top divider |
| `.icon-feature` | Icon container (12x12) |
| `.animate-on-scroll` | Scroll-triggered fade-in |
| `.stagger-children` | Staggered child animations |

---

## Known Issues

### Components with Hardcoded Colors (Need Fixing)

| Component | Issue | Priority |
|-----------|-------|----------|
| `BeforeAfterComparison.astro` | 15+ hardcoded gray/blue colors | **HIGH** |
| `HowItWorksSteps.astro` | 20+ hardcoded gray colors | **HIGH** |
| `Footer.astro` | Uses `border-secondary` instead of `border` | **MEDIUM** |
| `NarrativeImage.astro` | Hardcoded shadow/text color | **LOW** |

### Recently Fixed (2026-01-12)

These components were updated to use semantic tokens:
- `EmbeddableROICalculator.astro` - Now uses success state tokens
- `BlogContent.astro` - Now uses semantic text/surface/border tokens
- `TimelineOfDissatisfaction.astro` - Now uses success/error state tokens
- `CustomerJourneyComparison.astro` - Now uses success/error/info/warning tokens
- `DarkCTASection.astro` - Now uses `surface-dark` and `accent-hover` for gradients

### Intentional Exceptions

These components intentionally use hardcoded colors and should **NOT** be changed:

- `SMSMockup.astro` - iPhone UI replica requires iOS-specific colors
- `AnalyticsPlatformSection.astro` - Gradient backgrounds for visual effects

---

## Migration Guide

### Converting Hardcoded Colors

| Old (Hardcoded) | New (Semantic) |
|-----------------|----------------|
| `text-slate-900` / `text-black` | `text-primary` |
| `text-gray-600` / `text-slate-600` | `text-secondary` |
| `text-gray-400` / `text-slate-400` | `text-tertiary` |
| `text-gray-500` / `text-slate-500` | `text-caption` |
| `bg-white` | `bg-surface-base` |
| `bg-gray-50` | `bg-surface-subtle` |
| `bg-gray-100` | `bg-surface-elevated` |
| `border-gray-200` | `border-border` |
| `hover:bg-gray-100` | `hover:bg-surface-subtle` |
| `text-green-800` | `text-accent-success-text` |
| `bg-green-50` | `bg-accent-success-bg` |
| `text-red-800` | `text-accent-error-text` |
| `bg-red-50` | `bg-accent-error-bg` |

### Status Badge Colors

Use semantic tokens for status badges:

```tsx
// Success/positive
<span className="bg-accent-success-bg text-accent-success-text">Active</span>

// Neutral/info
<span className="bg-accent-muted text-accent-primary">Pending</span>

// Warning
<span className="bg-amber-50 text-accent-warning">Warning</span>

// Error
<span className="bg-accent-error-bg text-accent-error-text">Error</span>

// Info (for exchanges, etc.)
<span className="bg-blue-50 text-accent-info">Info</span>
```

---

## Development Guidelines

### When Adding New Components

1. **Always use semantic tokens** - Never hardcode colors
2. **Use utility classes** - Defined in global.css where possible
3. **Follow naming conventions** - Component files in PascalCase
4. **Test responsive** - Mobile-first approach
5. **Check accessibility** - Proper contrast ratios

### Before Committing

```bash
# Check for hardcoded colors (should return minimal results)
rg "text-gray-|bg-gray-|border-gray-|text-slate-|bg-slate-" src/

# Format code
npm run format

# Lint
npm run lint
```

---

## Quick Reference

```tsx
// Text hierarchy
<h1 className="page-title">Page Title</h1>
<h2 className="section-title">Section Title</h2>
<p className="section-description">Section description</p>
<span className="eyebrow">Label</span>

// Common patterns
<section className="section">
  <div className="card">
    <h3 className="text-primary">Card Title</h3>
    <p className="text-secondary">Card content</p>
    <button className="btn btn-primary">Action</button>
  </div>
</section>

// Colors
<div className="bg-surface-base">
  <div className="bg-surface-subtle hover:bg-surface-elevated">
    <h1 className="text-primary">Primary text</h1>
    <p className="text-secondary">Secondary text</p>
    <a className="text-accent-primary">Link</a>
  </div>
</div>
```

---

**For questions or clarifications, see:** `CLAUDE.md` and `README.md`
