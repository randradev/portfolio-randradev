import type { DecisionsContent } from "~/content/types";

import { Card } from "../ui/Card";
import { Section } from "../home/Section";
import styles from "./DecisionsSection.module.css";
import shared from "./shared.module.css";

/** Decisiones de ingeniería: motivo, implementación y costo de cada una. */
export function DecisionsSection({ content }: { content: DecisionsContent }) {
  const { labels } = content;

  return (
    <Section intro={content} layout="stack" tone="grid">
      <ol className={styles.list}>
        {content.decisions.map((decision, index) => (
          <li key={decision.title}>
            <Card className={styles.card}>
              <span className={shared.index} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className={styles.title}>{decision.title}</h3>
              <dl className={styles.rows}>
                <div className={styles.row}>
                  <dt className={shared.label}>{labels.reason}</dt>
                  <dd>{decision.reason}</dd>
                </div>
                <div className={styles.row}>
                  <dt className={shared.label}>{labels.implementation}</dt>
                  <dd>{decision.implementation}</dd>
                </div>
                <div className={styles.row} data-tradeoff>
                  <dt className={shared.label}>{labels.tradeoff}</dt>
                  <dd>{decision.tradeoff}</dd>
                </div>
              </dl>
            </Card>
          </li>
        ))}
      </ol>
    </Section>
  );
}
