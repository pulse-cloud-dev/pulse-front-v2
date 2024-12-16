import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";

interface UseThemeOptions {
  targetClass?: ClassName;
}

export function useTheme(themeKey: string = "taeopia-theme", options: UseThemeOptions) {
  const { targetClass } = options;

  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem(themeKey) as Theme;
    return storedTheme === "dark" || storedTheme === "light" ? storedTheme : "light";
  });

  useEffect(() => {
    if (targetClass) {
      const $el = document.getElementsByClassName(targetClass);

      Array.from($el).forEach((element) => {
        element.setAttribute("data-theme", theme);
      });
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }

    localStorage.setItem(themeKey, theme);
  }, [theme, themeKey, targetClass]);

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
