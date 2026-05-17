"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useLangContext } from "@/components/LangProvider";
import type { Lang } from "@/lib/i18n";

const LOGO = [
  "         ##          ",
  "       ######        ",
  "      ########       ",
  "     ##########      ",
  "     ##########      ",
  "      #########      ",
  "       #######       ",
  "        #####        ",
  "         ###         ",
  "          #          ",
];

const COLORS = [
  "#1e1e1e", "#cc3e28", "#3e9e49", "#d9a117",
  "#3f6cba", "#9e3e9e", "#3e9e9e", "#cccccc",
  "#666666", "#f2635f", "#73c936", "#ffed61",
  "#5778c1", "#e38ef3", "#61d0f0", "#ffffff",
];

function getInfo(lang: Lang) {
  const label = (k: string, v: string) => ({ key: k, value: v });
  return lang === "es"
    ? [
        label("samuel@macbook-m5", ""),
        label("──────────────────", ""),
        label("OS", "macOS Sequoia 15.5"),
        label("Modelo", "MacBook Pro M5 · 14\" · 2025"),
        label("CPU", "Apple M5 · 10 núcleos"),
        label("GPU", "Apple M5 · 14 núcleos"),
        label("Memoria", "24 GB LPDDR5"),
        label("Disco", "512 GB NVMe SSD"),
        label("Shell", "zsh 5.9"),
        label("Terminal", "iTerm2"),
      ]
    : [
        label("samuel@macbook-m5", ""),
        label("──────────────────", ""),
        label("OS", "macOS Sequoia 15.5"),
        label("Model", "MacBook Pro M5 · 14\" · 2025"),
        label("CPU", "Apple M5 · 10-core"),
        label("GPU", "Apple M5 · 14-core"),
        label("Memory", "24 GB LPDDR5"),
        label("Storage", "512 GB NVMe SSD"),
        label("Shell", "zsh 5.9"),
        label("Terminal", "iTerm2"),
      ];
}

const TOTAL_LINES = LOGO.length; // 10 lines

export default function Neofetch() {
  const { lang, hasAnimated } = useLangContext();
  const shouldReduceMotion = useReducedMotion();
  const skip = shouldReduceMotion || hasAnimated;

  const [visibleLines, setVisibleLines] = useState(skip ? TOTAL_LINES : 0);
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    if (skip) {
      setVisibleLines(TOTAL_LINES);
      setShowCursor(true);
      return;
    }

    setVisibleLines(0);
    setShowCursor(false);

    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setVisibleLines(current);
      if (current >= TOTAL_LINES) {
        clearInterval(interval);
        setTimeout(() => setShowCursor(true), 120);
      }
    }, 55);

    return () => clearInterval(interval);
  }, [skip]);

  const info = getInfo(lang);

  return (
    <div className="mb-8 overflow-hidden rounded-lg border border-border bg-background font-mono text-sm">
      {/* Terminal header */}
      <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-xs text-muted-foreground/60">samuel — neofetch</span>
      </div>

      {/* Neofetch output */}
      <div className="p-4 sm:p-5">
        <div className="flex gap-6 sm:gap-8">
          {/* ASCII Apple logo — hidden on very small screens */}
          <div className="hidden shrink-0 select-none sm:block" aria-hidden>
            {LOGO.map((line, i) => (
              <div
                key={i}
                className="leading-5 text-emerald-400 transition-opacity duration-100"
                style={{ opacity: i < visibleLines ? 1 : 0 }}
              >
                {line}
              </div>
            ))}
          </div>

          {/* Info */}
          <div className="min-w-0 flex-1">
            {info.map((row, i) => (
              <div
                key={i}
                className="flex gap-2 leading-5 transition-opacity duration-100"
                style={{ opacity: i < visibleLines ? 1 : 0 }}
              >
                {row.key.startsWith("─") ? (
                  <span className="text-muted-foreground/40">{row.key}</span>
                ) : row.value === "" ? (
                  <span className="font-semibold text-emerald-400">{row.key}</span>
                ) : (
                  <>
                    <span className="shrink-0 text-emerald-400">{row.key}</span>
                    <span className="text-muted-foreground/50">:</span>
                    <span className="text-foreground/80">{row.value}</span>
                  </>
                )}
              </div>
            ))}

            {/* Color blocks */}
            <div
              className="mt-3 flex gap-1 transition-opacity duration-300"
              style={{ opacity: visibleLines >= TOTAL_LINES ? 1 : 0 }}
              aria-hidden
            >
              {COLORS.slice(0, 8).map((color) => (
                <span
                  key={color}
                  className="inline-block h-3 w-4 rounded-sm"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <div
              className="mt-0.5 flex gap-1 transition-opacity duration-300"
              style={{ opacity: visibleLines >= TOTAL_LINES ? 1 : 0 }}
              aria-hidden
            >
              {COLORS.slice(8).map((color) => (
                <span
                  key={color}
                  className="inline-block h-3 w-4 rounded-sm"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Shell prompt at the bottom */}
        <div className="mt-4 flex items-center gap-1 text-xs text-muted-foreground/50">
          <span className="text-emerald-400">samuel@macbook-m5</span>
          <span>~</span>
          <span>%</span>
          {showCursor && (
            <span className="ml-0.5 inline-block h-3.5 w-1.5 animate-pulse bg-emerald-400" />
          )}
        </div>
      </div>
    </div>
  );
}
