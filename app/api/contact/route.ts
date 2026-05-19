import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * POST /api/contact
 * ──────────────────
 * REST API route for the contact form.
 * This is an alternative to the Server Action approach —
 * useful for external integrations, mobile apps, or the admin panel.
 *
 * When PostgreSQL is connected:
 * 1. Import your DB client (e.g., Drizzle / Prisma)
 * 2. Insert the validated data into the `contact_messages` table
 * 3. Optionally trigger an email notification
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Validation
    const errors: Record<string, string> = {};
    if (!name) errors.name = "Name is required.";
    if (!email || !email.includes("@"))
      errors.email = "Valid email is required.";
    if (!message || message.length < 10)
      errors.message = "Message must be at least 10 characters.";

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { success: false, errors },
        { status: 400 }
      );
    }

    // TODO: Insert into PostgreSQL
    // const result = await db.insert(contactMessages).values({
    //   name, email, phone, subject, message,
    //   createdAt: new Date(),
    // }).returning();

    console.log("📬 API contact submission:", { name, email, subject });

    return NextResponse.json(
      {
        success: true,
        message: "Message received. We'll respond within 24 hours.",
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
