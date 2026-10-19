import type { RagContent } from "~/content/types";

import { Section } from "../home/Section";
import { EvidenceFigure } from "./EvidenceFigure";
import { PointList } from "./PointList";
import styles from "./RagSection.module.css";
import shared from "./shared.module.css";

const NOTES_ID = "rag-notas";
const SECONDARY_ID = "rag-cuenta";

/** Caso técnico principal: una consulta RAG dentro del flujo, con su evidencia. */
export function RagSection({ content }: { content: RagContent }) {
  const { notes, secondary } = content;
  // La primera evidencia (el registro de consola) va a todo el ancho para que
  // su texto se lea; el resto acompaña a la secuencia.
  const [primary, ...supporting] = content.evidence;

  return (
    <Section intro={content} layout="stack" tone="deep">
      {primary && <EvidenceFigure media={primary} />}

      <div className={styles.main}>
        <PointList
          points={content.steps}
          label="Secuencia de la consulta"
          layout="sequence"
        />

        <div className={styles.aside}>
          {supporting.map((media) => (
            <EvidenceFigure key={media.caption} media={media} />
          ))}

          <aside className={shared.dashedPanel} aria-labelledby={NOTES_ID}>
            <h3 id={NOTES_ID} className={shared.label}>
              {notes.title}
            </h3>
            <ul className={styles.notesList}>
              {notes.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>
        </div>
      </div>

      <section className={styles.secondary} aria-labelledby={SECONDARY_ID}>
        <div className={styles.secondaryIntro}>
          <h3 id={SECONDARY_ID} className={styles.secondaryTitle}>
            {secondary.title}
          </h3>
          <p className={styles.secondaryText}>{secondary.description}</p>
        </div>
        <div className={styles.secondaryEvidence}>
          {secondary.evidence.map((media) => (
            <EvidenceFigure key={media.caption} media={media} />
          ))}
        </div>
      </section>
    </Section>
  );
}
