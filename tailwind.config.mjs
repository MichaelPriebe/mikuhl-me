/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        surface: "var(--color-surface)",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        foreground: "var(--color-foreground)",
      },
      borderColor: ({ theme }) => ({
        DEFAULT: theme("colors.secondary"),
      }),
    },
  },
  plugins: [],
};
