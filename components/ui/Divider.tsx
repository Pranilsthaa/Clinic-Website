interface DividerProps {
  variant?: "muted" | "accent";
  className?: string;
}

export default function Divider({
  variant = "muted",
  className = "",
}: DividerProps) {
  const color =
    variant === "accent"
      ? "border-[var(--color-accent)]"
      : "border-[var(--color-sand-muted)]";

  return <hr className={`border-t ${color} ${className}`} />;
}
