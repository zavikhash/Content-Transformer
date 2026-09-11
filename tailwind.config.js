/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          main: '#FFFFFF',
          section: '#F4F9F4',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          card: '#FFFFFF',
          elevated: '#EDF7ED',
          border: '#C8E6C9',
        },
        green: {
          50: '#F1F8E9',
          100: '#DCEDC8',
          200: '#C8E6C9',
          300: '#AED581',
          400: '#81C784', // Accent green
          500: '#4CAF50', // Primary mid green
          600: '#43A047',
          700: '#388E3C',
          800: '#2E7D32', // Primary dark green
          900: '#1B5E20', // Text/headers dark green
        },
        brand: {
          DEFAULT: '#2E7D32',
          primary: '#2E7D32',
          hover: '#1B5E20',
          light: '#81C784',
          dark: '#1B5E20',
          accent: '#81C784',
        },
        verified: {
          DEFAULT: '#2E7D32',
          green: '#2E7D32',
          emerald: '#388E3C',
          forest: '#1B5E20',
        },
        txt: {
          primary: '#1B5E20',
          secondary: '#2E5B33',
          muted: '#5A755D',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in-up': 'fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in-scale': 'fadeInScale 0.35s cubic-bezier(0.16, 1, 0.3, 1) both',
        'slide-up': 'slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) both',
        'slide-down': 'slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) both',
        'slide-in-left': 'slideInLeft 0.35s cubic-bezier(0.16, 1, 0.3, 1) both',
        'slide-in-right': 'slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1) both',
        'pulse-glow': 'pulseGlow 2.8s ease-in-out infinite',
        'float': 'floatUpDown 3.2s ease-in-out infinite',
        'dot-pulse': 'dotPulse 1.8s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInScale: {
          '0%': { opacity: '0', transform: 'scale(0.97) translateY(6px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        floatUpDown: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(200, 75, 38, 0)' },
          '50%': { boxShadow: '0 0 18px 3px rgba(200, 75, 38, 0.28)' },
        },
        dotPulse: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(0.9)' },
          '50%': { opacity: '1', transform: 'scale(1.15)' },
        },
      },
    },
  },
  plugins: [],
}
