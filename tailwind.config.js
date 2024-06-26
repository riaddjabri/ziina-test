/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors:{
        'ziinaViolet': "rgb(206, 84, 255)",
        'ziinaGrey':"#ffffff80",
        'ziinaGreen': "#5df29d"
      }
    },
  },
  plugins: [],
}

