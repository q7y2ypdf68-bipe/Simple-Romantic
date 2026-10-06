"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function ThemeToggle({ locale = "pt" }: { locale?: "pt" | "es" | "en" }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const current = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    const frame = window.requestAnimationFrame(() => setTheme(current));

    return () => window.cancelAnimationFrame(frame);
  }, []);

  function toggleTheme() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    document.documentElement.style.colorScheme = next;
    window.localStorage.setItem("simple-romantic-theme", next);
    setTheme(next);
  }

  const label = locale === "es"
    ? theme === "dark" ? "Activar modo claro" : "Activar modo oscuro"
    : locale === "en"
      ? theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      : theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro";

  return <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={label} title={label}>
    <span aria-hidden="true">{theme === "dark" ? "☀" : "☾"}</span>
  </button>;
}
