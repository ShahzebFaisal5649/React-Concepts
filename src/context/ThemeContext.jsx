import React, { createContext, useState, useMemo, useCallback } from "react";
import { getCookie, setCookie } from "../utils/cookies";

// 1. Create the Theme Context box.
// This is the object that components will import to read the global theme.
export const ThemeContext = createContext();

// 2. Create the Provider component.
// This component wraps our entire App and distributes the theme state.
export function ThemeProvider({ children }) {
  // Read initial theme preference from cookies on load.
  // If no cookie is set, default to "light".
  const [theme, setTheme] = useState(() => {
    const savedTheme = getCookie("app_theme");
    return savedTheme ? savedTheme : "light";
  });

  // useCallback: stable reference for toggleTheme — not recreated on every render
  const toggleTheme = useCallback(() => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    setCookie("app_theme", nextTheme, 7);
  }, [theme]);

  // useMemo: the context value object is only recreated when theme or toggleTheme changes.
  // Without this, every render of ThemeProvider produces a NEW object reference,
  // which makes all useContext(ThemeContext) consumers think something changed and re-render.
  const contextValue = useMemo(() => ({
    theme: theme,
    toggleTheme: toggleTheme
  }), [theme, toggleTheme]);

  return (
    // We wrap children in the Provider and pass the shared values down
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}
