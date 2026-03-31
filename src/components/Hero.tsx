import { motion } from "framer-motion";
import { Mail, Github, Linkedin } from "lucide-react";
import type { Dict } from "@/lib/i18n";

interface Props {
  t: Pick<Dict, "role" | "desc">;
}

const links = [
  { href: "mailto:contacto@samuelponce.es", icon: Mail, label: "contacto@samuelponce.es" },
  { href: "https://github.com/s-pl", icon: Github, label: "github", external: true },
  { href: "https://www.linkedin.com/in/samuel-ponce-luna-aba75b2b8/", icon: Linkedin, label: "linkedin", external: true },
];

export default function Hero({ t }: Props) {
  return (
    <section className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="font-mono text-xs text-emerald-400 mb-5">$ whoami</p>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Samuel Ponce Luna</h1>
        <p className="text-muted-foreground mb-5">{t.role}</p>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-md mb-10">{t.desc}</p>

        <div className="flex flex-wrap items-center gap-5">
          {links.map(({ href, icon: Icon, label, external }) => (
            <a
              key={href}
              href={href}
              {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon size={13} />
              {label}
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
