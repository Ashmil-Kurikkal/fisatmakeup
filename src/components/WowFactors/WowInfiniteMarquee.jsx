"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import styles from "./WowInfiniteMarquee.module.css";

export default function WowInfiniteMarquee({ text = "FEDERAL INSTITUTE OF SCIENCE AND TECHNOLOGY", speed = 30, images = [] }) {
  const trackRef = useRef(null);

  useEffect(() => {
    // We rely on pure CSS animation for the marquee for silky smooth performance
    // GSAP is just used for entry animation here
    let ctx = gsap.context(() => {
      gsap.fromTo(
        trackRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.marqueeSection}>
      <div className={styles.marqueeContainer}>
        <div 
          className={styles.marqueeTrack} 
          ref={trackRef} 
          style={{ animationDuration: `${speed}s` }}
        >
          {/* Double the content for seamless looping */}
          {[1, 2].map((group) => (
            <div key={group} className={styles.marqueeGroup}>
              <span className={styles.marqueeText}>{text}</span>
              {images.length > 0 && (
                <div className={styles.imageWrap}>
                  <img src={images[0]} alt="Marquee feature" />
                </div>
              )}
              <span className={styles.marqueeTextOutline}>{text}</span>
              {images.length > 1 && (
                <div className={styles.imageWrap}>
                  <img src={images[1]} alt="Marquee feature 2" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
