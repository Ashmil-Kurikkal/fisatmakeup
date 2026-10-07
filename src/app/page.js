import Hero from "@/components/Hero/Hero";
import AboutSection from "@/components/AboutSection/AboutSection";
import AcademicsSection from "@/components/AcademicsSection/AcademicsSection";
import CampusLifeSection from "@/components/CampusLifeSection/CampusLifeSection";
import PlacementsSection from "@/components/PlacementsSection/PlacementsSection";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <AcademicsSection />
      <CampusLifeSection />
      <PlacementsSection />
    </>
  );
}
