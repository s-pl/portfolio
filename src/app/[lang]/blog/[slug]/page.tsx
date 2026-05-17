import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLang, getDict } from "@/lib/i18n";
import { BLOG_POSTS, getBlogPost, getBlogPostContent } from "@/lib/blog";
import { MermaidDiagram } from "@/components/MermaidDiagram";
import { CodeBlock } from "@/components/CodeBlock";
import Navbar from "@/components/Navbar";

const BASE = "https://samuelponce.es";

export function generateStaticParams() {
  return [{ lang: "es" }, { lang: "en" }].flatMap(({ lang }) =>
    BLOG_POSTS.map((p) => ({ lang, slug: p.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLang(lang)) return {};
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.title[lang],
    description: post.excerpt[lang],
    alternates: {
      canonical: `${BASE}/${lang}/blog/${slug}`,
      languages: {
        es: `${BASE}/es/blog/${slug}`,
        en: `${BASE}/en/blog/${slug}`,
      },
    },
    openGraph: {
      title: post.title[lang],
      description: post.excerpt[lang],
      url: `${BASE}/${lang}/blog/${slug}`,
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

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLang(lang)) notFound();
  const post = getBlogPost(slug);
  if (!post) notFound();

  const t = getDict(lang);
  const { title, excerpt, sections } = getBlogPostContent(post, lang);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar t={t} lang={lang} />
      <main className="mx-auto max-w-2xl px-4 pt-20 pb-16 sm:px-6 sm:pt-24 sm:pb-20">
        <div className="py-8 sm:py-10">
          <Link
            href={`/${lang}/blog`}
            className="font-mono text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {t.blogBackToList}
          </Link>

          <div className="mt-8">
            <p className="font-mono text-sm text-emerald-400 mb-4">
              {"~/blog · "}
              {formatDate(post.date, lang)}
              {" · "}
              {post.readingTime} {t.blogReadingTime}
            </p>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">{title}</h1>
            <p className="text-base text-muted-foreground leading-relaxed mb-6">{excerpt}</p>

            <div className="flex flex-wrap gap-1.5 mb-8">
              {post.tags.map((tag) => (
                <span key={tag} className="rounded bg-muted px-2 py-1 font-mono text-sm text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>

            <div className="space-y-6">
              {sections.map((section, i) => {
                if (section.t === "h2") {
                  return (
                    <h2 key={i} className="text-xl font-bold tracking-tight mt-10 mb-2">
                      {section.text}
                    </h2>
                  );
                }
                if (section.t === "p") {
                  return (
                    <p key={i} className="text-base text-muted-foreground leading-relaxed">
                      {section.text}
                    </p>
                  );
                }
                if (section.t === "ul") {
                  return (
                    <ul key={i} className="space-y-2 pl-0">
                      {section.items.map((item, j) => (
                        <li key={j} className="flex gap-3 text-base text-muted-foreground leading-relaxed">
                          <span className="font-mono text-emerald-400 shrink-0 mt-0.5">—</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  );
                }
                if (section.t === "code") {
                  return <CodeBlock key={i} code={section.code} lang={section.lang} />;
                }
                if (section.t === "diagram") {
                  return (
                    <div key={i} className="space-y-2">
                      <p className="font-mono text-xs text-muted-foreground/60">{section.title}</p>
                      <MermaidDiagram definition={section.def} />
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
