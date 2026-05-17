import type { Lang } from "./i18n";

export interface Project {
  slug: string;
  title: string;
  desc: string;
  tech: string[];
  href: string;
  kind?: "project" | "package";
  tag?: "new" | "wip";
  content?: {
    problem: string;
    architecture: string;
    decisions: string[];
    links?: Array<{ label: string; href: string }>;
    diagrams?: Array<{ title: string; definition: string }>;
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
      kind: "package",
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
          { label: "GitHub", href: "https://github.com/s-pl/queue-ts" },
        ],
        diagrams: [
          {
            title: "ciclo de vida de un job",
            definition: `flowchart TD
    A["queue.add(datos, opciones)"] --> B{"delay mayor que 0?"}
    B -- no --> C["heap ready\nprioridad desc luego FIFO"]
    B -- si --> D["heap delayed\ndueAt asc luego FIFO"]
    D -->|timer disparado| C
    C --> E["bucle drain\nrunning menor que concurrency\nrate limit ok"]
    E --> F["runJob\nactive++"]
    F --> G["handler + AbortSignal\ncarrera con timeout"]
    G --> H["emit completed\nactive--"]
    G --> I{"reintento\npermitido?"}
    I -- si --> J["calcular delay\nfijo / exponencial + jitter\nanadir a heap delayed"]
    J --> D
    I -- no --> K["emit failed\nactive--"]
    H --> L["drain"]
    K --> L`,
          },
          {
            title: "estructura interna",
            definition: `classDiagram
    class Queue {
        +add(datos, opciones) Job
        +process(handler) this
        +cancel(id) boolean
        +remove(id) boolean
        +metrics() MetricsSnapshot
        +onIdle() Promise
        -running int
        -concurrency int
        -paused boolean
    }
    class MinHeap {
        +push(item) void
        +pop() T
        +peek() T
        -items T[]
        -bubbleUp(i) void
        -bubbleDown(i) void
    }
    class Job {
        +id string
        +data T
        +priority int
        +attempts int
        +signal AbortSignal
        +enqueuedAt number
    }
    Queue --> MinHeap : heap ready
    Queue --> MinHeap : heap delayed
    Queue --> Job : registro Map`,
          },
          {
            title: "backoff y reintentos",
            definition: `flowchart LR
    A["handler lanza error"] --> B{"intentos menor o igual maxRetries\nshouldRetry?"}
    B -- no --> C["emit failed\nfallo permanente"]
    B -- si --> D{"modo\nbackoff"}
    D -- fijo --> E["delay = base"]
    D -- exponencial --> F["delay = base x 2^n"]
    E --> G["aplicar jitter\ndelay x factor"]
    F --> G
    G --> H["anadir a heap delayed\nemit retry"]
    H --> I["setTimeout delay\ndrain y reintentar"]`,
          },
        ],
      },
    },
    {
      slug: "cron-scheduler-ts",
      kind: "package",
      title: "cron-scheduler-ts",
      desc: "Scheduler cron/intervalo en memoria para Node.js: cero dependencias, TypeScript completo, persistencia pluggable, deteccion de jobs perdidos y cero drift gracias a recalculo monotono del proximo tick.",
      tech: ["Node.js", "TypeScript"],
      href: "https://www.npmjs.com/package/cron-scheduler-ts",
      tag: "new",
      content: {
        problem:
          "Necesitaba un scheduler tipo cron para tareas recurrentes en proyectos Node.js sin depender de node-cron o agenda. Las opciones existentes o arrastran dependencias de runtime, o acumulan drift al reprogramar desde el fire anterior, o no detectan jobs que se perdieron mientras el proceso estuvo caido.",
        architecture:
          "Modulo ESM/CJS con zero runtime deps. Cada job tiene su propio setTimeout que recalcula el siguiente tick desde new Date() en cada disparo, eliminando drift. Parser cron escrito a mano (5/6 campos, rangos, pasos, aliases, tokens de mes y dia). StorageAdapter pluggable con implementaciones en memoria y filesystem (escritura atomica via .tmp + rename). Persistencia coalescente para no saturar disco en jobs frecuentes.",
        decisions: [
          "Per-job setTimeout en vez de tick global: cada reprogramacion recomputa desde el reloj actual, lo que hace imposible el drift acumulado.",
          "Parser cron zero-dep escrito a mano: soporta los formatos de uso real (5/6 campos, */n, rangos, listas, aliases @daily, tokens jan-dec / sun-sat) sin engordar el bundle.",
          "StorageAdapter como interfaz minima: cualquier backend (file, SQLite, Postgres, Redis) cumple el contrato sin acoplar el core a un driver.",
          "Deteccion de jobs perdidos al arrancar: si lastRun + intervalo es menor que ahora, se emite missed sin replay y el job se reprograma al siguiente tick futuro.",
          "Escritura atomica en FileSystemAdapter: write a .tmp + rename, para evitar corrupcion si el proceso muere a mitad de save.",
        ],
        links: [
          { label: "npm", href: "https://www.npmjs.com/package/cron-scheduler-ts" },
          { label: "GitHub", href: "https://github.com/s-pl/scheduler-ts" },
        ],
        diagrams: [
          {
            title: "ciclo de un job",
            definition: `flowchart TD
    A["scheduler.add(expr, handler)"] --> B["parseCron(expr)\nvalidar expresion"]
    B --> C["computar nextTick\ndesde new Date()"]
    C --> D["setTimeout(delay)\nunref si procede"]
    D -->|timer dispara| E{"job\npausado?"}
    E -- si --> F["clear timer\nsin reschedule"]
    E -- no --> G["handler()\ncarrera con resultado"]
    G --> H["runs++\nlastRun = now\nemit run"]
    G --> I["emit error\nsi handler lanza"]
    H --> J{"alcanzo\nmaxRuns?"}
    I --> J
    J -- si --> K["remover job"]
    J -- no --> C`,
          },
          {
            title: "estructura interna",
            definition: `classDiagram
    class Scheduler {
        +add(expr, handler, options) string
        +addInterval(ms, handler, options) string
        +remove(id) boolean
        +pause(id) boolean
        +resume(id) boolean
        +list() ScheduledJob[]
        +nextRunAt(expr, from) Date
        +start() void
        +stop() Promise
    }
    class StorageAdapter {
        +load() PersistedJob[]
        +save(jobs) Promise
        +onJobRun(id, lastRun, runs)
    }
    class FileSystemAdapter {
        +load() PersistedJob[]
        +save(jobs) Promise
        -atomicWrite(path) void
    }
    class InternalJob {
        +id string
        +expr string
        +runs int
        +lastRun Date
        +paused boolean
        +timer Timeout
    }
    Scheduler --> InternalJob : registro Map
    Scheduler --> StorageAdapter : persistencia
    FileSystemAdapter ..|> StorageAdapter`,
          },
          {
            title: "deteccion de jobs perdidos",
            definition: `flowchart LR
    A["scheduler.start()"] --> B["storage.load()"]
    B --> C{"por cada\njob persistido"}
    C --> D{"lastRun + intervalo\nmenor que ahora?"}
    D -- no --> E["scheduleJob\nsiguiente tick futuro"]
    D -- si --> F["emit missed\nsin replay"]
    F --> E
    E --> G["setTimeout\nhasta nextTick"]`,
          },
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
      kind: "package",
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
          { label: "GitHub", href: "https://github.com/s-pl/queue-ts" },
        ],
        diagrams: [
          {
            title: "job lifecycle",
            definition: `flowchart TD
    A["queue.add(data, options)"] --> B{"delay > 0?"}
    B -- no --> C["ready heap\npriority desc then FIFO"]
    B -- yes --> D["delayed heap\ndueAt asc then FIFO"]
    D -->|timer fires| C
    C --> E["drain loop\nrunning < concurrency\nrate limit ok"]
    E --> F["runJob\nactive++"]
    F --> G["handler + AbortSignal\ntimeout race"]
    G --> H["emit completed\nactive--"]
    G --> I{"retry\nallowed?"}
    I -- yes --> J["compute delay\nfixed / exponential + jitter\npush to delayed heap"]
    J --> D
    I -- no --> K["emit failed\nactive--"]
    H --> L["drain"]
    K --> L`,
          },
          {
            title: "internal structure",
            definition: `classDiagram
    class Queue {
        +add(data, options) Job
        +process(handler) this
        +cancel(id) boolean
        +remove(id) boolean
        +metrics() MetricsSnapshot
        +onIdle() Promise
        -running int
        -concurrency int
        -paused boolean
    }
    class MinHeap {
        +push(item) void
        +pop() T
        +peek() T
        -items T[]
        -bubbleUp(i) void
        -bubbleDown(i) void
    }
    class Job {
        +id string
        +data T
        +priority int
        +attempts int
        +signal AbortSignal
        +enqueuedAt number
    }
    Queue --> MinHeap : ready heap
    Queue --> MinHeap : delayed heap
    Queue --> Job : registry Map`,
          },
          {
            title: "backoff & retries",
            definition: `flowchart LR
    A["handler throws"] --> B{"attempts le maxRetries\nshouldRetry?"}
    B -- no --> C["emit failed\npermanent failure"]
    B -- yes --> D{"backoff\nmode"}
    D -- fixed --> E["delay = base"]
    D -- exponential --> F["delay = base x 2^n"]
    E --> G["apply jitter\ndelay x factor"]
    F --> G
    G --> H["push to delayed heap\nemit retry"]
    H --> I["setTimeout delay\ndrain then re-execute"]`,
          },
        ],
      },
    },
    {
      slug: "cron-scheduler-ts",
      kind: "package",
      title: "cron-scheduler-ts",
      desc: "In-memory cron/interval scheduler for Node.js: zero runtime dependencies, full TypeScript support, pluggable persistence, missed-job detection, and zero drift via monotonic next-tick recomputation.",
      tech: ["Node.js", "TypeScript"],
      href: "https://www.npmjs.com/package/cron-scheduler-ts",
      tag: "new",
      content: {
        problem:
          "Needed a cron-style scheduler for recurring tasks in Node.js projects without pulling in node-cron or agenda. Existing options either drag runtime dependencies, accumulate drift by rescheduling from the previous fire time, or miss jobs that should have run while the process was down.",
        architecture:
          "ESM/CJS module with zero runtime deps. Each job owns its setTimeout and recomputes the next tick from new Date() on every fire, killing drift. Hand-rolled cron parser (5/6 fields, ranges, steps, aliases, month and weekday tokens). Pluggable StorageAdapter with in-memory and filesystem implementations (atomic write via .tmp + rename). Coalesced persistence to avoid disk thrash on high-frequency jobs.",
        decisions: [
          "Per-job setTimeout instead of a global tick: every reschedule recomputes from wall-clock now, making accumulated drift impossible.",
          "Zero-dep cron parser hand-written: supports real-world formats (5/6 fields, */n, ranges, lists, @daily aliases, jan-dec / sun-sat tokens) without bloating the bundle.",
          "StorageAdapter as a minimal interface: any backend (file, SQLite, Postgres, Redis) fulfills the contract without coupling the core to a driver.",
          "Missed-job detection on startup: if lastRun + interval is less than now, missed is emitted with no replay and the job is rescheduled for the next future tick.",
          "Atomic write in FileSystemAdapter: write to .tmp then rename, to avoid corruption if the process dies mid-save.",
        ],
        links: [
          { label: "npm", href: "https://www.npmjs.com/package/cron-scheduler-ts" },
          { label: "GitHub", href: "https://github.com/s-pl/scheduler-ts" },
        ],
        diagrams: [
          {
            title: "job lifecycle",
            definition: `flowchart TD
    A["scheduler.add(expr, handler)"] --> B["parseCron(expr)\nvalidate expression"]
    B --> C["compute nextTick\nfrom new Date()"]
    C --> D["setTimeout(delay)\nunref if applicable"]
    D -->|timer fires| E{"job\npaused?"}
    E -- yes --> F["clear timer\nno reschedule"]
    E -- no --> G["handler()\nrace with result"]
    G --> H["runs++\nlastRun = now\nemit run"]
    G --> I["emit error\nif handler throws"]
    H --> J{"reached\nmaxRuns?"}
    I --> J
    J -- yes --> K["remove job"]
    J -- no --> C`,
          },
          {
            title: "internal structure",
            definition: `classDiagram
    class Scheduler {
        +add(expr, handler, options) string
        +addInterval(ms, handler, options) string
        +remove(id) boolean
        +pause(id) boolean
        +resume(id) boolean
        +list() ScheduledJob[]
        +nextRunAt(expr, from) Date
        +start() void
        +stop() Promise
    }
    class StorageAdapter {
        +load() PersistedJob[]
        +save(jobs) Promise
        +onJobRun(id, lastRun, runs)
    }
    class FileSystemAdapter {
        +load() PersistedJob[]
        +save(jobs) Promise
        -atomicWrite(path) void
    }
    class InternalJob {
        +id string
        +expr string
        +runs int
        +lastRun Date
        +paused boolean
        +timer Timeout
    }
    Scheduler --> InternalJob : registry Map
    Scheduler --> StorageAdapter : persistence
    FileSystemAdapter ..|> StorageAdapter`,
          },
          {
            title: "missed-job detection",
            definition: `flowchart LR
    A["scheduler.start()"] --> B["storage.load()"]
    B --> C{"for each\npersisted job"}
    C --> D{"lastRun + interval\nless than now?"}
    D -- no --> E["scheduleJob\nnext future tick"]
    D -- yes --> F["emit missed\nno replay"]
    F --> E
    E --> G["setTimeout\nuntil nextTick"]`,
          },
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
