import SiteHeader from "@/components/SiteHeader/SiteHeader";
import AcademicsSection from "@/components/AcademicsSection/AcademicsSection";
import WowInfiniteMarquee from "@/components/WowFactors/WowInfiniteMarquee";

export default function AcademicsPage() {
  return (
    <main style={{ backgroundColor: "var(--indigo-950)", minHeight: "100vh" }}>
      <SiteHeader theme="dark" />
      <AcademicsSection />
      <WowInfiniteMarquee 
        text="AUTONOMOUS EXCELLENCE · NBA ACCREDITED"
        speed={25}
        images={["/fitimage/imgi_15_industry.jpg", "/fitimage/imgi_31_mca1-scaled-e1658138621201.jpg"]}
      />
    </main>
  );
}
