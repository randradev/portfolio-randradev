import { approach } from "~/content/home";

import styles from "./ApproachSection.module.css";
import { CapabilityIcon } from "./CapabilityIcon";
import { Section } from "./Section";

export function ApproachSection() {
  return (
    <Section intro={approach} tone="grid" layout="stack">
      <ul className={styles.list}>
        {approach.areas.map((area) => (
          <li key={area.title} className={styles.area}>
            <span className={styles.iconFrame}>
              <CapabilityIcon icon={area.icon} className={styles.icon} />
            </span>
            <h3 className={styles.title}>{area.title}</h3>
            <p className={styles.description}>{area.description}</p>
            {/* Ficha técnica: una herramienta por fila, en dos columnas. */}
            <ul className={styles.tools} aria-label={`Tecnologías: ${area.title}`}>
              {area.technologies.map((technology) => (
                <li key={technology} className={styles.tool}>
                  {technology}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Section>
  );
}
