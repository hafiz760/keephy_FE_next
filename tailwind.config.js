/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".container": {
          padding: "0 12px",
          margin: "0 auto",
          maxWidth: "100%",
          "@screen sm": {
            maxWidth: "640px",
          },
          "@screen md": {
            maxWidth: "800px",
          },
          "@screen lg": {
            maxWidth: "1024px",
          },
          "@screen xl": {
            maxWidth: "1200px",
          },
          "@screen 2xl": {
            maxWidth: "1400px",
          },
        },
      });
    },
  ],
};
