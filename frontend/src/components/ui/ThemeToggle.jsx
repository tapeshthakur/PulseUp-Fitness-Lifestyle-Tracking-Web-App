import { MoonStar, SunMedium } from "lucide-react";

import { useApp } from "../../context/AppContext";

function ThemeToggle() {
  const { theme, setTheme, syncPreferences } = useApp();

  const handleToggle = async () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try {
      await syncPreferences({ themePreference: next });
    } catch {
      // UX note: instant visual feedback keeps the control feeling responsive even if persistence lags.
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="glass-panel inline-flex items-center gap-1 rounded-2xl p-1 transition hover:-translate-y-0.5"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      aria-pressed={theme === "dark"}
    >
      <span
        className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition ${
          theme === "light"
            ? "bg-white text-slate-900 shadow-sm dark:bg-white"
            : "text-slate-500 dark:text-slate-300"
        }`}
      >
        <SunMedium className="h-4 w-4" />
        <span className="hidden sm:inline">Light</span>
      </span>
      <span
        className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition ${
          theme === "dark"
            ? "bg-slate-950 text-white shadow-sm dark:bg-slate-900"
            : "text-slate-500 dark:text-slate-300"
        }`}
      >
        <MoonStar className="h-4 w-4" />
        <span className="hidden sm:inline">Dark</span>
      </span>
    </button>
  );
}

export default ThemeToggle;
