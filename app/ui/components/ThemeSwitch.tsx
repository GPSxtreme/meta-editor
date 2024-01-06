"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

export default function ThemeSwitch() {
  const { theme = "light", setTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState(theme);

  useEffect(() => {
    if (theme === "system") {
      const darkModeMediaQuery = window.matchMedia(
        "(prefers-color-scheme: light)"
      );
      setCurrentTheme(darkModeMediaQuery.matches ? "dark" : "light");
    } else {
      setCurrentTheme(theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    if (currentTheme === "system") {
      setTheme("light");
    } else {
      setTheme(currentTheme === "dark" ? "light" : "dark");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center space-x-2 transition duration-500 ease-in-out hover:scale-110"
    >
      {currentTheme === "dark" ? (
        <MoonIcon className="w-6 h-6 transition duration-500 ease-in-out" />
      ) : (
        <SunIcon className="w-6 h-6 transition duration-500 ease-in-out" />
      )}
    </button>
  );
}
