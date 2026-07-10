/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
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
      colors: {
        /* ── SAKINA tokens ─────────────────────────────── */
        ivory: {
          DEFAULT: "#F6F4EF",
          50: "#FBFAF7",
        },
        sand: {
          DEFAULT: "#EFEBE3",
          200: "#E6E0D4",
        },
        hairline: "#EAE5DC",
        gold: {
          200: "#E9DDBF",
          DEFAULT: "#C2A566",
          600: "#A8894E",
        },
        bronze: "#8A7147",
        forest: {
          50: "#EDF3F1",
          DEFAULT: "#0E5648",
          600: "#0B4A3E",
        },
        ink: {
          DEFAULT: "#1D1A16",
          800: "#2A2620",
        },
        "muted-warm": "#797065",
        faint: "#A69C8D",
        warning: "#B97324",
        danger: "#B3402F",

        /* ── shadcn mappings (héritent de la palette via CSS vars) ── */
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
      fontFamily: {
        sans: [
          "-apple-system", "BlinkMacSystemFont", "SF Pro Display", "SF Pro Text",
          "Inter", "Segoe UI", "Roboto", "sans-serif",
        ],
        quran: ["Amiri", "serif"],
      },
      fontSize: {
        display: ["2rem", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "700" }],
        title: ["1.5rem", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "700" }],
        title2: ["1.25rem", { lineHeight: "1.3", fontWeight: "600" }],
        headline: ["1.0625rem", { lineHeight: "1.3", fontWeight: "600" }],
        body: ["0.9375rem", { lineHeight: "1.5" }],
        callout: ["0.875rem", { lineHeight: "1.4", fontWeight: "500" }],
        footnote: ["0.8125rem", { lineHeight: "1.4" }],
        caption: ["0.6875rem", { lineHeight: "1.3", letterSpacing: "0.08em", fontWeight: "600" }],
      },
      borderRadius: {
        card: "1.5rem",
        tile: "1.25rem",
        control: "0.875rem",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(29,26,22,0.04), 0 12px 32px -16px rgba(29,26,22,0.14)",
        float: "0 2px 6px rgba(29,26,22,0.05), 0 24px 48px -16px rgba(29,26,22,0.20)",
        "glow-gold": "0 8px 28px -10px rgba(194,165,102,0.55)",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
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
        "fade-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        breathe: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.55" },
          "50%": { transform: "scale(1.18)", opacity: "0.2" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up": "fade-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) both",
        breathe: "breathe 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
