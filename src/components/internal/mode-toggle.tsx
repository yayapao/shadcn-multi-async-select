"use client";

import DarkModeToggleButton from "@/components/yaui/dark-mode-toggle-button";
import { RxMoon, RxSun } from "react-icons/rx";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [themeState, setThemeState] = useState<string>();

  // toggle theme
  const togleTheme = () => {
    const th = theme === "dark" ? "light" : "dark";
    setTheme(th);
  };

  useEffect(() => {
    setThemeState(theme);
  }, [theme]);

  return (
    <DarkModeToggleButton
      darkIcon={<RxMoon className="size-6" />}
      lightIcon={<RxSun className="size-6" />}
      onClick={togleTheme}
      theme={themeState}
    />
  );
}
