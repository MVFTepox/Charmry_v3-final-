/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      fontFamily: {
        'DMsans': ['DmSans', 'sans-serif'],
        'elmessiri': ['elMessiri', 'sans-serif'],
      },
    },
  },
  plugins: [],
}