import type { Config } from 'tailwindcss'
const defaultTheme = require('tailwindcss/defaultTheme')
export default {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    screens: {
      xs: '375px',
      ...defaultTheme.screens
    },
    // sm	640ピクセル	@media (min-width: 640px) { ... }
    // md	768ピクセル	@media (min-width: 768px) { ... }
    // lg	1024ピクセル	@media (min-width: 1024px) { ... }
    // xl	1280ピクセル	@media (min-width: 1280px) { ... }
    // 2xl	1536ピクセル	@media (min-width: 1536px) { ... }
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)'
      }
    }
  },
  plugins: []
} satisfies Config
