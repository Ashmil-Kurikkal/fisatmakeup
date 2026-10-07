"use client";
import React from "react";
import Carousel from "../Carousel/Carousel";
import styles from "./AboutSection.module.css";

const ABOUT_IMAGES = [
  "/fitimage/imgi_6_FISAT.jpg",
  "/fitimage/imgi_24_DSC02156-scaled-e1707299276592.jpg",
  "/fitimage/imgi_20_IMG_20260728_155949_071.jpg",
  "/fitimage/imgi_21_IMG_20260728_155959_787.jpg",
  "/fitimage/imgi_22_IMG_20260728_160106_097.jpg",
];

export default function AboutSection() {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.heading}>
            A Legacy of <span className={styles.italic}>Excellence.</span>
          </h2>
          <p className={styles.paragraph}>
            Federal Institute of Science and Technology (FISAT) is a premier self-financing 
            engineering college established in 2002 by the Federal Bank Officers' Association 
            Educational Society (FBOAES). Located in the serene landscape of Mookkannoor, Angamaly, 
            FISAT is dedicated to nurturing technical brilliance and ethical leadership.
          </p>
          <p className={styles.paragraph}>
            With state-of-the-art infrastructure, a passionate faculty, and a vibrant campus culture, 
            we empower our students to turn their boldest ideas into reality. Our autonomous status 
            and NAAC A+ accreditation stand as a testament to our relentless pursuit of quality.
          </p>
          
          <div className={styles.stats}>
            <div className={styles.statBox}>
              <h4 className={styles.statNumber}>20+</h4>
              <span className={styles.statLabel}>Years of Trust</span>
            </div>
            <div className={styles.statBox}>
              <h4 className={styles.statNumber}>A+</h4>
              <span className={styles.statLabel}>NAAC Accredited</span>
            </div>
            <div className={styles.statBox}>
              <h4 className={styles.statNumber}>3000+</h4>
              <span className={styles.statLabel}>Bright Minds</span>
            </div>
          </div>
        </div>
      </div>
      
      <Carousel images={ABOUT_IMAGES} speed={35} title="Campus Glimpses" />
    </section>
  );
}
