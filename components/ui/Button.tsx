import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "accent" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
}

const baseStyles =
  "inline-flex items-center justify-center font-semibold transition-all duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]";

const variants = {
  primary:
    "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-container)]",
  accent:
    "bg-[var(--color-accent)] text-white hover:bg-[var(--color-primary)] shadow-[0_20px_50px_-12px_rgba(15,110,86,0.08)]",
  outline:
    "border-2 border-[var(--color-accent)] text-[var(--color-primary)] bg-transparent hover:bg-[var(--color-accent)]/5",
  ghost:
    "text-[var(--color-primary)] bg-transparent hover:bg-[var(--color-surface-container)]",
};

const sizes = {
  sm: "px-5 py-2 text-sm rounded-full",
  md: "px-8 py-3 text-base rounded-full",
  lg: "px-10 py-4 text-lg rounded-full",
};

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  type = "button",
  disabled = false,
  className = "",
  onClick,
  ariaLabel,
}: ButtonProps) {
  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${
    disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
  } ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
