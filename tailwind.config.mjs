/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}',
    './public/**/*.html'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Karla', 'ui-sans-serif', 'system-ui', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Color Emoji"']
      },
      height: {
        '18': '4.5rem', // 72px
        '20': '5rem'    // 80px
      },
      spacing: {
        '18': '4.5rem', // 72px
        '20': '5rem'    // 80px
      },
      colors: {
        // Brand colors (grayscale)
        brand: {
          primary: 'rgb(15, 23, 42)',     // slate-900
          dark: 'rgb(2, 6, 23)',          // slate-950
          accent: 'rgb(71, 85, 105)'      // slate-600
        },
        // Semantic text colors - use text-primary, text-secondary, etc.
        primary: '#000000',                   // pure black - headings, primary text
        secondary: 'rgb(71, 85, 105)',        // slate-600 - body text, descriptions
        tertiary: 'rgb(148, 163, 184)',       // slate-400 - muted text, metadata
        caption: 'rgb(100, 116, 139)',        // slate-500 - captions, meta text
        inverse: '#ffffff',                   // white - text on dark backgrounds

        // Surface colors - use bg-surface-base, bg-surface-subtle, etc.
        surface: {
          base: '#ffffff',                  // white - main background
          subtle: '#fafafa',                // very light gray - hover states
          elevated: '#f5f5f5',              // light gray - progress bars, badges
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
          primary: 'rgb(15, 23, 42)',              // slate-900 - links, primary actions
          hover: 'rgb(30, 41, 59)',                // slate-800 - hover states
          secondary: 'rgb(71, 85, 105)',           // slate-600 - secondary highlights
          muted: 'rgba(15, 23, 42, 0.1)',          // slate-900/10 - muted accent backgrounds
          // Success state colors (for infographics)
          success: 'rgb(34, 197, 94)',             // green-500 - success states, features
          'success-subtle': 'rgba(34, 197, 94, 0.1)', // green-500/10 - success backgrounds
          'success-text': 'rgb(22, 101, 52)',      // green-800 - success text
          'success-border': 'rgb(134, 239, 172)',  // green-300 - success borders
          'success-bg': 'rgb(240, 253, 244)',      // green-50 - success backgrounds
          'success-bg-dark': 'rgb(220, 252, 231)', // green-100 - gradient end
          // Error state colors (for infographics)
          error: 'rgb(185, 28, 28)',               // red-700 - error accent
          'error-text': 'rgb(153, 27, 27)',        // red-800 - error text
          'error-border': 'rgb(252, 165, 165)',    // red-300 - error borders
          'error-bg': 'rgb(254, 242, 242)',        // red-50 - error backgrounds
          'error-subtle': 'rgb(254, 226, 226)',     // red-100 - very light error
          // Info/neutral accent colors (for infographics)
          info: 'rgb(37, 99, 235)',                  // blue-600 - info/exchange actions
          warning: 'rgb(161, 98, 7)'                 // amber-700 - warning/caution states
        }
      },
      boxShadow: {
        soft: '0 2px 20px rgba(2, 6, 23, 0.08)',
        glow: '0 10px 40px rgba(15, 23, 42, 0.2)'
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(60% 60% at 50% 0%, rgba(15,23,42,0.08) 0%, rgba(71,85,105,0.05) 40%, rgba(255,255,255,0) 70%)'
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
}
