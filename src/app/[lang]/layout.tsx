import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { isLang, getDict } from "@/lib/i18n";
import LangProvider from "@/components/LangProvider";

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
  const title = isEs
    ? "Samuel Ponce Luna | Desarrollador de software en Las Palmas de Gran Canaria"
    : "Samuel Ponce Luna | Software Developer in Las Palmas de Gran Canaria";
  const description = isEs
    ? "Desarrollador de software backend y Node.js en Las Palmas de Gran Canaria. Portfolio de Samuel Ponce Luna con proyectos, experiencia y stack."
    : "Backend and Node.js software developer in Las Palmas de Gran Canaria. Samuel Ponce Luna's portfolio — projects, experience, and tech stack.";
  const keywords = isEs
    ? ["programador las palmas de gran canaria", "samuel ponce", "nodejs las palmas", "desarrollador backend las palmas", "samuel ponce luna", "portfolio programador"]
    : ["software developer las palmas", "samuel ponce", "nodejs developer", "backend developer las palmas", "samuel ponce luna", "developer portfolio"];

  return {
    title: {
      default: title,
      template: "%s | Samuel Ponce Luna",
    },
    description,
    keywords,
    alternates: {
      canonical: `${BASE}/${lang}`,
      languages: {
        es: `${BASE}/es`,
        en: `${BASE}/en`,
        "x-default": BASE,
      },
    },
    openGraph: {
      type: "website",
      locale: isEs ? "es_ES" : "en_GB",
      alternateLocale: [isEs ? "en_GB" : "es_ES"],
      url: `${BASE}/${lang}`,
      siteName: "Samuel Ponce Luna",
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  void getDict; // ensure i18n module is loaded

  const isEs = lang === "es";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${BASE}/#person`,
        name: "Samuel Ponce Luna",
        url: BASE,
        image: `${BASE}/opengraph-image`,
        jobTitle: isEs ? "Desarrollador de software" : "Software Developer",
        description: isEs
          ? "Desarrollador de software backend y Node.js en Las Palmas de Gran Canaria."
          : "Backend and Node.js software developer in Las Palmas de Gran Canaria.",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Las Palmas de Gran Canaria",
          addressRegion: "Canarias",
          addressCountry: "ES",
        },
        sameAs: [
          "https://github.com/s-pl",
          "https://www.linkedin.com/in/samuel-ponce-luna-aba75b2b8/",
        ],
        knowsAbout: ["Node.js", "TypeScript", "Python", "PostgreSQL", "Redis", "Next.js"],
      },
      {
        "@type": "WebSite",
        "@id": `${BASE}/#website`,
        url: BASE,
        name: "Samuel Ponce Luna",
        inLanguage: [lang],
      },
    ],
  };

  return (
    <>
      {/* Fix html lang attribute before any paint */}
      <script dangerouslySetInnerHTML={{ __html: `document.documentElement.lang="${lang}"` }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LangProvider lang={lang}>{children}</LangProvider>
    </>
  );
}
