import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * POST /api/booking
 * ──────────────────
 * REST API route for appointment bookings.
 *
 * When PostgreSQL is connected:
 * 1. Import your DB client
 * 2. Insert into the `bookings` table
 * 3. Trigger confirmation email
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

    // TODO: Insert into PostgreSQL
    // const result = await db.insert(bookings).values({
    //   date, time, service, firstName, lastName, email, phone, notes,
    //   status: 'pending',
    //   createdAt: new Date(),
    // }).returning();

    console.log("📅 API booking submission:", {
      date,
      time,
      service,
      firstName,
      lastName,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Booking request received. We'll confirm within 24 hours.",
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
