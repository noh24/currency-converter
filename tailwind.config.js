/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  safelist: [
    'font-normal',
    'text-5xl',
    'p-5',
    'py-3',
    'px-6',
    'text-blue-500'
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif']
      },
    },
  },
  plugins: [],
}
