export type Lang = "es" | "en";

export const DICT = {
  es: {
    role: "Desarrollador de software en Las Palmas de Gran Canaria",
    desc: "5 años de experiencia. Trabajo con Python, Node.js, PostgreSQL y Redis en backend, y React, Next.js y Tailwind en frontend cuando el proyecto lo necesita.",
    ctaProjects: "Ver proyectos",
    ctaContact: "Contactar",
    sProjects: "proyectos",
    sExperience: "experiencia",
    sStack: "stack",
    sContact: "contacto",
    tagNew: "nuevo",
    tagWip: "wip",
  },
  en: {
    role: "Backend developer based in Las Palmas de Gran Canaria",
    desc: "5 years of experience. I work with Python, Node.js, PostgreSQL and Redis on the backend, and React, Next.js and Tailwind on the frontend when needed.",
    ctaProjects: "View projects",
    ctaContact: "Get in touch",
    sProjects: "projects",
    sExperience: "experience",
    sStack: "stack",
    sContact: "contact",
    tagNew: "new",
    tagWip: "wip",
  },
} as const;

export type Dict = { [K in keyof typeof DICT.es]: string };
