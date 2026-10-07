import SiteHeader from "@/components/SiteHeader/SiteHeader";
import PlacementsSection from "@/components/PlacementsSection/PlacementsSection";
import WowBentoBox from "@/components/WowFactors/WowBentoBox";

export default function PlacementsPage() {
  return (
    <main style={{ backgroundColor: "var(--indigo-950)", minHeight: "100vh" }}>
      <SiteHeader theme="dark" />
      <PlacementsSection />
      <WowBentoBox 
        title="Unmatched Career Outcomes"
        subtitle="Placement Cell"
        features={[
          { title: "Highest Package", description: "₹17.22 LPA offered by top multinational product companies.", icon: "Zap", large: true },
          { title: "Top Recruiters", description: "TCS, Infosys, Federal Bank, Bosch, IBM.", icon: "ShieldCheck" },
          { title: "283+ Offers", description: "Record breaking placements in the 2025 batch.", icon: "Rocket" }
        ]}
      />
    </main>
  );
}
