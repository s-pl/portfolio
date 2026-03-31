import { motion } from "framer-motion";
import SectionLabel from "./SectionLabel";
import type { Experience } from "@/lib/data";

interface Props {
  experience: Experience[];
  label: string;
}

export default function ExperienceList({ experience, label }: Props) {
  return (
    <section id="experience" className="py-12">
      <SectionLabel label={label} />
      <div className="space-y-8">
        {experience.map((exp, i) => (
          <motion.div
            key={exp.company}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            className="flex gap-6"
          >
            <div className="flex flex-col items-center">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
              {i < experience.length - 1 && <div className="w-px flex-1 bg-border mt-2" />}
            </div>
            <div className="pb-2">
              <div className="flex flex-wrap items-center gap-2 mb-0.5">
                <span className="font-mono text-sm font-semibold">{exp.role}</span>
                {exp.tag && (
                  <span className="font-mono text-xs text-emerald-400 border border-emerald-400/30 rounded px-1.5 py-0.5">
                    {exp.tag}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground/70 font-mono mb-2">
                {exp.company} · {exp.period}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">{exp.desc}</p>
              {exp.highlights && exp.highlights.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {exp.highlights.map((h) => (
                    <li key={h} className="flex gap-2 text-sm text-muted-foreground">
                      <span className="text-emerald-400 shrink-0 mt-0.5">›</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}
              {exp.tech && exp.tech.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-xs text-muted-foreground/60 border border-border rounded px-1.5 py-0.5"
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
