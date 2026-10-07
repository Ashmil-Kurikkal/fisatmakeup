import SiteHeader from "@/components/SiteHeader/SiteHeader";
import AboutShowcase from "@/components/AboutShowcase/AboutShowcase";
import WowBentoBox from "@/components/WowFactors/WowBentoBox";

export default function AboutPage() {
  return (
    <main style={{ backgroundColor: "#fdfbf7", minHeight: "100vh" }}>
      <SiteHeader theme="light" />
      <AboutShowcase />
      <WowBentoBox 
        title="Engineering the Future"
        subtitle="Our Philosophy"
        features={[
          { title: "Legacy of Excellence", description: "20+ years of producing top-tier engineering talent and industry leaders.", icon: "Trophy", large: true },
          { title: "Global Reach", description: "Alumni network spanning 50+ countries.", icon: "Globe" },
          { title: "Innovation Focused", description: "State-of-the-art FabLabs and AI research centers.", icon: "Sparkles" }
        ]}
      />
    </main>
  );
}
