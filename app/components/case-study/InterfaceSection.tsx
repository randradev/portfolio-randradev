import type { InterfaceContent } from "~/content/types";

import { Section } from "../home/Section";
import { EvidenceFigure } from "./EvidenceFigure";
import styles from "./InterfaceSection.module.css";
import shared from "./shared.module.css";

/**
 * Interfaz de la aplicación: la grabación del recorrido a todo el ancho y,
 * debajo, las páginas que la componen junto a una captura del listado.
 */
export function InterfaceSection({ content }: { content: InterfaceContent }) {
  const pagesId = `${content.id}-paginas`;

  return (
    <Section intro={content} layout="stack" tone="deep">
      <EvidenceFigure media={content.demo} />

      <div className={styles.detail}>
        <section className={styles.pages} aria-labelledby={pagesId}>
          <h3 id={pagesId} className={shared.label}>
            {content.pages.title}
          </h3>
          <dl className={styles.pageList}>
            {content.pages.items.map((page) => (
              <div key={page.title} className={styles.page}>
                <dt className={styles.pageName}>{page.title}</dt>
                <dd className={styles.pageDescription}>{page.description}</dd>
              </div>
            ))}
          </dl>
        </section>

        <EvidenceFigure media={content.capture} />
      </div>
    </Section>
  );
}
