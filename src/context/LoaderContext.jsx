"use client";
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import Loader from "@/components/Loader/Loader";

/**
 * stage:
 *   "loading"   – loader visible, assets resolving
 *   "revealing" – the horizon has split; page intros should start now
 *   "done"      – loader unmounted
 */
const LoaderContext = createContext({
  stage: "done",
  isRevealing: true,
  isDone: true,
});

export function LoaderProvider({ manifest, children }) {
  const [stage, setStage] = useState("loading");

  const handleReveal = useCallback(() => setStage("revealing"), []);
  const handleComplete = useCallback(() => setStage("done"), []);

  const value = useMemo(
    () => ({
      stage,
      isRevealing: stage !== "loading",
      isDone: stage === "done",
    }),
    [stage],
  );

  return (
    <LoaderContext.Provider value={value}>
      {children}
      {stage !== "done" && (
        <Loader manifest={manifest} onReveal={handleReveal} onComplete={handleComplete} />
      )}
    </LoaderContext.Provider>
  );
}

/** Use in any page section to gate its intro animation on the loader. */
export const useLoader = () => useContext(LoaderContext);
