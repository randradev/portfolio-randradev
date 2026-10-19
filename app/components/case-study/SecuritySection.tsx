import type { SecurityContent } from "~/content/types";

import { Section } from "../home/Section";
import { EvidenceFigure } from "./EvidenceFigure";
import styles from "./SecuritySection.module.css";
import shared from "./shared.module.css";

/** Formalización: validación OTP y contrato PDF con su hash, junto a la evidencia. */
export function SecuritySection({ content }: { content: SecurityContent }) {
  const noteId = `${content.id}-nota`;

  return (
    <Section intro={content} layout="stack">
      <div className={styles.layout}>
        <div className={styles.blocks}>
          {content.blocks.map((block, index) => (
            <section
              key={block.title}
              className={styles.block}
              aria-labelledby={`${content.id}-bloque-${index}`}
            >
              <h3 id={`${content.id}-bloque-${index}`} className={styles.blockTitle}>
                {block.title}
              </h3>
              <ul className={shared.bulletList}>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}

          <aside className={shared.dashedPanel} aria-labelledby={noteId}>
            <h3 id={noteId} className={shared.label}>
              {content.note.title}
            </h3>
            <ul className={shared.bulletList}>
              {content.note.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>
        </div>

        <EvidenceFigure media={content.evidence} className={styles.contract} />
      </div>
    </Section>
  );
}
