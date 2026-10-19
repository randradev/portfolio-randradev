import type { CaseStudyPoint } from "~/content/types";

import styles from "./PointList.module.css";
import shared from "./shared.module.css";

type PointListProps = {
  points: CaseStudyPoint[];
  label: string;
  /**
   * `columns`: ideas paralelas, en columnas desde tablet.
   * `sequence`: pasos en orden, unidos por un riel vertical.
   */
  layout?: "columns" | "sequence";
};

/** Lista ordenada de ideas o pasos con índice en mono (01, 02…). */
export function PointList({ points, label, layout = "columns" }: PointListProps) {
  return (
    <ol className={`${styles.list} ${styles[layout]}`} aria-label={label}>
      {points.map((point, index) => (
        <li key={point.title} className={styles.point}>
          <span className={`${shared.index} ${styles.index}`} aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className={styles.title}>{point.title}</h3>
          <p className={styles.description}>{point.description}</p>
        </li>
      ))}
    </ol>
  );
}
