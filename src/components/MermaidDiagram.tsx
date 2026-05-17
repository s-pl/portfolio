"use client";

import { useEffect, useRef, useState } from "react";

export function MermaidDiagram({ definition }: { definition: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [id] = useState(() => `mermaid-${Math.random().toString(36).slice(2)}`);

  useEffect(() => {
    if (!containerRef.current) return;

    const isDark = document.documentElement.classList.contains("dark");

    if (containerRef.current) containerRef.current.innerHTML = "";

    import("mermaid").then(async (m) => {
      m.default.initialize({
        startOnLoad: false,
        theme: isDark ? "dark" : "default",
      });

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
