import type { MetadataRoute } from "next";
import { PROJECTS } from "@/lib/data";

const BASE = "https://samuelponce.es";
const LANGS = ["es", "en"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const slugsWithContent = PROJECTS.es
    .filter((p) => Boolean(p.content))
    .map((p) => p.slug);

  const projectEntries: MetadataRoute.Sitemap = slugsWithContent.flatMap((slug) =>
    LANGS.map((lang) => ({
      url: `${BASE}/${lang}/proyectos/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: {
        languages: Object.fromEntries(
          LANGS.map((l) => [l, `${BASE}/${l}/proyectos/${slug}`]),
        ),
      },
    })),
  );

  return [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          es: `${BASE}/es`,
          en: `${BASE}/en`,
        },
      },
    },
    ...LANGS.map((lang) => ({
      url: `${BASE}/${lang}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
      alternates: {
        languages: Object.fromEntries(
          LANGS.map((l) => [l, `${BASE}/${l}`]),
        ),
      },
    })),
    ...projectEntries,
  ];
}
