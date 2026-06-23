import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { FeaturedMenu } from "@/components/home/FeaturedMenu";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { GallerySection } from "@/components/home/GallerySection";
import { ReservationCTA } from "@/components/home/ReservationCTA";
import { FAQSection } from "@/components/home/FAQSection";
import { StatsSection } from "@/components/home/StatsSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Délices d'Africana | Restaurant Premium Guinéen à Conakry",
  description:
    "Découvrez Délices d'Africana, le restaurant premium guinéen à Conakry. Cuisine authentique, traiteur événementiel, hébergement de luxe. Réservez votre table dès maintenant.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <StatsSection />
      <FeaturedMenu />
      <ReservationCTA />
      <TestimonialsSection />
      <GallerySection />
      <FAQSection />
    </>
  );
}
