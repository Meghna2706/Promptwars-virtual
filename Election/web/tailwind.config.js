/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        secondary: "#1e40af",
        accent: "#0ea5e9",
        success: "#10b981",
        warning: "#f59e0b",
        error: "#ef4444",
        neutral: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
      },
      spacing: {
        xs: "0.5rem",
        sm: "1rem",
        md: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
        "2xl": "3rem",
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
      },
      borderRadius: {
        sm: "0.25rem",
        md: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.5rem",
      },
      transitionDuration: {
        fast: "200ms",
        normal: "300ms",
        slow: "500ms",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #4f46e5 0%, #a855f7 100%)", /* indigo to purple */
        "gradient-secondary": "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)", /* purple to pink */
        "gradient-accent": "linear-gradient(135deg, #4f46e5 0%, #ec4899 100%)", /* indigo to pink */
        "gradient-success": "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      },
    },
  },
  plugins: [],
}
