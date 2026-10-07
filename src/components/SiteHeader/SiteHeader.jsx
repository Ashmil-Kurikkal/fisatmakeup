"use client";
import React from "react";
import Link from "next/link";
import styles from "./SiteHeader.module.css";

export default function SiteHeader({ theme = "light" }) {
  return (
    <header className={styles.header} data-theme={theme}>
      <div className={styles.brand}>
        <span className={styles.logo}>FISAT</span>
        <span className={styles.rule} aria-hidden="true" />
        <span className={styles.subtext}>
          Federal Institute of<br />Science and Technology
        </span>
      </div>
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
      </nav>
    </header>
  );
}
