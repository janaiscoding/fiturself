/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      open: ["OpenMedium", "sans-serif"],
      "ubuntu-500": ["UbuntuMedium", "sans-serif"],
      ubuntu: ["UbuntuThin", "sans-serif"],
    },
    colors: {
      white: "#F4FFF3",
      white2: "#ADADAD",
      yellow: "#F0CC80",
      yellow2: "#89764B",
      grey: "#262626",
      blue: "#1E1F24",
      black: "#111111",
      transparent: "#060606ed",
      error: "#df4444",
      valid: "#2eb97c",
    },
    boxShadow: {
      sm: "0 0 5px 3px rgba(189, 178, 163, 0.13)",
    },
  },
};
