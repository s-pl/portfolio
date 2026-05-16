import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { isLang, getDict } from "@/lib/i18n";
import { PROJECTS } from "@/lib/data";
import { MermaidDiagram } from "@/components/MermaidDiagram";

const BASE = "https://samuelponce.es";

export function generateStaticParams() {
  const slugs = PROJECTS.es.map((p) => p.slug);
  return [{ lang: "es" }, { lang: "en" }].flatMap(({ lang }) =>
    slugs.map((slug) => ({ lang, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLang(lang)) return {};

  const project = PROJECTS[lang].find((p) => p.slug === slug);
  if (!project) return {};

  const title = project.title;
  const description = project.desc;

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE}/${lang}/proyectos/${slug}`,
      languages: {
        es: `${BASE}/es/proyectos/${slug}`,
        en: `${BASE}/en/proyectos/${slug}`,
        "x-default": `${BASE}/es/proyectos/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${BASE}/${lang}/proyectos/${slug}`,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLang(lang)) notFound();

  const project = PROJECTS[lang].find((p) => p.slug === slug);
  if (!project?.content) notFound();

  const t = getDict(lang);
  const { content } = project;

  return (
    <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-20">
      <Link
        href={`/${lang}#projects`}
        className="font-mono text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        {t.backToProjects}
      </Link>

      <div className="mt-8">
        <p className="font-mono text-sm text-emerald-400 mb-3">~/proyectos</p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-3">{project.title}</h1>
        <p className="text-base text-muted-foreground leading-relaxed mb-6">{project.desc}</p>

        <div className="flex flex-wrap gap-1.5 mb-8">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="rounded bg-muted px-2 py-1 font-mono text-sm text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-8 border-t border-border pt-8">
        <div>
          <p className="font-mono text-xs text-emerald-400/80 mb-3">{t.projectProblem}</p>
          <p className="text-base leading-relaxed text-muted-foreground">{content.problem}</p>
        </div>

        <div>
          <p className="font-mono text-xs text-emerald-400/80 mb-3">{t.projectArchitecture}</p>
          <p className="text-base leading-relaxed text-muted-foreground">{content.architecture}</p>
        </div>

        <div>
          <p className="font-mono text-xs text-emerald-400/80 mb-3">{t.projectDecisions}</p>
          <ul className="space-y-2">
            {content.decisions.map((decision) => (
              <li key={decision} className="flex gap-2 text-base text-muted-foreground">
                <span className="mt-0.5 shrink-0 text-emerald-400">›</span>
                <span>{decision}</span>
              </li>
            ))}
          </ul>
        </div>

        {content.diagrams && content.diagrams.length > 0 && (
          <div>
            <p className="font-mono text-xs text-emerald-400/80 mb-4">{t.projectDiagrams}</p>
            <div className="space-y-6">
              {content.diagrams.map(({ title, definition }) => (
                <div key={title}>
                  <p className="font-mono text-xs text-muted-foreground/60 mb-2">// {title}</p>
                  <MermaidDiagram definition={definition} />
                </div>
              ))}
            </div>
          </div>
        )}

        {content.links && content.links.length > 0 && (
          <div>
            <p className="font-mono text-xs text-emerald-400/80 mb-3">{t.projectLinks}</p>
            <div className="flex flex-wrap gap-3">
              {content.links.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded border border-border px-3 py-1.5 font-mono text-sm text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
                >
                  {label}
                  <ArrowUpRight size={13} />
                </a>
              ))}
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded border border-border px-3 py-1.5 font-mono text-sm text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
              >
                {project.href.includes("github") ? "GitHub" : project.href.includes("npmjs") ? "npm" : "demo"}
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
