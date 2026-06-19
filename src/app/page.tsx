import { HeroSection } from "@/components/hero-section";
import { DifferentiatorsSection } from "@/components/differentiators-section";
import { WhyPartnerSection } from "@/components/why-partner-section";
import { AboutSection } from "@/components/about-section";
import { GallerySection } from "@/components/gallery-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <DifferentiatorsSection />
      <WhyPartnerSection />
      <AboutSection />
      <GallerySection />
      <ContactSection />
      <Footer />
    </main>
  );
}
