import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      'colors': {
        'blue' : '#1d4ed8',
        'purple' : '#614385',
        'midnight' : '#3a476a',
        'yellow' : '#dab048'
    },

    },

  },
  daisyui: {
    themes: [
      {
        mytheme: {
        
"primary": "#ea0bdf",
        
"secondary": "#a3e635",
        
"accent": "#f4826b",
        
"neutral": "#15171e",
        
"base-100": "#f1f0f4",
        
"info": "#9ed1e0",
        
"success": "#1bc068",
        
"warning": "#d3aa17",
        
"error": "#e85e61",
        },
      },
    ],
  },
  plugins: [require("daisyui")],

    


} satisfies Config;
