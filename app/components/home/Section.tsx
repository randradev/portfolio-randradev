import type { ReactNode } from "react";

import type { SectionIntro } from "~/content/types";

import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import styles from "./Section.module.css";

type SectionProps = {
  intro: SectionIntro;
  /** Acciones bajo la introducción (CTA, enlaces). */
  actions?: ReactNode;
  /**
   * `split`: título a la izquierda e introducción a la derecha en escritorio.
   * `panel`: todo apilado dentro de una superficie elevada (cierre de página).
   */
  layout?: "split" | "panel";
  /** En `split`: `start` para introducciones largas, que desplazarían el título. */
  align?: "end" | "start";
  children?: ReactNode;
};

/** Sección de la página principal: ancla, encabezado semántico y contenido. */
export function Section({
  intro,
  actions,
  layout = "split",
  align = "end",
  children,
}: SectionProps) {
  const titleId = `${intro.id}-titulo`;

  return (
    <section id={intro.id} aria-labelledby={titleId} className={styles.section}>
      <Container>
        <div className={styles[layout]}>
          <header className={styles.header} data-align={align}>
            <div className={styles.heading}>
              <Eyebrow>{intro.eyebrow}</Eyebrow>
              <h2 id={titleId} className={styles.title}>
                {intro.title}
              </h2>
            </div>

            {(intro.description || actions) && (
              <div className={styles.intro}>
                {intro.description?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {actions && <div className={styles.actions}>{actions}</div>}
              </div>
            )}
          </header>

          {children}
        </div>
      </Container>
    </section>
  );
}
