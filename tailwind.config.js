module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blog': {
          'primary': '#233D4D',
          'secondary1': '#FCCA46',
          'secondary2': '#F0F0F0',
          'accent': '#FE7F2D',
        },
        'utils': {
          'danger': '#E34D4D',
          'success': '#009F64',
        }
      }
    },
  },
  plugins: [],
}
