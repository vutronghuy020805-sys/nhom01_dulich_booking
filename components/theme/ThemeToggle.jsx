"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "./ThemeProvider";

// Subscribe rỗng + snapshot khác nhau giữa server/client để React chỉ coi
// component là "mounted" sau lần render đầu. Tránh mismatch khi resolvedTheme
// từ ThemeProvider đã khác "light" vì script anti-flash trong <head> đã chạy.
function useHasMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

function SunIcon({ className = "w-5 h-5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon({ className = "w-5 h-5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  );
}

export default function ThemeToggle({ className = "" }) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const mounted = useHasMounted();

  const isDark = mounted && resolvedTheme === "dark";
  const label = isDark ? "Chuyển sang chế độ sáng" : "Chuyển sang chế độ tối";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={
        "relative inline-flex items-center justify-center w-10 h-10 rounded-full " +
        "text-slate-600 hover:bg-slate-100 hover:text-slate-900 " +
        "dark:text-slate-200 dark:hover:bg-slate-700/60 dark:hover:text-white " +
        "transition-colors " +
        className
      }
    >
      <span
        className={
          "absolute inset-0 flex items-center justify-center transition-all duration-300 " +
          (isDark ? "opacity-0 scale-75 rotate-90" : "opacity-100 scale-100 rotate-0")
        }
      >
        <SunIcon />
      </span>
      <span
        className={
          "absolute inset-0 flex items-center justify-center transition-all duration-300 " +
          (isDark ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-75 -rotate-90")
        }
      >
        <MoonIcon />
      </span>
    </button>
  );
}
