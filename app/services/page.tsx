import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Divider from "@/components/ui/Divider";
import Button from "@/components/ui/Button";
import TeamCard from "@/components/cards/TeamCard";
import { services } from "@/lib/data/services";
import { team } from "@/lib/data/team";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Explore our full range of chiropractic and wellness services including spinal adjustment, therapeutic massage, active rehabilitation, and advanced diagnostics.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      {/* ─── Hero ────────────────────────────────────────── */}
      <section className="bg-black text-white py-24 md:py-32">
        <Container className="text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-400 mb-4">
            Clinical Services
          </p>
          <h1 className="text-white mb-6">Our Services</h1>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Our clinical services are designed to address the root cause of
            discomfort, utilizing evidence-based techniques to restore function
            and enhance your quality of life.
          </p>
        </Container>
      </section>

      {/* ─── Services Detail ─────────────────────────────── */}
      <section className="py-20 md:py-[var(--section-gap)]">
        <Container>
          {services.map((service, i) => (
            <div key={service.slug}>
              <article
                id={service.slug}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-16"
              >
                {/* Content — alternating sides */}
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold font-[family-name:var(--font-heading)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[var(--color-secondary)]">
                      Service {String(i + 1).padStart(2, "0")}
                    </p>
                  </div>
                  <h2 className="text-3xl mb-4">{service.title}</h2>
                  <p className="text-[var(--color-foreground-muted)] leading-relaxed mb-8">
                    {service.description}
                  </p>
                  <Button href="/booking">Book This Service</Button>
                </div>

                {/* Visual placeholder — clinical visual block */}
                <div
                  className={`bg-[var(--color-surface-subtle)] rounded-lg aspect-[4/3] flex items-center justify-center border border-[var(--color-border)] ${
                    i % 2 === 1 ? "lg:order-1" : ""
                  }`}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center mx-auto mb-4">
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M12 2v4M12 18v4M12 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM8 6a2 2 0 1 0 4 0M12 6a2 2 0 1 0 4 0M8 18a2 2 0 1 1 4 0M12 18a2 2 0 1 1 4 0" />
                      </svg>
                    </div>
                    <p className="text-sm font-semibold text-[var(--color-secondary)]">
                      {service.title}
                    </p>
                  </div>
                </div>
              </article>

              {i < services.length - 1 && <Divider />}
            </div>
          ))}
        </Container>
      </section>

      {/* ─── Team Section ──────────────────────────────── */}
      <section className="py-20 md:py-[var(--section-gap)] bg-[var(--color-surface-subtle)]">
        <Container>
          <SectionHeading
            overline="Our Specialists"
            title="Board-certified specialists dedicated to precision outcomes."
            subtitle="Our practitioners combine decades of clinical experience with a commitment to continued education and advanced technique certification."
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {team.map((member) => (
              <TeamCard key={member.slug} member={member} />
            ))}
          </div>
        </Container>
      </section>

      {/* ─── CTA ──────────────────────────────────────── */}
      <section className="bg-black text-white py-20 md:py-24">
        <Container className="text-center">
          <h2 className="text-white mb-4">
            Consult with our specialists today.
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto mb-10 text-lg">
            Develop a targeted treatment plan for your specific functional
            goals.
          </p>
          <Button
            href="/booking"
            size="lg"
            className="bg-white !text-black hover:bg-neutral-200"
          >
            Book an Appointment
          </Button>
        </Container>
      </section>
    </>
  );
}
