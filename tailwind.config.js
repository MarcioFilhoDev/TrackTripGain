/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#EAF1FF",
        text: "#121212",
        placeholder: "#999",
        primary: "#064E3B",
      },
    },
  },
  plugins: [],
};
