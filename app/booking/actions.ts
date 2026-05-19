"use server";

/**
 * Booking form server action.
 * ─────────────────────────────
 * Currently validates and logs. When PostgreSQL is connected,
 * replace the log with a database INSERT via your ORM (Drizzle, Prisma, etc.).
 */

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

  // Basic server-side validation
  const errors: Record<string, string[]> = {};

  if (!rawData.date) errors.date = ["Please select a date."];
  if (!rawData.time) errors.time = ["Please select a time."];
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

  // TODO: Insert into PostgreSQL
  // await db.insert(bookings).values(rawData);

  console.log("📋 New booking request:", rawData);

  return {
    success: true,
    message:
      "Thank you! Your appointment request has been received. Our clinic coordinator will contact you within 24 hours to confirm your booking.",
    errors: {},
  };
}
