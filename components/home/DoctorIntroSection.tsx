import Image from "next/image";
import Container from "@/components/ui/Container";

export default function DoctorIntroSection() {
  return (
    <section id="doctor-intro" className="py-20 md:py-[var(--section-gap)] bg-white">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Doctor Image with Organic Clip */}
          <div className="relative">
            <div
              className="organic-clip overflow-hidden aspect-square max-w-md mx-auto soft-glow relative group"
              style={{
                transform: "translateY(0px)",
                transition: "0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              }}
            >
              <Image
                src="/images/dr-jenkins.png"
                alt="Dr. Sarah Jenkins, Clinical Director"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover transition-transform duration-[0.4s] group-hover:-translate-y-1"
              />
            </div>
            {/* Floating Name Card */}
            <div className="absolute -bottom-6 -right-4 md:right-0 bg-[var(--color-sand-soft)] p-6 rounded-xl border border-[var(--color-accent)]/10">
              <p className="font-[family-name:var(--font-heading)] text-2xl text-[var(--color-primary)] mb-1">
                Dr. Sarah Jenkins
              </p>
              <p className="text-xs font-semibold tracking-[0.1em] uppercase text-[var(--color-foreground-muted)] font-[family-name:var(--font-body)]">
                Clinical Director, DC
              </p>
            </div>
          </div>

          {/* Text Content */}
          <div>
            <span className="text-xs font-semibold tracking-[0.1em] uppercase text-[var(--color-accent)] mb-4 block font-[family-name:var(--font-body)]">
              Meet the Specialist
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-[32px] leading-[1.2] text-[var(--color-foreground)] mb-6">
              Clinical Care with a Human Face.
            </h2>
            <p className="text-lg text-[var(--color-foreground-muted)] mb-6 leading-relaxed">
              With over 15 years of experience specializing in motor vehicle
              trauma, Dr. Jenkins has dedicated her career to helping Austin
              residents find relief without reliance on pharmaceuticals.
            </p>
            <p className="text-[var(--color-foreground-muted)] mb-10 italic leading-relaxed">
              &ldquo;Recovery isn&apos;t just about moving bones; it&apos;s
              about restoring the body&apos;s natural dialogue with the brain.
              Every patient I see after an accident deserves a plan as unique as
              their injury.&rdquo;
            </p>
            <div className="flex flex-wrap gap-4">
              <span className="bg-[var(--color-sand-muted)] px-4 py-2 rounded-full text-sm font-medium text-[var(--color-primary)] font-[family-name:var(--font-body)]">
                Car Accident Certified
              </span>
              <span className="bg-[var(--color-sand-muted)] px-4 py-2 rounded-full text-sm font-medium text-[var(--color-primary)] font-[family-name:var(--font-body)]">
                Spinal Trauma Specialist
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
