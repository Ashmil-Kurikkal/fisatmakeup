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
  const imageRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Parallax for the massive title
      if (titleRef.current) {
        gsap.to(titleRef.current, {
          yPercent: -15,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      }

      // Smooth focal image unmasking
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)", scale: 1.1 },
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top 85%",
              end: "bottom 70%",
              scrub: 1,
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.aboutContainer} ref={containerRef}>
      
      {/* Top Divider / Decorative */}
      <div className={styles.topDivider}>
        <div className={styles.badge}>EST. 2002</div>
        <div className={styles.line} />
      </div>

      <div className={styles.contentLayout}>
        
        {/* Left: Focal Image */}
        <div className={styles.imageColumn}>
          <div className={styles.imageFrame}>
            <div className={styles.imageWrapper} ref={imageRef}>
              <img src="/fitimage/imgi_6_FISAT.jpg" alt="FISAT Campus" className={styles.image} />
            </div>
            {/* Minimalist geometry */}
            <div className={styles.geometricAccent} />
          </div>
        </div>

        {/* Right: Typography & Stats */}
        <div className={styles.textColumn}>
          
          <h2 className={styles.heading} ref={titleRef}>
            A LEGACY OF<br/>
            <span className={styles.headingAccent}>EXCELLENCE.</span>
          </h2>
          
          <p className={styles.paragraph}>
            Federal Institute of Science and Technology (FISAT) is a premier autonomous 
            engineering college established by the Federal Bank Officers' Association 
            Educational Society. We are dedicated to nurturing technical brilliance, 
            absolute leadership, and ethical integrity.
          </p>

          <div className={styles.statsGrid}>
            
            <div className={styles.statBox}>
              <div className={styles.statNum}>23+</div>
              <div className={styles.statDetails}>
                <span className={styles.statLabel}>YEARS OF TRUST</span>
                <span className={styles.statSub}>Since 2002</span>
              </div>
            </div>

            <div className={styles.statBox}>
              <div className={styles.statNum}>A+</div>
              <div className={styles.statDetails}>
                <span className={styles.statLabel}>NAAC RATING</span>
                <span className={styles.statSub}>Accredited</span>
              </div>
            </div>

            <div className={styles.statBox}>
              <div className={styles.statNum}>3K+</div>
              <div className={styles.statDetails}>
                <span className={styles.statLabel}>BRIGHT MINDS</span>
                <span className={styles.statSub}>On Campus</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
