"use client";
import React from "react";
import Carousel from "../Carousel/Carousel";
import styles from "./CampusLifeSection.module.css";

const CAMPUS_IMAGES = [
  "/fitimage/imgi_12_sports-scaled.jpg",
  "/fitimage/imgi_13_fitness.jpg",
  "/fitimage/imgi_32_arts-sports.jpg",
  "/fitimage/imgi_33_social.jpg",
];

export default function CampusLifeSection() {
  return (
    <section id="campus" className={styles.campus}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.heading}>
            Life at <span className={styles.italic}>FISAT.</span>
          </h2>
          <p className={styles.paragraph}>
            Beyond academics, FISAT is a vibrant community where passion meets opportunity. 
            From state-of-the-art sports facilities and a massive fitness center, to the electrifying 
            arts and cultural festivals, our campus is designed to foster holistic development.
          </p>
        </div>
      </div>
      
      <Carousel images={CAMPUS_IMAGES} speed={30} title="Student Activities & Facilities" />
    </section>
  );
}
