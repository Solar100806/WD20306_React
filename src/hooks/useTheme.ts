import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export const useTheme = () => {
  const useThemeConText = useContext(ThemeContext);
  if (useThemeConText === null) {
    throw new Error("useTheme phải được sử dụng trong ThemeProvider");
  }
  return useThemeConText;
};
