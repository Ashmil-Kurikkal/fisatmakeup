"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import styles from "./HomeShowcase.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HomeShowcase() {
  const containerRef = useRef(null);
  const marqueeRef = useRef(null);
  const cutOutRef = useRef(null);
  const sweepRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Marquee Animation
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        }
      });

      // 2. Geometric Cut-out Sweep
      if (cutOutRef.current && sweepRef.current) {
        gsap.to(sweepRef.current, {
          yPercent: -100,
          ease: "none",
          scrollTrigger: {
            trigger: cutOutRef.current,
            start: "top center",
            end: "bottom center",
            scrub: true,
          }
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.showcase} ref={containerRef}>
      
      {/* --- Massive Marquee Ticker --- */}
      <div className={styles.marqueeContainer}>
        <div className={styles.marqueeTrack} ref={marqueeRef}>
          <h2>
            FEDERAL INSTITUTE OF SCIENCE AND TECHNOLOGY <span className={styles.dot}>·</span> EST. 2002 <span className={styles.dot}>·</span> NAAC A+ <span className={styles.dot}>·</span> 
            FEDERAL INSTITUTE OF SCIENCE AND TECHNOLOGY <span className={styles.dot}>·</span> EST. 2002 <span className={styles.dot}>·</span> NAAC A+ <span className={styles.dot}>·</span> 
            FEDERAL INSTITUTE OF SCIENCE AND TECHNOLOGY <span className={styles.dot}>·</span> EST. 2002 <span className={styles.dot}>·</span> NAAC A+ <span className={styles.dot}>·</span> 
          </h2>
        </div>
      </div>

      {/* --- The Brutalist Grid --- */}
      <section className={styles.gridSection}>
        <div className={styles.gridContainer}>
          
          <Link href="/academics" className={styles.gridBlock}>
            <div className={styles.blockNum}>01</div>
            <div className={styles.blockTitle}>ACADEMICS</div>
            <div className={styles.blockDesc}>
              Autonomous curriculum. NBA Accredited programmes. Engineered for the frontier of technology.
            </div>
            <div className={styles.blockArrow}>↗</div>
          </Link>

          <Link href="/campus-life" className={styles.gridBlock}>
            <div className={styles.blockNum}>02</div>
            <div className={styles.blockTitle}>CAMPUS</div>
            <div className={styles.blockDesc}>
              Acres of infrastructure. State-of-the-art labs. A vibrant ecosystem of arts, sports, and culture.
            </div>
            <div className={styles.blockArrow}>↗</div>
          </Link>

          <Link href="/placements" className={styles.gridBlock}>
            <div className={styles.blockNum}>03</div>
            <div className={styles.blockTitle}>CAREERS</div>
            <div className={styles.blockDesc}>
              300+ Recruiting Partners. 850+ Offers annually. Transforming potential into global dominance.
            </div>
            <div className={styles.blockArrow}>↗</div>
          </Link>

        </div>
      </section>

      {/* --- Geometric Cut-out --- */}
      <section className={styles.cutOutSection} ref={cutOutRef}>
        <div className={styles.cutOutTextWrapper}>
          <h2 className={styles.cutOutText}>BUILD<br/>THE<br/>FUTURE</h2>
        </div>
        <div className={styles.sweepShape} ref={sweepRef} />
      </section>

      {/* --- Footer CTA (Pure Typographic) --- */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h3 className={styles.ctaHeader}>YOUR LEGACY STARTS HERE.</h3>
          <Link href="/apply" className={styles.ctaButton}>
            <span className={styles.btnText}>APPLY NOW</span>
            <span className={styles.btnShape} />
          </Link>
        </div>
      </section>

    </div>
  );
}
