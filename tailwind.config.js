/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // اتأكد إن الاسم هنا هو "cairo" سمول (Lower case)
        cairo: ['Cairo', 'sans-serif'],
      },
    },
  },
  plugins: [],
}