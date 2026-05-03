"use client";

import { motion, useReducedMotion } from "framer-motion";
import SectionLabel from "./SectionLabel";
import type { Education } from "@/lib/data";

interface Props {
  education: Education[];
  label: string;
}

export default function EducationList({ education, label }: Props) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="education" className="scroll-mt-16 py-10 sm:py-12">
      <SectionLabel label={label} />
      <div className="space-y-6">
        {education.map((edu, i) => (
          <motion.div
            key={edu.degree}
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.4, delay: i * 0.07 }}
            className="flex gap-4 sm:gap-6"
          >
            <div className="flex flex-col items-center">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
              {i < education.length - 1 && <div className="w-px flex-1 bg-border mt-2" />}
            </div>
            <div className="min-w-0 pb-2">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-0.5">
                <span className="min-w-0 font-mono text-base font-semibold">{edu.degree}</span>
                {edu.period && (
                  <span className="font-mono text-sm text-muted-foreground/50">{edu.period}</span>
                )}
              </div>
              <p className="break-words font-mono text-sm text-muted-foreground/70">{edu.institution}</p>
              {edu.note && (
                <p className="text-sm text-emerald-400/80 font-mono mt-1">{edu.note}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
