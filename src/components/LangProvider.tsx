"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import type { Lang } from "@/lib/i18n";

const LANG_SWITCH_KEY = "portfolio-lang-switch";

interface LangContextValue {
  lang: Lang;
  hasAnimated: boolean;
  switchLang: (next: Lang) => void;
}

const LangContext = createContext<LangContextValue | null>(null);

export function useLangContext(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLangContext must be used within LangProvider");
  return ctx;
}

export default function LangProvider({
  lang,
  children,
}: {
  lang: Lang;
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(LANG_SWITCH_KEY) === "1") {
      sessionStorage.removeItem(LANG_SWITCH_KEY);
      setHasAnimated(true);
    }
  }, []);

  function switchLang(next: Lang) {
    const newPath = pathname.replace(`/${lang}`, `/${next}`);
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    sessionStorage.setItem(LANG_SWITCH_KEY, "1");
    document.cookie = `lang=${next}; path=/; max-age=31536000; SameSite=Lax`;
    document.documentElement.lang = next;
    router.replace(`${newPath}${hash}`, { scroll: false });
  }

  return (
    <LangContext.Provider value={{ lang, hasAnimated, switchLang }}>
      {children}
    </LangContext.Provider>
  );
}
