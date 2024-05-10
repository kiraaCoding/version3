/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
    colors:{
           'beige': '#D2B896',
           'backbg': '#FEFDFB',
           'beigehover':'#D2B570',
           'white': '#FFFFFF',
           'whitegray': '#F8F8FA',
           'bleu':'#0000ff',
           'bleu2':'#0000f1',
           'GrayClaire':'#F5F5F5',
           'primary':"#010851",
           'secondry':"#D2B896",
           'tartiary':"#707070",
           'pinck':"#EE9AE5",
           'grey':"#F5F5F5",
           
      
           
         
          linearGradientDirections: {
            '132': '132.25deg',
          },
        
        },
   
    extend: {},
  },
  plugins: [],
}