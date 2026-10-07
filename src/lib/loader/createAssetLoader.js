/**
 * createAssetLoader — framework-agnostic loading engine.
 *
 * Tracks three resource classes and reports a single weighted progress value:
 *   • fonts     → document.fonts.ready
 *   • images    → streamed with fetch() so progress is byte-accurate, then
 *                 decoded off-thread via HTMLImageElement.decode() so the
 *                 first paint after reveal never janks
 *   • document  → window "load"
 *
 * Nothing here is simulated. If the network stalls, progress stalls.
 */

const UNKNOWN_SIZE_WEIGHT = 250_000; // bytes assumed until Content-Length arrives

// Keep decoded images referenced so the browser's in-memory image cache keeps
// them warm for the <img> elements that render after the reveal.
const retained = new Map();

async function streamAsset(src, signal, onBytes) {
  const res = await fetch(src, { signal, cache: "force-cache" });
  if (!res.ok) throw new Error(`${res.status} ${src}`);

  const total = Number(res.headers.get("content-length")) || 0;
  onBytes(0, total);

  if (!res.body || typeof res.body.getReader !== "function") {
    const buf = await res.arrayBuffer();
    onBytes(buf.byteLength, total || buf.byteLength);
    return total || buf.byteLength;
  }

  const reader = res.body.getReader();
  let loaded = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    loaded += value.byteLength;
    onBytes(loaded, total);
  }
  return total || loaded;
}

function decodeImage(src) {
  const img = new Image();
  img.decoding = "async";
  img.src = src;
  retained.set(src, img);
  return img.decode().catch(() => {});
}

export function createAssetLoader({ images, weights, timing }) {
  const state = {
    fonts: 0,
    document: 0,
    items: images.map((asset, i) => ({
      ...asset,
      id: i,
      loaded: 0,
      total: 0,
      done: false,
      failed: false,
    })),
    progress: 0,
    phase: "type",
    resourcesDone: 0,
    resourcesTotal: images.length + 2,
    bytesLoaded: 0,
    bytesTotal: 0,
    complete: false,
    timedOut: false,
  };

  const listeners = new Set();
  const controller = new AbortController();
  let timeoutId = 0;
  let destroyed = false;

  function recompute() {
    let num = 0;
    let den = 0;
    let bytesLoaded = 0;
    let bytesTotal = 0;
    let doneImages = 0;

    for (const it of state.items) {
      const w = it.total || UNKNOWN_SIZE_WEIGHT;
      const frac = it.done ? 1 : it.total ? Math.min(it.loaded / it.total, 0.97) : 0;
      num += w * frac;
      den += w;
      bytesLoaded += it.done ? it.total || it.loaded : it.loaded;
      bytesTotal += it.total;
      if (it.done) doneImages++;
    }

    const imageProgress = den ? num / den : 1;
    state.bytesLoaded = bytesLoaded;
    state.bytesTotal = bytesTotal;
    state.resourcesDone = doneImages + (state.fonts === 1) + (state.document === 1);
    state.progress =
      weights.fonts * state.fonts +
      weights.images * imageProgress +
      weights.document * state.document;

    const nextPhase =
      state.fonts < 1
        ? "type"
        : imageProgress < 1
          ? "photographs"
          : state.document < 1
            ? "doors"
            : "ready";

    const phaseChanged = nextPhase !== state.phase;
    state.phase = nextPhase;
    state.complete = nextPhase === "ready";
    return phaseChanged;
  }

  function emit(event) {
    if (destroyed) return;
    const phaseChanged = recompute();
    listeners.forEach((fn) => fn(state, event));
    if (phaseChanged) listeners.forEach((fn) => fn(state, { type: "phase", phase: state.phase }));
  }

  function loadFonts() {
    const ready = typeof document !== "undefined" && document.fonts ? document.fonts.ready : Promise.resolve();
    ready.then(() => {
      if (state.fonts === 1) return;
      state.fonts = 1;
      emit({ type: "resource", entry: { kind: "fonts", label: "Typefaces", detail: "3 families" } });
    });
  }

  function loadDocument() {
    const finish = () => {
      if (state.document === 1) return;
      state.document = 1;
      emit({ type: "resource", entry: { kind: "document", label: "Page structure", detail: "ready" } });
    };
    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });
  }

  function loadImage(item) {
    streamAsset(item.src, controller.signal, (loaded, total) => {
      item.loaded = loaded;
      if (total) item.total = total;
      emit({ type: "progress" });
    })
      .then(() => decodeImage(item.src))
      .catch((err) => {
        if (controller.signal.aborted) return;
        item.failed = true;
        console.warn("[loader] asset failed, continuing:", err?.message ?? err);
      })
      .finally(() => {
        if (controller.signal.aborted || item.done) return;
        item.done = true;
        emit({
          type: "resource",
          entry: {
            kind: "image",
            label: item.label,
            src: item.src,
            bytes: item.total || item.loaded,
            failed: item.failed,
          },
        });
      });
  }

  return {
    state,
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    start() {
      loadFonts();
      state.items.forEach(loadImage);
      loadDocument();
      timeoutId = window.setTimeout(() => {
        if (state.complete) return;
        state.timedOut = true;
        state.fonts = 1;
        state.document = 1;
        state.items.forEach((it) => (it.done = true));
        emit({ type: "timeout" });
      }, timing.timeout * 1000);
    },
    destroy() {
      destroyed = true;
      controller.abort();
      window.clearTimeout(timeoutId);
      listeners.clear();
    },
  };
}
