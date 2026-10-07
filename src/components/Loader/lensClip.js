/**
 * Builds a clip-path polygon for one half of the "horizon split" reveal.
 * The edge bows with a softened sine so the opening reads as an eye / lens
 * rather than a straight wipe.
 *
 * @param edge   "bottom" → bottom edge bows upward (sky panel)
 *               "top"    → top edge bows downward (ground panel)
 * @param depth  bow depth at the centre, in % of the panel's own height
 */
export function lensPolygon(edge, depth, segments = 36) {
  const pts = [];
  const y = (x) => depth * Math.pow(Math.sin(Math.PI * x), 0.72);
  const fmt = (x, v) => `${(x * 100).toFixed(2)}% ${v.toFixed(2)}%`;

  if (edge === "bottom") {
    pts.push("0% 0%", "100% 0%");
    for (let i = segments; i >= 0; i--) {
      const x = i / segments;
      pts.push(fmt(x, 100 - y(x)));
    }
  } else {
    for (let i = 0; i <= segments; i++) {
      const x = i / segments;
      pts.push(fmt(x, y(x)));
    }
    pts.push("100% 100%", "0% 100%");
  }
  return `polygon(${pts.join(",")})`;
}
