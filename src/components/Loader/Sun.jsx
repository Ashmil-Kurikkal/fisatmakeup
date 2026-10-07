import styles from "./Loader.module.css";

/**
 * The rising sun — lifted from the FISAT emblem (sun disc + ray arc + lamp
 * flame) and turned into a progress instrument:
 *   • its altitude is driven by loading progress (CSS var --pe)
 *   • each ray ignites when a real resource finishes (bursts = network beats)
 *   • every decoded photograph is exposed briefly inside the disc as a
 *     duotone, so the sun literally "develops" the campus it's loading
 *   • the red flame — the emblem's only red — lights once, at completion
 */

const ARC_START = -168;
const ARC_END = -12;
const R_INNER = 57;

export function buildRays(count) {
  return Array.from({ length: count }, (_, i) => {
    const deg = ARC_START + ((ARC_END - ARC_START) * i) / (count - 1);
    const rad = (deg * Math.PI) / 180;
    const rOuter = i % 2 === 0 ? 66 : 71;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    return {
      x1: (cos * R_INNER).toFixed(3),
      y1: (sin * R_INNER).toFixed(3),
      x2: (cos * rOuter).toFixed(3),
      y2: (sin * rOuter).toFixed(3),
    };
  });
}

/** Centre-out ignition order: 12, 11, 13, 10, 14 … */
export function centreOutOrder(count) {
  const mid = Math.floor(count / 2);
  const order = [mid];
  for (let d = 1; order.length < count; d++) {
    if (mid - d >= 0) order.push(mid - d);
    if (mid + d < count) order.push(mid + d);
  }
  return order;
}

export default function Sun({ rayCount }) {
  const rays = buildRays(rayCount);

  return (
    <div className={styles.sunTrack} aria-hidden="true">
      <div className={styles.sunBody} data-sun-body>
        <svg className={styles.rays} viewBox="-90 -90 180 180" overflow="visible">
          {rays.map((r, i) => (
            <line key={i} {...r} pathLength="1" className={styles.ray} data-ray />
          ))}
          <path
            className={styles.flame}
            data-flame
            d="M0,-89 C2.6,-84.6 5.2,-81.4 5.2,-78.2 A5.2,5.2 0 1 1 -5.2,-78.2 C-5.2,-81.4 -2.6,-84.6 0,-89 Z"
          />
        </svg>

        <div className={styles.disc}>
          <img className={styles.sunLogo} src="FISAT_LOGO.png" alt="FISAT Logo" />
          <span className={styles.discExtinction} />
        </div>
      </div>
    </div>
  );
}
