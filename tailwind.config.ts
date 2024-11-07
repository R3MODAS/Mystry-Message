import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
    ],
    theme: {
        extend: {
            colors: {
                "color-1": "#050b1f",
                "color-2": "#0d9488",
                "color-3": "#38bdf8",
                "color-4": "#e2e8f0",
                "color-5": "#0b7a6e",
                "color-6": "#0ea5e9",
                "color-7": "#0a1836"
            }
        }
    },
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    plugins: [require("tailwindcss-animate")]
};
export default config;
