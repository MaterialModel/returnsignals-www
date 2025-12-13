/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}',
    './public/**/*.html'
  ],
  theme: {
    extend: {
      height: {
        '18': '4.5rem', // 72px
        '20': '5rem'    // 80px
      },
      spacing: {
        '18': '4.5rem', // 72px
        '20': '5rem'    // 80px
      },
      colors: {
        // Brand colors
        brand: {
          primary: '#0E60FF',
          dark: '#0B3EA0',
          accent: '#7C3AED'
        },
        // Semantic text colors - use text-primary, text-secondary, etc.
        primary: 'rgb(15, 23, 42)',         // slate-900 - headings, primary text
        secondary: 'rgb(71, 85, 105)',      // slate-600 - body text, descriptions
        tertiary: 'rgb(148, 163, 184)',     // slate-400 - muted text, metadata
        inverse: '#ffffff',                  // white - text on dark backgrounds

        // Surface colors - use bg-surface-base, bg-surface-subtle, etc.
        surface: {
          base: '#ffffff',                  // white - main background
          subtle: 'rgb(248, 250, 252)',    // slate-50 - subtle backgrounds
          elevated: 'rgb(241, 245, 249)',  // slate-100 - cards, elevated surfaces
          dark: 'rgb(15, 23, 42)'          // slate-900 - dark backgrounds
        },
        // Border colors - use border-DEFAULT, border-subtle, border-hover
        border: {
          DEFAULT: 'rgb(226, 232, 240)',           // slate-200 - default borders
          subtle: 'rgba(226, 232, 240, 0.5)',      // slate-200/50 - subtle borders
          hover: 'rgb(203, 213, 225)'              // slate-300 - hover states
        },
        // Accent colors - use text-accent-primary, bg-accent-primary, etc.
        accent: {
          primary: '#0E60FF',                       // brand primary - links, primary actions
          hover: '#0B3EA0',                         // brand dark - hover states
          secondary: '#7C3AED',                     // brand accent - secondary highlights
          success: 'rgb(34, 197, 94)',             // green-500 - success states, features
          'success-subtle': 'rgba(34, 197, 94, 0.1)', // green-500/10 - success backgrounds
          muted: 'rgba(14, 96, 255, 0.1)'          // primary/10 - muted accent backgrounds
        }
      },
      boxShadow: {
        soft: '0 2px 20px rgba(2, 6, 23, 0.08)',
        glow: '0 10px 40px rgba(14, 96, 255, 0.25)'
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(60% 60% at 50% 0%, rgba(14,96,255,0.18) 0%, rgba(124,58,237,0.12) 40%, rgba(255,255,255,0) 70%)'
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
}
