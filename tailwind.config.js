/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Speedee", "system-ui", "sans-serif"], // Define tu fuente principal
        serif: ["Merriweather", "serif"], // Fuente alternativa
      },
    },
  },
  plugins: [],
};
