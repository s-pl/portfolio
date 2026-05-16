export type Lang = "es" | "en";

export function isLang(s: unknown): s is Lang {
  return s === "es" || s === "en";
}

export function getDict(lang: Lang) {
  return DICT[lang];
}

export type CookieCopy = {
  title: string;
  summary: string;
  accept: string;
  reject: string;
  close: string;
  manage: string;
  currentAccepted: string;
  currentRejected: string;
  mandatory: string;
  technicalTitle: string;
  technicalDescription: string;
  technicalStatus: string;
  analyticsTitle: string;
  analyticsDescription: string;
  analyticsStatusOn: string;
  analyticsStatusOff: string;
  analyticsStatusUnset: string;
  detailsLabel: string;
  details: Array<{ id: string; label: string; content: string }>;
};

export const COOKIE_COPY: Record<Lang, CookieCopy> = {
  es: {
    title: "Cookies y privacidad",
    summary:
      "Utilizo cookies tecnicas para que la web funcione y, solo si aceptas, analitica de Vercel (Web Analytics y Speed Insights) para medir visitas, clics y mejorar contenido.",
    accept: "Aceptar analitica",
    reject: "Rechazar analitica",
    close: "Cerrar preferencias",
    manage: "Gestionar cookies",
    currentAccepted: "Estado actual: analitica activada",
    currentRejected: "Estado actual: analitica desactivada",
    mandatory: "Las cookies tecnicas son necesarias y siempre estan activas.",
    technicalTitle: "Tecnicas necesarias",
    technicalDescription: "Guardan idioma, tema y consentimiento para que la web funcione bien.",
    technicalStatus: "Siempre activas",
    analyticsTitle: "Analitica opcional",
    analyticsDescription: "Solo se activa si aceptas. Ayuda a medir visitas, clics y rendimiento.",
    analyticsStatusOn: "Activada",
    analyticsStatusOff: "Desactivada",
    analyticsStatusUnset: "Sin decidir",
    detailsLabel: "Detalles",
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
    close: "Close preferences",
    manage: "Manage cookies",
    currentAccepted: "Current status: analytics enabled",
    currentRejected: "Current status: analytics disabled",
    mandatory: "Technical cookies are required and always enabled.",
    technicalTitle: "Required technical cookies",
    technicalDescription: "Store language, theme, and consent so the site works properly.",
    technicalStatus: "Always on",
    analyticsTitle: "Optional analytics",
    analyticsDescription: "Only enabled if you accept. Helps measure visits, clicks, and performance.",
    analyticsStatusOn: "Enabled",
    analyticsStatusOff: "Disabled",
    analyticsStatusUnset: "Not set",
    detailsLabel: "Details",
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
    role: "Full Stack Developer — foco en backend · Las Palmas de Gran Canaria",
    desc: "Full stack con foco en backend. Prácticas Erasmus en C-Link (Londres), startup de IA para el sector de la construcción. Diseño APIs, workers asíncronos y sistemas de observabilidad. En frontend con Next.js, Tailwind y el ecosistema React.",
    ctaProjects: "Ver proyectos",
    ctaContact: "Contactar",
    ctaCV: "Descargar CV",
    sProjects: "proyectos",
    sExperience: "experiencia",
    sStack: "stack",
    sEducation: "formación",
    sLanguages: "idiomas",
    sContact: "contacto",
    tagNew: "nuevo",
    tagWip: "wip",
    caseStudyOpen: "ver case study",
    caseStudyClose: "ocultar case study",
    caseStudyProblem: "problema",
    caseStudyArchitecture: "arquitectura",
    caseStudyDecisions: "decisiones",
    tagErasmus: "erasmus",
    viewProject: "Ver proyecto",
    backToProjects: "← Volver a proyectos",
    projectProblem: "problema",
    projectArchitecture: "arquitectura",
    projectDecisions: "decisiones",
    projectLinks: "enlaces",
  },
  en: {
    role: "Full Stack Developer — backend-focused · Las Palmas de Gran Canaria",
    desc: "Full stack focused on backend. Erasmus placement at C-Link (London), an AI startup in the construction industry. I design APIs, async workers and observability systems. On the frontend with Next.js, Tailwind and the React ecosystem.",
    ctaProjects: "View projects",
    ctaContact: "Get in touch",
    ctaCV: "Download CV",
    sProjects: "projects",
    sExperience: "experience",
    sStack: "stack",
    sEducation: "education",
    sLanguages: "languages",
    sContact: "contact",
    tagNew: "new",
    tagWip: "wip",
    caseStudyOpen: "view case study",
    caseStudyClose: "hide case study",
    caseStudyProblem: "problem",
    caseStudyArchitecture: "architecture",
    caseStudyDecisions: "decisions",
    tagErasmus: "erasmus",
    viewProject: "View project",
    backToProjects: "← Back to projects",
    projectProblem: "problem",
    projectArchitecture: "architecture",
    projectDecisions: "decisions",
    projectLinks: "links",
  },
} as const;

export type Dict = { [K in keyof typeof DICT.es]: string };
