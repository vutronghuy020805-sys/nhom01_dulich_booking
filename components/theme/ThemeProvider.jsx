"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";

const STORAGE_KEY = "viego-theme";

const ThemeContext = createContext({
  theme: "system",
  resolvedTheme: "light",
  setTheme: () => {},
  toggleTheme: () => {},
});

function applyTheme(resolved) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (resolved === "dark") {
    root.classList.add("dark");
    root.style.colorScheme = "dark";
  } else {
    root.classList.remove("dark");
    root.style.colorScheme = "light";
  }
}

function getSystemTheme() {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function readStoredTheme() {
  if (typeof window === "undefined") return "system";
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark" || saved === "system") return saved;
  } catch {
    // ignore
  }
  return "system";
}

function resolve(theme) {
  return theme === "system" ? getSystemTheme() : theme;
}

// External store đồng bộ với localStorage + system preference.
// `theme` = giá trị user chọn ("system" | "light" | "dark").
// `resolvedTheme` = theme thực tế đang áp ("light" | "dark").
// Ưu tiên: localStorage > prefers-color-scheme. Inline script trong <head>
// đã lo apply class .dark trước khi hydrate để tránh flash.
const SERVER_SNAPSHOT = Object.freeze({ theme: "system", resolvedTheme: "light" });

const themeStore = (() => {
  const listeners = new Set();
  let snapshot = SERVER_SNAPSHOT;

  function emit() {
    listeners.forEach((l) => l());
  }

  function recompute() {
    const theme = readStoredTheme();
    const resolvedTheme = resolve(theme);
    snapshot = { theme, resolvedTheme };
  }

  function subscribe(listener) {
    listeners.add(listener);
    if (typeof window !== "undefined") {
      const onStorage = (e) => {
        if (e.key === STORAGE_KEY) {
          recompute();
          applyTheme(snapshot.resolvedTheme);
          emit();
        }
      };
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      const onMediaChange = () => {
        if (snapshot.theme === "system") {
          recompute();
          applyTheme(snapshot.resolvedTheme);
          emit();
        }
      };
      window.addEventListener("storage", onStorage);
      media.addEventListener("change", onMediaChange);
      recompute();
      return () => {
        listeners.delete(listener);
        window.removeEventListener("storage", onStorage);
        media.removeEventListener("change", onMediaChange);
      };
    }
    return () => listeners.delete(listener);
  }

  function getSnapshot() {
    return snapshot;
  }

  function getServerSnapshot() {
    return SERVER_SNAPSHOT;
  }

  function setTheme(next) {
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
    recompute();
    applyTheme(snapshot.resolvedTheme);
    emit();
  }

  return { subscribe, getSnapshot, getServerSnapshot, setTheme };
})();

export default function ThemeProvider({ children }) {
  const snapshot = useSyncExternalStore(
    themeStore.subscribe,
    themeStore.getSnapshot,
    themeStore.getServerSnapshot
  );

  const setTheme = useCallback((next) => themeStore.setTheme(next), []);
  const toggleTheme = useCallback(() => {
    themeStore.setTheme(snapshot.resolvedTheme === "dark" ? "light" : "dark");
  }, [snapshot.resolvedTheme]);

  const value = useMemo(
    () => ({
      theme: snapshot.theme,
      resolvedTheme: snapshot.resolvedTheme,
      setTheme,
      toggleTheme,
    }),
    [snapshot.theme, snapshot.resolvedTheme, setTheme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
