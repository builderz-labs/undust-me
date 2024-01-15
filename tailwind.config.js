module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {

      },
      colors: {
            "builderz-green": "#14f195",
        "builderz-blue": "#00ffd5",
        "undust-green": "#00FFD1",
        "undust-hover": "#186557",
      },
      animation: {

      },
      backgroundImage: {
        'borderBg': 'radial-gradient(circle at 50% 50%, #EDEBEB 0%, rgba(237, 235, 235, 0) 57.5%)',
      },
      screens: {
 
      },
 
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/forms")],
};
