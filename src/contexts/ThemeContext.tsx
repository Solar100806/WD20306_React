import { createContext, useContext, useState } from "react";

type IconMode = "sun" | "moon";

type ThemeContextType = {
  icon: IconMode;
  toggleIcon: () => void;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [icon, setIcon] = useState<IconMode>("sun");

  const toggleIcon = () => {
    setIcon((prev) => (prev === "sun" ? "moon" : "sun"));
  };

  return (
    <ThemeContext.Provider value={{ icon, toggleIcon }}>
      {children}
    </ThemeContext.Provider>
  );
}

// ---- Custom Hook ----
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme phải dùng bên trong ThemeProvider");
  return ctx;
}
