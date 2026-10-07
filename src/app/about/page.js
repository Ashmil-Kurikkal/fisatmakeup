import SiteHeader from "@/components/SiteHeader/SiteHeader";
import AboutShowcase from "@/components/AboutShowcase/AboutShowcase";

export default function AboutPage() {
  return (
    <main style={{ backgroundColor: "#fdfbf7", minHeight: "100vh" }}>
      <SiteHeader theme="light" />
      <AboutShowcase />
    </main>
  );
}
