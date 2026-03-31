export type Lang = "es" | "en";

export const DICT = {
  es: {
    role: "Backend developer",
    desc: "5 años de experiencia. Trabajo con Python, Node.js, PostgreSQL y Redis en el backend, y React, Next.js y Tailwind cuando toca frontend.",
    sProjects: "proyectos",
    sExperience: "experiencia",
    sStack: "stack",
    sContact: "contacto",
    tagNew: "nuevo",
    tagWip: "wip",
  },
  en: {
    role: "Backend developer",
    desc: "5 years of experience. I work with Python, Node.js, PostgreSQL and Redis on the backend, and React, Next.js and Tailwind on the frontend when needed.",
    sProjects: "projects",
    sExperience: "experience",
    sStack: "stack",
    sContact: "contact",
    tagNew: "new",
    tagWip: "wip",
  },
} as const;

export type Dict = { [K in keyof typeof DICT.es]: string };
