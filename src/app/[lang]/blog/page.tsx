import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLang, getDict } from "@/lib/i18n";
import { BLOG_POSTS } from "@/lib/blog";
import Navbar from "@/components/Navbar";

const BASE = "https://samuelponce.es";

export function generateStaticParams() {
  return [{ lang: "es" }, { lang: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const isEs = lang === "es";
  const description = isEs
    ? "Artículos sobre Node.js, TypeScript y desarrollo de software."
    : "Articles on Node.js, TypeScript and software development.";
  return {
    title: "Blog — Samuel Ponce Luna",
    description,
    alternates: {
      canonical: `${BASE}/${lang}/blog`,
      languages: { es: `${BASE}/es/blog`, en: `${BASE}/en/blog` },
    },
  };
}

function formatDate(dateStr: string, lang: string) {
  return new Date(dateStr).toLocaleDateString(lang === "es" ? "es-ES" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = getDict(lang);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar t={t} lang={lang} />
      <main className="mx-auto max-w-2xl px-4 pt-20 pb-16 sm:px-6 sm:pt-24 sm:pb-20">
        <div className="py-10 sm:py-12">
          <p className="mb-6 font-mono text-sm text-emerald-400 sm:mb-8">{"// "}{t.sBlog}</p>
          <div>
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.slug}
                href={`/${lang}/blog/${post.slug}`}
                className="group -mx-3 flex cursor-pointer items-start gap-3 rounded-sm border-b border-border px-3 py-5 transition-colors last:border-b-0 hover:bg-muted/20"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-mono text-xs text-muted-foreground/50 mb-1.5">
                    {formatDate(post.date, lang)}
                    {" · "}
                    {post.readingTime} {t.blogReadingTime}
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
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
