import type { AnalysisContent } from "~/content/types";

import { Section } from "../home/Section";
import styles from "./AnalysisSection.module.css";
import { EvidenceFigure } from "./EvidenceFigure";
import { PointList } from "./PointList";
import rag from "./RagSection.module.css";
import shared from "./shared.module.css";

/**
 * Análisis de una oportunidad: la secuencia junto a la captura del desglose
 * y, debajo, lo que la ficha deja pendiente. Sigue la composición de la
 * sección RAG de Flux (secuencia a la izquierda, evidencia a la derecha), sin
 * una evidencia a todo el ancho: las capturas se muestran cerca de su tamaño real.
 */
export function AnalysisSection({ content }: { content: AnalysisContent }) {
  const { notes, pending } = content;
  const notesId = `${content.id}-notas`;
  const pendingId = `${content.id}-pendiente`;

  return (
    <Section intro={content} layout="stack" tone="deep">
      <div className={styles.main}>
        <PointList
          points={content.steps}
          label="Recorrido de la oportunidad"
          layout="sequence"
        />

        <div className={rag.aside}>
          <EvidenceFigure media={content.evidence} />

          <aside className={shared.dashedPanel} aria-labelledby={notesId}>
            <h3 id={notesId} className={shared.label}>
              {notes.title}
            </h3>
            <ul className={shared.bulletList}>
              {notes.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>
        </div>
      </div>

      <section
        className={`${rag.secondary} ${styles.pending}`}
        aria-labelledby={pendingId}
      >
        <div className={rag.secondaryIntro}>
          <h3 id={pendingId} className={rag.secondaryTitle}>
            {pending.title}
          </h3>
          <p className={rag.secondaryText}>{pending.description}</p>
        </div>
        <EvidenceFigure media={pending.evidence} />
      </section>
    </Section>
  );
}
