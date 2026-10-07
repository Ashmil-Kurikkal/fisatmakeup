import SiteHeader from "@/components/SiteHeader/SiteHeader";
import PlacementsSection from "@/components/PlacementsSection/PlacementsSection";

export default function PlacementsPage() {
  return (
    <main style={{ backgroundColor: "var(--indigo-950)", minHeight: "100vh" }}>
      <SiteHeader theme="dark" />
      <PlacementsSection />
    </main>
  );
}
