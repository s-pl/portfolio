"use client";

import { useEffect } from "react";
import { useLang } from "@/hooks/useLang";
import { useTheme } from "@/hooks/useTheme";
import { animateFavicon } from "@/lib/favicon";
import { DICT } from "@/lib/i18n";
import { PROJECTS, EXPERIENCE } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectList from "@/components/ProjectList";
import ExperienceList from "@/components/ExperienceList";
import StackList from "@/components/StackList";
import ContactList from "@/components/ContactList";

const Divider = () => <div className="border-t border-border" />;

export default function Portfolio() {
  const { lang, setLang } = useLang();
  const { dark, setDark } = useTheme();

  useEffect(() => animateFavicon(), []);

  const t = DICT[lang];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar t={t} lang={lang} dark={dark} setDark={setDark} setLang={setLang} />

      <main className="mx-auto max-w-2xl px-6 pt-24 pb-20">
        <Hero t={t} />
        <Divider />
        <ProjectList projects={PROJECTS[lang]} label={t.sProjects} tagNew={t.tagNew} tagWip={t.tagWip} />
        <Divider />
        <ExperienceList experience={EXPERIENCE[lang]} label={t.sExperience} />
        <Divider />
        <StackList label={t.sStack} />
        <Divider />
        <ContactList label={t.sContact} />

        <footer className="pt-6 border-t border-border">
          <p className="font-mono text-xs text-muted-foreground/50">
            samuel ponce luna © {new Date().getFullYear()}
          </p>
        </footer>
      </main>
    </div>
  );
}
