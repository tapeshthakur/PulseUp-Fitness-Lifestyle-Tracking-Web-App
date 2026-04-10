export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        glow: "0 20px 60px rgba(67, 97, 238, 0.18)",
        glass: "0 12px 40px rgba(15, 23, 42, 0.18)",
      },
      backgroundImage: {
        hero: "radial-gradient(circle at top left, rgba(96,165,250,.35), transparent 30%), radial-gradient(circle at top right, rgba(168,85,247,.28), transparent 34%), linear-gradient(135deg, rgba(15,23,42,1), rgba(30,41,59,.94))",
      },
    },
  },
  plugins: [],
};
