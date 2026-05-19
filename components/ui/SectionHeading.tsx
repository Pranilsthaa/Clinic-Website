interface SectionHeadingProps {
  overline?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  overline,
  title,
  subtitle,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center" : "text-left";

  return (
    <div className={`${alignment} ${className}`}>
      {overline && (
        <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[var(--color-secondary)] mb-3">
          {overline}
        </p>
      )}
      <h2 className="mb-4">{title}</h2>
      {subtitle && (
        <p className="max-w-2xl text-lg leading-relaxed text-[var(--color-foreground-muted)] mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
