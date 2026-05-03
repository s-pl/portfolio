import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import SectionLabel from "./SectionLabel";
import type { Experience } from "@/lib/data";

type CaseStudy = NonNullable<Experience["caseStudy"]>;

interface CaseStudyLabels {
  open: string;
  close: string;
  problem: string;
  architecture: string;
  decisions: string;
}

interface Props {
  experience: Experience[];
  label: string;
  caseStudyLabels: CaseStudyLabels;
}

function CaseStudyBlock({
  caseStudy,
  labels,
  shouldReduceMotion,
}: {
  caseStudy: CaseStudy;
  labels: CaseStudyLabels;
  shouldReduceMotion: boolean | null;
}) {
  const [open, setOpen] = useState(false);

  return (
    <details
      className="group mt-4 border-l border-emerald-400/30 pl-3 sm:pl-4"
      onToggle={(event) => setOpen(event.currentTarget.open)}
    >
      <summary className="flex min-h-10 cursor-pointer list-none flex-wrap items-center gap-x-2 gap-y-1 rounded-sm font-mono text-sm text-emerald-400 transition-colors hover:text-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
        <span aria-hidden="true">{open ? "−" : "+"}</span>
        <span className="group-open:hidden">{labels.open}</span>
        <span className="hidden group-open:inline">{labels.close}</span>
        <span className="break-words text-muted-foreground/50">· {caseStudy.title}</span>
      </summary>

      {open && (
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.22 }}
          className="mt-4 flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1.5">
            <p className="font-mono text-xs text-emerald-400/80">{labels.problem}</p>
            <p className="text-base leading-relaxed text-muted-foreground">{caseStudy.problem}</p>
          </div>

          <div className="flex flex-col gap-1.5">
            <p className="font-mono text-xs text-emerald-400/80">{labels.architecture}</p>
            <p className="text-base leading-relaxed text-muted-foreground">{caseStudy.architecture}</p>
          </div>

          <div className="flex flex-col gap-1.5">
            <p className="font-mono text-xs text-emerald-400/80">{labels.decisions}</p>
            <ul className="flex flex-col gap-1">
              {caseStudy.decisions.map((decision) => (
                <li key={decision} className="flex gap-2 text-base text-muted-foreground">
                  <span className="mt-0.5 shrink-0 text-emerald-400">›</span>
                  <span>{decision}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </details>
  );
}

export default function ExperienceList({ experience, label, caseStudyLabels }: Props) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="experience" className="scroll-mt-16 py-10 sm:py-12">
      <SectionLabel label={label} />
      <div className="space-y-8">
        {experience.map((exp, i) => (
          <motion.div
            key={exp.company}
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.4, delay: i * 0.07 }}
            className="flex gap-4 sm:gap-6"
          >
            <div className="flex flex-col items-center">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
              {i < experience.length - 1 && <div className="w-px flex-1 bg-border mt-2" />}
            </div>
            <div className="min-w-0 pb-2">
              <div className="flex flex-wrap items-center gap-2 mb-0.5">
                <span className="min-w-0 font-mono text-base font-semibold">{exp.role}</span>
                {exp.tag && (
                  <span className="font-mono text-sm text-emerald-400 border border-emerald-400/30 rounded px-1.5 py-0.5">
                    {exp.tag}
                  </span>
                )}
              </div>
              <p className="mb-2 break-words font-mono text-sm text-muted-foreground/70">
                {exp.company} · {exp.period}
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">{exp.desc}</p>
              {exp.highlights && exp.highlights.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {exp.highlights.map((h) => (
                    <li key={h} className="flex gap-2 text-base text-muted-foreground">
                      <span className="text-emerald-400 shrink-0 mt-0.5">›</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}
              {exp.caseStudy && (
                <CaseStudyBlock
                  caseStudy={exp.caseStudy}
                  labels={caseStudyLabels}
                  shouldReduceMotion={shouldReduceMotion}
                />
              )}
              {exp.tech && exp.tech.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded border border-border px-2 py-1 font-mono text-sm text-muted-foreground/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
