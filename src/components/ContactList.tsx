import { Mail, Github, Linkedin, ArrowUpRight } from "lucide-react";
import SectionLabel from "./SectionLabel";

interface Props {
  label: string;
}

const contacts = [
  { href: "mailto:contacto@samuelponce.es", icon: Mail, label: "contacto@samuelponce.es" },
  { href: "https://github.com/s-pl", icon: Github, label: "github.com/s-pl", external: true },
  { href: "https://www.linkedin.com/in/samuel-ponce-luna-aba75b2b8/", icon: Linkedin, label: "linkedin — samuel ponce luna", external: true },
];

export default function ContactList({ label }: Props) {
  return (
    <section id="contact" className="scroll-mt-16 py-10 sm:py-12">
      <SectionLabel label={label} />
      <div className="space-y-4">
        {contacts.map(({ href, icon: Icon, label: text, external }) => (
          <a
            key={href}
            href={href}
            {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
            className="group flex min-h-10 max-w-full items-center gap-3 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Icon size={16} className="text-muted-foreground shrink-0" />
            <span className="min-w-0 break-words text-base text-muted-foreground transition-colors group-hover:text-foreground">
              {text}
            </span>
            <ArrowUpRight
              size={14}
              className="shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
            />
          </a>
        ))}
      </div>
    </section>
  );
}
