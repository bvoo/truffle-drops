import { defineConfig } from 'windicss/helpers';
import aspect from 'windicss/plugin/aspect-ratio';

export default defineConfig({
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--bg-primary)',
        'semi-primary': 'var(--bg-semi-primary)',
        secondary: 'var(--bg-secondary)',
        tertiary: 'var(--bg-tertiary)',
      },
      textColor: {
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
      },
      fontFamily: {
        sans: ['Roboto'],
        condensed: ['Roboto Condensed'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [aspect],
});
