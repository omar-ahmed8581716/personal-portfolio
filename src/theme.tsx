import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
type Theme = "light" | "dark";
const Ctx = createContext<{ theme: Theme; toggle: () => void }>({ theme: "light", toggle: () => {} });
// The first theme is chosen by the small script in index.html (saved choice, otherwise the system setting)
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => (document.documentElement.dataset.theme === "dark" ? "dark" : "light"));
  useEffect(() => { document.documentElement.dataset.theme = theme; }, [theme]);
  const toggle = () => setTheme(cur => {
    const next: Theme = cur === "dark" ? "light" : "dark";
    try { localStorage.setItem("theme", next); } catch { /* storage unavailable */ }
    return next;
  });
  return <Ctx.Provider value={{ theme, toggle }}>{children}</Ctx.Provider>;
}
export const useTheme = () => useContext(Ctx);
