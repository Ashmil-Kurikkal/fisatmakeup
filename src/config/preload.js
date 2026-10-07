/**
 * Preload manifest — the assets the first screen genuinely needs before it
 * can be shown without pop-in. The loader's progress is computed from these
 * (bytes streamed + decode), plus web-font readiness and window `load`.
 *
 * Keep this list to above-the-fold assets only. Every entry adds real wait
 * time on slow connections. Avoid multi-MB PNGs here.
 */
export const HOME_PRELOAD = {
  images: [
    { src: "/fitimage/imgi_24_DSC02156-scaled-e1707299276592.jpg", label: "Electronics lab" },
    { src: "/fitimage/imgi_14_library-scaled.jpg", label: "Central library" },
    { src: "/fitimage/imgi_10_IDEA-LAB-BANNER-scaled.jpg", label: "IDEA Lab" },
    { src: "/fitimage/imgi_8_CSE-Banner-copy-scaled.jpg", label: "Computer Science" },
    { src: "/fitimage/imgi_26_Surveying-scaled-1.jpg", label: "Civil · Surveying" },
    { src: "/fitimage/imgi_12_sports-scaled.jpg", label: "Sports complex" },
    { src: "/fitimage/imgi_6_FISAT.jpg", label: "Rankings 2026" },
  ],

  /** Share of the progress bar each resource class owns (sums to 1). */
  weights: { fonts: 0.12, images: 0.78, document: 0.1 },

  timing: {
    /** Progress can never travel 0→100 faster than this on a first visit (s). */
    minDurationFirst: 2.4,
    /** Same, for a returning visitor within the session (s). */
    minDurationReturn: 0.8,
    /** Hard ceiling — after this the site opens regardless (s). */
    timeout: 15,
  },
};
