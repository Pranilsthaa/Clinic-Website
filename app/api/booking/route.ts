import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { bookings } from "@/lib/db/schema";

/**
 * POST /api/booking
 * ──────────────────
 * REST API route for appointment bookings.
 * Inserts into PostgreSQL via Drizzle ORM.
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { date, time, service, firstName, lastName, email, phone, notes } =
      body;

    // Validation
    const errors: Record<string, string> = {};
    if (!date) errors.date = "Date is required.";
    if (!time) errors.time = "Time is required.";
    if (!service) errors.service = "Service is required.";
    if (!firstName) errors.firstName = "First name is required.";
    if (!lastName) errors.lastName = "Last name is required.";
    if (!email || !email.includes("@"))
      errors.email = "Valid email is required.";
    if (!phone) errors.phone = "Phone is required.";

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { success: false, errors },
        { status: 400 }
      );
    }

    const [result] = await db
      .insert(bookings)
      .values({
        date,
        time,
        service,
        firstName,
        lastName,
        email,
        phone,
        notes: notes || null,
        status: "pending",
      })
      .returning({ id: bookings.id });

    return NextResponse.json(
      {
        success: true,
        message: "Booking request received. We'll confirm within 24 hours.",
        bookingId: result.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("API booking error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
