/** Small, dependency-free helpers shared by the loader visuals. */

/** Deterministic PRNG so SSR and client generate identical "random" geometry. */
export function seeded(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const hexToRgb = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

/** Returns t∈[0,1] → "rgb(r g b)" sampled across any number of colour stops. */
export function createGradientSampler(stops) {
  const rgb = stops.map(hexToRgb);
  const last = rgb.length - 1;
  return (t) => {
    const x = Math.min(Math.max(t, 0), 1) * last;
    const i = Math.min(Math.floor(x), last - 1);
    const f = x - i;
    const a = rgb[i];
    const b = rgb[i + 1];
    const c = (k) => Math.round(a[k] + (b[k] - a[k]) * f);
    return `rgb(${c(0)} ${c(1)} ${c(2)})`;
  };
}

export function formatBytes(bytes) {
  if (!bytes) return "—";
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export const pad = (n, len = 2) => String(n).padStart(len, "0");

export const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
