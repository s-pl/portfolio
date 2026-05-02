import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionLabel from "./SectionLabel";
import type { Project } from "@/lib/data";

interface Props {
  projects: Project[];
  label: string;
  tagNew: string;
  tagWip: string;
}

const tagStyles = {
  new: "text-emerald-400 border-emerald-400/30",
  wip: "text-amber-400 border-amber-400/30",
};

export default function ProjectList({ projects, label, tagNew, tagWip }: Props) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="projects" className="py-12">
      <SectionLabel label={label} />
      <div>
        {projects.map((project, i) => (
          <motion.a
            key={project.title}
            href={project.href}
            target="_blank"
            rel="noreferrer"
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.4, delay: i * 0.07 }}
            className="group flex items-start gap-4 py-5 border-b border-border last:border-b-0 hover:bg-muted/20 -mx-3 px-3 rounded-sm transition-colors cursor-pointer"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-mono text-base font-semibold">{project.title}</span>
                {project.tag && (
                  <span className={`font-mono text-sm px-1.5 py-0.5 rounded border ${tagStyles[project.tag]}`}>
                    {project.tag === "new" ? tagNew : tagWip}
                  </span>
                )}
              </div>
              <p className="text-base text-muted-foreground leading-relaxed mb-3">{project.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((tech) => (
                  <span key={tech} className="font-mono text-sm text-muted-foreground bg-muted px-2 py-0.5 rounded">
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
        ))}
      </div>
    </section>
  );
}
