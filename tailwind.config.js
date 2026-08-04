module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  mode: 'jit',
  media: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        red: {
          dkpp: "#F44336",
        },
        yellow: {
          dkpp: "#FFA600",
        },
        green: {
          dkpp: "#16A75C",
        },
        "neutral-blue-gray": "#083461",
        "select-filter": "#F4F8FB",
      },
      fontFamily: {
        lato: ["Lato"],
        lora: ["Lora"],
      },
      listStyleType: {
        none: 'none',
        disc: 'disc',
        decimal: 'decimal',
        square: 'square',
        circle: 'circle',
        roman: 'upper-roman',
      },
      rotate: {
        '315': '315deg',
      }
    },
  },
  plugins: [],
};
