import SiteHeader from "@/components/SiteHeader/SiteHeader";
import AcademicsSection from "@/components/AcademicsSection/AcademicsSection";

export default function AcademicsPage() {
  return (
    <main style={{ backgroundColor: "var(--indigo-950)", minHeight: "100vh" }}>
      <SiteHeader theme="dark" />
      <AcademicsSection />
    </main>
  );
}
