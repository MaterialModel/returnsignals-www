import baseConfig from '@returnsignals/tailwind-config'

/** @type {import('tailwindcss').Config} */
export default {
  // Use base config theme and plugins
  ...baseConfig,
  // Override content paths for this app
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}',
    './public/**/*.html'
  ]
}
