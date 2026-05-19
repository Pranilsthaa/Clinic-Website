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
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Change background when scrolled
      setScrolled(currentScrollY > 20);

      // Hide on scroll down, show on scroll up (mobile focus)
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setHidden(true);
        setIsOpen(false); // Close menu when scrolling down
      } else if (currentScrollY < lastScrollY) {
        setHidden(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const toggleMenu = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault(); // Prevent double firing on touch devices
    setIsOpen(!isOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_0_var(--color-border)]"
          : "bg-transparent"
      } ${
        hidden ? "-translate-y-full md:translate-y-0" : "translate-y-0"
      }`}
    >
      <Container className="flex items-center justify-between h-20">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center group relative z-50"
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
          type="button"
          className="md:hidden relative z-[60] flex flex-col justify-center items-center w-12 h-12 gap-[6px] cursor-pointer touch-none bg-transparent border-none outline-none"
          onClick={toggleMenu}
          onTouchEnd={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          style={{ WebkitTapHighlightColor: "transparent" }}
        >
          <span
            className={`block w-7 h-[2px] bg-black transition-all duration-300 origin-center pointer-events-none ${
              isOpen ? "rotate-45 translate-y-[8px]" : ""
            }`}
          />
          <span
            className={`block w-7 h-[2px] bg-black transition-all duration-300 pointer-events-none ${
              isOpen ? "opacity-0 scale-0" : ""
            }`}
          />
          <span
            className={`block w-7 h-[2px] bg-black transition-all duration-300 origin-center pointer-events-none ${
              isOpen ? "-rotate-45 -translate-y-[8px]" : ""
            }`}
          />
        </button>
      </Container>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out bg-white shadow-xl ${
          isOpen ? "max-h-96 border-b border-[var(--color-border)] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <Container className="py-6 flex flex-col gap-4">
          {siteConfig.navigation.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block text-base font-medium tracking-wide uppercase py-3 border-b border-[var(--color-border)] transition-colors ${
                pathname === link.href
                  ? "text-black"
                  : "text-[var(--color-secondary)]"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Button href="/booking" size="md" className="mt-4 w-full">
            Book Now
          </Button>
        </Container>
      </div>
    </header>
  );
}
