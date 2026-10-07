"use client";
import React from "react";
import Carousel from "../Carousel/Carousel";
import styles from "./PlacementsSection.module.css";

const PLACEMENTS_IMAGES = [
  "/fitimage/imgi_4_FISAT-TCS-PLACEMENT-26-copy-1.jpg",
  "/fitimage/imgi_15_industry.jpg",
  "/fitimage/imgi_35_Careers.jpg",
];

export default function PlacementsSection() {
  return (
    <section id="placements" className={styles.placements}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.heading}>
            Global <span className={styles.italic}>Opportunities.</span>
          </h2>
          <p className={styles.paragraph}>
            FISAT maintains a phenomenal placement record with top-tier MNCs and tech giants 
            recruiting our talent every year. The Placement and Training Cell works tirelessly 
            to transform our students into highly sought-after professionals globally.
          </p>
        </div>

        <div className={styles.stats}>
          <div className={styles.statBox}>
            <h4 className={styles.statNumber}>300+</h4>
            <span className={styles.statLabel}>Recruiters</span>
          </div>
          <div className={styles.statBox}>
            <h4 className={styles.statNumber}>850+</h4>
            <span className={styles.statLabel}>Offers Every Year</span>
          </div>
        </div>
      </div>
      
      <Carousel images={PLACEMENTS_IMAGES} speed={25} reverse={true} title="Placement Highlights" />
    </section>
  );
}
