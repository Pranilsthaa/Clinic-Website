interface SectionHeadingProps {
  overline?: string;
  title: string;
  subtitle?: string;
  accentBar?: boolean;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  overline,
  title,
  subtitle,
  accentBar = false,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center" : "text-left";

  return (
    <div className={`${alignment} ${className}`}>
      {overline && (
        <p className="text-xs font-semibold tracking-[0.1em] uppercase text-[var(--color-accent)] font-[family-name:var(--font-body)] mb-3">
          {overline}
        </p>
      )}
      <h2 className="font-[family-name:var(--font-heading)] text-[var(--color-primary)] mb-4">
        {title}
      </h2>
      {accentBar && (
        <div
          className={`w-16 h-1 bg-[var(--color-accent)] rounded-full mb-4 ${
            align === "center" ? "mx-auto" : ""
          }`}
        />
      )}
      {subtitle && (
        <p className="max-w-2xl text-lg leading-relaxed text-[var(--color-foreground-muted)] mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
