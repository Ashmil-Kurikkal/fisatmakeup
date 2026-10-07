"use client";
import React from "react";
import styles from "./Carousel.module.css";

export default function Carousel({ images, speed = 40, reverse = false, title }) {
  return (
    <div className={styles.carouselWrapper}>
      {title && <h3 className={styles.carouselTitle}>{title}</h3>}
      <div className={styles.carouselContainer}>
        <div 
          className={`${styles.carouselTrack} ${reverse ? styles.reverse : ''}`} 
          style={{ '--speed': `${speed}s` }}
        >
          {/* Tripled for seamless infinite scroll */}
          {[...images, ...images, ...images].map((src, i) => (
            <div key={i} className={styles.carouselItem}>
              <img src={src} alt="FISAT Campus" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
