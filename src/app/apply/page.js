import SiteHeader from "@/components/SiteHeader/SiteHeader";
import ApplyClient from "@/components/Apply/ApplyClient";

export const metadata = {
  title: "Apply to FISAT — Admissions 2026-27 | Federal Institute of Science and Technology",
  description:
    "Apply to FISAT Angamaly — B.Tech, M.Tech, MBA, MCA & Integrated MCA. Fill your personal, academic and branch preferences in under 5 minutes. NAAC A+, NBA accredited, KTU affiliated.",
};

export default function ApplyPage() {
  return (
    <main style={{ backgroundColor: "var(--color-bg)", minHeight: "100vh" }}>
      <SiteHeader theme="light" />
      <ApplyClient />
    </main>
  );
}
