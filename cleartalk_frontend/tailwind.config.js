/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundColor: {
        "color-theme1": "#ffffff",
        "color-theme2": "#8d99ae",
        "color-theme3": "#ef233c",
        "color-theme4": "#c1c1c1",
        "color-theme1-hover": "#fffff6",
        "color-theme2-hover": "#8d99ac",
        "color-theme3-hover": "#ef233b",
        "color-theme4-hover": "#c1c1c1",
        "color-theme1-sender-msg": "#eeeeee",
        "color-theme1-reciever-msg": "#373a40",
        "color-theme2-sender-msg": "#cbacdc",
        "color-theme2-reciever-msg": "#433d8b",
        "color-theme3-sender-msg": "#f8e559",
        "color-theme3-reciever-msg": "#d61c4e",
        "color-theme4-sender-msg": "#ecb365",
        "color-theme4-reciever-msg": "#064663",
      },
      borderColor: {
        "color-theme1": "#212121",
        "color-theme2": "#212121",
        "color-theme3": "#212121",
        "color-theme4": "#212121",
      },
      textColor: {
        "color-theme1": "#212121",
        "color-theme2": "#212121",
        "color-theme3": "#ffffff",
        "color-theme4": "#212121",
        "color-theme1-sender-msg": "#373a40",
        "color-theme1-reciever-msg": "#eeeeee",
        "color-theme2-sender-msg": "#373a40",
        "color-theme2-reciever-msg": "#eeeeee",
        "color-theme3-sender-msg": "#373a40",
        "color-theme3-reciever-msg": "#eeeeee",
        "color-theme4-sender-msg": "#373a40",
        "color-theme4-reciever-msg": "#eeeeee",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  safelist: [
    {
      pattern: /text-color-(theme1|theme2|theme3|theme4)/,
    },
    {
      pattern: /bg-color-(theme1|theme2|theme3|theme4)/,
    },
    {
      pattern: /bg-color-(theme1|theme2|theme3|theme4)-hover/,
      variants: ["hover"],
    },
    {
      pattern: /border-color-(theme1|theme2|theme3|theme4)/,
    },
  ],
  plugins: [require("tailwindcss-animate")],
};
