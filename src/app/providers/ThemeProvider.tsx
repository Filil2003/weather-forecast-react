import { type PropsWithChildren, useEffect } from "react";
import { useSettingsStore } from "#shared/model";

export function ThemeProvider({ children }: PropsWithChildren) {
  const theme = useSettingsStore((state) => state.theme);

  useEffect(() => {
    const root = document.documentElement;

    function setTheme(themeValue: typeof theme) {
      if (themeValue === "system") {
        const isDark = window.matchMedia(
          "(prefers-color-scheme: dark)",
        ).matches;
        root.setAttribute("data-theme", isDark ? "dark" : "light");
      } else {
        root.setAttribute("data-theme", themeValue);
      }
    }

    setTheme(theme);

    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      const mediaChangeHandler = (event: MediaQueryListEvent) => {
        root.setAttribute("data-theme", event.matches ? "dark" : "light");
      };

      mediaQuery.addEventListener("change", mediaChangeHandler);
      return () => mediaQuery.removeEventListener("change", mediaChangeHandler);
    }
  }, [theme]);

  return children;
}
