import { approach } from "~/content/home";

import { TagList } from "../ui/Tag";
import styles from "./ApproachSection.module.css";
import { Section } from "./Section";

export function ApproachSection() {
  return (
    <Section intro={approach}>
      <ul className={styles.list}>
        {approach.areas.map((area) => (
          <li key={area.area} className={styles.area}>
            <p className={styles.label}>{area.area}</p>
            <h3>{area.title}</h3>
            <p className={styles.description}>{area.description}</p>
            <TagList items={area.technologies} label={`Tecnologías: ${area.area}`} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
