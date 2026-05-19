"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { siteConfig } from "@/lib/data/site";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_0_var(--color-border)]"
          : "bg-transparent"
      }`}
    >
      <Container className="flex items-center justify-between h-20">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center group"
          aria-label={`${siteConfig.name} – Home`}
        >
          <Image
            src={siteConfig.logo.light}
            alt={siteConfig.name}
            width={180}
            height={60}
            className="h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
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
              className={`relative text-sm font-medium tracking-wide uppercase transition-colors duration-200 hover:text-black py-1 ${
                pathname === link.href
                  ? "text-black after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-black"
                  : "text-[var(--color-secondary)]"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Button href="/booking" size="sm" className="text-white">
            Book Now
          </Button>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          <span
            className={`block w-6 h-[2px] bg-black transition-all duration-300 origin-center ${
              isOpen ? "rotate-45 translate-y-[5px]" : ""
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-black transition-all duration-300 ${
              isOpen ? "opacity-0 scale-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-black transition-all duration-300 origin-center ${
              isOpen ? "-rotate-45 -translate-y-[5px]" : ""
            }`}
          />
        </button>
      </Container>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-white ${
          isOpen ? "max-h-96 border-b border-[var(--color-border)]" : "max-h-0"
        }`}
      >
        <Container className="py-6 flex flex-col gap-4">
          {siteConfig.navigation.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-base font-medium tracking-wide uppercase py-2 border-b border-[var(--color-border)] transition-colors ${
                pathname === link.href
                  ? "text-black"
                  : "text-[var(--color-secondary)]"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Button href="/booking" size="md" className="mt-2 w-full">
            Book Now
          </Button>
        </Container>
      </div>
    </header>
  );
}
