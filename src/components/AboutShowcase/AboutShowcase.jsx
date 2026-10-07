"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutSection from "@/components/AboutSection/AboutSection";
import styles from "./AboutShowcase.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutShowcase() {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const visionRef = useRef(null);
  const missionRef = useRef(null);
  const pinRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Hero Parallax & Fade
      if (textRef.current && heroRef.current) {
        gsap.to(textRef.current, {
          yPercent: 50,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          }
        });
      }

      // Horizontal Scroll for Vision / Mission pinning
      if (pinRef.current) {
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinRef.current,
            start: "top top",
            end: "+=150%",
            pin: true,
            scrub: 1,
          }
        });
        
        tl.to(visionRef.current, { xPercent: -100, ease: "none" }, 0)
          .fromTo(missionRef.current, { xPercent: 100 }, { xPercent: 0, ease: "none" }, 0);
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.aboutPageWrapper}>
      
      {/* 1. Hero Section */}
      <section className={styles.heroSection} ref={heroRef}>
        <div className={styles.heroBg}>
          <img src="/fitimage/imgi_24_DSC02156-scaled-e1707299276592.jpg" alt="Campus Aerial" />
          <div className={styles.heroOverlay} />
        </div>
        <div className={styles.heroContent} ref={textRef}>
          <div className={styles.heroLabel}>FEDERAL INSTITUTE OF SCIENCE AND TECHNOLOGY</div>
          <h1 className={styles.heroTitle}>WE BUILD<br/>THE <span className={styles.italic}>FUTURE.</span></h1>
        </div>
      </section>

      {/* 2. The Legacy (The component we already perfected) */}
      <AboutSection />

      {/* 3. Vision & Mission (Horizontal Pin) */}
      <section className={styles.pinSection} ref={pinRef}>
        <div className={styles.pinContainer}>
          
          <div className={`${styles.panel} ${styles.visionPanel}`} ref={visionRef}>
            <div className={styles.panelContent}>
              <h2 className={styles.panelTitle}>OUR VISION.</h2>
              <p className={styles.panelText}>
                To become a world-class professional institution that 
                nurtures technical brilliance and absolute leadership, 
                fostering innovation and contributing to the technological 
                advancement of society.
              </p>
              <div className={styles.massiveWatermark}>VISION</div>
            </div>
          </div>

          <div className={`${styles.panel} ${styles.missionPanel}`} ref={missionRef}>
            <div className={styles.panelContent}>
              <h2 className={styles.panelTitle}>OUR MISSION.</h2>
              <p className={styles.panelText}>
                To provide quality education in engineering and technology, 
                promote research and development, and instill ethical values 
                in students to transform them into globally competent professionals.
              </p>
              <div className={styles.massiveWatermark}>MISSION</div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Leadership & Governance (Brutalist Grid) */}
      <section className={styles.leadershipSection}>
        <div className={styles.leadershipContainer}>
          <div className={styles.leadershipHeader}>
            <h2>GOVERNANCE.</h2>
            <div className={styles.line} />
          </div>
          
          <div className={styles.leaderGrid}>
            <div className={styles.leaderCard}>
              <div className={styles.leaderImagePlaceholder}>
                <div className={styles.geometricCut} />
              </div>
              <h3 className={styles.leaderName}>Shimith P R</h3>
              <p className={styles.leaderRole}>Chairman, Governing Body</p>
            </div>
            
            <div className={styles.leaderCard}>
              <div className={styles.leaderImagePlaceholder}>
                <div className={styles.geometricCut} />
              </div>
              <h3 className={styles.leaderName}>Dr. Jacob Thomas V</h3>
              <p className={styles.leaderRole}>Principal</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
