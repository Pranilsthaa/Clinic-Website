import Link from "next/link";
import type { Service } from "@/lib/data/services";

interface ServiceCardProps {
  service: Service;
  index?: number;
}

export default function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  return (
    <article
      className="group border border-[var(--color-border)] rounded-lg p-8 bg-white transition-all duration-300 hover:border-black hover:shadow-[2px_2px_0_0_#000]"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Number badge */}
      <div className="w-10 h-10 rounded-full bg-[var(--color-surface-subtle)] flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-black group-hover:text-white">
        <span className="text-sm font-bold font-[family-name:var(--font-heading)]">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3 className="text-xl font-semibold mb-3 font-[family-name:var(--font-heading)]">
        {service.title}
      </h3>

      <p className="text-sm text-[var(--color-foreground-muted)] leading-relaxed mb-6">
        {service.excerpt}
      </p>

      <Link
        href={`/services#${service.slug}`}
        className="inline-flex items-center gap-2 text-sm font-semibold text-black group-hover:gap-3 transition-all duration-200"
      >
        Details
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden="true"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </Link>
    </article>
  );
}
