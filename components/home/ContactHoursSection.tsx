import Container from "@/components/ui/Container";
import { siteConfig } from "@/lib/data/site";

export default function ContactHoursSection() {
  return (
    <section id="contact-hours" className="py-20 md:py-[var(--section-gap)] bg-[var(--color-background)]">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-[var(--color-sand-muted)] pt-16 items-start">
          {/* Column 1: Clinic Hours */}
          <div>
            <h3 className="font-[family-name:var(--font-heading)] text-2xl text-[var(--color-primary)] mb-8 flex items-center gap-2">
              <span className="material-symbols-outlined">schedule</span>
              Clinic Hours
            </h3>
            <div className="space-y-4 text-[var(--color-foreground-muted)]">
              {siteConfig.hours.map((h) => (
                <div
                  key={h.day}
                  className={`flex justify-between border-b border-[var(--color-sand-muted)] pb-2 ${
                    h.time === "Closed"
                      ? "text-[var(--color-error)] italic"
                      : ""
                  }`}
                >
                  <span>{h.day}</span>
                  <span>{h.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Location */}
          <div>
            <h3 className="font-[family-name:var(--font-heading)] text-2xl text-[var(--color-primary)] mb-8 flex items-center gap-2">
              <span className="material-symbols-outlined">location_on</span>
              Location
            </h3>
            <p className="text-[var(--color-foreground-muted)] mb-6">
              {siteConfig.address.street}
              <br />
              {siteConfig.address.city}, {siteConfig.address.state}{" "}
              {siteConfig.address.zip}
            </p>
            <div className="w-full h-48 bg-[var(--color-surface-container-low)] rounded-xl relative overflow-hidden group border border-[var(--color-border)]/30">
              <img src="/images/map-placeholder.jpg" alt="Map Location" className="w-full h-full object-cover opacity-60 grayscale" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[var(--color-primary)]/5">
                <span className="material-symbols-outlined text-[var(--color-accent)] text-4xl" style={{ fontVariationSettings: '"FILL" 1' }}>location_on</span>
                <span className="bg-white/90 px-3 py-1 rounded-full text-[10px] font-semibold tracking-[0.1em] uppercase text-[var(--color-primary)] shadow-sm font-[family-name:var(--font-body)]">
                  View on Maps
                </span>
              </div>
            </div>
          </div>

          {/* Column 3: CTA Card */}
          <div className="bg-[var(--color-primary)] p-8 rounded-xl text-white shadow-xl shadow-[rgba(0,84,64,0.2)] h-full flex flex-col">
            <h3 className="font-[family-name:var(--font-heading)] text-2xl mb-6">
              Ready to heal?
            </h3>
            <p className="mb-8 text-[#9aedcf]">
              Call us to verify your insurance or book your same-day
              consultation.
            </p>
            <div className="mt-auto">
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="block text-center font-[family-name:var(--font-heading)] text-2xl mb-8 hover:text-[var(--color-accent)] transition-colors underline decoration-[var(--color-accent)] underline-offset-8"
                id="contact-phone-cta"
              >
                {siteConfig.phone}
              </a>
              <a
                href="/booking"
                className="block w-full bg-[var(--color-accent)] text-white text-center py-4 rounded-full font-semibold text-[12px] tracking-[0.1em] uppercase hover:bg-white hover:text-[var(--color-primary)] transition-all duration-300 font-[family-name:var(--font-body)]"
                id="contact-book-online"
              >
                Book Online Now
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
