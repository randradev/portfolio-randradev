import type { ReactNode } from "react";

import styles from "./Card.module.css";

type CardProps = {
  children: ReactNode;
  as?: "article" | "div" | "li";
  /** Activa los estados hover/focus cuando la tarjeta contiene un enlace principal. */
  interactive?: boolean;
  /** `glass`: translúcida, solo sobre zonas con luz detrás (DESIGN-SYSTEM §10). */
  surface?: "solid" | "glass";
  className?: string;
};

/** Superficie base para proyectos y bloques de contenido. */
export function Card({
  children,
  as: Element = "article",
  interactive = false,
  surface = "solid",
  className,
}: CardProps) {
  const classes = [
    styles.card,
    surface === "glass" && styles.glass,
    interactive && styles.interactive,
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return <Element className={classes}>{children}</Element>;
}
