import type { Metadata } from "next";
import { siteConfig } from "@/lib/data/site";
import HeroSection from "@/components/home/HeroSection";
import TrustBar from "@/components/home/TrustBar";
import ServicesSection from "@/components/home/ServicesSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import DoctorIntroSection from "@/components/home/DoctorIntroSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import ContactHoursSection from "@/components/home/ContactHoursSection";

export const metadata: Metadata = {
  title: "Precision Chiropractic Care",
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <ServicesSection />
      <HowItWorksSection />
      <DoctorIntroSection />
      <TestimonialsSection />
      <ContactHoursSection />
    </>
  );
}
