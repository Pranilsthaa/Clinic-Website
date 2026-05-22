import Container from "@/components/ui/Container";

const GoogleIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const testimonials = [
  {
    name: "Sarah Reynolds",
    role: "Verified Patient",
    stars: 5,
    text: "After my rear-end collision, I was in constant pain. Dr. Jenkins and her team were incredible. They handled the insurance paperwork and got me back to work within weeks. Highly recommend for any car accident recovery!",
  },
  {
    name: "Michael Lawson",
    role: "Verified Patient",
    stars: 5,
    text: "The most professional medical office I've visited in Austin. The atmosphere is calming, and the results are real. My chronic neck pain is finally gone. They actually listen to you here.",
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 md:py-[var(--section-gap)] bg-[var(--color-sand-muted)]">
      <Container>
        <div className="text-center mb-16">
          <h2 className="font-[family-name:var(--font-heading)] text-[32px] text-[var(--color-primary)] mb-4">
            What Recovery Actually Sounds Like
          </h2>
          <div className="flex justify-center gap-1 text-xl">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="material-symbols-outlined text-[var(--color-accent)]" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-white p-10 rounded-xl soft-glow relative"
            >
              {/* Star row + badge */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-sm">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[var(--color-accent)] text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                  ))}
                </div>
                <span className="text-xs font-bold text-[var(--color-foreground-muted)]">
                  Verified Google Review
                </span>
              </div>

              {/* Quote */}
              <p className="text-lg text-[var(--color-foreground)] mb-8 italic leading-relaxed">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[var(--color-surface-container-low)] rounded-full flex items-center justify-center">
                  <GoogleIcon />
                </div>
                <div>
                  <p className="font-bold text-[var(--color-foreground)]">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-[var(--color-foreground-muted)]">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
