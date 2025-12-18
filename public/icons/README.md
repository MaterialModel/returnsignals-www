# Icons Directory

This directory is for SVG icons used throughout the Return Signals landing page.

## Status

**Note**: All components have fallback designs and work without custom icons. Custom icons are optional enhancements.

## Recommended Icons (Optional Enhancement)

### Before/After Comparison (Section 3)
- `customer-icon.svg` - User silhouette
- `help-center-icon.svg` - Question mark or document
- `ticket-icon.svg` - Ticket shape
- `waiting-icon.svg` - Clock or hourglass
- `return-box-icon.svg` - Package with arrow
- `return-signals-icon.svg` - Brand logo or AI assistant
- `fix-icon.svg` - Wrench or checkmark
- `exchange-icon.svg` - Circular arrows
- `disposition-icon.svg` - Routing diagram

### How It Works (Section 7)
- `check-in-icon.svg` - Calendar or message bubble
- `follow-up-icon.svg` - Clock with message
- `resolve-icon.svg` - Magnifying glass + photo
- `outcome-icon.svg` - Decision tree or checkmark list

### Benefits (Section 8)
- `heart-icon.svg` - Customer care
- `speed-icon.svg` - Fast resolution
- `no-queue-icon.svg` - No waiting
- `trust-icon.svg` - Shield or handshake
- `analytics-icon.svg` - Chart or graph
- `logistics-icon.svg` - Truck or warehouse

## Icon Style Guidelines

- **Format**: SVG
- **Size**: 24x24px viewport
- **Stroke**: 2px, rounded caps
- **Color**: Use `currentColor` for stroke/fill (enables semantic tokens)
- **Style**: Line icons, consistent with Heroicons aesthetic

## Recommended Sources

1. **Heroicons** (https://heroicons.com) - MIT licensed, matches design system
2. **Lucide Icons** (https://lucide.dev) - Fork of Feather Icons
3. **Custom**: Create in Figma or Illustrator for brand consistency

## Usage

```astro
<!-- Example: HowItWorksSteps with icons -->
const steps = [
  {
    title: 'Check in after delivery',
    description: '...',
    icon: '/icons/check-in-icon.svg'
  }
]
```

## Current State

- ✅ Site works without icons (fallbacks in place)
- 📋 Icons are optional visual enhancements
- 🎨 Download/create when ready to polish
