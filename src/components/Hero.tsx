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
    <section className="py-16">
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5 }}
      >
        <p className="font-mono text-sm text-emerald-400 mb-5">$ whoami</p>
        <h1 className="text-4xl font-bold tracking-tight mb-3">Samuel Ponce Luna</h1>
        <p className="text-lg text-muted-foreground mb-5">{t.role}</p>
        <p className="text-base text-muted-foreground leading-relaxed max-w-lg mb-8">{t.desc}</p>

        <div className="flex flex-wrap items-center gap-3 mb-8">
          <Button asChild>
            <a
              href="#projects"
              onClick={() =>
                trackEvent("cta_click", { cta: "projects", location: "hero" })
              }
            >
              {t.ctaProjects}
            </a>
          </Button>
          <Button asChild variant="outline">
            <a
              href="#contact"
              onClick={() =>
                trackEvent("cta_click", { cta: "contact", location: "hero" })
              }
            >
              {t.ctaContact}
            </a>
          </Button>
          <Button asChild variant="ghost">
            <a
              href={cvHref}
              download
              onClick={() => trackEvent("cv_download", { lang })}
            >
              {t.ctaCV}
            </a>
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-5">
          {links.map(({ href, icon: Icon, label, external }) => (
            <a
              key={href}
              href={href}
              {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
              className="flex items-center gap-2 text-base text-muted-foreground hover:text-foreground transition-colors"
              onClick={() =>
                trackEvent("contact_click", {
                  destination: label,
                  location: "hero",
                  external: Boolean(external),
                })
              }
            >
              <Icon size={15} />
              {label}
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
