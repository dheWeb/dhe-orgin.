import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        modalFadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        modalScaleIn: {
          from: { opacity: '0', transform: 'scale(0.96) translateY(8px)' },
          to: { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
      },
      animation: {
        'modal-fade-in': 'modalFadeIn 0.2s ease-out forwards',
        'modal-scale-in': 'modalScaleIn 0.25s ease-out forwards',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
          'black-rgba': 'rgba(0, 0, 0, 0.557)',
      },
      colors: {
        primary: '#A52A2A',
        'primary-color': '#002D62',
        'primary-light': '#5072A7',
        dhe: {
          navy: '#07111f',
          'navy-mid': '#0f172a',
          orange: '#f97316',
          'orange-dark': '#ea580c',
        },
      },
      boxShadow: {
        'dhe-sm': '0 4px 14px rgba(7, 17, 31, 0.06)',
        'dhe-md': '0 12px 32px rgba(7, 17, 31, 0.1)',
        'dhe-lg': '0 20px 50px rgba(7, 17, 31, 0.14)',
      },
    },
  },
  plugins: [],
}
export default config
