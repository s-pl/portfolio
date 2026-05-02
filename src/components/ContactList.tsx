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
    <section id="contact" className="py-12">
      <SectionLabel label={label} />
      <div className="space-y-4">
        {contacts.map(({ href, icon: Icon, label: text, external }) => (
          <a
            key={href}
            href={href}
            {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
            className="flex items-center gap-3 group w-fit"
          >
            <Icon size={16} className="text-muted-foreground shrink-0" />
            <span className="text-base text-muted-foreground group-hover:text-foreground transition-colors">
              {text}
            </span>
            <ArrowUpRight
              size={14}
              className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </a>
        ))}
      </div>
    </section>
  );
}
