import Link from "next/link";
import { siteConfig } from "@/lib/data/site";
import Container from "@/components/ui/Container";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-[var(--color-surface-container)]"
      role="contentinfo"
    >
      <Container className="pt-20 md:pt-[var(--section-gap)] pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6 lg:col-span-1">
            <span className="font-[family-name:var(--font-heading)] text-[32px] text-[var(--color-primary)] block mb-2">
              {siteConfig.name}
            </span>
            <p className="text-sm text-[var(--color-foreground-muted)] leading-relaxed max-w-xs">
              Advanced clinical care meeting boutique wellness. We specialize in
              accident recovery and long-term spinal health.
            </p>
          </div>

          {/* Link Columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:col-span-3">
            {/* Services */}
            <div>
              <p className="text-xs font-semibold tracking-[0.1em] uppercase text-[var(--color-primary)] mb-6 font-[family-name:var(--font-body)]">
                Services
              </p>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/services"
                    className="text-[var(--color-foreground-muted)] hover:text-[var(--color-primary)] transition-all hover:underline text-sm"
                  >
                    Car Accident Recovery
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="text-[var(--color-foreground-muted)] hover:text-[var(--color-primary)] transition-all hover:underline text-sm"
                  >
                    Spinal Alignment
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="text-[var(--color-foreground-muted)] hover:text-[var(--color-primary)] transition-all hover:underline text-sm"
                  >
                    Postural Wellness
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <p className="text-xs font-semibold tracking-[0.1em] uppercase text-[var(--color-primary)] mb-6 font-[family-name:var(--font-body)]">
                Company
              </p>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/contact"
                    className="text-[var(--color-foreground-muted)] hover:text-[var(--color-primary)] transition-all hover:underline text-sm"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/booking"
                    className="text-[var(--color-foreground-muted)] hover:text-[var(--color-primary)] transition-all hover:underline text-sm"
                  >
                    Patient Portal
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-[var(--color-foreground-muted)] hover:text-[var(--color-primary)] transition-all hover:underline text-sm"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <p className="text-xs font-semibold tracking-[0.1em] uppercase text-[var(--color-primary)] mb-6 font-[family-name:var(--font-body)]">
                Legal
              </p>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/privacy"
                    className="text-[var(--color-foreground-muted)] hover:text-[var(--color-primary)] transition-all hover:underline text-sm"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-[var(--color-foreground-muted)] hover:text-[var(--color-primary)] transition-all hover:underline text-sm"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/accessibility"
                    className="text-[var(--color-foreground-muted)] hover:text-[var(--color-primary)] transition-all hover:underline text-sm"
                  >
                    Accessibility
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="col-span-1 lg:col-span-4 flex flex-col md:flex-row justify-between items-center pt-12 border-t border-[var(--color-primary)]/10 mt-12">
          <p className="text-sm text-[var(--color-foreground-muted)] mb-4 md:mb-0">
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-xs font-semibold text-[var(--color-accent)] tracking-widest uppercase font-[family-name:var(--font-body)]">
            Austin&apos;s first choice for post-accident clinical care.
          </p>
        </div>
      </Container>
    </footer>
  );
}
