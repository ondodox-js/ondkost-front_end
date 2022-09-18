/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ['./src/**/*.{js,jsx,ts,tsx}', './src/**/**/*.{js,jsx,ts,tsx}'],
   theme: {
      extend: {
         colors: {
            app: {
               100: '#FFFFFF', //white
               200: '#F6F6F4', //white-shadow
               300: '#C292DE', //light-cream
               400: '#67B3E4', //dark-cream
               500: '#95A3E0', //dark
               600: '#00081B', //expert dark
            },
         },
      },
   },
   plugins: [],
};
