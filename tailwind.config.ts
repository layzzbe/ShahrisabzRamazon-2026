import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                emerald: {
                    900: "#064E3B", // Deep Emerald Green
                },
                gold: {
                    500: "#F59E0B", // Gold
                },
            },
            fontFamily: {
                sans: ["var(--font-inter)"],
                serif: ["var(--font-playfair)"],
            },
        },
    },
    plugins: [],
};
export default config;
