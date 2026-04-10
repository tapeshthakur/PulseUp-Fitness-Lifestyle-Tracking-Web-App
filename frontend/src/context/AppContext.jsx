import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { api, setAuthToken } from "../lib/api";

const AppContext = createContext(null);

const TOKEN_KEY = "pulseup-token";
const THEME_KEY = "pulseup-theme";

export function AppProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem(THEME_KEY) || "dark");
  const [loadingSession, setLoadingSession] = useState(true);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    setAuthToken(token);
    if (!token) {
      setUser(null);
      setLoadingSession(false);
      return;
    }

    let cancelled = false;
    api
      .get("/me")
      .then((response) => {
        if (!cancelled) {
          setUser(response.data.user);
          setTheme(response.data.user.themePreference || theme);
        }
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        setUser(null);
      })
      .finally(() => {
        if (!cancelled) {
          setLoadingSession(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [token]);

  const showToast = (toast) => {
    const id = crypto.randomUUID();
    setToasts((current) => [...current, { id, type: "success", ...toast }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((item) => item.id !== id));
    }, 3600);
  };

  const authenticate = async (endpoint, payload) => {
    const response = await api.post(endpoint, payload);
    localStorage.setItem(TOKEN_KEY, response.data.token);
    setAuthToken(response.data.token);
    setToken(response.data.token);
    setUser(response.data.user);
    setTheme(response.data.user.themePreference || "dark");
    return response.data.user;
  };

  const login = (payload) => authenticate("/login", payload);
  const signup = (payload) => authenticate("/signup", payload);

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setAuthToken(null);
    setToken(null);
    setUser(null);
  };

  const syncPreferences = async (payload) => {
    const response = await api.patch("/preferences", payload);
    setUser((current) =>
      current
        ? {
            ...current,
            ...response.data.user,
          }
        : current,
    );
    return response.data.user;
  };

  const value = useMemo(
    () => ({
      token,
      user,
      theme,
      toasts,
      loadingSession,
      setTheme,
      setUser,
      showToast,
      login,
      signup,
      logout,
      syncPreferences,
      isAuthenticated: Boolean(token),
    }),
    [token, user, theme, toasts, loadingSession],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}
