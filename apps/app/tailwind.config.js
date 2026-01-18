import baseConfig from '@returnsignals/tailwind-config'

/** @type {import('tailwindcss').Config} */
export default {
  // Use base config theme and plugins
  ...baseConfig,
  // Override content paths for this app
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ]
}
