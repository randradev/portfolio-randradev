import { educationIntro } from "~/content/home";
import { education } from "~/content/profile";

import styles from "./EducationSection.module.css";
import { Section } from "./Section";

/** Formación: rejilla compacta, distinta de la línea de tiempo de experiencia. */
export function EducationSection() {
  return (
    <Section intro={educationIntro} layout="stack">
      <ol className={styles.list}>
        {education.map((item) => (
          <li key={item.title} className={styles.item}>
            <p className={styles.period}>{item.period}</p>
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.institution}>{item.institution}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
