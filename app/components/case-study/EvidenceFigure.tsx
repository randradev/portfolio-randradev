import type { CSSProperties } from "react";

import type { EvidenceKind, EvidenceMedia } from "~/content/types";

import styles from "./EvidenceFigure.module.css";

const KIND_LABELS: Record<EvidenceKind, string> = {
  recording: "Grabación",
  log: "Registro de ejecución",
  capture: "Captura",
};

type EvidenceFigureProps = {
  media: EvidenceMedia;
  className?: string;
};

/**
 * Evidencia real del proyecto con su procedencia: tipo de recurso, fecha de la
 * ejecución y qué demuestra. Los videos no se reproducen solos ni se descargan
 * hasta que se pulsa reproducir (`preload="none"`); no tienen audio.
 */
export function EvidenceFigure({ media, className }: EvidenceFigureProps) {
  const meta = [
    KIND_LABELS[media.kind],
    media.date,
    media.type === "video" ? media.duration : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <figure
      id={media.id}
      className={[styles.figure, className].filter(Boolean).join(" ")}
      data-kind={media.kind}
    >
      {/* Los registros de consola no se encogen por debajo de un ancho legible:
          en pantallas estrechas, el marco se desplaza en horizontal. Es una
          región enfocable para poder desplazarla también con el teclado. */}
      <div
        className={styles.frame}
        {...(media.kind === "log" && {
          role: "region",
          tabIndex: 0,
          "aria-label": `${KIND_LABELS.log}, ${media.date} (desplazable)`,
          style: { "--log-min": `${Math.min(media.width, 720)}px` } as CSSProperties,
        })}
      >
        {media.type === "image" ? (
          <img
            className={styles.media}
            src={media.src}
            alt={media.alt}
            width={media.width}
            height={media.height}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <video
            className={styles.media}
            controls
            muted
            playsInline
            preload="none"
            poster={media.poster}
            width={media.width}
            height={media.height}
            aria-label={media.title}
          >
            <source src={media.src} type="video/mp4" />
            Tu navegador no puede reproducir este video.{" "}
            <a href={media.src}>Descargar el video ({media.title})</a>.
          </video>
        )}
      </div>
      <figcaption className={styles.caption}>
        <span className={styles.meta}>{meta}</span>
        <span>{media.caption}</span>
      </figcaption>
    </figure>
  );
}
