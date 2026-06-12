import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        zentro: {
          50:  '#fdf8ec',
          100: '#fbf0d5',
          200: '#F5DD9D', // warm gold — primary accent
          300: '#e3cc83',
          400: '#BCC499', // sage green — light
          500: '#92A68A', // muted green — mid
          600: '#7B8F8A', // teal-gray — dark mid
          700: '#506266', // dark slate — background
          800: '#3a4a4d',
          900: '#2a3739',
          950: '#1a2325',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        shimmer: 'shimmer 2s linear infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        float: 'float 20s ease-in-out infinite',
        'float-slow': 'floatSlow 30s ease-in-out infinite',
        'float-slower': 'floatSlower 35s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.92)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(30px, -50px) scale(1.08)' },
          '50%': { transform: 'translate(-20px, -30px) scale(0.95)' },
          '75%': { transform: 'translate(-40px, 20px) scale(1.05)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(-40px, -30px) scale(1.1)' },
          '66%': { transform: 'translate(30px, 40px) scale(0.92)' },
        },
        floatSlower: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(20px, -60px) scale(1.12)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
