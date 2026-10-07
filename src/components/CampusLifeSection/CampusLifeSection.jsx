"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./CampusLifeSection.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CampusLifeSection() {
  const containerRef = useRef(null);
  const maskRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Massive Mask Reveal
      if (maskRef.current && textRef.current) {
        gsap.to(maskRef.current, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
            end: "bottom center",
            scrub: true,
          }
        });
        
        gsap.to(textRef.current, {
          yPercent: 30,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.campusContainer} ref={containerRef}>
      
      {/* Massive Typographic Parallax */}
      <div className={styles.massiveBgText} ref={textRef}>
        CULTURE · ARTS · SPORTS
      </div>

      <div className={styles.contentLayout}>
        
        {/* Left: Huge Geometric Mask Image */}
        <div className={styles.visualBlock}>
          <div className={styles.imageMask} ref={maskRef}>
            <img src="/fitimage/imgi_12_sports-scaled.jpg" alt="Campus Life" className={styles.campusImg} />
            <div className={styles.shapeOverlay} />
          </div>
        </div>

        {/* Right: Brutalist Content */}
        <div className={styles.textBlock}>
          <h2 className={styles.heading}>BEYOND<br/>ACADEMICS.</h2>
          <p className={styles.paragraph}>
            A vibrant community where passion meets opportunity. From state-of-the-art sports facilities 
            and a massive fitness center, to the electrifying arts and cultural festivals.
          </p>

          <div className={styles.tagsContainer}>
            <div className={styles.tag}>ATHLETICS</div>
            <div className={styles.tag}>TECH CLUBS</div>
            <div className={styles.tag}>ARTS FESTIVALS</div>
            <div className={styles.tag}>IDEATION LABS</div>
            <div className={styles.tag}>STUDENT SENATE</div>
          </div>
        </div>

      </div>

    </section>
  );
}
