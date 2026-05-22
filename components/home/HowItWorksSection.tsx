import Container from "@/components/ui/Container";

const steps = [
  {
    number: "1",
    title: "Book",
    description:
      "Schedule your initial consultation online or call us for a same-day priority slot. We triage accident cases immediately.",
    offset: "",
  },
  {
    number: "2",
    title: "Assess",
    description:
      "Our detailed physical exam and digital x-rays identify hidden soft-tissue damage that standard ERs often miss.",
    offset: "lg:mt-12",
  },
  {
    number: "3",
    title: "Treat",
    description:
      "Begin precision adjustments and advanced therapy sessions designed to reduce inflammation and restore mobility.",
    offset: "lg:mt-24",
  },
  {
    number: "4",
    title: "Recover",
    description:
      "Return to your daily life pain-free and stronger, with a documented clinical path that supports your recovery and any insurance claims.",
    offset: "lg:mt-36",
  },
];

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="py-20 md:py-[var(--section-gap)] bg-[var(--color-sand-soft)] relative"
    >
      <Container>
        <div className="mb-20">
          <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-[48px] leading-tight text-[var(--color-primary)] mb-6 max-w-2xl">
            The Road Back to Your Life
          </h2>
          <p className="text-lg text-[var(--color-foreground-muted)] max-w-xl">
            A clinical, structured approach to ensure nothing is missed after an
            accident.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className={`bg-white p-8 rounded-2xl shadow-lg shadow-[rgba(15,110,86,0.05)] relative overflow-hidden group ${step.offset}`}
            >
              {/* Background watermark number */}
              <div className="absolute -right-4 -top-8 text-[120px] font-[family-name:var(--font-heading)] text-[var(--color-accent)]/5 font-bold z-0 transition-transform group-hover:scale-110 select-none">
                {step.number}
              </div>
              <div className="relative z-10">
                <h4 className="font-[family-name:var(--font-heading)] text-2xl text-[var(--color-primary)] mb-4">
                  {step.title}
                </h4>
                <p className="text-[var(--color-foreground-muted)]">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* Bottom Wave Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-10">
        <svg
          className="relative block w-[calc(100%+1.3px)] h-[40px]"
          data-name="Layer 1"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.83C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            fill="#ffffff"
          />
        </svg>
      </div>
    </section>
  );
}
