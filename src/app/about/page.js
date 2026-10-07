import SiteHeader from "@/components/SiteHeader/SiteHeader";
import AboutSection from "@/components/AboutSection/AboutSection";

export default function AboutPage() {
  return (
    <main style={{ backgroundColor: "#fdfbf7", minHeight: "100vh" }}>
      <SiteHeader theme="light" />
      <AboutSection />
    </main>
  );
}
