import { useEffect, useState } from "react";

export function useTheme() {
  const [dark, setDark] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("theme");

      if (savedTheme === "dark" || savedTheme === "light") {
        setDark(savedTheme === "dark");
      } else {
        const hour = new Date().getHours();
        setDark(hour < 7 || hour >= 20);
      }
    } finally {
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    if (!isReady) return;

    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark, isReady]);

  return { dark, setDark };
}
