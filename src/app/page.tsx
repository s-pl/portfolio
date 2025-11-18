"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  Award,
  Wrench,
  Code,
  Database,
  Server,
  Boxes,
  GitBranch,
  Globe,
} from "lucide-react";
import { ProjectCard, type Project } from "@/components/ProjectCard";

const DICT = {
  es: {
    hello: "👋 Hola, soy",
    title: "Desarrollador web inspirado en",
    titleAccent: "construir webs útiles",
    desc:
      "4 años programando principalmente con JavaScript/Node.js. Experiencia con bases de datos SQL y NoSQL, Linux, Git y despliegues.",
    viewProjects: "Ver proyectos",
    contact: "Contactar",
    projectsTitle: "Proyectos destacados",
    projectsSubtitle: "Una pequeña muestra de mis proyectos",
    skillsTitle: "Stack & Herramientas",
    featuredSkills: "Skills destacadas",
    certifications: "Certificaciones",
    contactCtaTitle: "Construyamos algo",
    contactCtaDesc: "¿Tienes una idea o proyecto? Escríbeme.",
    footerLove: "Hecho con ❤️ por samu :)",
    navProjects: "Proyectos",
    navSkills: "Skills",
    navContact: "Contacto",
  },
  en: {
    hello: "👋 Hi, I'm",
    title: "Web developer focused on",
    titleAccent: "building useful websites",
    desc:
      "4 years coding mainly with JavaScript/Node.js. Experience with SQL/NoSQL databases, Linux, Git and deployments.",
    viewProjects: "View projects",
    contact: "Contact",
    projectsTitle: "Featured projects",
    projectsSubtitle: "A small selection of my work",
    skillsTitle: "Stack & Tools",
    featuredSkills: "Highlighted skills",
    certifications: "Certifications",
    contactCtaTitle: "Let's build something",
    contactCtaDesc: "Got an idea or project? Write me.",
    footerLove: "Made with ❤️ by samu :)",
    navProjects: "Projects",
    navSkills: "Skills",
    navContact: "Contact",
  },
} as const;

export default function SamuelPoncePortfolio() {
  const [dark, setDark] = useState(true);
  const [lang, setLang] = useState<"es" | "en">("es");

  useEffect(() => {
    const el = document.documentElement;
    if (dark) el.classList.add("dark");
    else el.classList.remove("dark");
  }, [dark]);

  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    if (savedLang === "en" || savedLang === "es") {
      setLang(savedLang);
      document.documentElement.lang = savedLang;
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const skills = [
    { label: "Node.js", icon: <Server size={16} /> },
    { label: "APIs REST", icon: <Globe size={16} /> },
    { label: "SQLite / PostgreSQL", icon: <Database size={16} /> },
    { label: "MongoDB", icon: <Database size={16} /> },
    { label: "Linux", icon: <Boxes size={16} /> },
    { label: "Git", icon: <GitBranch size={16} /> },
    { label: "Docker (básico)", icon: <Boxes size={16} /> },
    { label: "HTML & CSS", icon: <Code size={16} /> },
  ];

  const certifications = [
    "Desarrollo Back-end y APIs (Freecodecamp)",
    "Curso de ciberseguridad de Google",
    "Gestión de riesgos de seguridad en redes (Freecodecamp)",
  ];

  const PROJECTS: Record<"es" | "en", Project[]> = {
    es: [
      {
        title: "EzPass — Transferencia de archivos",
        desc: "Pasa archivos entre móvil y PC con Socket.io, sin complicaciones.",
        tech: ["Node.js", "Socket.io", "Web"],
        href: "https://github.com/s-pl/ezpass",
      },
      {
        title: "API de gestión de usuarios",
        desc: "CRUD completo de usuarios: alta, baja, consulta y actualización.",
        tech: ["Node.js", "Express", "SQL"],
        href: "https://github.com/s-pl/API-Usuarios",
      },
      {
        title: "Conversor de archivos a PDF",
        desc: "Node.js + UNOCONV para convertir múltiples formatos a PDF.",
        tech: ["Node.js", "UNOCONV", "LibreOffice"],
        href: "https://github.com/s-pl/File2PDF",
      },
      {
        title: "Acortador de URL",
        desc: "Servicio simple de acortamiento con Express y SQLite.",
        tech: ["Node.js", "Express", "SQLite"],
        href: "https://github.com/s-pl/Acortador-de-url",
      },
      {
        title: "Gestock",
        desc: "[Proyecto de clase] Gestor de inventario realizado en React, almacenando los datos con Firebase.",
        tech: ["React", "Firebase", "MUI"],
        href: "https://gestock.samuelponce.es/",
      },
      {
        title: "RobEurope — Competición europea de robótica",
        desc:
          "Proyecto en desarrollo: plataforma para una competición europea de robótica entre institutos. Trabajo en backend y frontend (equipo).",
        tech: ["Node.js", "Express", "Sequelize", "MySQL", "JWT", "Swagger", "React"],
        href: "https://github.com/s-pl/RobEurope",
      },
    ],
    en: [
      {
        title: "EzPass — File transfer",
        desc: "Send files between phone and PC with Socket.io, no fuss.",
        tech: ["Node.js", "Socket.io", "Web"],
        href: "https://github.com/s-pl/ezpass",
      },
      {
        title: "User management API",
        desc: "Full user CRUD: create, delete, read and update.",
        tech: ["Node.js", "Express", "SQL"],
        href: "https://github.com/s-pl/API-Usuarios",
      },
      {
        title: "File to PDF converter",
        desc: "Node.js + UNOCONV to convert multiple formats to PDF.",
        tech: ["Node.js", "UNOCONV", "LibreOffice"],
        href: "https://github.com/s-pl/File2PDF",
      },
      {
        title: "URL shortener",
        desc: "Simple shortening service with Express and SQLite.",
        tech: ["Node.js", "Express", "SQLite"],
        href: "https://github.com/s-pl/Acortador-de-url",
      },
      {
        title: "Gestock",
        desc: "[Class project] Inventory manager built in React with Firebase.",
        tech: ["React", "Firebase", "MUI"],
        href: "https://gestock.samuelponce.es/",
      },
      {
        title: "RobEurope — European robotics competition",
        desc:
          "Work-in-progress: platform for a European robotics competition between high schools. I'm working on backend and frontend (team project).",
        tech: ["Node.js", "Express", "Sequelize", "MySQL", "JWT", "Swagger", "React"],
        href: "https://github.com/s-pl/RobEurope",
      },
    ],
  } as const;

  const projects = PROJECTS[lang];

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-background text-foreground selection:bg-primary/20 selection:text-primary relative overflow-x-clip">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        :root { --radius: 1.25rem }
        html { font-family: 'Poppins', system-ui, -apple-system, Segoe UI, Roboto, 'Helvetica Neue', Arial; }
      `}</style>

      {/* Navbar with toggles */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-auto max-w-6xl px-4 py-3">
          <div className="flex items-center justify-between rounded-full border border-border bg-background/70 backdrop-blur px-3 py-2">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink href="#proyectos" className="px-3 py-2">
                    {DICT[lang].navProjects}
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="#skills" className="px-3 py-2">
                    {DICT[lang].navSkills}
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="#contacto" className="px-3 py-2">
                    {DICT[lang].navContact}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-8 h-8"
                onClick={() => setDark((d) => !d)}
                aria-label="Toggle theme"
              >
                {dark ? "🌚" : "☀️"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full px-3"
                onClick={() => setLang((l) => (l === "es" ? "en" : "es"))}
                aria-label="Toggle language"
              >
                {lang === "es" ? "EN" : "ES"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="mx-auto max-w-6xl px-4 pt-28 pb-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-primary font-medium mb-2 text-lg">
              {DICT[lang].hello} <span className="font-bold">Samuel Ponce Luna</span>
            </p>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-extrabold leading-tight"
            >
              {DICT[lang].title}{" "}
              <span className="text-primary">{DICT[lang].titleAccent}</span>.
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="mt-4 text-muted-foreground"
            >
              {DICT[lang].desc}
            </motion.p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button asChild>
                <a href="#proyectos" className="inline-flex items-center gap-2">
                  {DICT[lang].viewProjects} <ArrowRight size={16} />
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href="#contacto" className="inline-flex items-center gap-2">
                  {DICT[lang].contact} <Mail size={16} />
                </a>
              </Button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <Card className="rounded-2xl shadow-sm">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                    <Wrench size={16} /> {DICT[lang].featuredSkills}
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    {skills.slice(0, 4).map((s) => (
                      <div key={s.label} className="flex items-center gap-2">
                        {s.icon}
                        <span>{s.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                    <Award size={16} /> {DICT[lang].certifications}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {certifications.map((c) => (
                      <Badge key={c} variant="secondary">
                        {c}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </header>

      {/* Proyectos */}
      <section id="proyectos" className="mx-auto max-w-6xl px-4 pb-10">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">{DICT[lang].projectsTitle}</h2>
          <div className="text-sm text-muted-foreground">{DICT[lang].projectsSubtitle}</div>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">{DICT[lang].skillsTitle}</h2>
        <Tabs defaultValue="backend" className="w-full">
          <TabsList>
            <TabsTrigger value="frontend">Frontend</TabsTrigger>
            <TabsTrigger value="backend">Backend</TabsTrigger>
            <TabsTrigger value="devops">DevOps</TabsTrigger>
          </TabsList>

          <TabsContent value="frontend">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
              {[
                { label: "React", icon: <Code size={16} /> },
                { label: "Next.js", icon: <Code size={16} /> },
                { label: "Tailwind CSS", icon: <Code size={16} /> },
                { label: "HTML", icon: <Code size={16} /> },
                { label: "CSS", icon: <Code size={16} /> },
                { label: "JavaScript", icon: <Code size={16} /> },
                { label: "TypeScript", icon: <Code size={16} /> },
                { label: "Firebase", icon: <Database size={16} /> },
                { label: "MUI", icon: <Code size={16} /> },
              ].map((s) => (
                <Card key={s.label}>
                  <CardContent className="p-4 flex items-center gap-3">
                    {s.icon}
                    <span className="text-sm">{s.label}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="backend">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
              {[
                { label: "Node.js", icon: <Server size={16} /> },
                { label: "Express.js", icon: <Server size={16} /> },
                { label: "APIs REST", icon: <Globe size={16} /> },
                { label: "SQLite", icon: <Database size={16} /> },
                { label: "PostgreSQL", icon: <Database size={16} /> },
                { label: "MongoDB", icon: <Database size={16} /> },
              ].map((s) => (
                <Card key={s.label}>
                  <CardContent className="p-4 flex items-center gap-3">
                    {s.icon}
                    <span className="text-sm">{s.label}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="devops">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
              {[
                { label: "Linux", icon: <Boxes size={16} /> },
                { label: "Git", icon: <GitBranch size={16} /> },
                { label: "GitHub", icon: <GitBranch size={16} /> },
                { label: "Docker (básico)", icon: <Boxes size={16} /> },
                { label: "Firebase Hosting", icon: <Globe size={16} /> },
                { label: "Vercel", icon: <Globe size={16} /> },
              ].map((s) => (
                <Card key={s.label}>
                  <CardContent className="p-4 flex items-center gap-3">
                    {s.icon}
                    <span className="text-sm">{s.label}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Contacto */}
      <section id="contacto" className="mx-auto max-w-6xl px-4 py-16">
        <Card className="rounded-2xl">
          <CardContent className="p-6 md:p-10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">{DICT[lang].contactCtaTitle}</h2>
                <p className="mt-2 text-muted-foreground">{DICT[lang].contactCtaDesc}</p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <Button asChild variant="outline">
                    <a href="mailto:contacto@samuelponce.es" className="inline-flex items-center gap-2">
                      <Mail size={16} /> contacto@samuelponce.es
                    </a>
                  </Button>
                  <Button asChild variant="outline">
                    <a
                      href="https://github.com/s-pl"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      <Github size={16} /> GitHub
                    </a>
                  </Button>
                  <Button asChild variant="outline">
                    <a
                      href="https://www.linkedin.com/in/samuel-ponce-luna-aba75b2b8/"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      <Linkedin size={16} /> LinkedIn
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <footer className="mx-auto max-w-6xl px-4 py-10 text-sm text-muted-foreground">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
          <span>Samuel Ponce Luna © {new Date().getFullYear()}</span>
          <span>{DICT[lang].footerLove}</span>
        </div>
      </footer>

      <style>{`
        .dark { color-scheme: dark; }
        .dark .bg-background { background-color: hsl(240 10% 3.9%); }
        .dark .text-foreground { color: hsl(0 0% 98%); }
      `}</style>
    </main>
  );
}

