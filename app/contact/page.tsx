"use client";

import { useActionState } from "react";
import Container from "@/components/ui/Container";
import { siteConfig } from "@/lib/data/site";
import { submitContact } from "./actions";

const initialState = {
  success: false,
  message: "",
  errors: {} as Record<string, string[]>,
};

export default function ContactPage() {
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialState,
  );

  return (
    <>
      {/* ─── Hero ────────────────────────────────────────── */}
      <section className="bg-black text-white py-24 md:py-32">
        <Container className="text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-400 mb-4">
            Get in Touch
          </p>
          <h1 className="text-white mb-6">Contact Us</h1>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Reach out to schedule an appointment or ask any questions about our
            chiropractic and wellness services. We are here to help you achieve
            optimal health.
          </p>
        </Container>
      </section>

      {/* ─── Contact Section ────────────────────────────── */}
      <section className="py-20 md:py-[var(--section-gap)]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-10">
              {/* Location */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-semibold tracking-[0.1em] uppercase">
                    Clinic Location
                  </h3>
                </div>
                <address className="not-italic text-sm text-[var(--color-foreground-muted)] leading-relaxed ml-[52px]">
                  <p>{siteConfig.address.street}</p>
                  <p>
                    {siteConfig.address.city}, {siteConfig.address.state}{" "}
                    {siteConfig.address.zip}
                  </p>
                  <p>{siteConfig.address.country}</p>
                </address>
              </div>

              {/* Direct Contact */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-semibold tracking-[0.1em] uppercase">
                    Direct Contact
                  </h3>
                </div>
                <div className="ml-[52px] space-y-1">
                  <a
                    href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                    className="block text-sm text-[var(--color-foreground-muted)] hover:text-black transition-colors"
                  >
                    P: {siteConfig.phone}
                  </a>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="block text-sm text-[var(--color-foreground-muted)] hover:text-black transition-colors"
                  >
                    E: {siteConfig.email}
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-semibold tracking-[0.1em] uppercase">
                    Hours of Operation
                  </h3>
                </div>
                <div className="ml-[52px] space-y-1">
                  {siteConfig.hours.map((h) => (
                    <p
                      key={h.day}
                      className="flex justify-between text-sm text-[var(--color-foreground-muted)]"
                    >
                      <span>{h.day}</span>
                      <span className="font-medium text-black">{h.time}</span>
                    </p>
                  ))}
                </div>
              </div>

              {/* Social */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-semibold tracking-[0.1em] uppercase">
                    Social Media
                  </h3>
                </div>
                <div className="ml-[52px] flex gap-4">
                  <a
                    href={siteConfig.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[var(--color-foreground-muted)] hover:text-black transition-colors underline underline-offset-4"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[var(--color-foreground-muted)] hover:text-black transition-colors underline underline-offset-4"
                  >
                    Instagram
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              {state.success ? (
                <div className="border border-black rounded-lg p-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center mx-auto mb-6">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <h2 className="text-2xl mb-4">Message Sent</h2>
                  <p className="text-[var(--color-foreground-muted)] max-w-md mx-auto">
                    {state.message}
                  </p>
                </div>
              ) : (
                <form
                  action={formAction}
                  className="border border-[var(--color-border)] rounded-lg p-8 md:p-10 space-y-6"
                >
                  <h2 className="text-2xl mb-2 font-[family-name:var(--font-heading)]">
                    Send us a message
                  </h2>
                  <p className="text-sm text-[var(--color-foreground-muted)] mb-6">
                    We typically respond within 24 business hours.
                  </p>

                  {state.message && !state.success && (
                    <p
                      className="text-sm text-[var(--color-error)] p-4 bg-red-50 rounded"
                      aria-live="polite"
                    >
                      {state.message}
                    </p>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-semibold tracking-[0.05em] uppercase text-[var(--color-foreground-muted)] mb-2"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="contact-name"
                        name="name"
                        required
                        className="w-full border border-[var(--color-border)] rounded px-4 py-3 text-sm bg-white transition-colors focus:border-black focus:outline-none"
                      />
                      {state.errors?.name && (
                        <p className="text-xs text-[var(--color-error)] mt-1">
                          {state.errors.name[0]}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-semibold tracking-[0.05em] uppercase text-[var(--color-foreground-muted)] mb-2"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        name="email"
                        required
                        className="w-full border border-[var(--color-border)] rounded px-4 py-3 text-sm bg-white transition-colors focus:border-black focus:outline-none"
                      />
                      {state.errors?.email && (
                        <p className="text-xs text-[var(--color-error)] mt-1">
                          {state.errors.email[0]}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block text-xs font-semibold tracking-[0.05em] uppercase text-[var(--color-foreground-muted)] mb-2"
                      >
                        Phone (Optional)
                      </label>
                      <input
                        type="tel"
                        id="contact-phone"
                        name="phone"
                        className="w-full border border-[var(--color-border)] rounded px-4 py-3 text-sm bg-white transition-colors focus:border-black focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-subject"
                        className="block text-xs font-semibold tracking-[0.05em] uppercase text-[var(--color-foreground-muted)] mb-2"
                      >
                        Subject
                      </label>
                      <select
                        id="contact-subject"
                        name="subject"
                        required
                        className="w-full border border-[var(--color-border)] rounded px-4 py-3 text-sm bg-white transition-colors focus:border-black focus:outline-none appearance-none"
                      >
                        <option value="">Select a topic</option>
                        <option value="general">General Inquiry</option>
                        <option value="appointment">
                          Appointment Question
                        </option>
                        <option value="billing">Billing</option>
                        <option value="feedback">Feedback</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="contact-message"
                        className="block text-xs font-semibold tracking-[0.05em] uppercase text-[var(--color-foreground-muted)] mb-2"
                      >
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={5}
                        required
                        className="w-full border border-[var(--color-border)] rounded px-4 py-3 text-sm bg-white transition-colors focus:border-black focus:outline-none resize-none"
                        placeholder="How can we help you?"
                      />
                      {state.errors?.message && (
                        <p className="text-xs text-[var(--color-error)] mt-1">
                          {state.errors.message[0]}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={pending}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-black text-white font-semibold px-10 py-4 rounded transition-all duration-200 hover:bg-[#1a1a1a] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {pending ? (
                      <>
                        <svg
                          className="animate-spin h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden="true"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
