/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out 1s infinite',
        'float-slower': 'float 10s ease-in-out 2s infinite',
        'spin-slow': 'spin 25s linear infinite',
        'drift': 'drift 12s ease-in-out infinite',
        'drift-slow': 'drift 16s ease-in-out 2s infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'pulse-glow-slow': 'pulseGlow 6s ease-in-out 1s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0px, 0px) rotate(0deg)' },
          '33%': { transform: 'translate(15px, -10px) rotate(5deg)' },
          '66%': { transform: 'translate(-10px, 8px) rotate(-3deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.15)' },
        },
      },
    },
  },
  plugins: [],
}