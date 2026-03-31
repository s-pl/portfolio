import SectionLabel from "./SectionLabel";
import { STACK } from "@/lib/data";

interface Props {
  label: string;
}

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
                <span key={item} className="font-mono text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
