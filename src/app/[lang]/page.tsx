import { notFound } from "next/navigation";
import { isLang, getDict } from "@/lib/i18n";
import { PROJECTS, EXPERIENCE, EDUCATION, LANGUAGES } from "@/lib/data";
import { BLOG_POSTS } from "@/lib/blog";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectList from "@/components/ProjectList";
import ExperienceList from "@/components/ExperienceList";
import EducationList from "@/components/EducationList";
import LanguagesList from "@/components/LanguagesList";
import StackList from "@/components/StackList";
import ContactList from "@/components/ContactList";
import BlogList from "@/components/BlogList";
import CookieBanner from "@/components/CookieBanner";

const Divider = () => <div className="border-t border-border" />;

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const t = getDict(lang);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar t={t} lang={lang} />

      <main
        id="main"
        className="mx-auto max-w-2xl px-4 pt-20 pb-16 sm:px-6 sm:pt-24 sm:pb-20"
      >
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
          tagLabels={{ erasmus: t.tagErasmus }}
        />
        <Divider />
        <ProjectList
          projects={PROJECTS[lang]}
          label={t.sProjects}
          labelPackages={t.sPackages}
          tagNew={t.tagNew}
          tagWip={t.tagWip}
        />
        <Divider />
        <BlogList
          posts={BLOG_POSTS.slice(0, 3)}
          label={t.sBlog}
          readingTimeLabel={t.blogReadingTime}
        />
        <Divider />
        <StackList label={t.sStack} lang={lang} />
        <Divider />
        <EducationList education={EDUCATION[lang]} label={t.sEducation} />
        <Divider />
        <LanguagesList languages={LANGUAGES[lang]} label={t.sLanguages} />
        <Divider />
        <ContactList label={t.sContact} />

        <footer className="pt-6 border-t border-border">
          <p className="font-mono text-sm text-muted-foreground">
            samuel ponce luna © {new Date().getFullYear()}
          </p>
        </footer>
      </main>

      <CookieBanner lang={lang} />
    </div>
  );
}
