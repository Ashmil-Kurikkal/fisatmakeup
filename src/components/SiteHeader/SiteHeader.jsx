"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./SiteHeader.module.css";

export default function SiteHeader({ theme = "light" }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <header className={styles.header} data-theme={isMenuOpen ? "light" : theme}>
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
    </header>
  );
}
