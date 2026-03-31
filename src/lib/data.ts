import type { Lang } from "./i18n";

export interface Project {
  title: string;
  desc: string;
  tech: string[];
  href: string;
  tag?: "new" | "wip";
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  desc: string;
  tag?: string;
}

export const PROJECTS: Record<Lang, Project[]> = {
  es: [
    {
      title: "envshare",
      desc: "Comparte variables de entorno de forma segura mediante CLI ",
      tech: ["Next.js", "TypeScript", "Redis"],
      href: "https://github.com/s-pl/envshare",
      tag: "new",
    },
    {
      title: "EzPass",
      desc: "Transferencia de archivos en tiempo real entre móvil y PC. Sin registro, sin instalación.",
      tech: ["Node.js", "Socket.io"],
      href: "https://github.com/s-pl/ezpass",
    },
    {
      title: "RobEurope",
      desc: "Plataforma para una competición europea de robótica entre institutos. Backend y frontend en equipo.",
      tech: ["Node.js", "Express", "MySQL", "React", "JWT", "Swagger"],
      href: "https://github.com/s-pl/RobEurope",
      tag: "wip",
    },
    {
      title: "Gestock",
      desc: "Gestor de inventario con autenticación y base de datos en tiempo real.",
      tech: ["React", "Firebase", "MUI"],
      href: "https://gestock.samuelponce.es/",
    },
  ],
  en: [
    {
      title: "envshare",
      desc: "Share environment variables securely via CLI ",
      tech: ["Next.js", "TypeScript", "Redis"],
      href: "https://github.com/s-pl/envshare",
      tag: "new",
    },
    {
      title: "EzPass",
      desc: "Real-time file transfer between phone and PC. No sign-up, no install.",
      tech: ["Node.js", "Socket.io"],
      href: "https://github.com/s-pl/ezpass",
    },
    {
      title: "RobEurope",
      desc: "Platform for a European robotics competition between high schools. Backend + frontend, team project.",
      tech: ["Node.js", "Express", "MySQL", "React", "JWT", "Swagger"],
      href: "https://github.com/s-pl/RobEurope",
      tag: "wip",
    },
    {
      title: "Gestock",
      desc: "Inventory manager with authentication and real-time database.",
      tech: ["React", "Firebase", "MUI"],
      href: "https://gestock.samuelponce.es/",
    },
  ],
};

export const EXPERIENCE: Record<Lang, Experience[]> = {
  es: [
    {
      role: "Backend Developer Intern",
      company: "C-Link · Londres, Reino Unido",
      period: "2026 — presente",
      desc: "Prácticas Erasmus de 3 meses en el departamento de IA. Enfocado en desarrollo backend para sistemas de inteligencia artificial.",
      tag: "erasmus",
    },
    {
      role: "Desarrollador Web",
      company: "Astican · Las Palmas de Gran Canaria",
      period: "2025",
      desc: "Prácticas laborales como desarrollador web. Desarrollo y mantenimiento de aplicaciones internas.",
    },
  ],
  en: [
    {
      role: "Backend Developer Intern",
      company: "C-Link · London, UK",
      period: "2026 — present",
      desc: "3-month Erasmus placement in the AI department. Focused on backend development for artificial intelligence systems.",
      tag: "erasmus",
    },
    {
      role: "Web Developer",
      company: "Astican · Las Palmas de Gran Canaria",
      period: "2025",
      desc: "Work placement as a web developer. Development and maintenance of internal applications.",
    },
  ],
};

export const STACK: Record<string, string[]> = {
  backend: ["Python", "Node.js", "Express", "REST APIs", "PostgreSQL", "Redis", "SQLite", "MongoDB"],
  frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "JavaScript"],
  devops: ["Linux", "Git", "Docker", "Vercel", "Firebase"],
};
