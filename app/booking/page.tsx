"use client";

import { useActionState, useState, useEffect } from "react";
import Container from "@/components/ui/Container";
import { siteConfig } from "@/lib/data/site";
import { services } from "@/lib/data/services";
import { submitBooking } from "./actions";
import { getUnavailableTimes, getAvailableTimeSlots } from "./availability-action";

const initialState = {
  success: false,
  message: "",
  errors: {} as Record<string, string[]>,
};

export default function BookingPage() {
  const [state, formAction, pending] = useActionState(
    submitBooking,
    initialState
  );

  const [availableSlots, setAvailableSlots] = useState<Array<{ val: string; label: string }>>([]);
  const [isFetchingAvailableSlots, setIsFetchingAvailableSlots] = useState(true);
  const [unavailableTimes, setUnavailableTimes] = useState<string[]>([]);
  const [isFetchingTimes, setIsFetchingTimes] = useState(false);

  useEffect(() => {
    async function fetchSlots() {
      try {
        const slots = await getAvailableTimeSlots();
        console.log('hello', slots)
        setAvailableSlots(slots);
      } catch (error) {
        console.error(error);
      } finally {
        setIsFetchingAvailableSlots(false);
      }
    }
    fetchSlots();
  }, []);
  const handleDateChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    if (!selectedDate) {
      setUnavailableTimes([]);
      return;
    }

    setIsFetchingTimes(true);
    try {
      const times = await getUnavailableTimes(selectedDate);
      setUnavailableTimes(times);
    } catch (err) {
      console.error(err);
    } finally {
      setIsFetchingTimes(false);
    }
  };

  return (
    <>
      {/* ─── Hero ────────────────────────────────────────── */}
      <section className="bg-black text-white py-24 md:py-32">
        <Container className="text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-400 mb-4">
            Schedule Your Visit
          </p>
          <h1 className="text-white mb-6">Request an Appointment</h1>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Select a preferred date and time, and provide your details. Our
            clinic coordinator will contact you to confirm your booking.
          </p>
        </Container>
      </section>

      {/* ─── Form Section ────────────────────────────────── */}
      <section className="py-20 md:py-[var(--section-gap)]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Booking Form */}
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
                  <h2 className="text-2xl mb-4">Appointment Requested</h2>
                  <p className="text-[var(--color-foreground-muted)] max-w-md mx-auto">
                    {state.message}
                  </p>
                </div>
              ) : (
                <form action={formAction} className="space-y-8">
                  {state.message && !state.success && (
                    <p
                      className="text-sm text-[var(--color-error)] p-4 bg-red-50 rounded"
                      aria-live="polite"
                    >
                      {state.message}
                    </p>
                  )}

                  {/* Schedule Section */}
                  <fieldset>
                    <legend className="flex items-center gap-2 text-sm font-semibold tracking-[0.1em] uppercase text-[var(--color-secondary)] mb-6">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden="true"
                      >
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      Schedule
                    </legend>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="booking-date"
                          className="block text-xs font-semibold tracking-[0.05em] uppercase text-[var(--color-foreground-muted)] mb-2"
                        >
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          id="booking-date"
                          name="date"
                          required
                          onChange={handleDateChange}
                          className="w-full border border-[var(--color-border)] rounded px-4 py-3 text-sm bg-white transition-colors focus:border-black focus:outline-none"
                        />
                        {state.errors?.date && (
                          <p className="text-xs text-[var(--color-error)] mt-1">
                            {state.errors.date[0]}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="booking-time"
                          className="block text-xs font-semibold tracking-[0.05em] uppercase text-[var(--color-foreground-muted)] mb-2"
                        >
                          Preferred Time
                        </label>
                        <select
                          id="booking-time"
                          name="time"
                          required
                          disabled={isFetchingAvailableSlots || isFetchingTimes || availableSlots.length === 0}
                          className="w-full border border-[var(--color-border)] rounded px-4 py-3 text-sm bg-white transition-colors focus:border-black focus:outline-none appearance-none disabled:opacity-50"
                        >
                          <option value="">
                            {isFetchingAvailableSlots
                              ? "Loading times..."
                              : availableSlots.length === 0
                                ? "No times configured"
                                : isFetchingTimes
                                  ? "Checking availability..."
                                  : "Select a time"}
                          </option>
                          {availableSlots.map(({ val, label }) => {
                            const isBooked = unavailableTimes.includes(val);
                            return (
                              <option key={val} value={val} disabled={isBooked} className={isBooked ? "text-neutral-400" : ""}>
                                {label} {isBooked ? "(Booked)" : ""}
                              </option>
                            );
                          })}
                        </select>
                        {state.errors?.time && (
                          <p className="text-xs text-[var(--color-error)] mt-1">
                            {state.errors.time[0]}
                          </p>
                        )}
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="booking-service"
                          className="block text-xs font-semibold tracking-[0.05em] uppercase text-[var(--color-foreground-muted)] mb-2"
                        >
                          Service
                        </label>
                        <select
                          id="booking-service"
                          name="service"
                          required
                          className="w-full border border-[var(--color-border)] rounded px-4 py-3 text-sm bg-white transition-colors focus:border-black focus:outline-none appearance-none"
                        >
                          <option value="">Select a service</option>
                          {services.map((s) => (
                            <option key={s.slug} value={s.slug}>
                              {s.title}
                            </option>
                          ))}
                          <option value="consultation">
                            Initial Consultation
                          </option>
                        </select>
                      </div>
                    </div>
                  </fieldset>

                  <hr className="border-[var(--color-border)]" />

                  {/* Patient Details */}
                  <fieldset>
                    <legend className="flex items-center gap-2 text-sm font-semibold tracking-[0.1em] uppercase text-[var(--color-secondary)] mb-6">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden="true"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      Patient Details
                    </legend>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="booking-first-name"
                          className="block text-xs font-semibold tracking-[0.05em] uppercase text-[var(--color-foreground-muted)] mb-2"
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          id="booking-first-name"
                          name="firstName"
                          required
                          className="w-full border border-[var(--color-border)] rounded px-4 py-3 text-sm bg-white transition-colors focus:border-black focus:outline-none"
                        />
                        {state.errors?.firstName && (
                          <p className="text-xs text-[var(--color-error)] mt-1">
                            {state.errors.firstName[0]}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="booking-last-name"
                          className="block text-xs font-semibold tracking-[0.05em] uppercase text-[var(--color-foreground-muted)] mb-2"
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="booking-last-name"
                          name="lastName"
                          required
                          className="w-full border border-[var(--color-border)] rounded px-4 py-3 text-sm bg-white transition-colors focus:border-black focus:outline-none"
                        />
                        {state.errors?.lastName && (
                          <p className="text-xs text-[var(--color-error)] mt-1">
                            {state.errors.lastName[0]}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="booking-email"
                          className="block text-xs font-semibold tracking-[0.05em] uppercase text-[var(--color-foreground-muted)] mb-2"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="booking-email"
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
                          htmlFor="booking-phone"
                          className="block text-xs font-semibold tracking-[0.05em] uppercase text-[var(--color-foreground-muted)] mb-2"
                        >
                          Phone
                        </label>
                        <input
                          type="tel"
                          id="booking-phone"
                          name="phone"
                          required
                          className="w-full border border-[var(--color-border)] rounded px-4 py-3 text-sm bg-white transition-colors focus:border-black focus:outline-none"
                        />
                        {state.errors?.phone && (
                          <p className="text-xs text-[var(--color-error)] mt-1">
                            {state.errors.phone[0]}
                          </p>
                        )}
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="booking-notes"
                          className="block text-xs font-semibold tracking-[0.05em] uppercase text-[var(--color-foreground-muted)] mb-2"
                        >
                          Additional Notes (Optional)
                        </label>
                        <textarea
                          id="booking-notes"
                          name="notes"
                          rows={4}
                          className="w-full border border-[var(--color-border)] rounded px-4 py-3 text-sm bg-white transition-colors focus:border-black focus:outline-none resize-none"
                          placeholder="Describe your symptoms or any relevant medical history..."
                        />
                      </div>
                    </div>
                  </fieldset>

                  <p className="text-xs text-[var(--color-foreground-muted)]">
                    By submitting this form, you agree to our cancellation
                    policy. We will contact you within 24 hours to confirm your
                    appointment.
                  </p>

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
                        Submitting…
                      </>
                    ) : (
                      "Request Appointment"
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-28 space-y-8">
                {/* Clinic Info */}
                <div className="border border-[var(--color-border)] rounded-lg p-6 space-y-6">
                  <h3 className="text-sm font-semibold tracking-[0.1em] uppercase text-[var(--color-secondary)]">
                    Clinic Info
                  </h3>

                  <div>
                    <p className="text-xs font-semibold tracking-[0.1em] uppercase text-[var(--color-foreground-muted)] mb-1">
                      Location
                    </p>
                    <p className="text-sm">{siteConfig.address.street}</p>
                    <p className="text-sm">
                      {siteConfig.address.city}, {siteConfig.address.state}{" "}
                      {siteConfig.address.zip}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold tracking-[0.1em] uppercase text-[var(--color-foreground-muted)] mb-1">
                      Hours
                    </p>
                    {siteConfig.hours.map((h) => (
                      <p key={h.day} className="text-sm">
                        {h.day}: {h.time}
                      </p>
                    ))}
                  </div>

                  <div>
                    <p className="text-xs font-semibold tracking-[0.1em] uppercase text-[var(--color-foreground-muted)] mb-1">
                      Contact
                    </p>
                    <p className="text-sm">{siteConfig.phone}</p>
                    <p className="text-sm">{siteConfig.email}</p>
                  </div>
                </div>

                {/* Cancellation policy */}
                <div className="bg-[var(--color-surface-subtle)] rounded-lg p-6">
                  <h3 className="text-sm font-semibold mb-2">
                    Cancellation Policy
                  </h3>
                  <p className="text-xs text-[var(--color-foreground-muted)] leading-relaxed">
                    Please provide at least 24 hours notice for cancellations.
                    Late cancellations or no-shows may incur a fee equivalent to
                    the cost of the scheduled service.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
