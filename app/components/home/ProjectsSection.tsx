import { projectsIntro } from "~/content/home";
import { projects } from "~/content/projects";
import type { Project } from "~/content/types";

import { Card } from "../ui/Card";
import { TagList } from "../ui/Tag";
import { TextLink } from "../ui/TextLink";
import styles from "./ProjectsSection.module.css";
import { Section } from "./Section";

export function ProjectsSection() {
  const { allProjectsLink } = projectsIntro;

  return (
    <Section
      intro={projectsIntro}
      actions={
        allProjectsLink && (
          <TextLink href={allProjectsLink.href}>{allProjectsLink.label}</TextLink>
        )
      }
    >
      <ul className={styles.list}>
        {projects.map((project) => (
          <li key={project.slug}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </Section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const { caseStudyTo } = project;

  return (
    <Card className={styles.card} interactive={caseStudyTo !== null}>
      <p className={styles.category}>{project.category}</p>
      <h3 className={styles.name}>{project.name}</h3>
      <p className={styles.summary}>{project.summary}</p>
      {project.tagline && <p className={styles.tagline}>{project.tagline}</p>}

      <div className={styles.footer}>
        <TagList items={project.stack} label={`Tecnologías de ${project.name}`} />
        {caseStudyTo && (
          <TextLink to={caseStudyTo}>
            {projectsIntro.cardCtaLabel}
            <span className="visually-hidden">: {project.name}</span>
          </TextLink>
        )}
      </div>
    </Card>
  );
}
