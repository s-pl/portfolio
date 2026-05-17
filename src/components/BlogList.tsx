"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useLangContext } from "@/components/LangProvider";
import SectionLabel from "@/components/SectionLabel";
import type { BlogPost } from "@/lib/blog";

interface Props {
  posts: BlogPost[];
  label: string;
  readingTimeLabel: string;
}

function formatDate(dateStr: string, lang: string): string {
  return new Date(dateStr).toLocaleDateString(lang === "es" ? "es-ES" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogList({ posts, label, readingTimeLabel }: Props) {
  const shouldReduceMotion = useReducedMotion();
  const { lang, hasAnimated } = useLangContext();
  const skipAnimation = shouldReduceMotion || hasAnimated;

  return (
    <section id="blog" className="scroll-mt-16 py-10 sm:py-12">
      <SectionLabel label={label} />
      <div>
        {posts.map((post, i) => (
          <motion.div
            key={post.slug}
            initial={skipAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={skipAnimation ? { duration: 0 } : { duration: 0.4, delay: i * 0.07 }}
          >
            <Link
              href={`/${lang}/blog/${post.slug}`}
              className="group -mx-3 flex cursor-pointer items-start gap-3 rounded-sm border-b border-border px-3 py-5 transition-colors last:border-b-0 hover:bg-muted/20"
            >
              <div className="flex-1 min-w-0">
                <p className="font-mono text-xs text-muted-foreground/50 mb-1.5">
                  {formatDate(post.date, lang)}
                  {" · "}
                  {post.readingTime} {readingTimeLabel}
                </p>
                <p className="font-mono text-base font-semibold mb-1.5 group-hover:text-emerald-400 transition-colors">
                  {post.title[lang]}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {post.excerpt[lang]}
                </p>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span key={tag} className="rounded bg-muted px-2 py-0.5 font-mono text-xs text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
