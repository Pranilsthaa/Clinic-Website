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
      ? "border-[var(--color-border-strong)]"
      : "border-[var(--color-border)]";

  return <hr className={`w-full border-t ${color} ${className}`} />;
}
