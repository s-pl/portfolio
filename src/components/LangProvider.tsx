"use client";

import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import type { Lang } from "@/lib/i18n";

interface LangContextValue {
  lang: Lang;
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

  function switchLang(next: Lang) {
    const newPath = pathname.replace(`/${lang}`, `/${next}`);
    document.cookie = `lang=${next}; path=/; max-age=31536000; SameSite=Lax`;
    document.documentElement.lang = next;
    router.replace(newPath);
  }

  return (
    <LangContext.Provider value={{ lang, switchLang }}>
      {children}
    </LangContext.Provider>
  );
}
