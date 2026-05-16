"use client";

import { useEffect, useRef, useId } from "react";

let initialized = false;

export function MermaidDiagram({ definition }: { definition: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rawId = useId();
  const id = `mermaid-${rawId.replace(/[^a-zA-Z0-9]/g, "")}`;

  useEffect(() => {
    if (!containerRef.current) return;

    import("mermaid").then(async (m) => {
      if (!initialized) {
        m.default.initialize({
          startOnLoad: false,
          theme: "dark",
        });
        initialized = true;
      }

      try {
        const { svg } = await m.default.render(id, definition);
        if (containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      } catch {
        // ignore render errors silently
      }
    });
  }, [definition, id]);

  return (
    <div
      ref={containerRef}
      className="overflow-x-auto rounded border border-border bg-muted/30 p-4 flex justify-center [&_svg]:max-w-full"
    />
  );
}
