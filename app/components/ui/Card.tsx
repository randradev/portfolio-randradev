import type { ReactNode } from "react";

import styles from "./Card.module.css";

type CardProps = {
  children: ReactNode;
  as?: "article" | "div" | "li";
  /** Activa los estados hover/focus cuando la tarjeta contiene un enlace principal. */
  interactive?: boolean;
  className?: string;
};

/** Superficie base para proyectos y bloques de contenido. */
export function Card({
  children,
  as: Element = "article",
  interactive = false,
  className,
}: CardProps) {
  const classes = [styles.card, interactive && styles.interactive, className]
    .filter(Boolean)
    .join(" ");
  return <Element className={classes}>{children}</Element>;
}
