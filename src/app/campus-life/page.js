import SiteHeader from "@/components/SiteHeader/SiteHeader";
import CampusLifeSection from "@/components/CampusLifeSection/CampusLifeSection";

export default function CampusLifePage() {
  return (
    <main style={{ backgroundColor: "#fdfbf7", minHeight: "100vh" }}>
      <SiteHeader theme="light" />
      <CampusLifeSection />
    </main>
  );
}
