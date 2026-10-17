import { AboutSection } from "~/components/home/AboutSection";
import { ApproachSection } from "~/components/home/ApproachSection";
import { ContactSection } from "~/components/home/ContactSection";
import { EducationSection } from "~/components/home/EducationSection";
import { ExperienceSection } from "~/components/home/ExperienceSection";
import { ProjectsSection } from "~/components/home/ProjectsSection";
import { Hero } from "~/components/hero/Hero";
import { buildMeta } from "~/lib/seo";

export function meta() {
  return buildMeta();
}

/** Página principal. Orden de secciones según docs/COPY-HOME-FINAL.md. */
export default function Home() {
  return (
    <>
      <Hero />
      <ProjectsSection />
      <ApproachSection />
      <ExperienceSection />
      <AboutSection />
      <EducationSection />
      <ContactSection />
    </>
  );
}
