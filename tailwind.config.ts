import type { Config } from "tailwindcss";

export default {
    content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                orange: "hsl(45, 85%, 55%)",
                violet: "hsl(250 50% 25%)",
                accent:"hsl(280 60% 60%)"
            },
        },
    },
    plugins: [],
} satisfies Config;
