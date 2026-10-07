import { seeded } from "@/lib/loader/utils";
import styles from "./Loader.module.css";

/**
 * Sun-glitter on water. Bars follow perspective — thin and dense near the
 * horizon, thicker and sparser toward the viewer — and each one drifts on its
 * own phase. Geometry is generated from a fixed seed (2002, the year FISAT
 * was founded) so server and client markup match exactly.
 */
const BAR_COUNT = 17;

function buildBars() {
  const rnd = seeded(2002);
  return Array.from({ length: BAR_COUNT }, (_, k) => {
    const t = k / (BAR_COUNT - 1);
    const width = 38 + rnd() * 34 + t * 10;
    const x = 50 - width / 2 + (rnd() - 0.5) * 8;
    return {
      x: x.toFixed(2),
      y: (Math.pow(t, 1.6) * 94).toFixed(2),
      width: width.toFixed(2),
      height: (0.7 + t * 3.4).toFixed(2),
      opacity: (1 - t * 0.78).toFixed(3),
      drift: (1.5 + rnd() * 3).toFixed(2),
    };
  });
}

const BARS = buildBars();

export default function Reflection() {
  return (
    <svg
      className={styles.reflection}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="loader-reflection" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fbe6c4" />
          <stop offset="0.35" stopColor="#f4b565" />
          <stop offset="1" stopColor="#d9741a" stopOpacity="0" />
        </linearGradient>
      </defs>
      {BARS.map((b, i) => (
        <rect
          key={i}
          className={styles.reflectionBar}
          x={b.x}
          y={b.y}
          width={b.width}
          height={b.height}
          rx={b.height / 2}
          opacity={b.opacity}
          fill="url(#loader-reflection)"
          style={{ "--i": i, "--dx": b.drift }}
        />
      ))}
    </svg>
  );
}
