"use client";
import React from "react";
import Carousel from "../Carousel/Carousel";
import styles from "./AcademicsSection.module.css";

const ACADEMICS_IMAGES = [
  "/fitimage/imgi_10_IDEA-LAB-BANNER-scaled.jpg",
  "/fitimage/imgi_14_library-scaled.jpg",
  "/fitimage/imgi_25_eee-1.jpg",
  "/fitimage/imgi_27_cse-banner.jpg",
  "/fitimage/imgi_29_sh-banner-e1658151063916.jpg",
];

export default function AcademicsSection() {
  return (
    <section id="academics" className={styles.academics}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.heading}>
            Future-Ready <span className={styles.italic}>Academics.</span>
          </h2>
          <p className={styles.paragraph}>
            Our curriculum is designed to push boundaries. We blend rigorous theoretical foundations 
            with hands-on practical applications in cutting-edge facilities like our AI labs and FabLabs.
          </p>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>B.Tech Programs</h3>
            <ul className={styles.list}>
              <li>Computer Science & Engineering</li>
              <li>Artificial Intelligence & Data Science</li>
              <li>Electronics & Communication</li>
              <li>Mechanical Engineering</li>
              <li>Civil Engineering</li>
              <li>Electrical & Electronics</li>
            </ul>
          </div>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Post Graduate</h3>
            <ul className={styles.list}>
              <li>Master of Business Administration (MBA)</li>
              <li>Master of Computer Applications (MCA)</li>
              <li>M.Tech in VLSI & Embedded Systems</li>
              <li>M.Tech in Structural Engineering</li>
              <li>M.Tech in Computer Science</li>
            </ul>
          </div>
        </div>
      </div>
      
      <Carousel images={ACADEMICS_IMAGES} speed={45} reverse={true} title="Academic Infrastructure" />
    </section>
  );
}
