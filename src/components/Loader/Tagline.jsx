import styles from "./Loader.module.css";

/**
 * Tagline split into per-character masks. Characters are not timed — each one
 * owns a slice of the progress range and rises only when real loading passes
 * its threshold (set imperatively by the Loader via [data-on]).
 *
 * @param text      the line to set
 * @param emphasis  word to colour as the accent (e.g. "Excellence")
 */
export default function Tagline({ text, emphasis }) {
  const words = text.split(" ");
  let charIndex = 0;

  return (
    <p className={styles.tagline} aria-label={text}>
      {words.map((word, wi) => (
        <span
          key={wi}
          className={`${styles.word} ${word === emphasis ? styles.wordEmphasis : ""}`}
          aria-hidden="true"
        >
          {[...word].map((ch, ci) => {
            const i = charIndex++;
            return (
              <span key={ci} className={styles.charMask}>
                <span className={styles.char} data-char style={{ "--i": i }}>
                  {ch}
                </span>
              </span>
            );
          })}
        </span>
      ))}
    </p>
  );
}
