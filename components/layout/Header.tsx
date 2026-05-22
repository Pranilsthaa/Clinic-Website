"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { siteConfig } from "@/lib/data/site";
import Container from "@/components/ui/Container";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 20);

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setHidden(true);
        setIsOpen(false);
      } else if (currentScrollY < lastScrollY) {
        setHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const toggleMenu = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] h-20 ${
        scrolled
          ? "bg-[var(--color-background)]/80 backdrop-blur-md shadow-2xl shadow-[rgba(15,110,86,0.05)]"
          : "bg-[var(--color-background)]"
      } ${hidden ? "-translate-y-full md:translate-y-0" : "translate-y-0"}`}
    >
      <Container className="flex items-center justify-between h-full">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group relative z-50"
          aria-label={`${siteConfig.name} – Home`}
        >
          <Image
            src={siteConfig.logo.dark}
            alt={siteConfig.name}
            width={180}
            height={60}
            className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-8"
          aria-label="Main navigation"
        >
          {siteConfig.navigation.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative text-sm font-medium tracking-wide transition-colors duration-200 py-1 font-[family-name:var(--font-body)] ${
                pathname === link.href
                  ? "text-[var(--color-primary)] border-b-2 border-[var(--color-accent)] pb-1"
                  : "text-[var(--color-foreground-muted)] hover:text-[var(--color-primary)]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-6">
          <a
            href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
            className="hidden lg:block text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors font-[family-name:var(--font-body)]"
          >
            {siteConfig.phone}
          </a>
          <Link
            href="/booking"
            className="hidden md:inline-flex bg-[var(--color-primary)] text-white px-6 py-3 rounded-full font-semibold text-[12px] tracking-[0.1em] uppercase hover:bg-[var(--color-primary-container)] transition-colors duration-300 hover:scale-105 active:scale-95 font-[family-name:var(--font-body)]"
            id="header-book-now"
          >
            Book Now
          </Link>

          {/* Mobile Hamburger */}
          <button
            type="button"
            className="md:hidden relative z-[60] flex flex-col justify-center items-center w-12 h-12 gap-[6px] cursor-pointer touch-none bg-transparent border-none outline-none"
            onClick={toggleMenu}
            onTouchEnd={toggleMenu}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            <span
              className={`block w-7 h-[2px] bg-[var(--color-primary)] transition-all duration-300 origin-center pointer-events-none ${
                isOpen ? "rotate-45 translate-y-[8px]" : ""
              }`}
            />
            <span
              className={`block w-7 h-[2px] bg-[var(--color-primary)] transition-all duration-300 pointer-events-none ${
                isOpen ? "opacity-0 scale-0" : ""
              }`}
            />
            <span
              className={`block w-7 h-[2px] bg-[var(--color-primary)] transition-all duration-300 origin-center pointer-events-none ${
                isOpen ? "-rotate-45 -translate-y-[8px]" : ""
              }`}
            />
          </button>
        </div>
      </Container>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out bg-[var(--color-background)] shadow-xl ${
          isOpen
            ? "max-h-96 border-b border-[var(--color-border)] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <Container className="py-6 flex flex-col gap-4">
          {siteConfig.navigation.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block text-base font-medium tracking-wide py-3 border-b border-[var(--color-sand-muted)] transition-colors font-[family-name:var(--font-body)] ${
                pathname === link.href
                  ? "text-[var(--color-primary)]"
                  : "text-[var(--color-foreground-muted)]"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/booking"
            className="mt-4 w-full inline-flex items-center justify-center bg-[var(--color-accent)] text-white py-3 rounded-full font-semibold text-sm tracking-[0.05em] uppercase hover:bg-[var(--color-primary)] transition-colors"
            id="mobile-book-now"
          >
            Book Now
          </Link>
        </Container>
      </div>
    </header>
  );
}
