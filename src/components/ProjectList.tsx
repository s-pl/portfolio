"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionLabel from "./SectionLabel";
import { useLangContext } from "@/components/LangProvider";
import type { Project } from "@/lib/data";

interface Props {
  projects: Project[];
  label: string;
  labelPackages: string;
  tagNew: string;
  tagWip: string;
}

const tagStyles = {
  new: "text-emerald-400 border-emerald-400/30",
  wip: "text-amber-400 border-amber-400/30",
};

function ProjectRow({
  project,
  index,
  skipAnimation,
  tagNew,
  tagWip,
}: {
  project: Project;
  index: number;
  skipAnimation: boolean;
  tagNew: string;
  tagWip: string;
}) {
  const { lang } = useLangContext();
  const href = project.content ? `/${lang}/proyectos/${project.slug}` : project.href;
  const isExternal = !project.content;

  return (
    <motion.a
      key={project.slug}
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
      initial={skipAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={skipAnimation ? { duration: 0 } : { duration: 0.4, delay: index * 0.07 }}
      className="group -mx-3 flex cursor-pointer items-start gap-3 rounded-sm border-b border-border px-3 py-5 transition-colors last:border-b-0 hover:bg-muted/20 sm:gap-4"
    >
      <div className="flex-1 min-w-0">
        <div className="mb-1.5 flex flex-wrap items-center gap-2">
          <span className="min-w-0 break-words font-mono text-base font-semibold">{project.title}</span>
          {project.tag && (
            <span className={`font-mono text-sm px-1.5 py-0.5 rounded border ${tagStyles[project.tag]}`}>
              {project.tag === "new" ? tagNew : tagWip}
            </span>
          )}
        </div>
        <p className="text-base text-muted-foreground leading-relaxed mb-3">{project.desc}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((tech) => (
            <span key={tech} className="rounded bg-muted px-2 py-1 font-mono text-sm text-muted-foreground">
              {tech}
            </span>
          ))}
        </div>
      </div>
      <ArrowUpRight
        size={15}
        className="text-muted-foreground group-hover:text-foreground transition-colors shrink-0 mt-0.5"
      />
    </motion.a>
  );
}

export default function ProjectList({ projects, label, labelPackages, tagNew, tagWip }: Props) {
  const shouldReduceMotion = useReducedMotion();
  const { hasAnimated } = useLangContext();
  const skipAnimation = shouldReduceMotion || hasAnimated;

  const packages = projects.filter((p) => p.kind === "package");
  const regularProjects = projects.filter((p) => p.kind !== "package");

  return (
    <section id="projects" className="scroll-mt-16 py-10 sm:py-12">
      {packages.length > 0 && (
        <>
          <SectionLabel label={labelPackages} />
          <div className="mb-10">
            {packages.map((project, i) => (
              <ProjectRow
                key={project.slug}
                project={project}
                index={i}
                skipAnimation={skipAnimation}
                tagNew={tagNew}
                tagWip={tagWip}
              />
            ))}
          </div>
        </>
      )}

      <SectionLabel label={label} />
      <div>
        {regularProjects.map((project, i) => (
          <ProjectRow
            key={project.slug}
            project={project}
            index={i}
            skipAnimation={skipAnimation}
            tagNew={tagNew}
            tagWip={tagWip}
          />
        ))}
      </div>
    </section>
  );
}
