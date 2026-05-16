import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { isLang } from "@/lib/i18n";
import { COOKIE_COPY } from "@/lib/i18n";

const BASE = "https://samuelponce.es";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: lang === "es" ? "Privacidad y cookies" : "Privacy and cookies",
    alternates: {
      canonical: `${BASE}/${lang}/privacy`,
    },
    robots: { index: false },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const copy = COOKIE_COPY[lang];
  const backLabel = lang === "es" ? "← volver" : "← back";

  return (
    <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-20">
      <Link
        href={`/${lang}`}
        className="font-mono text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        {backLabel}
      </Link>

      <div className="mt-8">
        <p className="font-mono text-sm text-emerald-400 mb-3">~/privacidad</p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">{copy.title}</h1>
        <p className="text-base text-muted-foreground leading-relaxed mb-10">{copy.summary}</p>
      </div>

      <div className="space-y-8 border-t border-border pt-8">
        {copy.details.map((item) => (
          <div key={item.id}>
            <h2 className="font-mono text-sm text-emerald-400/80 mb-3">{item.label}</h2>
            <p className="text-base leading-relaxed text-muted-foreground">{item.content}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 border-t border-border pt-6">
        <p className="font-mono text-sm text-muted-foreground">
          contacto@samuelponce.es
        </p>
      </div>
    </main>
  );
}
