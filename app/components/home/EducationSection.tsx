import { educationIntro } from "~/content/home";
import { education } from "~/content/profile";

import styles from "./EducationSection.module.css";
import { Section } from "./Section";

/**
 * Formación por jerarquía, no por fecha: la carrera se destaca y los cursos
 * complementarios quedan en un registro menor. No es una línea de tiempo.
 */
export function EducationSection() {
  return (
    <Section intro={educationIntro} layout="stack">
      <ul className={styles.list}>
        {education.map((item) => (
          <li key={item.title} className={styles.item} data-kind={item.kind}>
            <p className={styles.period}>{item.period}</p>
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.institution}>{item.institution}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
