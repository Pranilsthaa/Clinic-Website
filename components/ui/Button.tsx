import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
}

const baseStyles =
  "inline-flex items-center justify-center font-semibold transition-all duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black";

const variants = {
  primary: "bg-black text-white hover:bg-[#1a1a1a] active:bg-[#333]",
  outline:
    "border-2 border-black text-black bg-transparent hover:bg-black hover:text-white",
  ghost: "text-black bg-transparent hover:bg-[#f3f3f4]",
};

const sizes = {
  sm: "px-5 py-2 text-sm rounded",
  md: "px-8 py-3 text-base rounded",
  lg: "px-10 py-4 text-lg rounded",
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
