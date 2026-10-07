import SiteHeader from "@/components/SiteHeader/SiteHeader";
import Hero from "@/components/Hero/Hero";
import HomeShowcase from "@/components/HomeShowcase/HomeShowcase";

export default function Home() {
  return (
    <main>
      <SiteHeader theme="light" />
      <Hero />
      <HomeShowcase />
    </main>
  );
}
