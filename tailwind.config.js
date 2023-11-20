/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          dark: {
            50: "#eceff1",
            100: "#333333",
          },
          red: {
            50: "#f9e0df",
            100: "#d93025",
            150: "#dd4b39",
            200: "#dc4d28",
          },
          gray: {
            50: "#ecedf2",
            100: "#696969",
            150: "#f0f5f7",
            200: "#f3f7fb",
            250: "hsla(0,0%,100%,.15)",
            300: "#F4F7FC",
            350: "#ced4da",
            400: "#f5f7fc",
            450: "hsla(0,0%,100%,.2)",
            500: "#5c6770",
            550: "#d2d3d8",
            600: "#77838f",
            650: "#ced4e1",
          },
          black: {
            50: "#202124",
            100: "#262c3f",
          },
          blue: {
            50: "rgba(25,103,210,.15)",
            100: "#1967d2 ",
            150: "#e2eaf8",
            200: "#22218c",
            250: "#E3EBFA",
            300: "#3b5998",
            350: "#55acee",
            400: "#0146a6",
            450: "#0718C4",
          },
          green: {
            50: "rgba(52,168,83,.15)",
            100: "#34a853",
          },
          yellow: {
            50: "rgba(249,171,0,.15)",
            100: "#f9ab00",
            // F4F7FC
            // E3EBFA
          },
        },
      },
      backgroundImage: (theme) => ({
        "gradient-primary": `linear-gradient(to right, ${theme(
          "extend.colors.brand.gray.300"
        )}, ${theme("extend.colors.brand.blue.250")})`,
        "banner-bg": "url('../../public/assets/bannertr.svg')",
        "announcement-bg": "url('../../public/assets/announcement.png')",
      }),
      boxShadow: {
        container: "rgb(64 79 104 / 5%) 0 7px 18px",
        mobile: "rgb(0 0 0 / 12%) 3px 0px 20px 0px",
      },
      screens: {
        sm: "640px",
        // => @media (min-width: 640px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "1140px",
        // => @media (min-width: 1024px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }

        "2xl": "1436px",
        // => @media (min-width: 1536px) { ... }
      },
      fontFamily: {
        sans: ["Jost", "sans-serif"],
      },
    },
  },
  plugins: [],
};
