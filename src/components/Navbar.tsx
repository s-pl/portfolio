import { Sun, Moon, Menu } from "lucide-react";
import type { Dict, Lang } from "@/lib/i18n";
import {
  Dialog,
  DialogClose,
  DialogContent,
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
    { href: "#projects", label: t.sProjects },
    { href: "#experience", label: t.sExperience },
    { href: "#stack", label: t.sStack },
    { href: "#contact", label: t.sContact },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto max-w-2xl px-6 h-12 flex items-center justify-between">
        <a href="#" className="font-mono text-sm font-medium hover:opacity-70 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">
          <span className="text-emerald-400">~</span>/samu
        </a>

        <div className="flex items-center gap-5">
          {sectionLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="hidden sm:block font-mono text-xs text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              {label}
            </a>
          ))}

          <div className="sm:hidden">
            <Dialog>
              <DialogTrigger asChild>
                <button
                  aria-label="Abrir menu de navegacion"
                  className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                >
                  <Menu size={16} />
                </button>
              </DialogTrigger>
              <DialogContent className="p-4">
                <DialogTitle className="sr-only">Menu principal</DialogTitle>
                <div className="flex flex-col gap-2 mt-2">
                  {sectionLinks.map(({ href, label }) => (
                    <DialogClose key={href} asChild>
                      <a
                        href={href}
                        className="font-mono text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md px-2 py-1"
                      >
                        {label}
                      </a>
                    </DialogClose>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex items-center gap-3 pl-3 border-l border-border">
            <button
              onClick={() => setDark(!dark)}
              className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
              aria-label={dark ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
              aria-pressed={dark}
            >
              {dark ? <Sun size={14} /> : <Moon size={14} />}
            </button>
            <button
              onClick={() => setLang(lang === "es" ? "en" : "es")}
              className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
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
