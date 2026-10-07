"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useLoader } from "@/context/LoaderContext";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import styles from "./Hero.module.css";

/**
 * FISAT — Hero · "The Cinematic Canvas"
 * ----------------------------------------------------------------------------
 * A breathtaking video-centric hero designed around `herobg.webm`.
 * Features an immersive "lens focus" entrance effect that hands over seamlessly
 * from the Daybreak loader, followed by a dramatic 3D typographic reveal.
 * The video utilizes a custom CSS grain and wash for a premium filmic grade.
 */

if (typeof window !== "undefined" && gsap && ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

function splitChars(text) {
  return text.split("").map((c, i) => (
    <span key={i} className={styles.char} data-char aria-hidden="true">
      {c === " " ? "\u00A0" : c}
    </span>
  ));
}

export default function Hero() {
  const { isRevealing } = useLoader();
  const reduced = usePrefersReducedMotion();

  const sectionRef = useRef(null);
  const bgWrapperRef = useRef(null);
  const introRef = useRef(null);
  const headlineRef = useRef(null);
  const overlayImageRef = useRef(null);
  const metaRefs = useRef([]);

  const setMeta = (el) => {
    if (el && !metaRefs.current.includes(el)) metaRefs.current.push(el);
  };

  /* ---------- Intro — Gated on Loader Reveal ---------- */
  useEffect(() => {
    if (!isRevealing) return;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      // Lens focus effect: Background scales down and unblurs
      tl.fromTo(
        bgWrapperRef.current,
        { scale: 1.15, filter: "blur(24px) brightness(0.2)" },
        { scale: 1, filter: "blur(0px) brightness(1)", duration: 2.5, ease: "power3.out" },
        0.1
      );

      // 3D Typographic Reveal
      const allChars = headlineRef.current?.querySelectorAll(`.${styles.char}`) || [];
      tl.fromTo(
        allChars,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.4,
          stagger: 0.02,
          ease: "expo.out",
        },
        0.4
      );

      // Slide in the overlay image (no fade)
      if (overlayImageRef.current) {
        tl.fromTo(
          overlayImageRef.current,
          { y: 150, scale: 0.95 },
          { y: 0, scale: 1, duration: 2, ease: "power4.out" },
          0.8
        );
      }

      // Fade in metadata/HUD
      tl.fromTo(
        metaRefs.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.1 },
        1.2
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isRevealing, reduced]);

  /* ---------- Scroll Choreography: Deep Parallax ---------- */
  useEffect(() => {
    if (!isRevealing || reduced) return;

    const ctx = gsap.context(() => {
      // The background moves up slower than the page (classic parallax)
      gsap.to(bgWrapperRef.current, {
        yPercent: 25,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // The intro typography disperses upwards faster than the page
      gsap.to(introRef.current, {
        y: -150,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "50% top",
          scrub: true,
        },
      });

      // The image overlay parallax effect
      if (overlayImageRef.current) {
        gsap.to(overlayImageRef.current, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Overlay darkens significantly as we scroll down to smoothly transition to next section
      gsap.to(`.${styles.overlayFade}`, {
        opacity: 0.9,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "30% top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isRevealing, reduced]);

  return (
    <section className={styles.hero} ref={sectionRef}>
      
      {/* ── Background Elements ───────────────────────────────────── */}
      <div className={styles.bgContainer}>
        <div className={styles.bgWrapper} ref={bgWrapperRef}>
          <div className={styles.bgElement} />
          {/* Aesthetic Grades */}
          <div className={styles.gradeWash} aria-hidden="true" />
          <div className={styles.grain} aria-hidden="true" />
        </div>
        <div className={styles.overlayFade} aria-hidden="true" />
      </div>

      {/* ── Image Overlay ───────────────────────────────────── */}
      <div className={styles.imageOverlayContainer}>
        <img 
          ref={overlayImageRef}
          src="/herooverlaywithfisat.png" 
          alt="FISAT Campus Overlay" 
          className={styles.heroOverlayImage}
        />
      </div>

      {/* ── Typography & Content ───────────────────────────────── */}
      <div className={styles.content}>
        
        {/* Header / HUD */}
        <header className={styles.header}>
          <Link href="/" className={styles.brand} ref={setMeta} style={{ textDecoration: 'none' }}>
            <span className={styles.logo}>FISAT</span>
            <span className={styles.rule} aria-hidden="true" />
            <span className={styles.subtext}>
              Federal Institute of<br />Science and Technology
            </span>
          </Link>
          <nav className={styles.nav} ref={setMeta}>
            <div className={styles.navLinks}>
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/academics">Academics</Link>
              <Link href="/campus-life">Campus Life</Link>
              <Link href="/placements">Placements</Link>
            </div>
            <Link href="/apply" className={styles.applyBtn}>
              APPLY NOW
            </Link>
          </nav>
        </header>

        {/* Intro Typography */}
        <div className={styles.introBlock} ref={introRef}>
          <h1 className={styles.headline} ref={headlineRef}>
            <div className={styles.line}>
              {splitChars("ENGINEERING")}
            </div>
            <div className={`${styles.line} ${styles.italic}`}>
              {splitChars("THE FUTURE.")}
            </div>
          </h1>
          <p className={styles.description} ref={setMeta}>
            A premier institution dedicated to excellence in education, research, and innovation. Empowering minds to shape tomorrow.
          </p>
        </div>

        {/* Side Info Blocks */}
        <div className={styles.infoSides}>
           <div className={styles.infoBlock} ref={setMeta}>
               <h3 className={styles.infoTitle}>Innovation First</h3>
               <p className={styles.infoText}>FISAT's state-of-the-art labs and research facilities empower students to pioneer the future of technology.</p>
           </div>
           <div className={`${styles.infoBlock} ${styles.infoBlockRight}`} ref={setMeta}>
               <h3 className={styles.infoTitle}>Global Placement</h3>
               <p className={styles.infoText}>With over 300+ recruiting partners, our graduates secure top-tier positions across the globe.</p>
           </div>
        </div>

        {/* Footer / HUD */}
        <footer className={styles.footer}>
          <div className={styles.coordinates} ref={setMeta}>
            10.0154°N · 76.4897°E <br/>
            MOOKKANNOOR, KERALA
          </div>
          <div className={styles.scrollBlock} ref={setMeta}>
            <div className={styles.mouse}>
              <div className={styles.wheel} />
            </div>
            <span className={styles.scrollText}>SCROLL TO EXPLORE</span>
          </div>
        </footer>

      </div>
    </section>
  );
}
