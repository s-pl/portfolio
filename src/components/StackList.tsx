import SectionLabel from "./SectionLabel";
import { STACK } from "@/lib/data";
import {
  Activity,
  Braces,
  Bug,
  Container,
  Cpu,
  Database,
  FlaskConical,
  GitBranch,
  GitMerge,
  Globe,
  Layers,
  MessageSquare,
  Network,
  Package2,
  Palette,
  Server,
  Sparkles,
  Wind,
  Workflow,
  Zap,
  Code2,
  type LucideIcon,
} from "lucide-react";

interface Props {
  label: string;
}

const TECH_ICONS: Record<string, LucideIcon> = {
  Python: Code2,
  "Node.js": Server,
  FastAPI: Zap,
  Flask: FlaskConical,
  Express: Workflow,
  Celery: Cpu,
  "REST APIs": Globe,
  PostgreSQL: Database,
  MySQL: Database,
  Redis: Database,
  SQLite: Database,
  MongoDB: Database,
  Firebase: Database,
  React: Braces,
  "Next.js": Layers,
  TypeScript: Code2,
  "Tailwind CSS": Wind,
  "shadcn/ui": Palette,
  "Framer Motion": Wind,
  Zustand: Package2,
  JavaScript: Code2,
  Linux: Server,
  Git: GitBranch,
  "GitHub Actions": GitMerge,
  Docker: Container,
  Vercel: Globe,
  "New Relic APM": Activity,
  Sentry: Bug,
  "Claude API": Sparkles,
  "Prompt Engineering": MessageSquare,
  "LLM Pipelines": Network,
};

const CATEGORY_ACCENT: Record<string, string> = {
  ai: "text-violet-400 border-violet-400/30 bg-violet-400/5",
};

const DEFAULT_BADGE = "text-muted-foreground/60 border-border bg-muted";

export default function StackList({ label }: Props) {
  return (
    <section id="stack" className="py-12">
      <SectionLabel label={label} />
      <div className="space-y-4">
        {Object.entries(STACK).map(([category, items]) => {
          const badgeClass = CATEGORY_ACCENT[category] ?? DEFAULT_BADGE;

          return (
            <div key={category} className="flex gap-6 items-start">
              <span className="font-mono text-sm text-muted-foreground/60 w-20 shrink-0 pt-1">
                {category}
              </span>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => {
                  const Icon = TECH_ICONS[item] ?? Code2;

                  return (
                    <span
                      key={item}
                      className={`font-mono text-sm border rounded px-2 py-1 inline-flex items-center gap-1.5 ${badgeClass}`}
                    >
                      <Icon size={14} className="shrink-0" />
                      {item}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
