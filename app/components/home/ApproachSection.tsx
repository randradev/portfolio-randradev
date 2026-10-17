import { approach } from "~/content/home";

import { TagList } from "../ui/Tag";
import styles from "./ApproachSection.module.css";
import { Section } from "./Section";

export function ApproachSection() {
  return (
    <Section intro={approach}>
      <ul className={styles.list}>
        {approach.areas.map((area) => (
          <li key={area.title} className={styles.area}>
            <h3>{area.title}</h3>
            <p className={styles.description}>{area.description}</p>
            <TagList items={area.technologies} label={`Tecnologías: ${area.title}`} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
