"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./PlacementsSection.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PlacementsSection() {
  const containerRef = useRef(null);
  const marqueeRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Horizontal Marquee
      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          xPercent: -50,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          }
        });
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.placementsContainer} ref={containerRef}>
      
      {/* Massive Typographic Marquee */}
      <div className={styles.marqueeWrapper}>
        <div className={styles.marqueeTrack} ref={marqueeRef}>
          <h2>TCS · INFOSYS · IBM · WIPRO · COGNIZANT · AMAZON · TCS · INFOSYS · IBM · WIPRO · COGNIZANT · AMAZON ·</h2>
        </div>
      </div>

      <div className={styles.contentLayout}>
        <div className={styles.textColumn}>
          <h2 className={styles.heading}>GLOBAL<br/>DOMINANCE.</h2>
          <p className={styles.paragraph}>
            We maintain a phenomenal placement record with top-tier MNCs and tech giants. 
            Our dedicated Placement and Training Cell transforms raw potential into 
            globally sought-after professionals.
          </p>

          <div className={styles.statsLayout}>
            <div className={styles.statBlock}>
              <div className={styles.statNum}>300+</div>
              <div className={styles.statLabel}>RECRUITING PARTNERS</div>
            </div>
            <div className={styles.statBlock}>
              <div className={styles.statNum}>850+</div>
              <div className={styles.statLabel}>OFFERS ANNUALLY</div>
            </div>
          </div>
        </div>

        <div className={styles.imageColumn}>
          <div className={styles.geometricFrame}>
            <img src="/fitimage/imgi_4_FISAT-TCS-PLACEMENT-26-copy-1.jpg" alt="Placements" className={styles.focalImage} />
            <div className={styles.frameLines} />
          </div>
        </div>
      </div>

    </section>
  );
}
