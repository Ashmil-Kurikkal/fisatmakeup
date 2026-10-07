import { Fraunces, Inter_Tight, Geist_Mono } from "next/font/google";

/**
 * FISAT type system — three voices, each with one job.
 *
 * 1. Fraunces (display / editorial)
 *    A "wonky" old-style serif with real variable axes: opsz 9–144, SOFT 0–100,
 *    WONK 0–1, wght 100–900. Optical sizing means the same family is crisp at
 *    12rem hero numerals and still sturdy at 1.25rem pull-quotes. It carries
 *    the institute's academic gravitas without the stiffness of a Didone.
 *    The SOFT axis is animated in the loader (soft → sharp as content resolves).
 *
 * 2. Inter Tight (interface / reading)
 *    The condensed-spacing cut of Inter. Neutral, highly legible, and tight
 *    enough to sit beside Fraunces without looking like a default system font.
 *
 * 3. Geist Mono (data / metadata)
 *    Tabular, technical. Used only for counts, sizes, timestamps, indices —
 *    the "instrument panel" voice of an engineering institute.
 */

export const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-fraunces",
  display: "swap",
  preload: false,
});

export const interTight = Inter_Tight({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-inter-tight",
  display: "swap",
  preload: false,
});

export const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  preload: false,
});

export const fontVariables = [
  fraunces.variable,
  interTight.variable,
  geistMono.variable,
].join(" ");
