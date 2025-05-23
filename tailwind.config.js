/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem"
      },
      colors: {
        border: "#e2e8f0",
        input: "#e2e8f0",
        ring: "#94a3b8",
        background: "#ffffff",
        foreground: "#0f172a",
        primary: {
          DEFAULT: "#0f172a",
          foreground: "#ffffff"
        },
        secondary: {
          DEFAULT: "#f1f5f9",
          foreground: "#0f172a"
        },
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#ffffff"
        },
        muted: {
          DEFAULT: "#f1f5f9",
          foreground: "#64748b"
        },
        accent: {
          DEFAULT: "#f1f5f9",
          foreground: "#0f172a"
        },
        popover: {
          DEFAULT: "#ffffff",
          foreground: "#0f172a"
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#0f172a"
        }
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
}

