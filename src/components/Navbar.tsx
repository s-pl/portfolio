"use client";

import { ArrowRight, Download, Sun, Moon, Menu } from "lucide-react";
import type { MouseEvent } from "react";
import { flushSync } from "react-dom";
import type { Dict, Lang } from "@/lib/i18n";
import { useLangContext } from "@/components/LangProvider";
import { useTheme } from "@/hooks/useTheme";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Props {
  t: Dict;
  lang: Lang;
}

export default function Navbar({ t, lang }: Props) {
  const { dark, setDark } = useTheme();
  const { switchLang } = useLangContext();

  const cvHref = lang === "es" ? "/cv/cv-samuel-ponce.pdf" : "/cv/cv-samuel-ponce-en.pdf";

  const sectionLinks = [
    { href: "#experience", label: t.sExperience },
    { href: "#projects", label: t.sProjects },
    { href: `/${lang}/blog`, label: t.sBlog },
    { href: "#contact", label: t.sContact },
  ];

  const allLinks = [
    ...sectionLinks,
    { href: "#stack", label: t.sStack },
    { href: "#education", label: t.sEducation },
    { href: "#languages", label: t.sLanguages },
  ];

  function handleThemeToggle(event: MouseEvent<HTMLButtonElement>) {
    const nextDark = !dark;
    const root = document.documentElement;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const transitionDocument = document as Document & {
      startViewTransition?: (callback: () => void) => { finished: Promise<void> };
    };
    const applyTheme = () => {
      root.classList.toggle("dark", nextDark);
      try {
        localStorage.setItem("theme", nextDark ? "dark" : "light");
      } catch {
        // React state still reflects the user's choice if storage is unavailable.
      }
    };

    if (prefersReducedMotion || !transitionDocument.startViewTransition) {
      root.classList.add("theme-fallback-transition");
      applyTheme();
      setDark(nextDark);
      window.setTimeout(() => root.classList.remove("theme-fallback-transition"), 520);
      return;
    }

    const x = event.clientX;
    const y = event.clientY;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    root.style.setProperty("--theme-toggle-x", `${x}px`);
    root.style.setProperty("--theme-toggle-y", `${y}px`);
    root.style.setProperty("--theme-toggle-radius", `${radius}px`);
    root.dataset.themeTransition = "running";

    const transition = transitionDocument.startViewTransition(() => {
      flushSync(() => {
        applyTheme();
        setDark(nextDark);
      });
    });

    void transition.finished.finally(() => {
      delete root.dataset.themeTransition;
    });
  }

  return (
    <nav
      aria-label={lang === "es" ? "Principal" : "Main"}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm"
    >
      <div className="mx-auto flex h-14 max-w-2xl items-center justify-between px-4 sm:h-12 sm:px-6">
        <a
          href="#"
          className="rounded-sm font-mono text-base font-medium transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="text-emerald-400">~</span>/samu
        </a>

        <div className="flex items-center gap-3 sm:gap-5">
          {sectionLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="hidden sm:block font-mono text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              {label}
            </a>
          ))}

          <div className="sm:hidden">
            <Dialog>
              <DialogTrigger asChild>
                <button
                  aria-label={lang === "es" ? "Abrir menú de navegación" : "Open navigation menu"}
                  className="grid size-10 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Menu size={18} />
                </button>
              </DialogTrigger>
              <DialogContent
                aria-label={lang === "es" ? "Menú de navegación" : "Navigation menu"}
                className="!left-0 !top-auto !bottom-0 !w-full !max-w-none !translate-x-0 !translate-y-0 overflow-hidden rounded-b-none rounded-t-xl p-0 sm:!left-1/2 sm:!top-1/2 sm:!bottom-auto sm:!max-w-sm sm:!-translate-x-1/2 sm:!-translate-y-1/2 sm:rounded-lg"
              >
                <DialogHeader className="border-b border-border bg-muted/30 px-5 py-4 text-left">
                  <DialogTitle className="font-mono text-base">
                    <span className="text-emerald-400">~</span>/samu
                  </DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-1 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
                  {allLinks.map(({ href, label }) => (
                    <DialogClose key={href} asChild>
                      <a
                        href={href}
                        className="group flex min-h-12 items-center justify-between rounded-md px-3 py-3 font-mono text-base text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <span>{label}</span>
                        <ArrowRight className="size-4 opacity-0 transition-opacity group-hover:opacity-100" />
                      </a>
                    </DialogClose>
                  ))}
                  <DialogClose asChild>
                    <a
                      href={cvHref}
                      download
                      className="group flex min-h-12 items-center justify-between rounded-md px-3 py-3 font-mono text-base text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <span>{t.ctaCV}</span>
                      <Download className="size-4 opacity-60" />
                    </a>
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex items-center gap-2 border-l border-border pl-3 sm:gap-3">
            <button
              onClick={handleThemeToggle}
              className="theme-toggle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={dark
                ? (lang === "es" ? "Cambiar a tema claro" : "Switch to light mode")
                : (lang === "es" ? "Cambiar a tema oscuro" : "Switch to dark mode")}
              aria-pressed={dark}
              data-mode={dark ? "dark" : "light"}
            >
              <span className="theme-toggle__icon" aria-hidden="true">
                {dark ? <Sun size={16} /> : <Moon size={16} />}
              </span>
            </button>
            <button
              onClick={() => switchLang(lang === "es" ? "en" : "es")}
              className="grid min-h-10 min-w-10 place-items-center rounded-md font-mono text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:min-h-0 sm:min-w-0 sm:rounded-sm"
              aria-label={lang === "es" ? "Change language to English" : "Cambiar idioma a español"}
            >
              {lang === "es" ? "EN" : "ES"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
