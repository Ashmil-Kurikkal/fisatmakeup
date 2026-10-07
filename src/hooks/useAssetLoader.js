"use client";
import { useEffect, useEffectEvent, useRef, useState } from "react";
import { createAssetLoader } from "@/lib/loader/createAssetLoader";

/**
 * React bridge for the asset loader.
 *
 * High-frequency data (byte progress) is exposed through `stateRef` so the
 * render loop can read it every frame without React re-rendering.
 * Low-frequency events (a resource finished, phase changed) become state.
 *
 * @param manifest  stable (module-level) preload manifest
 * @param onEvent   optional (state, event) => void, called for every event
 */
export function useAssetLoader(manifest, onEvent) {
  const stateRef = useRef(null);
  const [log, setLog] = useState([]);
  const [phase, setPhase] = useState("type");

  const handleEvent = useEffectEvent((state, event) => {
    onEvent?.(state, event);
  });

  useEffect(() => {
    const loader = createAssetLoader(manifest);
    stateRef.current = loader.state;

    const unsubscribe = loader.subscribe((state, event) => {
      if (event.type === "resource") {
        setLog((prev) => [...prev, { ...event.entry, index: prev.length + 1 }]);
      } else if (event.type === "phase") {
        setPhase(event.phase);
      }
      handleEvent(state, event);
    });

    loader.start();

    return () => {
      unsubscribe();
      loader.destroy();
      setLog([]);
      setPhase("type");
    };
  }, [manifest]);

  return { stateRef, log, phase };
}
