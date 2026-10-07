"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import styles from "./VideoSection.module.css";

if (typeof window !== "undefined" && gsap && ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

export default function VideoSection() {
  const sectionRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        videoWrapperRef.current,
        { scale: 0.9, y: 50, opacity: 0 },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "center center",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section className={styles.videoSection} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.videoWrapper} ref={videoWrapperRef}>
          <video
            className={styles.videoElement}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src="/hero.webm" type="video/webm" />
          </video>
        </div>
      </div>
    </section>
  );
}
