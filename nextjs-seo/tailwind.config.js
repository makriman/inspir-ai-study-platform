/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Inspir Brand Colors
        'inspir-blue': '#0030ab',      // Deep Blue (bold royal blue)
        'inspir-purple': '#661eaa',    // Main brand color (rich purple)
        'inspir-lime': '#cde353',      // Electric Lime (bright yellow-green)
        'inspir-coral': '#db3e4a',     // Red/Coral (vibrant red-coral)
        'inspir-gray': '#e8e8e8',      // Light Gray (off-white/light neutral)

        // Legacy aliases for gradual migration
        'primary-blue': '#0030ab',
        'accent-purple': '#661eaa',
        'accent-green': '#10B981',
        'accent-pink': '#EC4899',
        'accent-yellow': '#F59E0B',
        'accent-orange': '#F97316',
        'accent-red': '#EF4444',
        'accent-indigo': '#6366F1',
        'accent-cyan': '#06B6D4',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'float': 'float 3s ease-in-out infinite',
        'gradient': 'gradient 15s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-inspir': 'linear-gradient(135deg, #661eaa 0%, #0030ab 50%, #cde353 100%)',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'),
            a: {
              color: theme('colors.primary-blue'),
              '&:hover': {
                color: theme('colors.accent-purple'),
              },
            },
            h1: {
              color: theme('colors.gray.900'),
            },
            h2: {
              color: theme('colors.gray.900'),
            },
            h3: {
              color: theme('colors.gray.900'),
            },
            code: {
              color: theme('colors.accent-purple'),
              backgroundColor: theme('colors.gray.100'),
              padding: '0.25rem 0.4rem',
              borderRadius: '0.25rem',
              fontWeight: '600',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.inspir-lime'),
              '&:hover': {
                color: theme('colors.inspir-purple'),
              },
            },
            h1: {
              color: theme('colors.gray.100'),
            },
            h2: {
              color: theme('colors.gray.100'),
            },
            h3: {
              color: theme('colors.gray.200'),
            },
            h4: {
              color: theme('colors.gray.200'),
            },
            code: {
              color: theme('colors.inspir-lime'),
              backgroundColor: theme('colors.gray.800'),
            },
            strong: {
              color: theme('colors.gray.100'),
            },
            blockquote: {
              color: theme('colors.gray.300'),
              borderLeftColor: theme('colors.inspir-purple'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
