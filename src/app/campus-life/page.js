import SiteHeader from "@/components/SiteHeader/SiteHeader";
import CampusLifeSection from "@/components/CampusLifeSection/CampusLifeSection";
import WowInfiniteMarquee from "@/components/WowFactors/WowInfiniteMarquee";

export default function CampusLifePage() {
  return (
    <main style={{ backgroundColor: "#fdfbf7", minHeight: "100vh" }}>
      <SiteHeader theme="light" />
      <CampusLifeSection />
      <WowInfiniteMarquee 
        text="SPORTS · ARTS · TECH · CULTURE"
        speed={20}
        images={["/fitimage/imgi_10_IDEA-LAB-BANNER-scaled.jpg"]}
      />
    </main>
  );
}
