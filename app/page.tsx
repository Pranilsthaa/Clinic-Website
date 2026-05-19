import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Divider from "@/components/ui/Divider";
import Button from "@/components/ui/Button";
import ServiceCard from "@/components/cards/ServiceCard";
import TeamCard from "@/components/cards/TeamCard";
import { siteConfig } from "@/lib/data/site";
import { services } from "@/lib/data/services";
import { team } from "@/lib/data/team";

export const metadata: Metadata = {
  title: "Precision Chiropractic Care",
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      {/* ─── Hero Section ───────────────────────────────── */}
      <section
        id="hero"
        className="relative min-h-[90vh] flex items-center overflow-hidden"
      >
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-chiropractic.png"
            alt="Chiropractor performing a precise spinal adjustment"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/30" />
        </div>

        <Container className="relative z-10 py-24 md:py-32">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-secondary)] mb-6 animate-fade-in">
              Evidence-Based Chiropractic
            </p>
            <h1 className="mb-6 animate-fade-in-up">
              {siteConfig.tagline.split(" ").slice(0, -2).join(" ")}{" "}
              <span className="text-[var(--color-secondary)]">
                {siteConfig.tagline.split(" ").slice(-2).join(" ")}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-[var(--color-foreground-muted)] leading-relaxed mb-10 max-w-xl animate-fade-in-up delay-200">
              {siteConfig.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-300">
              <Button href="/booking" size="lg">
                Book Appointment
              </Button>
              <Button href="/services" variant="outline" size="lg">
                Our Services
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── Stats Bar ──────────────────────────────────── */}
      <section className="bg-black text-white py-8">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "15+", label: "Years Experience" },
              { value: "10K+", label: "Patients Treated" },
              { value: "98%", label: "Satisfaction Rate" },
              { value: "4", label: "Specialist Doctors" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)]">
                  {stat.value}
                </p>
                <p className="text-xs tracking-[0.15em] uppercase text-neutral-400 mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── Core Modalities ────────────────────────────── */}
      <section
        id="services-overview"
        className="py-20 md:py-[var(--section-gap)]"
      >
        <Container>
          <SectionHeading
            overline="Core Modalities"
            title="Targeted treatments for structured recovery."
            subtitle="Our clinical services are designed to address the root cause of discomfort, utilizing evidence-based techniques to restore function."
            className="mb-16"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <ServiceCard key={service.slug} service={service} index={i} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button href="/services" variant="outline">
              View All Services →
            </Button>
          </div>
        </Container>
      </section>

      <Divider variant="accent" className="mx-auto max-w-[1280px] px-6" />

      {/* ─── About / Clinic Section ─────────────────────── */}
      <section id="about" className="py-20 md:py-[var(--section-gap)]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative rounded-lg overflow-hidden aspect-square">
              <Image
                src="/images/clinic-interior.png"
                alt="Modern clinical treatment room with professional equipment"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* Text */}
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-secondary)] mb-4">
                Our Approach
              </p>
              <h2 className="mb-6">
                Clinical precision meets compassionate care.
              </h2>
              <p className="text-[var(--color-foreground-muted)] mb-6 leading-relaxed">
                At DFW Spine & Injury Chiropractic, we believe that effective
                treatment starts with a thorough understanding of your unique
                biomechanics. Our multi-disciplinary team uses evidence-based
                protocols to create personalized treatment plans that address
                both symptoms and root causes.
              </p>
              <p className="text-[var(--color-foreground-muted)] mb-8 leading-relaxed">
                From advanced diagnostics to hands-on rehabilitation, every step
                of your care journey is guided by our commitment to precision,
                safety, and measurable outcomes.
              </p>
              <Button href="/contact" variant="outline">
                Learn More About Us →
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── Team Section ───────────────────────────────── */}
      <section
        id="team"
        className="py-20 md:py-[var(--section-gap)] bg-[var(--color-surface-subtle)]"
      >
        <Container>
          <SectionHeading
            overline="Our Specialists"
            title="Board-certified specialists dedicated to precision outcomes."
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {team.map((member) => (
              <TeamCard key={member.slug} member={member} />
            ))}
          </div>
        </Container>
      </section>

      {/* ─── Practice Info ──────────────────────────────── */}
      <section id="info" className="py-20 md:py-[var(--section-gap)]">
        <Container>
          <SectionHeading
            overline="Practice Information"
            title="Visit our clinic."
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Location */}
            <div className="border border-[var(--color-border)] rounded-lg p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center mx-auto mb-4">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 font-[family-name:var(--font-heading)]">
                Location
              </h3>
              <p className="text-sm text-[var(--color-foreground-muted)]">
                {siteConfig.address.street}
              </p>
              <p className="text-sm text-[var(--color-foreground-muted)]">
                {siteConfig.address.city}, {siteConfig.address.state}{" "}
                {siteConfig.address.zip}
              </p>
            </div>

            {/* Hours */}
            <div className="border border-[var(--color-border)] rounded-lg p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center mx-auto mb-4">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 font-[family-name:var(--font-heading)]">
                Operating Hours
              </h3>
              {siteConfig.hours.map((h) => (
                <p
                  key={h.day}
                  className="text-sm text-[var(--color-foreground-muted)]"
                >
                  {h.day}: {h.time}
                </p>
              ))}
            </div>

            {/* Contact */}
            <div className="border border-[var(--color-border)] rounded-lg p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center mx-auto mb-4">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 font-[family-name:var(--font-heading)]">
                Contact
              </h3>
              <p className="text-sm text-[var(--color-foreground-muted)]">
                {siteConfig.phone}
              </p>
              <p className="text-sm text-[var(--color-foreground-muted)]">
                {siteConfig.email}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── CTA Banner ─────────────────────────────────── */}
      <section className="bg-black text-white py-20 md:py-24">
        <Container className="text-center">
          <h2 className="text-white mb-4">
            Ready to start your wellness journey?
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto mb-10 text-lg">
            Consult with our specialists to develop a targeted treatment plan
            for your specific functional goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              href="/booking"
              size="lg"
              className="bg-white !text-black hover:bg-neutral-200"
            >
              Book an Appointment
            </Button>
            <Button
              href="/contact"
              variant="outline"
              size="lg"
              className="!border-white !text-white hover:!bg-white hover:!text-black"
            >
              Contact Us
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
