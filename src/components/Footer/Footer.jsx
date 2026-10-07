"use client";
import React from "react";
import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerTop}>
        <div className={styles.logoSection}>
          <img 
            src="/fitimage/imgi_1_fisat-logo.png" 
            alt="FISAT Logo" 
            className={styles.footerLogo} 
          />
          <p className={styles.tagline}>
            Federal Institute of Science and Technology.<br/>
            Engineered for the frontier.
          </p>
        </div>

        <div className={styles.linksSection}>
          <div className={styles.linkCol}>
            <h4>EXPLORE</h4>
            <Link href="/about">About Us</Link>
            <Link href="/academics">Academics</Link>
            <Link href="/campus-life">Campus Life</Link>
            <Link href="/placements">Placements</Link>
          </div>
          
          <div className={styles.linkCol}>
            <h4>RESOURCES</h4>
            <Link href="/admissions">Admissions</Link>
            <Link href="/research">Research</Link>
            <Link href="/alumni">Alumni</Link>
            <Link href="/careers">Careers</Link>
          </div>
          
          <div className={styles.linkCol}>
            <h4>CONTACT</h4>
            <span>Hormis Nagar, Mookkannoor,</span>
            <span>Angamaly, Kerala 683577</span>
            <span className={styles.contactItem}>+91 484 2725272</span>
            <span className={styles.contactItem}>mail@fisat.ac.in</span>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className={styles.copy}>
          &copy; {new Date().getFullYear()} FISAT. All rights reserved.
        </div>
        <div className={styles.socials}>
          <a href="#">Instagram</a>
          <a href="#">LinkedIn</a>
          <a href="#">Twitter</a>
          <a href="#">YouTube</a>
        </div>
      </div>
    </footer>
  );
}
