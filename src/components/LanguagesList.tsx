import SectionLabel from "./SectionLabel";
import type { Language } from "@/lib/data";

interface Props {
  languages: Language[];
  label: string;
}

export default function LanguagesList({ languages, label }: Props) {
  return (
    <section id="languages" className="scroll-mt-16 py-10 sm:py-12">
      <SectionLabel label={label} />
      <div className="flex flex-col gap-3">
        {languages.map((language) => (
          <div
            key={language.name}
            className="flex flex-col gap-1 border-b border-border/40 pb-3 last:border-b-0 last:pb-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
          >
            <span className="font-mono text-base font-semibold">{language.name}</span>
            <span className="text-base text-muted-foreground">{language.level}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
