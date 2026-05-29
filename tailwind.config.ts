import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg-color)',
        'bg-footer': 'var(--bg-footer)',
        'bg-panel': 'var(--bg-panel)',
        'bg-card': 'var(--bg-card)',
        gold: 'var(--gold)',
        gray: 'var(--gray)',
        white: 'var(--white)',
      },
      fontFamily: {
        title: ['var(--font-title)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        special: ['var(--font-special)', 'cursive'],
      },
    },
  },
  plugins: [],
};

export default config;
