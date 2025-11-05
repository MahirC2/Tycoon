module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Poppins'", "sans-serif"],
        body: ["'Inter'", "sans-serif"]
      },
      colors: {
        brand: {
          200: "#c7d2ff",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca"
        }
      },
      boxShadow: {
        glow: "0 0 25px rgba(99, 102, 241, 0.35)"
      }
    }
  },
  plugins: []
};
