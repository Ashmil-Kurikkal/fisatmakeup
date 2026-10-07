"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useAssetLoader } from "@/hooks/useAssetLoader";
import { clamp01, createGradientSampler, formatBytes, pad } from "@/lib/loader/utils";
import Sun, { centreOutOrder } from "./Sun";
import Reflection from "./Reflection";
import Tagline from "./Tagline";
import Counter from "./Counter";
import Manifest from "./Manifest";
import LocalClock from "./LocalClock";
import { lensPolygon } from "./lensClip";
import styles from "./Loader.module.css";

/* ---------------------------------------------------------------------------
   DAYBREAK — FISAT loader
   Loading is told as a sunrise over the Periyar plains: the sky warms from
   night-indigo to saffron as real bytes arrive, the emblem's sun climbs with
   them, and on completion the horizon opens like an eye onto the site.
--------------------------------------------------------------------------- */

const RAY_COUNT = 25;
const RAY_ORDER = centreOutOrder(RAY_COUNT);
const SESSION_KEY = "fisat:visited";

const PHASE_COPY = {
  type: "Setting the type",
  photographs: "Developing photographs",
  doors: "Opening the doors",
  ready: "Welcome to FISAT",
};

// Sky colour is a function of progress, not of time.
const SKY_TOP = createGradientSampler(["#e2e8f0", "#e0e7ff", "#eff6ff", "#fdfbf7"]);
const SKY_MID = createGradientSampler(["#cbd5e1", "#c7d2fe", "#f8fafc", "#fff4e5"]);
const SKY_HORIZON = createGradientSampler(["#94a3b8", "#a78bfa", "#f472b6", "#fb923c", "#fcd34d"]);
const GROUND_TOP = createGradientSampler(["#cbd5e1", "#e0e7ff", "#fdfbf7", "#fdfbf7"]);

export default function Loader({ manifest, onReveal, onComplete }) {
  const rootRef = useRef(null);
  const raysLitRef = useRef(0);
  const photoFlipRef = useRef(0);

  const handleEvent = (state, event) => {
    const root = rootRef.current;
    if (!root) return;

    if (event.type === "resource" || event.type === "timeout") {
      const target =
        event.type === "timeout"
          ? RAY_COUNT
          : Math.round((state.resourcesDone / state.resourcesTotal) * RAY_COUNT);
      const rays = root.querySelectorAll("[data-ray]");
      const from = raysLitRef.current;
      for (let k = from; k < target; k++) {
        const ray = rays[RAY_ORDER[k]];
        if (ray) {
          ray.style.transitionDelay = `${(k - from) * 55}ms`;
          ray.dataset.lit = "";
        }
      }
      raysLitRef.current = Math.max(from, target);
    }
  };

  const { stateRef, log, phase } = useAssetLoader(manifest, handleEvent);

  useEffect(() => {
    const root = rootRef.current;
    const q = (s) => root.querySelector(s);
    const qa = (s) => Array.from(root.querySelectorAll(s));

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const returning = sessionStorage.getItem(SESSION_KEY) === "1";
    const minDuration = returning ? manifest.timing.minDurationReturn : manifest.timing.minDurationFirst;

    const chars = qa("[data-char]");
    const thresholds = chars.map((_, i) => 0.06 + 0.8 * (i / Math.max(chars.length - 1, 1)));
    const cols = { 2: q('[data-col="2"]'), 1: q('[data-col="1"]'), 0: q('[data-col="0"]') };
    const countEl = q("[data-count]");
    const bytesEl = q("[data-bytes]");
    const progressEl = q("[data-progressbar]");

    let display = 0;
    let lastInt = -1;
    let lastCount = "";
    let lastBytes = "";
    let exiting = false;
    let tl = null;

    const write = (p) => {
      const pe = 1 - (1 - p) * (1 - p); 
      const s = root.style;
      s.setProperty("--p", p.toFixed(4));
      s.setProperty("--pe", pe.toFixed(4));
      s.setProperty("--sky-top", SKY_TOP(p));
      s.setProperty("--sky-mid", SKY_MID(p));
      s.setProperty("--sky-horizon", SKY_HORIZON(p));
      s.setProperty("--ground-top", GROUND_TOP(p));

      const n = Math.min(100, Math.floor(p * 100 + 1e-6));
      if (n !== lastInt) {
        lastInt = n;
        if (cols[2]) cols[2].style.setProperty("--n", Math.floor(n / 100));
        if (cols[1]) cols[1].style.setProperty("--n", Math.floor(n / 10));
        if (cols[0]) cols[0].style.setProperty("--n", n);
        if (cols[2]) cols[2].toggleAttribute("data-dim", n < 100);
        if (cols[1]) cols[1].toggleAttribute("data-dim", n < 10);
        if (cols[0]) cols[0].toggleAttribute("data-dim", n === 0);
        if (progressEl) progressEl.setAttribute("aria-valuenow", String(n));
        for (let i = 0; i < chars.length; i++) {
          if (p >= thresholds[i] && chars[i]) chars[i].dataset.on = "";
        }
      }
    };

    const writeStats = (st) => {
      const count = `${pad(st.resourcesDone)} / ${pad(st.resourcesTotal)}`;
      if (count !== lastCount && countEl) countEl.textContent = lastCount = count;
      const bytes = st.bytesTotal ? `${formatBytes(st.bytesLoaded)} of ${formatBytes(st.bytesTotal)}` : "Connecting…";
      if (bytes !== lastBytes && bytesEl) bytesEl.textContent = lastBytes = bytes;
    };

    const playExit = () => {
      sessionStorage.setItem(SESSION_KEY, "1");

      if (reduced) {
        tl = gsap.timeline({ onComplete });
        tl.call(onReveal, null, 0.2).to(root, { opacity: 0, duration: 0.5, ease: "none" }, 0.2);
        return;
      }

      const sky = q("[data-sky]");
      const ground = q("[data-ground]");
      const app = document.querySelector("[data-app]");
      const logo = q("[data-fisat-logo]");
      const lens = { bend: 0 };
      const bendPx = Math.min(window.innerHeight * 0.24, 240);
      const skyDepth = sky ? (bendPx / sky.offsetHeight) * 100 : 0;
      const groundDepth = ground ? (bendPx / ground.offsetHeight) * 100 : 0;
      
      const applyLens = () => {
        if (sky) sky.style.clipPath = lensPolygon("bottom", lens.bend * skyDepth);
        if (ground) ground.style.clipPath = lensPolygon("top", lens.bend * groundDepth);
      };

      tl = gsap.timeline({ onComplete });
      if (returning) tl.timeScale(1.35);

      // We make the FISAT logo explode into the screen as the loader finishes
      tl.to(q("[data-flame]"), { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(2.4)" }, 0)
        .to(q("[data-sun-body]"), { yPercent: -14, duration: 1.2, ease: "power3.inOut" }, 0)
        .to(qa("[data-exit-fade]"), { opacity: 0, y: -10, duration: 0.5, ease: "power2.in", stagger: 0.035 }, 0.12)
        .to(chars, { yPercent: -112, duration: 0.65, ease: "power3.in", stagger: { each: 0.014, from: "center" } }, 0.18)
        .to(q("[data-counter]"), { yPercent: -14, opacity: 0, duration: 0.6, ease: "power3.in" }, 0.24)
        .to(logo, { scale: 20, opacity: 0, duration: 1.5, ease: "expo.in" }, 0.5) // LOGO ZOOM REVEAL
        .addLabel("open", 1.0)
        .to(q("[data-horizon]"), { scaleY: 3, opacity: 0, duration: 0.4, ease: "power2.out" }, "open")
        .to(lens, { bend: 1, duration: 1.3, ease: "expo.inOut", onUpdate: applyLens }, "open")
        .to(sky, { yPercent: -101, duration: 1.3, ease: "expo.inOut" }, "open")
        .to(ground, { yPercent: 101, duration: 1.3, ease: "expo.inOut" }, "open")
        .call(onReveal, null, "open+=0.35");

      if (app) {
        tl.fromTo(
          app,
          { scale: 1.06, transformOrigin: "50% 60%" },
          { scale: 1, duration: 1.7, ease: "expo.out", clearProps: "transform,transformOrigin" },
          "open+=0.15"
        );
      }
    };

    const tick = (_time, deltaMs) => {
      const st = stateRef.current;
      if (!st || exiting) return;

      const dt = Math.min(deltaMs, 64) / 1000;
      const target = clamp01(st.progress);
      if (display < target) {
        const eased = (target - display) * (1 - Math.exp(-dt * 5));
        display += Math.min(Math.max(eased, dt * 0.12), dt / minDuration, target - display);
      }

      write(display);
      writeStats(st);

      if (st.complete && display >= 0.9999) {
        exiting = true;
        write(1);
        gsap.ticker.remove(tick);
        playExit();
      }
    };

    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      tl?.kill();
    };
  }, [manifest, onReveal, onComplete, stateRef]);

  return (
    <div ref={rootRef} className={styles.loader} data-loader-active="">
      <div
        className="visually-hidden"
        role="progressbar"
        aria-label="Loading the FISAT website"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={0}
        data-progressbar
      />

      {/* Massive floating FISAT LOGO embedded in the sky */}
      <img src="/FISAT_LOGO.png" alt="FISAT" className={styles.massiveLogo} data-fisat-logo />

      {/* ---------------- Sky ---------------- */}
      <div className={styles.sky} data-sky>
        <div className={styles.skyGlow} aria-hidden="true" />
        <Sun rayCount={RAY_COUNT} />

        <header className={styles.topbar}>
          <div className={styles.brand} data-exit-fade>
            <span className={styles.wordmark}>FISAT</span>
            <span className={styles.brandRule} aria-hidden="true" />
            <span className={styles.brandName}>
              Federal Institute of
              <br />
              Science and Technology
            </span>
          </div>
        </header>
      </div>

      <div className={styles.horizon} data-horizon aria-hidden="true">
        <span className={styles.horizonFill} />
      </div>

      {/* ---------------- Ground ---------------- */}
      <div className={styles.ground} data-ground>
        <Reflection />

        <div className={styles.footer}>
          <div className={styles.counterBlock}>
            <Counter />
          </div>
        </div>
      </div>
    </div>
  );
}
