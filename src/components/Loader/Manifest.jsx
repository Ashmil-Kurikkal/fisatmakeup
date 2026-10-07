import { formatBytes, pad } from "@/lib/loader/utils";
import styles from "./Loader.module.css";

const VISIBLE_ROWS = 4;

/**
 * Live manifest — the actual resources as they resolve, with their real
 * transfer sizes. This is the honest part of the loader: what you read here
 * is what the browser just finished.
 */
export default function Manifest({ log }) {
  const rows = log.slice(-VISIBLE_ROWS);

  return (
    <ol className={styles.manifest} aria-hidden="true">
      {rows.map((entry) => (
        <li key={entry.index} className={styles.manifestRow} data-failed={entry.failed || undefined}>
          <span className={styles.manifestIdx}>{pad(entry.index)}</span>
          <span className={styles.manifestLabel}>{entry.label}</span>
          <span className={styles.manifestLeader} />
          <span className={styles.manifestDetail}>
            {entry.kind === "image" ? (entry.failed ? "skipped" : formatBytes(entry.bytes)) : entry.detail}
          </span>
        </li>
      ))}
    </ol>
  );
}
