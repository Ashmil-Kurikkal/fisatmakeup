"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Trophy, Globe, Rocket, ShieldCheck, Zap } from "lucide-react";
import styles from "./WowBentoBox.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ICONS = {
  Sparkles: <Sparkles size={24} />,
  Trophy: <Trophy size={24} />,
  Globe: <Globe size={24} />,
  Rocket: <Rocket size={24} />,
  ShieldCheck: <ShieldCheck size={24} />,
  Zap: <Zap size={24} />
};

export default function WowBentoBox({ title = "Discover the Extraordinary", subtitle = "Elevating the standard of excellence.", features = [] }) {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        ".bentoCard",
        { y: 60, opacity: 0, scale: 0.95 },
        { 
          y: 0, opacity: 1, scale: 1, 
          duration: 0.8, stagger: 0.1, ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.wrapper} ref={containerRef}>
      <div className={styles.backgroundGlow} aria-hidden="true" />
      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.subtitle}>{subtitle}</span>
          <h2 className={styles.title}>{title}</h2>
        </header>
        <div className={styles.bentoGrid}>
          {features.map((feature, i) => (
            <div key={i} className={`${styles.card} bentoCard ${feature.large ? styles.largeCard : ""}`}>
              <div className={styles.cardGlow} aria-hidden="true" />
              <div className={styles.cardContent}>
                <div className={styles.iconBox}>
                  {ICONS[feature.icon] || <Sparkles size={24} />}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
