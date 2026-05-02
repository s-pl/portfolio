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
  highlights?: string[];
  tech?: string[];
  tag?: string;
  caseStudy?: {
    title: string;
    problem: string;
    architecture: string;
    decisions: string[];
  };
}

export interface Education {
  degree: string;
  institution: string;
  period?: string;
  note?: string;
}

export interface Language {
  name: string;
  level: string;
}

export const PROJECTS: Record<Lang, Project[]> = {
  es: [
    {
      title: "envshare",
      desc: "Herramienta web para distribuir variables de entorno entre equipos de forma segura: cifrado en tránsito, TTL por secreto y acceso de un solo uso.",
      tech: ["Next.js", "TypeScript", "Redis"],
      href: "https://github.com/s-pl/envshare",
      tag: "new",
    },
    {
      title: "EzPass",
      desc: "Transferencia de archivos P2P en tiempo real entre dispositivos móvil y escritorio mediante WebSockets. Sin registro, sin instalación.",
      tech: ["Node.js", "Socket.io"],
      href: "https://github.com/s-pl/ezpass",
    },
    {
      title: "RobEurope",
      desc: "Plataforma fullstack para competición europea de robótica: autenticación JWT, API REST documentada con Swagger y panel de administración.",
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
      desc: "Web tool for securely distributing environment variables across teams: in-transit encryption, per-secret TTL, and single-use access.",
      tech: ["Next.js", "TypeScript", "Redis"],
      href: "https://github.com/s-pl/envshare",
      tag: "new",
    },
    {
      title: "EzPass",
      desc: "Real-time P2P file transfer between mobile and desktop devices over WebSockets. No sign-up, no install.",
      tech: ["Node.js", "Socket.io"],
      href: "https://github.com/s-pl/ezpass",
    },
    {
      title: "RobEurope",
      desc: "Full-stack platform for a European robotics competition: JWT authentication, Swagger-documented REST API, and admin dashboard.",
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
      role: "Full Stack Developer Intern",
      company: "C-Link · Londres, Reino Unido",
      period: "ene. 2026 – may. 2026",
      desc: "Prácticas Erasmus en el departamento de IA de una startup de construcción con herramientas de análisis de licitaciones mediante LLMs.",
      highlights: [
        "Sistema de contabilidad de coste y consumo de tokens LLM por tipo de análisis",
        "Instrumentación de New Relic APM en producción: trazas distribuidas, métricas de rendimiento y alertas, junto a Sentry para errores",
        "Refactor de la capa de ingesta: referencias externas a ficheros, procesamiento multi-documento y enriquecimiento de addendums",
        "Corrección de condición de carrera en workers Celery mediante late acknowledgement; unificación del manejo de errores en la capa de tareas",
      ],
      tech: ["Python", "FastAPI", "Celery", "PostgreSQL", "React", "S3", "New Relic", "Sentry", "Docker"],
      tag: "erasmus",
      caseStudy: {
        title: "Módulo BOQ",
        problem:
          "Analizar Bills of Quantities en licitaciones de construcción para convertir documentación compleja en señales accionables dentro del flujo de C-Link.",
        architecture:
          "Esquema de base de datos y migraciones → API REST privada para integración con Nexus → pipeline Celery con múltiples modos de ejecución → suite de tests de integración.",
        decisions: [
          "Múltiples modos de ejecución para adaptar el análisis al estado y volumen de cada tender.",
          "Contabilidad de tokens y coste LLM por tipo de análisis para medir consumo real.",
          "Late ACK en Celery para evitar race conditions y conservar consistencia ante fallos de workers.",
        ],
      },
    },
    {
      role: "Desarrollador Web",
      company: "Astican · Las Palmas de Gran Canaria",
      period: "2025",
      desc: "Prácticas laborales como desarrollador web en empresa del sector naval.",
      highlights: [
        "Desarrollo y mantenimiento de aplicaciones internas para empresa del sector naval",
        "Nuevas funcionalidades sobre stack existente y resolución de deuda técnica en módulos legacy",
      ],
    },
  ],
  en: [
    {
      role: "Full Stack Developer Intern",
      company: "C-Link · London, UK",
      period: "Jan 2026 – May 2026",
      desc: "Erasmus placement at an AI-powered construction startup building LLM tools for tender analysis.",
      highlights: [
        "Built LLM cost and token-usage accounting system per analysis type",
        "Instrumented New Relic APM in production: distributed traces, performance metrics and alerts, alongside Sentry for error tracking",
        "Refactored the document ingestion layer: external file references, multi-document handling, and addendum enrichment",
        "Fixed a race condition in Celery workers via late acknowledgement; unified error handling across the task layer",
      ],
      tech: ["Python", "FastAPI", "Celery", "PostgreSQL", "React", "S3", "New Relic", "Sentry", "Docker"],
      tag: "erasmus",
      caseStudy: {
        title: "BOQ module",
        problem:
          "Analyze Bills of Quantities in construction tenders to turn dense documentation into actionable signals inside C-Link's workflow.",
        architecture:
          "Database schema and migrations → private REST API for Nexus integration → Celery pipeline with multiple execution modes → integration test suite.",
        decisions: [
          "Multiple execution modes to adapt analysis to each tender's state and document volume.",
          "LLM token and cost accounting by analysis type to measure real consumption.",
          "Celery late ACK to avoid race conditions and preserve consistency when workers fail.",
        ],
      },
    },
    {
      role: "Web Developer",
      company: "Astican · Las Palmas de Gran Canaria",
      period: "2025",
      desc: "Work placement as a web developer at a shipyard company.",
      highlights: [
        "Development and maintenance of internal web applications for a shipyard company",
        "Delivered new features on an existing stack and resolved technical debt in legacy modules",
      ],
    },
  ],
};

export const STACK: Record<string, string[]> = {
  backend: ["Python", "Node.js", "FastAPI", "Flask", "Express", "Celery", "REST APIs"],
  databases: ["PostgreSQL", "MySQL", "Redis", "MongoDB", "SQLite", "Firebase"],
  frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Framer Motion", "Zustand"],
  devops: ["Docker", "Linux", "Git", "GitHub Actions", "Vercel", "New Relic APM", "Sentry"],
  ai: ["Claude API", "Prompt Engineering", "LLM Pipelines"],
};

export const EDUCATION: Record<Lang, Education[]> = {
  es: [
    {
      degree: "Técnico Superior en Desarrollo de Aplicaciones Web (DAW)",
      institution: "IES El Rincón · Las Palmas de Gran Canaria",
      period: "2023 – 2026",
      note: "Erasmus en C-Link, Londres",
    },
  ],
  en: [
    {
      degree: "Higher National Diploma in Web Application Development",
      institution: "IES El Rincón · Las Palmas de Gran Canaria",
      period: "2023 – 2026",
      note: "Erasmus at C-Link, London",
    },
  ],
};

export const LANGUAGES: Record<Lang, Language[]> = {
  es: [
    { name: "Español", level: "Nativo" },
    { name: "Inglés", level: "B2 — EOI" },
  ],
  en: [
    { name: "Spanish", level: "Native" },
    { name: "English", level: "B2 — EOI" },
  ],
};
