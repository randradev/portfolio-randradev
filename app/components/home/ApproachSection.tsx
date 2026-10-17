import { approach } from "~/content/home";

import { TagList } from "../ui/Tag";
import styles from "./ApproachSection.module.css";
import { CapabilityIcon } from "./CapabilityIcon";
import { Section } from "./Section";

export function ApproachSection() {
  return (
    <Section intro={approach} tone="grid" layout="stack">
      <ul className={styles.list}>
        {approach.areas.map((area) => (
          <li key={area.title} className={styles.area}>
            <CapabilityIcon icon={area.icon} className={styles.icon} />
            <h3 className={styles.title}>{area.title}</h3>
            <p className={styles.description}>{area.description}</p>
            <TagList items={area.technologies} label={`Tecnologías: ${area.title}`} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
