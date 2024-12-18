/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    "bg-yellow-100",
    "bg-yellow-200",
    "bg-yellow-400",
    "bg-gray-400",
    "bg-gray-600",
    "bg-gray-700",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
