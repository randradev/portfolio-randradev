import styles from "./Timeline.module.css";

export type TimelineEntry = {
  key: string;
  period: string;
  title: string;
  subtitle: string;
  description?: string;
};

/** Lista cronológica (más reciente primero) para trayectoria y formación. */
export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ol className={styles.list}>
      {entries.map((entry) => (
        <li key={entry.key} className={styles.item}>
          <p className={styles.period}>{entry.period}</p>
          <div className={styles.body}>
            <h3 className={styles.title}>{entry.title}</h3>
            <p className={styles.subtitle}>{entry.subtitle}</p>
            {entry.description && (
              <p className={styles.description}>{entry.description}</p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
