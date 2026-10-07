import styles from "./Loader.module.css";

/**
 * Three-column odometer. Each column is a strip of digits translated by
 * `--n` (set imperatively). Strips are long enough that the count only ever
 * rolls forward — 9 → 0 never rewinds through 8…1.
 *   hundreds: 0–1   tens: 0–10   ones: 0–100
 * Weight and the SOFT axis are tied to progress in CSS, so the numerals
 * sharpen from soft-light to firm-semibold as the site resolves.
 */
const COLUMNS = [
  { key: "2", length: 2 },
  { key: "1", length: 11 },
  { key: "0", length: 101 },
];

export default function Counter() {
  return (
    <div className={styles.counter} data-counter aria-hidden="true">
      {COLUMNS.map((col) => (
        <span key={col.key} className={styles.digitCol} data-col={col.key} data-dim="">
          <span className={styles.digitStrip}>
            {Array.from({ length: col.length }, (_, i) => (
              <span key={i} className={styles.digit}>
                {i % 10}
              </span>
            ))}
          </span>
        </span>
      ))}
      <span className={styles.percent}>%</span>
    </div>
  );
}
