import { projectsIntro } from "~/content/home";
import { projects } from "~/content/projects";
import type { Project } from "~/content/types";

import { Card } from "../ui/Card";
import { TagList } from "../ui/Tag";
import { TextLink } from "../ui/TextLink";
import styles from "./ProjectsSection.module.css";
import { Section } from "./Section";

/** Luz propia de cada proyecto, alternada para que no sean tarjetas gemelas. */
const TONES = ["blue", "violet"] as const;

export function ProjectsSection() {
  const { allProjectsLink } = projectsIntro;

  return (
    <Section
      intro={projectsIntro}
      tone="deep"
      scale="xl"
      actions={
        allProjectsLink && (
          <TextLink href={allProjectsLink.href}>{allProjectsLink.label}</TextLink>
        )
      }
    >
      <ul className={styles.list}>
        {projects.map((project, index) => (
          <li key={project.slug}>
            <ProjectCard
              project={project}
              tone={TONES[index % TONES.length]}
              side={index % 2 === 0 ? "start" : "end"}
            />
          </li>
        ))}
      </ul>
    </Section>
  );
}

type ProjectCardProps = {
  project: Project;
  tone: (typeof TONES)[number];
  /** Lado de la portada en escritorio: se alterna entre proyectos. */
  side: "start" | "end";
};

function ProjectCard({ project, tone, side }: ProjectCardProps) {
  const { caseStudyTo } = project;

  return (
    <Card className={styles.card} surface="glass" interactive={caseStudyTo !== null}>
      <div className={styles.layout} data-side={side} data-tone={tone}>
        <ProjectCover project={project} />

        <div className={styles.body}>
          <p className={styles.category}>{project.category}</p>
          <h3 className={styles.name}>{project.name}</h3>
          <p className={styles.summary}>{project.summary}</p>

          <div className={styles.footer}>
            <TagList items={project.stack} label={`Tecnologías de ${project.name}`} />
            {caseStudyTo && (
              <TextLink to={caseStudyTo}>
                {projectsIntro.cardCtaLabel}
                <span className="visually-hidden">: {project.name}</span>
              </TextLink>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

/**
 * Portada 16:9. Sin captura real se muestra una composición abstracta (luz del
 * proyecto, trama técnica y el nombre como marca de agua) que no imita una
 * interfaz: no debe confundirse con una imagen de la aplicación.
 */
function ProjectCover({ project }: { project: Project }) {
  if (project.cover) {
    return (
      <div className={styles.cover}>
        <img
          className={styles.coverImage}
          src={project.cover.src}
          alt={project.cover.alt}
          width={1600}
          height={900}
          loading="lazy"
          decoding="async"
        />
      </div>
    );
  }

  return (
    <div className={`${styles.cover} ${styles.placeholder}`} aria-hidden="true">
      <span className={styles.watermark}>{project.name}</span>
    </div>
  );
}
