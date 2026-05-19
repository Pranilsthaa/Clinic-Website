"use server";

/**
 * Booking form server action.
 * ──────────────────────────────
 * Validates form data and inserts into PostgreSQL via Drizzle ORM.
 */

import { db } from "@/lib/db";
import { bookings } from "@/lib/db/schema";

interface BookingState {
  success: boolean;
  message: string;
  errors: Record<string, string[]>;
}

export async function submitBooking(
  _prevState: BookingState,
  formData: FormData
): Promise<BookingState> {
  const rawData = {
    date: formData.get("date") as string,
    time: formData.get("time") as string,
    service: formData.get("service") as string,
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    notes: formData.get("notes") as string,
  };

  // Server-side validation
  const errors: Record<string, string[]> = {};

  if (!rawData.date) errors.date = ["Please select a date."];
  if (!rawData.time) errors.time = ["Please select a time."];
  if (!rawData.service) errors.service = ["Please select a service."];
  if (!rawData.firstName)
    errors.firstName = ["First name is required."];
  if (!rawData.lastName)
    errors.lastName = ["Last name is required."];
  if (!rawData.email || !rawData.email.includes("@"))
    errors.email = ["Please enter a valid email address."];
  if (!rawData.phone) errors.phone = ["Phone number is required."];

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: "Please correct the errors below.",
      errors,
    };
  }

  try {
    await db.insert(bookings).values({
      firstName: rawData.firstName,
      lastName: rawData.lastName,
      email: rawData.email,
      phone: rawData.phone,
      date: rawData.date,
      time: rawData.time,
      service: rawData.service,
      notes: rawData.notes || null,
      status: "pending",
    });

    return {
      success: true,
      message:
        "Thank you! Your appointment request has been received. Our clinic coordinator will contact you within 24 hours to confirm your booking.",
      errors: {},
    };
  } catch (error) {
    console.error("Booking submission error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
      errors: {},
    };
  }
}
