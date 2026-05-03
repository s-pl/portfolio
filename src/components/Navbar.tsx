import { ArrowRight, Sun, Moon, Menu } from "lucide-react";
import type { MouseEvent } from "react";
import { flushSync } from "react-dom";
import type { Dict, Lang } from "@/lib/i18n";
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
  dark: boolean;
  setDark: (v: boolean) => void;
  setLang: (v: Lang) => void;
}

export default function Navbar({ t, lang, dark, setDark, setLang }: Props) {
  const sectionLinks = [
    { href: "#experience", label: t.sExperience },
    { href: "#projects", label: t.sProjects },
    { href: "#stack", label: t.sStack },
    { href: "#contact", label: t.sContact },
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
        // The React state still reflects the user's choice if storage is unavailable.
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
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-2xl items-center justify-between px-4 sm:h-12 sm:px-6">
        <a href="#" className="rounded-sm font-mono text-base font-medium transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
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
                  aria-label="Abrir menu de navegacion"
                  className="grid size-10 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Menu size={18} />
                </button>
              </DialogTrigger>
              <DialogContent className="!left-0 !top-auto !bottom-0 !w-full !max-w-none !translate-x-0 !translate-y-0 overflow-hidden rounded-b-none rounded-t-xl p-0 sm:!left-1/2 sm:!top-1/2 sm:!bottom-auto sm:!max-w-sm sm:!-translate-x-1/2 sm:!-translate-y-1/2 sm:rounded-lg">
                <DialogHeader className="border-b border-border bg-muted/30 px-5 py-4 text-left">
                  <DialogTitle className="font-mono text-base">
                    <span className="text-emerald-400">~</span>/samu
                  </DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-1 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
                  {sectionLinks.map(({ href, label }) => (
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
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex items-center gap-2 border-l border-border pl-3 sm:gap-3">
            <button
              onClick={handleThemeToggle}
              className="theme-toggle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={dark ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
              aria-pressed={dark}
              data-mode={dark ? "dark" : "light"}
            >
              <span className="theme-toggle__icon" aria-hidden="true">
                {dark ? <Sun size={16} /> : <Moon size={16} />}
              </span>
            </button>
            <button
              onClick={() => setLang(lang === "es" ? "en" : "es")}
              className="grid min-h-10 min-w-10 place-items-center rounded-md font-mono text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:min-h-0 sm:min-w-0 sm:rounded-sm"
              aria-label={lang === "es" ? "Change language to English" : "Cambiar idioma a espanol"}
            >
              {lang === "es" ? "EN" : "ES"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
