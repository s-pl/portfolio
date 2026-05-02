"use client";

import { useEffect } from "react";
import { useLang } from "@/hooks/useLang";
import { useTheme } from "@/hooks/useTheme";
import { animateFavicon } from "@/lib/favicon";
import { DICT } from "@/lib/i18n";
import { PROJECTS, EXPERIENCE, EDUCATION, LANGUAGES } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectList from "@/components/ProjectList";
import ExperienceList from "@/components/ExperienceList";
import EducationList from "@/components/EducationList";
import LanguagesList from "@/components/LanguagesList";
import StackList from "@/components/StackList";
import ContactList from "@/components/ContactList";
import CookieBanner from "@/components/CookieBanner";

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
        <Hero t={t} lang={lang} />
        <Divider />
        <ExperienceList
          experience={EXPERIENCE[lang]}
          label={t.sExperience}
          caseStudyLabels={{
            open: t.caseStudyOpen,
            close: t.caseStudyClose,
            problem: t.caseStudyProblem,
            architecture: t.caseStudyArchitecture,
            decisions: t.caseStudyDecisions,
          }}
        />
        <Divider />
        <ProjectList projects={PROJECTS[lang]} label={t.sProjects} tagNew={t.tagNew} tagWip={t.tagWip} />
        <Divider />
        <StackList label={t.sStack} />
        <Divider />
        <EducationList education={EDUCATION[lang]} label={t.sEducation} />
        <Divider />
        <LanguagesList languages={LANGUAGES[lang]} label={t.sLanguages} />
        <Divider />
        <ContactList label={t.sContact} />

        <footer className="pt-6 border-t border-border">
          <p className="font-mono text-sm text-muted-foreground/50">
            samuel ponce luna © {new Date().getFullYear()}
          </p>
        </footer>
      </main>

      <CookieBanner lang={lang} />
    </div>
  );
}
