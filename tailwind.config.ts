import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FBF7F1',
        ink: '#211B1A',
        wine: '#6B1F2E',
        gold: '#B08D4F',
        // Gold-toned TEXT on a light ground. #B08D4F only reaches 2.9:1 on ivory,
        // which fails WCAG AA. This is the same hue darkened to 5.5:1. The bright
        // gold above stays the flourish colour — hairlines, stars, rules, and
        // text sitting on the dark hero.
        goldink: '#796137',
        blush: '#EFE0DC',
        // Darkened from the original #8A7C77, which reached only 3.76:1 on ivory.
        muted: '#6E635F',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '4px',
        none: '0',
        sm: '4px',
        md: '4px',
        lg: '4px',
        xl: '4px',
        full: '999px',
      },
      maxWidth: {
        content: '1200px',
      },
      spacing: {
        section: '112px',
        'section-sm': '64px',
      },
      lineHeight: {
        body: '1.75',
      },
      letterSpacing: {
        eyebrow: '0.22em',
        wordmark: '0.3em',
        display: '0.01em',
      },
      boxShadow: {
        lift: '0 1px 2px rgba(33, 27, 26, 0.05)',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 500ms ease-out both',
      },
    },
  },
  plugins: [],
};

export default config;
