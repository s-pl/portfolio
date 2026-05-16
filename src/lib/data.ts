import type { Lang } from "./i18n";

export interface Project {
  slug: string;
  title: string;
  desc: string;
  tech: string[];
  href: string;
  tag?: "new" | "wip";
  content?: {
    problem: string;
    architecture: string;
    decisions: string[];
    links?: Array<{ label: string; href: string }>;
  };
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
      slug: "lightq-node",
      title: "lightq-node",
      desc: "Cola de trabajos en memoria para Node.js: cero dependencias en producción, TypeScript completo, concurrencia, prioridades, reintentos con backoff exponencial y cancelación por ID.",
      tech: ["Node.js", "TypeScript"],
      href: "https://www.npmjs.com/package/lightq-node",
      tag: "new",
      content: {
        problem:
          "Necesitaba un sistema de cola ligero para proyectos Node.js sin querer arrastrar Redis, BullMQ ni ninguna dependencia de runtime. Las opciones existentes eran o demasiado pesadas o carecían de reintentos con backoff y cancelación granular.",
        architecture:
          "Módulo ESM/CJS con zero runtime deps. Prioridad FIFO por cola interna, workers concurrentes con semáforo, AbortController por job para timeouts y cancelación. Backoff exponencial configurable con jitter. Distribuido como paquete npm dual-format.",
        decisions: [
          "Zero runtime dependencies: la cola es solo TypeScript compilado, lo que la hace embebible en cualquier proyecto sin lockfile extra.",
          "Dual ESM/CJS con tsup: compatible con proyectos modernos y legacy sin fricción.",
          "AbortSignal en cada job: permite cancelación y timeout sin boilerplate externo.",
          "Dead letter via rechazo controlado: los jobs que agotan reintentos lanzan el error al caller, que decide qué hacer.",
        ],
        links: [
          { label: "npm", href: "https://www.npmjs.com/package/lightq-node" },
        ],
      },
    },
    {
      slug: "envshare",
      title: "envshare",
      desc: "Herramienta web para distribuir variables de entorno entre equipos de forma segura: cifrado en tránsito, TTL por secreto y acceso de un solo uso.",
      tech: ["Next.js", "TypeScript", "Redis"],
      href: "https://github.com/s-pl/envshare",
      tag: "new",
    },
    {
      slug: "ezpass",
      title: "EzPass",
      desc: "Transferencia de archivos P2P en tiempo real entre dispositivos móvil y escritorio mediante WebSockets. Sin registro, sin instalación.",
      tech: ["Node.js", "Socket.io"],
      href: "https://github.com/s-pl/ezpass",
    },
    {
      slug: "robeurope",
      title: "RobEurope",
      desc: "Plataforma fullstack para competición europea de robótica: autenticación JWT, API REST documentada con Swagger y panel de administración.",
      tech: ["Node.js", "Express", "MySQL", "React", "JWT", "Swagger"],
      href: "https://github.com/s-pl/RobEurope",
      tag: "wip",
    },
    {
      slug: "gestock",
      title: "Gestock",
      desc: "Gestor de inventario con autenticación y base de datos en tiempo real.",
      tech: ["React", "Firebase", "MUI"],
      href: "https://gestock.samuelponce.es/",
    },
  ],
  en: [
    {
      slug: "lightq-node",
      title: "lightq-node",
      desc: "Tiny in-memory job queue for Node.js: zero runtime dependencies, full TypeScript support, concurrency control, priority scheduling, retries with exponential backoff, and cancellation by ID.",
      tech: ["Node.js", "TypeScript"],
      href: "https://www.npmjs.com/package/lightq-node",
      tag: "new",
      content: {
        problem:
          "Needed a lightweight queue system for Node.js projects without pulling in Redis, BullMQ, or any runtime dependency. Existing options were either too heavy or lacked fine-grained retry backoff and per-job cancellation.",
        architecture:
          "ESM/CJS module with zero runtime deps. FIFO priority via internal queue, concurrent workers with a semaphore, per-job AbortController for timeouts and cancellation. Configurable exponential backoff with jitter. Distributed as a dual-format npm package.",
        decisions: [
          "Zero runtime dependencies: the queue is just compiled TypeScript, embeddable in any project without extra lockfile bloat.",
          "Dual ESM/CJS via tsup: compatible with modern and legacy projects without friction.",
          "AbortSignal per job: cancellation and timeout without external boilerplate.",
          "Dead letter via controlled rejection: jobs that exhaust retries throw to the caller, who decides what to do.",
        ],
        links: [
          { label: "npm", href: "https://www.npmjs.com/package/lightq-node" },
        ],
      },
    },
    {
      slug: "envshare",
      title: "envshare",
      desc: "Web tool for securely distributing environment variables across teams: in-transit encryption, per-secret TTL, and single-use access.",
      tech: ["Next.js", "TypeScript", "Redis"],
      href: "https://github.com/s-pl/envshare",
      tag: "new",
    },
    {
      slug: "ezpass",
      title: "EzPass",
      desc: "Real-time P2P file transfer between mobile and desktop devices over WebSockets. No sign-up, no install.",
      tech: ["Node.js", "Socket.io"],
      href: "https://github.com/s-pl/ezpass",
    },
    {
      slug: "robeurope",
      title: "RobEurope",
      desc: "Full-stack platform for a European robotics competition: JWT authentication, Swagger-documented REST API, and admin dashboard.",
      tech: ["Node.js", "Express", "MySQL", "React", "JWT", "Swagger"],
      href: "https://github.com/s-pl/RobEurope",
      tag: "wip",
    },
    {
      slug: "gestock",
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

export const STACK_LABELS: Record<Lang, Record<string, string>> = {
  es: {
    backend: "backend",
    databases: "bases de datos",
    frontend: "frontend",
    devops: "devops",
    ai: "ia",
  },
  en: {
    backend: "backend",
    databases: "databases",
    frontend: "frontend",
    devops: "devops",
    ai: "ai",
  },
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
