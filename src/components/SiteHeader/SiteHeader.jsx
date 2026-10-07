"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import styles from "./SiteHeader.module.css";

export default function SiteHeader({ theme = "light" }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    if (latest > 150 && latest > previous) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  });

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <motion.header 
        className={`${styles.header} ${isScrolled ? styles.headerScrolled : ""}`} 
        data-theme={isMenuOpen ? "light" : (isScrolled ? "light" : theme)}
        variants={{
          visible: { y: 0 },
          hidden: { y: "-150%" }
        }}
        animate={isHidden && !isMenuOpen ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
      >
        <Link href="/" className={styles.brand} style={{ textDecoration: 'none' }} onClick={closeMenu}>
          <span className={styles.logo}>FISAT</span>
          <span className={styles.rule} aria-hidden="true" />
          <span className={styles.subtext}>
            Federal Institute of<br />Science and Technology
          </span>
        </Link>
        
        <nav className={styles.nav}>
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

          {/* Mobile Hamburger Button */}
          <button className={styles.hamburger} onClick={toggleMenu} aria-label="Toggle Menu">
            <span className={`${styles.bar} ${isMenuOpen ? styles.barOpen1 : ""}`} />
            <span className={`${styles.bar} ${isMenuOpen ? styles.barOpen2 : ""}`} />
            <span className={`${styles.bar} ${isMenuOpen ? styles.barOpen3 : ""}`} />
          </button>
        </nav>
      </motion.header>

      {/* Full screen mobile menu */}
      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ""}`}>
        <nav className={styles.mobileNav}>
          <Link href="/" onClick={closeMenu}>Home</Link>
          <Link href="/about" onClick={closeMenu}>About</Link>
          <Link href="/academics" onClick={closeMenu}>Academics</Link>
          <Link href="/campus-life" onClick={closeMenu}>Campus Life</Link>
          <Link href="/placements" onClick={closeMenu}>Placements</Link>
          <Link href="/apply" onClick={closeMenu} className={styles.mobileApplyBtn}>
            APPLY NOW
          </Link>
        </nav>
      </div>
    </>
  );
}
