module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ['disabled'],
      borderRadius: ['first', 'last'],
      margin: ['last'],
      textColor: ['disabled'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
