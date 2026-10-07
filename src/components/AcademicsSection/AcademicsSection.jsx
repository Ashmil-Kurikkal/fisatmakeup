"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./AcademicsSection.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AcademicsSection() {
  const containerRef = useRef(null);
  const marqueeRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          yPercent: -30,
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
    <section className={styles.academicsContainer} ref={containerRef}>
      
      {/* Massive Vertical Marquee Background */}
      <div className={styles.verticalMarquee} aria-hidden="true">
        <div className={styles.marqueeTrack} ref={marqueeRef}>
          ACADEMICS · ACADEMICS · ACADEMICS · ACADEMICS
        </div>
      </div>

      <div className={styles.contentWrapper}>
        
        <div className={styles.introBlock}>
          <h2 className={styles.introTitle}>ENGINEERED FOR<br/>THE FRONTIER.</h2>
          <p className={styles.introText}>
            Autonomous curriculum designed in collaboration with industry leaders. We blend rigorous theoretical foundations with hands-on practical applications in state-of-the-art AI labs and FabLabs.
          </p>
        </div>

        <div className={styles.coursesGrid}>
          
          {/* B.Tech Column */}
          <div className={styles.courseColumn}>
            <div className={styles.columnHeader}>
              <h3>B.TECH</h3>
              <div className={styles.columnShape} />
            </div>
            <ul className={styles.courseList}>
              <li>Computer Science & Engineering</li>
              <li>Artificial Intelligence & Data Science</li>
              <li>Electronics & Communication</li>
              <li>Mechanical Engineering</li>
              <li>Civil Engineering</li>
              <li>Electrical & Electronics</li>
            </ul>
          </div>

          {/* Focal Image Divider */}
          <div className={styles.focalDivider}>
            <img src="/fitimage/imgi_10_IDEA-LAB-BANNER-scaled.jpg" alt="Idea Lab" className={styles.focalImg} />
            <div className={styles.focalAccent} />
          </div>

          {/* PG Column */}
          <div className={styles.courseColumn}>
            <div className={styles.columnHeader}>
              <h3>POSTGRAD</h3>
              <div className={styles.columnShape} />
            </div>
            <ul className={styles.courseList}>
              <li>Master of Business Administration (MBA)</li>
              <li>Master of Computer Applications (MCA)</li>
              <li>M.Tech in VLSI & Embedded Systems</li>
              <li>M.Tech in Structural Engineering</li>
              <li>M.Tech in Computer Science</li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
