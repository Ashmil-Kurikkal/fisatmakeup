"use client";
import React, { useEffect, useRef, useState } from "react";
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
  const videoWrapperRef = useRef(null);
  const focalImageRef = useRef(null);
  const videoRef = useRef(null);
  
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      setProgress((current / duration) * 100);
    }
  };

  const handleSeek = (e) => {
    if (videoRef.current) {
      const bar = e.currentTarget;
      const rect = bar.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newTime = (clickX / rect.width) * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
    }
  };

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

      // 2. Video Scale & Radius Animation (Bleeding Edge Scroll)
      if (videoWrapperRef.current) {
        gsap.fromTo(
          videoWrapperRef.current,
          { scale: 0.8, borderRadius: "80px" },
          {
            scale: 1,
            borderRadius: "20px",
            ease: "none",
            scrollTrigger: {
              trigger: videoWrapperRef.current,
              start: "top bottom",
              end: "center center",
              scrub: true,
            }
          }
        );
      }

      // 3. Focal Image Parallax
      if (focalImageRef.current) {
        gsap.to(focalImageRef.current, {
          yPercent: 30,
          ease: "none",
          scrollTrigger: {
            trigger: focalImageRef.current.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      }

      // 4. Geometric Cut-out Sweep
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

      {/* --- The Autoplay Video focal point --- */}
      <section className={styles.videoSection}>
        <div className={styles.videoHeader}>
          <h3>CINEMATIC EXCELLENCE</h3>
          <p>Experience the campus through our lens.</p>
        </div>
        <div className={styles.videoWrapper} ref={videoWrapperRef}>
          <video 
            ref={videoRef}
            src="/hero.webm#t=1" 
            autoPlay 
            muted 
            loop 
            playsInline
            className={styles.videoElement}
            onClick={togglePlay}
            onTimeUpdate={handleTimeUpdate}
          />
          <div className={styles.playerBar}>
            <button className={styles.playButton} onClick={togglePlay} aria-label="Play/Pause">
              {isPlaying ? (
                <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </button>
            <div className={styles.progressBarContainer} onClick={handleSeek}>
              <div className={styles.progressBar} style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      </section>

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

      {/* --- Single High-Impact Focal Image Section --- */}
      <section className={styles.focalSection}>
        <div className={styles.focalLayout}>
          <div className={styles.focalTypography}>
            <h2>THE<br/>EPICENTER<br/>OF IDEA.</h2>
          </div>
          <div className={styles.focalImageContainer}>
            <img 
              ref={focalImageRef}
              src="/fitimage/imgi_14_library-scaled.jpg" 
              alt="FISAT Library" 
              className={styles.focalImage}
            />
          </div>
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
