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
  /**
   * Atmósfera propia de la sección, para no repetir la misma luz en toda la página.
   * `base`: fondo limpio (zonas de lectura). `deep`: superficie más profunda con
   * luz violeta. `grid`: trama técnica enmascarada. `horizon`: luz de cierre.
   */
  tone?: "base" | "deep" | "grid" | "horizon";
  /** Nivel del h2: `xl` para las secciones ancla (proyectos, perfil, contacto). */
  scale?: "default" | "xl";
  children?: ReactNode;
};

/** Sección de la página principal: ancla, encabezado semántico y contenido. */
export function Section({
  intro,
  actions,
  layout = "split",
  align = "end",
  tone = "base",
  scale = "default",
  children,
}: SectionProps) {
  const titleId = `${intro.id}-titulo`;

  return (
    <section
      id={intro.id}
      aria-labelledby={titleId}
      className={styles.section}
      data-tone={tone}
    >
      <Container>
        <div className={styles[layout]}>
          <header className={styles.header} data-align={align}>
            <div className={styles.heading}>
              <Eyebrow>{intro.eyebrow}</Eyebrow>
              <h2 id={titleId} className={styles.title} data-scale={scale}>
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
