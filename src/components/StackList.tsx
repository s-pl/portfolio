import SectionLabel from "./SectionLabel";
import { STACK, STACK_LABELS } from "@/lib/data";
import type { Lang } from "@/lib/i18n";
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
  lang: Lang;
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

export default function StackList({ label, lang }: Props) {
  const labels = STACK_LABELS[lang];
  return (
    <section id="stack" className="scroll-mt-16 py-10 sm:py-12">
      <SectionLabel label={label} />
      <div className="space-y-4">
        {Object.entries(STACK).map(([category, items]) => {
          const badgeClass = CATEGORY_ACCENT[category] ?? DEFAULT_BADGE;

          return (
            <div key={category} className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-6">
              <span className="w-full font-mono text-sm text-muted-foreground/60 sm:w-20 sm:shrink-0 sm:pt-1">
                {labels[category] ?? category}
              </span>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => {
                  const Icon = TECH_ICONS[item] ?? Code2;

                  return (
                    <span
                      key={item}
                      className={`inline-flex min-h-8 items-center gap-1.5 rounded border px-2 py-1 font-mono text-sm ${badgeClass}`}
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
