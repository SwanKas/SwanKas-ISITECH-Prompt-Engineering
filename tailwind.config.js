/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderWidth: {
        1: "1px",
        2: "2px",
        3: "3px",
        5: "5px",
      },
    },
  },
  plugins: [],
};
