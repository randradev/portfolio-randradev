import type { CaseStudyContextContent } from "~/content/types";

import { Section } from "../home/Section";
import styles from "./ContextSection.module.css";

/** Problema del caso y responsabilidades que el sistema debía separar. */
export function ContextSection({ content }: { content: CaseStudyContextContent }) {
  return (
    <Section intro={content} align="start">
      <ol className={styles.points} aria-label="Responsabilidades separadas">
        {content.points.map((point, index) => (
          <li key={point.title} className={styles.point}>
            <span className={styles.index} aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className={styles.title}>{point.title}</h3>
            <p className={styles.description}>{point.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
