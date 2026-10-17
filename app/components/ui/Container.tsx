import type { ReactNode } from "react";

import styles from "./Container.module.css";

type ContainerProps = {
  children: ReactNode;
  as?: "div" | "section" | "header" | "footer" | "main" | "nav";
  className?: string;
};

/** Ancho máximo y márgenes laterales consistentes. */
export function Container({ children, as: Element = "div", className }: ContainerProps) {
  const classes = [styles.container, className].filter(Boolean).join(" ");
  return <Element className={classes}>{children}</Element>;
}
