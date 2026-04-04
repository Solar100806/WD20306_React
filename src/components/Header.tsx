import React from "react";
import { useTheme } from "../hooks/useTheme";

function Header() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <h1>Chế độ hiện tại: {theme}</h1>
      <button onClick={toggleTheme}>Đổi theme</button>
    </div>
  );
}

export default Header;
