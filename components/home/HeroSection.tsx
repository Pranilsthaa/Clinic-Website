import Button from "@/components/ui/Button";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden min-h-[75vh] flex flex-col items-center"
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20 pb-32 w-full">
        <div className="z-10">
          <div className="flex gap-6 mb-8">
            <div className="w-1 bg-[var(--color-accent)] rounded-full h-auto shrink-0" />
            <h1 className="font-[family-name:var(--font-heading)] text-4xl lg:text-[48px] leading-[1.1] tracking-[-0.02em] text-[var(--color-foreground)] max-w-lg animate-fade-in-up">
              Chiropractic Care for Car Accident Injuries in Austin
            </h1>
          </div>
          <p className="text-lg text-[var(--color-foreground-muted)] mb-10 max-w-md animate-fade-in-up delay-200">
            After a crash, most Austin patients wait 3 weeks to see a
            specialist. We see you this week.
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in-up delay-300">
            <Button href="/booking" variant="accent" size="lg">
              Book appointment
            </Button>
            <Button href="tel:+15551234567" variant="outline" size="lg">
              Call us now
            </Button>
          </div>
        </div>
      </div>

      {/* Full-bleed Hero Image on Right */}
      <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-1/2">
        <Image
          src="/images/hero-chiropractic.jpg"
          alt="Professional chiropractor performing a consultation in a modern clinic"
          fill
          sizes="50vw"
          className="object-cover"
          priority
        />
        {/* Soft gradient overlay to blend into background */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[var(--color-background)] to-transparent" />
      </div>

      {/* Bottom Organic Wave Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180 z-10">
        <svg
          className="relative block w-[calc(100%+1.3px)] h-[40px]"
          data-name="Layer 1"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="#fbf9f4"
          />
        </svg>
      </div>
    </section>
  );
}
