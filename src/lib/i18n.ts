export type Lang = "es" | "en";

export type CookieCopy = {
  title: string;
  summary: string;
  accept: string;
  reject: string;
  manage: string;
  currentAccepted: string;
  currentRejected: string;
  mandatory: string;
  details: Array<{ id: string; label: string; content: string }>;
};

export const COOKIE_COPY: Record<Lang, CookieCopy> = {
  es: {
    title: "Cookies y privacidad",
    summary:
      "Utilizo cookies tecnicas para que la web funcione y, solo si aceptas, analitica de Vercel (Web Analytics y Speed Insights) para medir visitas, clics y mejorar contenido.",
    accept: "Aceptar analitica",
    reject: "Rechazar analitica",
    manage: "Gestionar cookies",
    currentAccepted: "Estado actual: analitica activada",
    currentRejected: "Estado actual: analitica desactivada",
    mandatory: "Las cookies tecnicas son necesarias y siempre estan activas.",
    details: [
      {
        id: "what",
        label: "Que cookies se usan",
        content:
          "Tecnicas: preferencia de idioma, tema y estado de consentimiento. Analitica (opcional): Vercel Web Analytics y Speed Insights para paginas vistas, eventos de interaccion y metricas de rendimiento web.",
      },
      {
        id: "purpose",
        label: "Para que se usan",
        content:
          "Las tecnicas permiten que la web funcione correctamente. Las de analitica ayudan a entender que secciones interesan mas, detectar mejoras de UX y priorizar cambios en el portfolio.",
      },
      {
        id: "legal",
        label: "Base legal y proveedor",
        content:
          "La base legal para analitica es tu consentimiento. El proveedor es Vercel Inc. No se activa la analitica hasta que aceptes.",
      },
      {
        id: "retention",
        label: "Conservacion",
        content:
          "La decision de consentimiento se guarda en este navegador con la clave cookie-consent para recordar tu eleccion en visitas futuras.",
      },
      {
        id: "manage",
        label: "Como cambiar tu decision",
        content:
          "Pulsa en el boton flotante de cookie para abrir este panel cuando quieras y cambiar tu decision. Si rechazas, no se envian eventos de analitica.",
      },
    ],
  },
  en: {
    title: "Cookies and privacy",
    summary:
      "I use technical cookies so the site works, and only if you accept, Vercel analytics (Web Analytics and Speed Insights) to measure visits, clicks, and improve content.",
    accept: "Accept analytics",
    reject: "Reject analytics",
    manage: "Manage cookies",
    currentAccepted: "Current status: analytics enabled",
    currentRejected: "Current status: analytics disabled",
    mandatory: "Technical cookies are required and always enabled.",
    details: [
      {
        id: "what",
        label: "What cookies are used",
        content:
          "Technical: language, theme, and consent preference. Analytics (optional): Vercel Web Analytics and Speed Insights for page views, interaction events, and web performance metrics.",
      },
      {
        id: "purpose",
        label: "Why they are used",
        content:
          "Technical cookies keep the site functional. Analytics cookies help understand what sections perform best, identify UX improvements, and prioritize portfolio changes.",
      },
      {
        id: "legal",
        label: "Legal basis and provider",
        content:
          "The legal basis for analytics is your consent. Provider: Vercel Inc. Analytics stays disabled until you accept.",
      },
      {
        id: "retention",
        label: "Data retention",
        content:
          "Your consent decision is stored in this browser under cookie-consent so your preference is remembered in future visits.",
      },
      {
        id: "manage",
        label: "How to change your decision",
        content:
          "Use the floating cookie button to open this panel anytime and change your choice. If you reject, no analytics events are sent.",
      },
    ],
  },
};

export const DICT = {
  es: {
    role: "Desarrollador de software en Las Palmas de Gran Canaria",
    desc: `${new Date(Date.now()).getFullYear() - 2020} años de experiencia. Trabajo con Python, Node.js, PostgreSQL y Redis en backend, y React, Next.js y Tailwind en frontend cuando el proyecto lo necesita.`,
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
    desc: `${new Date(Date.now()).getFullYear() - 2020} years of experience. I work with Python, Node.js, PostgreSQL and Redis on the backend, and React, Next.js and Tailwind on the frontend when needed.`,
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
