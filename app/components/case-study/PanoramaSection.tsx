import type { PanoramaContent } from "~/content/types";

import { Section } from "../home/Section";
import { EvidenceFigure } from "./EvidenceFigure";
import styles from "./PanoramaSection.module.css";
import shared from "./shared.module.css";

/**
 * Gráficos de la página Panorama: qué mide cada uno y para qué sirve, junto a
 * su captura. Un grupo sin captura se muestra como panel punteado.
 */
export function PanoramaSection({ content }: { content: PanoramaContent }) {
  const { id, labels } = content;

  return (
    <Section intro={content} layout="stack">
      <div className={styles.groups}>
        {content.groups.map((group, groupIndex) => (
          <div
            key={group.metrics[0].title}
            className={
              group.evidence ? styles.group : `${styles.group} ${shared.dashedPanel}`
            }
            data-media={group.evidence ? "" : undefined}
          >
            <div className={styles.metrics}>
              {group.metrics.map((metric, index) => {
                const titleId = `${id}-grafico-${groupIndex}-${index}`;
                return (
                  <section
                    key={metric.title}
                    className={styles.metric}
                    aria-labelledby={titleId}
                  >
                    <h3 id={titleId} className={styles.title}>
                      {metric.title}
                    </h3>
                    <dl className={styles.rows}>
                      <div className={styles.row}>
                        <dt className={shared.label}>{labels.measures}</dt>
                        <dd>{metric.measures}</dd>
                      </div>
                      <div className={styles.row}>
                        <dt className={shared.label}>{labels.relevance}</dt>
                        <dd>{metric.relevance}</dd>
                      </div>
                    </dl>
                  </section>
                );
              })}
            </div>
            {group.evidence && <EvidenceFigure media={group.evidence} />}
          </div>
        ))}
      </div>
    </Section>
  );
}
