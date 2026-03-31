import { Sun, Moon } from "lucide-react";
import type { Dict, Lang } from "@/lib/i18n";

interface Props {
  t: Dict;
  lang: Lang;
  dark: boolean;
  setDark: (v: boolean) => void;
  setLang: (v: Lang) => void;
}

export default function Navbar({ t, lang, dark, setDark, setLang }: Props) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto max-w-2xl px-6 h-12 flex items-center justify-between">
        <a href="#" className="font-mono text-sm font-medium hover:opacity-70 transition-opacity">
          <span className="text-emerald-400">~</span>/samu
        </a>

        <div className="flex items-center gap-5">
          {[
            { href: "#projects", label: t.sProjects },
            { href: "#experience", label: t.sExperience },
            { href: "#stack", label: t.sStack },
            { href: "#contact", label: t.sContact },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="hidden sm:block font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {label}
            </a>
          ))}

          <div className="flex items-center gap-3 pl-3 border-l border-border">
            <button
              onClick={() => setDark(!dark)}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle theme"
            >
              {dark ? <Sun size={14} /> : <Moon size={14} />}
            </button>
            <button
              onClick={() => setLang(lang === "es" ? "en" : "es")}
              className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {lang === "es" ? "EN" : "ES"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
