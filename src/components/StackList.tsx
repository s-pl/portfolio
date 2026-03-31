import SectionLabel from "./SectionLabel";
import { STACK } from "@/lib/data";
import {
  Braces,
  Code2,
  Container,
  Database,
  Flame,
  GitBranch,
  Globe,
  Layers,
  Server,
  Workflow,
  type LucideIcon,
} from "lucide-react";

interface Props {
  label: string;
}

const TECH_ICONS: Record<string, LucideIcon> = {
  Python: Code2,
  "Node.js": Server,
  Express: Workflow,
  "REST APIs": Globe,
  PostgreSQL: Database,
  Redis: Database,
  SQLite: Database,
  MongoDB: Database,
  React: Braces,
  "Next.js": Layers,
  TypeScript: Code2,
  "Tailwind CSS": Flame,
  JavaScript: Code2,
  Linux: Server,
  Git: GitBranch,
  Docker: Container,
  Vercel: Globe,
  Firebase: Database,
};

export default function StackList({ label }: Props) {
  return (
    <section id="stack" className="py-12">
      <SectionLabel label={label} />
      <div className="space-y-4">
        {Object.entries(STACK).map(([category, items]) => (
          <div key={category} className="flex gap-6 items-start">
            <span className="font-mono text-xs text-muted-foreground/60 w-16 shrink-0 pt-1">
              {category}
            </span>
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                (() => {
                  const Icon = TECH_ICONS[item] ?? Code2;

                  return (
                    <span
                      key={item}
                      className="font-mono text-xs bg-muted text-muted-foreground px-2 py-1 rounded inline-flex items-center gap-1.5"
                    >
                      <Icon size={12} className="shrink-0" />
                      {item}
                    </span>
                  );
                })()
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
