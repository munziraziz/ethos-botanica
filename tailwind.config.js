/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0faf0',
          100: '#d4ecd4',
          200: '#6b8f6b',
          300: '#4a7a4a',
          400: '#357a35',
          500: '#2d6a2d',
          600: '#1f5c1f',
          700: '#1a4a1a',
          800: '#153a15',
          900: '#0f2a0f',
          950: '#0a1f0a',
        },
        neon: {
          green: '#16a34a',
          lime: '#22c55e',
          cyan: '#059669',
        },
        dark: {
          900: '#f6faf3',
          800: '#eef5ea',
          700: '#e2eddc',
          600: '#d4e3cc',
          500: '#c0d6b4',
        },
        surface: {
          50: '#ffffff',
          100: '#fafdf7',
          200: '#f3f9ef',
          300: '#e8f2e2',
        }
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'spin-slow': 'spin 8s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(22,163,74,0.3), 0 0 10px rgba(22,163,74,0.2)' },
          '100%': { boxShadow: '0 0 10px rgba(22,163,74,0.4), 0 0 20px rgba(22,163,74,0.2), 0 0 30px rgba(22,163,74,0.1)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        'neon': '0 0 8px rgba(22,163,74,0.25), 0 0 16px rgba(22,163,74,0.1)',
        'neon-lg': '0 0 12px rgba(22,163,74,0.3), 0 0 24px rgba(22,163,74,0.15), 0 0 48px rgba(22,163,74,0.08)',
        'glass': '0 8px 32px rgba(22,163,74,0.08)',
        'card': '0 2px 16px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)',
        'card-hover': '0 8px 30px rgba(22,163,74,0.12), 0 2px 8px rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
}
