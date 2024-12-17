import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";

export function useTheme(themeKey: string = "theme") {
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem(themeKey) as Theme;
    return storedTheme === "dark" || storedTheme === "light" ? storedTheme : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);

    localStorage.setItem(themeKey, theme);
  }, [theme, themeKey]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTheme(e.target.checked ? "dark" : "light");
  };

  return {
    theme,
    toggleTheme,
    onChange,
  } as const;
}
