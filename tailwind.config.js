import { nextui } from '@nextui-org/theme';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
      colors: {
        bioforge: {
          protein: {
            light: '#FF9B9B',
            DEFAULT: '#FF6B6B',
            dark: '#FF3B3B',
          },
          carbohydrates: {
            light: '#7EDFD9',
            DEFAULT: '#4ECDC4',
            dark: '#2EBDB4',
          },
          fats: {
            light: '#FFC04D',
            DEFAULT: '#FFA500',
            dark: '#E69500',
          },

          flesh: {
            light: '#FFA07A',
            DEFAULT: '#E9967A',
            dark: '#CD5C5C',
          },
          // Metallic, industrial tones
          metal: {
            light: '#B0C4DE',
            DEFAULT: '#778899',
            dark: '#4682B4',
          },
          // Biological fluid colors
          fluid: {
            acid: '#32CD32',
            blood: '#8B0000',
            plasma: '#FFD700',
          },
          // Rust and corrosion tones
          rust: {
            light: '#D2691E',
            DEFAULT: '#8B4513',
            dark: '#A52A2A',
          },
          // Bioluminescent accents
          bioluminescent: {
            blue: '#00CED1',
            green: '#7FFF00',
            purple: '#9370DB',
          },
          // Environmental tones
          environment: {
            sky: '#2F4F4F',
            ground: '#556B2F',
            shadow: '#1A1A1A',
          },
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      addCommonColors: true,
    }),
  ],
};
