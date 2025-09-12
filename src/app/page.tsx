"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Github, Linkedin, Mail, ArrowRight, TerminalSquare, Award, Wrench, Link as LinkIcon, Code, Database, Server, Boxes, GitBranch, Globe } from "lucide-react";

export default function SamuelPoncePortfolio() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    const el = document.documentElement;
    if (dark) el.classList.add("dark");
    else el.classList.remove("dark");
  }, [dark]);

  const cursorDot = useRef<HTMLDivElement>(null);
  const cursorRing = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => setCoords({ x: e.clientX, y: e.clientY });
    const down = () => setActive(true);
    const up = () => setActive(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, []);

  useEffect(() => {
    if (!cursorDot.current || !cursorRing.current) return;
    const dot = cursorDot.current;
    const ring = cursorRing.current;

    let raf = 0;
    let rx = coords.x, ry = coords.y;

    const loop = () => {
      dot.style.transform = `translate3d(${coords.x - 3}px, ${coords.y - 3}px, 0)`;
      rx += (coords.x - rx) * 0.2;
      ry += (coords.y - ry) * 0.2;
      ring.style.transform = `translate3d(${rx - 14}px, ${ry - 14}px, 0) scale(${active ? 0.9 : 1})`;
      ring.style.opacity = active ? "0.9" : "0.5";
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [coords.x, coords.y, active]);

  const skills = [
    { label: "Node.js", icon: <Server className="h-4 w-4 text-primary"/> },
    { label: "APIs REST", icon: <Globe className="h-4 w-4 text-primary"/> },
    { label: "SQLite / PostgreSQL", icon: <Database className="h-4 w-4 text-primary"/> },
    { label: "MongoDB", icon: <Database className="h-4 w-4 text-primary"/> },
    { label: "Linux", icon: <Boxes className="h-4 w-4 text-primary"/> },
    { label: "Git", icon: <GitBranch className="h-4 w-4 text-primary"/> },
    { label: "Docker (básico)", icon: <Boxes className="h-4 w-4 text-primary"/> },
    { label: "HTML & CSS", icon: <Code className="h-4 w-4 text-primary"/> },
  ];

  const certifications = [
    "Desarrollo Back-end y APIs",
    "Curso de ciberseguridad (en curso)",
    "Gestión de riesgos de seguridad en redes",
  ];

  const projects = [
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
      href: "https://github.com/s-pl/API-Usuarios"
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
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-background text-foreground selection:bg-primary/20 selection:text-primary relative overflow-x-clip">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        :root { --radius: 1.25rem }
        html { font-family: 'Poppins', system-ui, -apple-system, Segoe UI, Roboto, 'Helvetica Neue', Arial; }
        body { cursor: none; }
      `}</style>

      <div ref={cursorDot} className="pointer-events-none fixed left-0 top-0 z-[100] h-[6px] w-[6px] rounded-full bg-primary mix-blend-difference" />
      <div ref={cursorRing} className="pointer-events-none fixed left-0 top-0 z-[99] h-7 w-7 rounded-full border border-primary/70 backdrop-blur-sm" />

      <nav className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/50 border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="text-lg font-semibold tracking-tight">
            <span className="inline-flex items-center gap-2"><TerminalSquare className="h-5 w-5"/> Samuel Ponce Luna</span>
          </div>
          <div className="flex items-center gap-2">
            <a href="#proyectos" className="text-sm hover:underline">Proyectos</a>
            <a href="#skills" className="text-sm hover:underline">Skills</a>
            <a href="#contacto" className="text-sm hover:underline">Contacto</a>
            <Button variant="outline" size="sm" className="ml-2" onClick={() => setDark(d => !d)}>
              {dark ? "🌚" : "☀️"}
            </Button>
          </div>
        </div>
      </nav>

      <header className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="text-4xl md:text-5xl font-extrabold leading-tight">
              Desarrollador web inspirado en <span className="text-primary"></span>   construir cosas útiles.
            </motion.h1>
            <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, delay: .05 }} className="mt-4 text-muted-foreground">
              4 años programando principalmente con JavaScript/Node.js. Experiencia con bases de datos SQL y NoSQL, Linux, Git y despliegues.
            </motion.p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button asChild>
                <a href="#proyectos" className="inline-flex items-center gap-2">Ver proyectos <ArrowRight className="h-4 w-4"/></a>
              </Button>
              <Button asChild variant="outline">
                <a href="#contacto" className="inline-flex items-center gap-2">Contactar <Mail className="h-4 w-4"/></a>
              </Button>
            </div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="relative">
            <Card className="rounded-2xl shadow-sm">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {skills.slice(0,4).map((s) => (
                    <div key={s.label} className="flex items-center gap-2">
                      {s.icon}
                      <span>{s.label}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-2"><Award className="h-4 w-4"/> Certificaciones</div>
                  <ul className="space-y-1 text-sm">
                    {certifications.map((c) => (
                      <li key={c} className="list-disc list-inside">{c}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </header>

      <section id="proyectos" className="mx-auto max-w-6xl px-4 pb-10">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">Proyectos destacados</h2>
          <div className="text-sm text-muted-foreground">Siempre aprendiendo, siempre shippeando</div>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <motion.a key={p.title} href={p.href} target={p.href === "#" ? "_self" : "_blank"} rel="noreferrer" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.35, delay: i * 0.05 }} className="group">
              <Card className="rounded-2xl group-hover:shadow-md transition-shadow h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold leading-tight group-hover:underline inline-flex items-center gap-2">
                      {p.title} {p.href !== "#" && <LinkIcon className="h-4 w-4"/>}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tech.map(t => (
                      <span key={t} className="rounded-full border px-2 py-1 text-xs">{t}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.a>
          ))}
        </div>
      </section>

      <section id="skills" className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Stack & Herramientas</h2>
        <div className="grid md:grid-cols-3 gap-6 items-start">
          <div className="md:col-span-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((s) => (
              <Card key={s.label} className="rounded-2xl hover:shadow-sm transition-shadow">
                <CardContent className="p-4 flex items-center gap-3">
                  {s.icon}
                  <span className="text-sm">{s.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contacto" className="mx-auto max-w-6xl px-4 py-16">
        <Card className="rounded-2xl">
          <CardContent className="p-6 md:p-10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">Construyamos algo</h2>
                <p className="mt-2 text-muted-foreground">¿Tienes una idea o proyecto? Escríbeme.</p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <Button asChild variant="outline">
                    <a href="mailto:contacto@samuelponce.es" className="inline-flex items-center gap-2"><Mail className="h-4 w-4"/> contacto@samuelponce.es</a>
                  </Button>
                  <Button asChild variant="outline">
                    <a href="https://github.com/s-pl" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2"><Github className="h-4 w-4"/> GitHub</a>
                  </Button>
                  <Button asChild variant="outline">
                    <a href="https://www.linkedin.com/in/samuel-ponce-luna-aba75b2b8/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2"><Linkedin className="h-4 w-4"/> LinkedIn</a>
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
          <span>Hecho con ❤️ por samu :)</span>
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