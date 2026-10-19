import type { OutcomesContent } from "~/content/types";

import { Section } from "../home/Section";
import styles from "./OutcomesSection.module.css";
import shared from "./shared.module.css";

/** Resultados cualitativos, límites conocidos y aprendizajes, en columnas. */
export function OutcomesSection({ content }: { content: OutcomesContent }) {
  return (
    <Section intro={content} layout="stack">
      <div className={styles.columns}>
        {content.columns.map((column, index) => (
          <section
            key={column.title}
            className={styles.column}
            aria-labelledby={`${content.id}-columna-${index}`}
          >
            <h3 id={`${content.id}-columna-${index}`} className={styles.title}>
              {column.title}
            </h3>
            <ul className={shared.bulletList}>
              {column.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </Section>
  );
}
