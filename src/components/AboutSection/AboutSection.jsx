"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./AboutSection.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutSection() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Massive text parallax
      if (textRef.current) {
        gsap.to(textRef.current, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      }

      // Focal image reveal
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            ease: "none",
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top 80%",
              end: "bottom 60%",
              scrub: true,
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.aboutContainer} ref={containerRef}>
      
      {/* Massive Typographic Header */}
      <div className={styles.headerBlock}>
        <h1 className={styles.massiveTitle} ref={textRef}>
          EST<span className={styles.dot}>.</span> 2002
        </h1>
        <div className={styles.introShape} />
      </div>

      <div className={styles.contentLayout}>
        {/* Left: Focal Image with Geometric Clip */}
        <div className={styles.imageColumn}>
          <div className={styles.imageWrapper} ref={imageRef}>
            <img src="/fitimage/imgi_6_FISAT.jpg" alt="FISAT Campus" className={styles.image} />
            <div className={styles.imageOverlay}>
              <span className={styles.imageLabel}>MOOKKANNOOR, ANGAMALY</span>
            </div>
          </div>
        </div>

        {/* Right: Brutalist Typography & Stats */}
        <div className={styles.textColumn}>
          <h2 className={styles.heading}>A LEGACY OF<br/>EXCELLENCE.</h2>
          <p className={styles.paragraph}>
            Federal Institute of Science and Technology (FISAT) is a premier self-financing 
            engineering college established by the Federal Bank Officers' Association 
            Educational Society. We are dedicated to nurturing technical brilliance and absolute leadership.
          </p>

          <div className={styles.statsGrid}>
            <div className={styles.statBox}>
              <div className={styles.statLine} />
              <div className={styles.statNum}>20+</div>
              <div className={styles.statLabel}>YEARS OF TRUST</div>
            </div>
            <div className={styles.statBox}>
              <div className={styles.statLine} />
              <div className={styles.statNum}>A+</div>
              <div className={styles.statLabel}>NAAC ACCREDITED</div>
            </div>
            <div className={styles.statBox}>
              <div className={styles.statLine} />
              <div className={styles.statNum}>3K+</div>
              <div className={styles.statLabel}>BRIGHT MINDS</div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
