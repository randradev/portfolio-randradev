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
   * Composición en escritorio; cada sección elige la suya para que la página no
   * repita la misma rejilla.
   * `split`: título a la izquierda e introducción a la derecha.
   * `stack`: encabezado sobre el contenido, a una columna.
   * `sticky`: encabezado fijo a la izquierda mientras el contenido avanza.
   * `media`: imagen (`media`) junto al encabezado y el contenido.
   * `panel`: todo dentro de una superficie de cristal (cierre de página).
   */
  layout?: "split" | "stack" | "sticky" | "media" | "panel";
  /** Imagen o elemento visual para `layout="media"`. */
  media?: ReactNode;
  /** Cada frase del título en su línea (p. ej. «Full Stack. / Python. / …»). */
  titleBySentence?: boolean;
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
  media,
  titleBySentence = false,
  align = "end",
  tone = "base",
  scale = "default",
  children,
}: SectionProps) {
  const titleId = `${intro.id}-titulo`;
  // Divide tras cada punto sin alterar el texto: los espacios se conservan.
  const title = titleBySentence
    ? intro.title.split(/(?<=\.)\s+/).map((sentence, index, all) => (
        <span key={sentence} className={styles.titleLine}>
          {sentence}
          {index < all.length - 1 && " "}
        </span>
      ))
    : intro.title;

  return (
    <section
      id={intro.id}
      aria-labelledby={titleId}
      className={styles.section}
      data-tone={tone}
    >
      <Container>
        <div className={`${styles.layout} ${styles[layout]}`}>
          {layout === "media" && media && <div className={styles.mediaSlot}>{media}</div>}

          <header className={styles.header} data-align={align}>
            <div className={styles.heading}>
              <Eyebrow>{intro.eyebrow}</Eyebrow>
              <h2 id={titleId} className={styles.title} data-scale={scale}>
                {title}
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

          {children && <div className={styles.content}>{children}</div>}
        </div>
      </Container>
    </section>
  );
}
