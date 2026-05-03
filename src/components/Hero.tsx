import { motion, useReducedMotion } from "framer-motion";
import { Mail, Github, Linkedin } from "lucide-react";
import type { Dict, Lang } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

interface Props {
  t: Pick<Dict, "role" | "desc" | "ctaProjects" | "ctaContact" | "ctaCV">;
  lang: Lang;
}

const links = [
  { href: "mailto:contacto@samuelponce.es", icon: Mail, label: "contacto@samuelponce.es" },
  { href: "https://github.com/s-pl", icon: Github, label: "github", external: true },
  { href: "https://www.linkedin.com/in/samuel-ponce-luna-aba75b2b8/", icon: Linkedin, label: "linkedin", external: true },
];

export default function Hero({ t, lang }: Props) {
  const shouldReduceMotion = useReducedMotion();
  const cvHref = lang === "es" ? "/cv/cv-samuel-ponce.pdf" : "/cv/cv-samuel-ponce-en.pdf";

  return (
    <section className="scroll-mt-16 py-12 sm:py-16">
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5 }}
      >
        <p className="font-mono text-sm text-emerald-400 mb-5">$ whoami</p>
        <h1 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">Samuel Ponce Luna</h1>
        <p className="mb-5 text-base leading-relaxed text-muted-foreground sm:text-lg">{t.role}</p>
        <p className="text-base text-muted-foreground leading-relaxed max-w-lg mb-8">{t.desc}</p>

        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Button asChild className="w-full sm:w-auto">
            <a
              href="#projects"
              onClick={() =>
                trackEvent("cta_click", { cta: "projects", location: "hero" })
              }
            >
              {t.ctaProjects}
            </a>
          </Button>
          <Button asChild variant="outline" className="w-full sm:w-auto">
            <a
              href="#contact"
              onClick={() =>
                trackEvent("cta_click", { cta: "contact", location: "hero" })
              }
            >
              {t.ctaContact}
            </a>
          </Button>
          <Button asChild variant="ghost" className="w-full sm:w-auto">
            <a
              href={cvHref}
              download
              onClick={() => trackEvent("cv_download", { lang })}
            >
              {t.ctaCV}
            </a>
          </Button>
        </div>

        <div className="flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">
          {links.map(({ href, icon: Icon, label, external }) => (
            <a
              key={href}
              href={href}
              {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
              className="flex max-w-full items-center gap-2 text-base text-muted-foreground transition-colors hover:text-foreground"
              onClick={() =>
                trackEvent("contact_click", {
                  destination: label,
                  location: "hero",
                  external: Boolean(external),
                })
              }
            >
              <Icon size={15} />
              <span className="min-w-0 break-all">{label}</span>
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
