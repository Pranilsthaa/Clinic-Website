import Container from "@/components/ui/Container";

const stats = [
  { value: "4.9", symbol: "★", label: "Google Rating" },
  { value: "500", symbol: "+", label: "Patients Treated" },
  { value: "100", symbol: "%", label: "Insurance Accepted" },
  { value: "Same-Day", symbol: "", label: "Appointments" },
];

export default function TrustBar() {
  return (
    <section
      id="trust-bar"
      className="bg-[var(--color-sand-muted)] py-16 -mt-16 relative z-20 shadow-lg shadow-[rgba(15,110,86,0.05)] rounded-t-[3rem]"
    >
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 justify-between items-end text-[var(--color-foreground-muted)]">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center md:items-start text-center md:text-left"
            >
              <span
                className={`font-[family-name:var(--font-heading)] ${
                  stat.value === "Same-Day"
                    ? "text-[36px] leading-[1.2]"
                    : "text-[48px] leading-none"
                } text-[var(--color-primary)] mb-2`}
              >
                {stat.value}
                {stat.symbol && (
                  <span className="text-[32px] text-[var(--color-accent)] relative -top-2">
                    {stat.symbol}
                  </span>
                )}
              </span>
              <span className="text-xs font-semibold tracking-[0.1em] uppercase text-[var(--color-foreground-muted)] font-[family-name:var(--font-body)]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
