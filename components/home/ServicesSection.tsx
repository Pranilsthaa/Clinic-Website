import Container from "@/components/ui/Container";

const services = [
  {
    title: "Car accident recovery",
    description:
      "Personalized protocols for whiplash, neck pain, and post-collision trauma to restore your mobility.",
    icon: (
      <span className="material-symbols-outlined text-[var(--color-accent)] text-4xl mb-6 block">car_crash</span>
    ),
    featured: true,
  },
  {
    title: "Spinal Alignment",
    description:
      "Precision adjustments to correct subluxations and improve nervous system function for long-term health.",
    icon: (
      <span className="material-symbols-outlined text-[var(--color-accent)] text-4xl mb-6 block">neurology</span>
    ),
    featured: false,
  },
  {
    title: "Postural Wellness",
    description:
      "Corrective exercises and ergonomic advice designed for the modern lifestyle and desk-based recovery.",
    icon: (
      <span className="material-symbols-outlined text-[var(--color-accent)] text-4xl mb-6 block">accessibility_new</span>
    ),
    featured: false,
  },
];

export default function ServicesSection() {
  return (
    <section id="services-overview" className="py-20 md:py-[var(--section-gap)]">
      <Container>
        <div className="mb-16">
          <h2 className="font-[family-name:var(--font-heading)] text-[32px] leading-[1.2] text-[var(--color-primary)] mb-4">
            How we treat you
          </h2>
          <div className="w-16 h-1 bg-[var(--color-accent)] rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className={`bg-white p-8 rounded-xl group hover:-translate-y-1 transition-transform duration-300 ${
                service.featured
                  ? "border-2 border-[var(--color-accent)]/30 soft-glow relative"
                  : "border-l-4 border-[var(--color-accent)]/20 soft-glow"
              }`}
              style={{
                transition: "0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              }}
            >
              {service.featured && (
                <div className="absolute -top-3 left-8 bg-[var(--color-accent)] text-white px-4 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold">
                  Primary specialty
                </div>
              )}
              {service.icon}
              <h3 className="font-[family-name:var(--font-heading)] text-2xl text-[var(--color-foreground)] mb-4">
                {service.title}
              </h3>
              <p className="text-[var(--color-foreground-muted)]">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
